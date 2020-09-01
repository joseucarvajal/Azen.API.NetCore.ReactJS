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
            private AuthService _authService;

            public Handler(ZSocket zsck, IOptions<IdentitySettings> identitySettings, 
                ZCryptography zCryptography,
                AuthService authService)
            {
                _zsck = zsck;
                _identitySettings = identitySettings.Value;
                _zCryptography = zCryptography;
                _authService = authService;
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
                    throw new UnauthorizedAccessException(zLoginResponse.Message);
                }

                string token = _authService.GenerateJwtToken(new ZClaims
                {
                    Tkna = zLoginResponse.Tkna
                });
                
                return token;
            }
        }
    }
}
