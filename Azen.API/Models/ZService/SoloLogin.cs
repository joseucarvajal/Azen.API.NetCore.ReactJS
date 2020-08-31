using Azen.API.Sockets.Auth;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Cryptography;
using Azen.API.Sockets.Domain.Command;
using Azen.API.Sockets.Domain.Response;
using Azen.API.Sockets.General;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Azen.API.Models.ZService
{
    public class SoloLogin
    {
        public class Command : IRequest<string>
        {
            public string UserName { get; set; }
            public string Password{ get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserName)
                    .NotEmpty()
                    .WithMessage("UserName es requerido");
                RuleFor(x => x.Password)
                    .NotEmpty()
                    .WithMessage("Password es requerido");
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            ZSocket _zsck;
            private readonly IdentitySettings _identitySettings;
            private ZCryptography _zCryptography;
            public Handler(ZSocket zsck, IOptions<IdentitySettings> identitySettings, ZCryptography zCryptography)
            {
                _zsck = zsck;
                _identitySettings = identitySettings.Value;
                _zCryptography = zCryptography;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                request.UserName = _zCryptography.GetPlainText(request.UserName);
                request.Password = _zCryptography.GetPlainText(request.UserName);

                string buffer = $"{ZTag.ZTAG_I_CMDEVT}SOLOLOGIN{ZTag.ZTAG_F_CMDEVT}{ZTag.ZTAG_I_USUARIO}{request.UserName}{ZTag.ZTAG_F_USUARIO}{ZTag.ZTAG_I_VALORCAMPO}{request.Password}{ZTag.ZTAG_F_VALORCAMPO}";

                var result = _zsck.ExecuteCommand(new ZCommandDTO() { 
                    Buffer = buffer,
                    Cmd = ZCommandConst.CM_SOLOLOGIN
                });

                ZSoloLoginResponse zLoginResponse = _zsck.DeserializeXMLToObject<ZSoloLoginResponse>(result.Eventos.ElementAt(0).Dato.Buffer.Dato);

                if (zLoginResponse.MessageCode == ZSocket.ZSCK_ERROPERNOVAL)
                {
                    throw new Exception(zLoginResponse.Message);
                }

                string token = GenerateJwtToken(zLoginResponse.Tkna);
                return token;
            }

            private string GenerateJwtToken(string tkna)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_identitySettings.SecretKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("tkna", tkna) }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
        }
    }
}
