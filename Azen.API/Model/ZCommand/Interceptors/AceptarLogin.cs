using Azen.API.Sockets.Auth;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Domain.Command;
using Azen.API.Sockets.Domain.Response;
using Azen.API.Sockets.General;
using Azen.API.Sockets.Settings;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Azen.API.Model.ZCommand.Interceptors
{
    public class AceptarLogin
    {
        public class Command : ZCommandDTO
        {
            public Command() { }
            public Command(ZCommandDTO zCommandDTO) {
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
            AuthService _authService;
            public Handler(ZSocket zsck, AuthService authService)
            {
                _zsck = zsck;
                _authService = authService;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var result = _zsck.ExecuteCommandAsString(request);

                string tkna = _zsck.GetTagValue(ZTag.ZTAG_TKNA, result);

                if (string.IsNullOrEmpty(tkna))
                {
                    return result;
                }

                string token = _authService.GenerateJwtToken(new ZClaims { 
                    Tkna = tkna
                });

                return result.Replace($"<{ZTag.ZTAG_TKNA}>{tkna}</{ZTag.ZTAG_TKNA}>", $"<{ZTag.ZTAG_TKNA}>{token}</{ZTag.ZTAG_TKNA}>");
            }           
        }
    }
}
