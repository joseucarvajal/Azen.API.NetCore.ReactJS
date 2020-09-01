using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Domain.Service;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Azen.API.Models.ZService
{
    public class Execute
    {
        public class Command : ZServiceDTO
        {
        }

        public class CommandValidator : AbstractValidator<ZServiceDTO>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Cmd)
                    .NotNull().WithMessage("Comando es requerido");
                RuleFor(x => x.IdAplication)
                    .NotNull().WithMessage("Aplicación es requerido");
                RuleFor(x => x.Opcion)
                    .NotNull().WithMessage("Opción es requerido");
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly IMediator _mediator;
            private ZSocket _zSocket;

            public Handler(IMediator mediator, ZSocket zSocket)
            {
                _mediator = mediator;
                _zSocket = zSocket;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                switch (request.HttpMethod)
                {
                    case HttpVerbs.Post: // Retorna tkna
                        return _zSocket.EjecutarServicio(request);

                    default:
                        return null;
                }
            }
        }
    }
}
