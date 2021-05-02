using Azen.API.ExceptionsHandling.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.Web.CodeGeneration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Azen.API.Models.ZTransferFile
{
    public class TransferFile
    {
        public class Command : IRequest<string>
        {
            public IFormFile File{ get; set; }
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

            public Handler(IMediator mediator, Sockets.Comunications.ZFile.ZTransferFile zTransferFile)
            {
                _mediator = mediator;
                _zTransferFile = zTransferFile;
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

                try
                {
                    _zTransferFile.Upload(fullPath, request.File.FileName);
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally {
                    Directory.Delete(Path.Combine(pathFolder), true);
                }

                return request.File.FileName;
            }
        }
    }
}
