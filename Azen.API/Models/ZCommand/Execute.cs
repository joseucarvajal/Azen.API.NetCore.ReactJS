using Azen.API.Models.ZCommand.Interceptors;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Cryptography;
using Azen.API.Sockets.Domain.Command;
using Azen.API.Sockets.General;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Azen.API.Models.ZCommand
{
    public class Execute
    {
        public class Command : ZCommandDTO
        {
        }

        public class CommandValidator : AbstractValidator<ZCommandDTO>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Cmd)
                    .NotNull()
                    .WithMessage("Comando es requerido");
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly IMediator _mediator;
            private ZSocket _zSocket;
            private ZCryptography _zCryptography;

            public Handler(IMediator mediator, ZSocket zSocket, ZCryptography zCryptography)
            {
                _mediator = mediator;
                _zSocket = zSocket;
                _zCryptography = zCryptography;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {                
                request.Buffer = _zCryptography.GetPlainText(request.Buffer);

                switch (request.Cmd)
                {
                    case ZCommandConst.CM_ACEPTARLOGIN: // Retorna tkna
                        return await _mediator.Send(new AceptarLogin.Command(request));

                    case ZCommandConst.CM_APLICACION:
                        return await _mediator.Send(new Aplicacion.Command(request));

                    case ZCommandConst.CM_DEFMENU:
                    case ZCommandConst.CM_EJECOPCION:            // opcion de menu desplegado
                    case ZCommandConst.CM_IRVENTANA_CS:
                        return _zSocket.EjecutarEvento(2, 0, request.Cmd, request.Buffer, "", request.IdAplication, request.Port, request.Tkns);

                    case ZCommandConst.CM_EJECSOLOOPCION:
                        return _zSocket.EjecutarSoloOpcion(request.IdAplication, request.Opcion, request.Buffer, null, request.Log, request.Tkna);

                    default:
                        return _zSocket.EjecutarEvento(2, 0, request.Cmd, "", request.Buffer, request.IdAplication, request.Port, request.Tkns);
                }
            }
        }
    }
}
