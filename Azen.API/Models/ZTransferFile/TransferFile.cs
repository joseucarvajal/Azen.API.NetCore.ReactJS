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
            public IFormFile FormFile{ get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FormFile)
                    .NotNull().WithMessage("Archivo es requerido");
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
                string folderName = DateTime.Now.ToString("HHmmss");
                string[] pathFolder = { @"tmp", folderName };

                if (!Directory.Exists(Path.Combine(pathFolder)))
                {
                    Directory.CreateDirectory(Path.Combine(pathFolder));
                }

                string[] paths = { @"tmp", folderName, request.FormFile.FileName };
                string fullPath = Path.Combine(paths);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await request.FormFile.CopyToAsync(stream);
                }

                try
                {
                    _zTransferFile.Upload(fullPath);
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally {
                    Directory.Delete(Path.Combine(pathFolder), true);
                }

                return request.FormFile.FileName;
            }
        }
    }
}
