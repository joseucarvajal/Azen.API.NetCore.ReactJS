using Azen.API.Sockets.Auth;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Domain.Command;
using Azen.API.Sockets.Domain.Response;
using Azen.API.Sockets.General;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Azen.API.Model.ZCommand.Interceptors
{
    public class SoloLogin
    {
        public class Command : ZCommandDTO
        {
            public Command() { }
            public Command(ZCommandDTO zCommandDTO)
            {
                zCommandDTO.CopyTo(this);
            }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Buffer)
                    .NotEmpty()
                    .WithMessage("Buffer es requerido");
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            ZSocket _zsck;
            private readonly IdentitySettings _identitySettings;
            public Handler(ZSocket zsck, IOptions<IdentitySettings> identitySettings)
            {
                _zsck = zsck;
                _identitySettings = identitySettings.Value;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                request.Buffer = ZTag.ZTAG_I_CMDEVT + "SOLOLOGIN" + ZTag.ZTAG_F_CMDEVT + request.Buffer;

                var result = _zsck.ExecuteCommand(request);

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
