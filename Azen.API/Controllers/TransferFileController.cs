using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Azen.API.Sockets.Helpers;
using Azen.API.Models.ZTransferFile;
using MediatR;

namespace Azen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransferFileController : AzenBaseController
    {
        private readonly IMediator _mediator;

        public TransferFileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<string>> Post([FromForm(Name = "FormFile")] IFormFile file)
        {
            TransferFile.Command command = new TransferFile.Command
            {
                FormFile = file
            };

            Response.StatusCode = 201;

            return await _mediator.Send(command);
        }
    }
}
