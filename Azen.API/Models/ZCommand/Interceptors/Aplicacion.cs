using Azen.API.ExceptionsHandling.Exceptions;
using Azen.API.Sockets.Auth;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Domain.Command;
using Azen.API.Sockets.General;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Azen.API.Models.ZCommand.Interceptors
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
            LogHandler _logHandler;
            private readonly IOptions<AzenSettings> _azenSettings;

            public Handler(ZSocket zsck, AuthService authService, LogHandler logHandler, IOptions<AzenSettings> azenSettings)
            {
                _zsck = zsck;
                _authService = authService;
                _logHandler = logHandler;
                _azenSettings = azenSettings;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                CommandValidator commandValidator = new CommandValidator();
                var validatorResult = commandValidator.Validate(request);

                if (!validatorResult.IsValid)
                {
                    throw new ZValidatorException(validatorResult);
                }
                
                request.Buffer = ZTag.ZTAG_I_CMDEVT + "EJECUTAR" + ZTag.ZTAG_F_CMDEVT +
                    ZTag.ZTAG_I_TKNA + request.Tkna + ZTag.ZTAG_F_TKNA +
                    ZTag.ZTAG_I_IPSC + "0000" + ZTag.ZTAG_F_IPSC +
                    ZTag.ZTAG_I_PSC + "0000" + ZTag.ZTAG_F_PSC +
                    ZTag.ZTAG_I_IDAPLI + request.IdAplication + ZTag.ZTAG_F_IDAPLI +
                    ZTag.ZTAG_I_LOG + request.Log + ZTag.ZTAG_F_LOG +
                    ZTag.ZTAG_I_CLIENTE + "web" + ZTag.ZTAG_F_CLIENTE;

                var result = _zsck.ExecuteCommandAsString(request);

                string tkns = _zsck.GetTagValue(ZTag.ZTAG_TKNS, result);

                int puertoSrvAplicacion = Int32.Parse(_zsck.GetTagValue(ZTag.ZTAG_PSC, result));


                if (string.IsNullOrEmpty(tkns))
                {
                    return result;
                }

                string tokenJWT = _authService.GenerateJwtToken(new ZClaims
                {
                    Tkna = request.Tkna,
                    Tkns = tkns
                });

                InitSocket(puertoSrvAplicacion, tkns);

                return result.Replace($"<{ZTag.ZTAG_TKNS}>{tkns}</{ZTag.ZTAG_TKNS}>", $"<{ZTag.ZTAG_TKNS}>{tokenJWT}</{ZTag.ZTAG_TKNS}>");
            }

            private void InitSocket(int puertoSrvAplicacion, string tkns)
            {
                int exit = 1;
                while (exit <= 10)
                {
                    Thread.Sleep(100);
                    try
                    {
                        _zsck.SetOpenSocket(_azenSettings.Value.IPC, puertoSrvAplicacion, tkns);
                        //_zsck.SetTknsOpenSocket(puertoSrvAplicacion, tokenJWT);
                        exit = 11;
                    }
                    catch (Exception ex)
                    {
                        _logHandler.Info($"Aplicacion InitSocket error {ex.ToString()}");
                        exit++;
                    }
                }
            }
        }
    }
}
