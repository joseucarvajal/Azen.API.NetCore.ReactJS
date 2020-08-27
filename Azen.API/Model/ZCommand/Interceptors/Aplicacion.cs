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
    public class Aplicacion
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
                request.Buffer = ZTag.ZTAG_I_CMDEVT + "EJECUTAR" + ZTag.ZTAG_F_CMDEVT +
                    ZTag.ZTAG_I_TKNA + request.Tkna + ZTag.ZTAG_F_TKNA +
                    ZTag.ZTAG_I_IPSC + "0000" + ZTag.ZTAG_F_IPSC +
                    ZTag.ZTAG_I_PSC + "0000" + ZTag.ZTAG_F_PSC +
                    ZTag.ZTAG_I_IDAPLI + request.IdAplication + ZTag.ZTAG_F_IDAPLI +
                    ZTag.ZTAG_I_LOG + request.Log + ZTag.ZTAG_F_LOG +
                    ZTag.ZTAG_I_CLIENTE + "web" + ZTag.ZTAG_F_CLIENTE;

                var result = _zsck.ExecuteCommandAsString(request);

                string tkns = _zsck.GetTagValue(ZTag.ZTAG_TKNS, result);

                if (string.IsNullOrEmpty(tkns))
                {
                    return result;
                }

                string token = _authService.GenerateJwtToken(new ZClaims
                {
                    Tkna = request.Tkna,
                    Tkns = tkns
                });

                return result.Replace($"<{ZTag.ZTAG_TKNS}>{tkns}</{ZTag.ZTAG_TKNS}>", $"<{ZTag.ZTAG_TKNS}>{token}</{ZTag.ZTAG_TKNS}>");
            }
        }
    }
}
