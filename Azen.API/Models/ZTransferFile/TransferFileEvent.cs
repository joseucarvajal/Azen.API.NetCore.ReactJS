using Azen.API.ExceptionsHandling.Exceptions;
using Azen.API.Sockets.Comunications;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Azen.API.Models.ZTransferFile
{
    public class TransferFileEvent
    {
        public class Command : IRequest<string>
        {
            public IFormFile File { get; set; }
            public string Tkns { get; set; }
            public string IdAplication { get; set; }
            public int Port { get; set; }
            public string Buffer { get; set; }
            public int Cmd { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.File).NotNull()
                    .WithMessage("Archivo es requerido");
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly IMediator _mediator;
            Sockets.Comunications.ZFile.ZTransferFile _zTransferFile;
            private ZSocket _zSocket;

            public Handler(IMediator mediator, Sockets.Comunications.ZFile.ZTransferFile zTransferFile, ZSocket zSocket)
            {
                _mediator = mediator;
                _zTransferFile = zTransferFile;
                _zSocket = zSocket;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                CommandValidator commandValidator = new CommandValidator();
                var validatorResult = commandValidator.Validate(request);

                if (!validatorResult.IsValid)
                {
                    throw new ZValidatorException(validatorResult);
                }

                string folderName = DateTime.Now.ToString("HHmmss");
                string[] pathFolder = { @"tmp", folderName };

                if (!Directory.Exists(Path.Combine(pathFolder)))
                {
                    Directory.CreateDirectory(Path.Combine(pathFolder));
                }

                string[] paths = { @"tmp", folderName, request.File.FileName };
                string fullPath = Path.Combine(paths);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await request.File.CopyToAsync(stream);
                }

                string resultEvent = string.Empty;

                try
                {
                    _zTransferFile.Upload(fullPath);
                    resultEvent = _zSocket.EjecutarEvento(2, 0, request.Cmd, "", request.Buffer, request.IdAplication, request.Port, request.Tkns);
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    Directory.Delete(Path.Combine(pathFolder), true);
                }

                return $"{request.File.FileName}, {resultEvent}" ;
            }
        }
    }
}

