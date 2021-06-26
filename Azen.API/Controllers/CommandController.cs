using Azen.API.Models.ZCommand;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Cryptography;
using Azen.API.Sockets.Exceptions;
using Azen.API.Sockets.Exceptions.Services;
using Azen.API.Sockets.Helpers;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Azen.API.Controllers
{
    public class CommandController : AzenBaseController
    {
        LogHandler _logHandler;
        ZSocket _zsck;
        private readonly IOptions<AzenSettings> _azenSettings;
        private readonly IMediator _mediator;
        private ZCryptography _zCryptography;

        public CommandController(
            IOptions<AzenSettings> azenSettings, 
            ZSocket zSocket, 
            LogHandler logHandler, 
            IMediator mediator,
            ZCryptography zCryptography)
        {
            _azenSettings = azenSettings;
            _logHandler = logHandler;
            _zsck = zSocket;
            _mediator = mediator;
            _zCryptography = zCryptography;
        }
        
        [HttpPost("aceptarlogin/{enc?}")]
        public async Task<ActionResult<string>> AceptarLogin(Execute.Command command,
            [FromRoute] int? enc)
        {
            if (enc != null)
            {
                command.Buffer = _zCryptography.GetCipherText(command.Buffer);
            }
            command.RemoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;

            string response = await _mediator.Send(command);
            return response;
        }
        
        [HttpPost("{idaplicacion}/execute/{enc?}")]
        [Authorize]
        public async Task<ActionResult<string>> Execute(
            [FromRoute] string idAplicacion,
            [FromRoute] int? enc,
            [FromBody] Execute.Command command)
        {
            if (enc != null)
            {
                command.Buffer = _zCryptography.GetCipherText(command.Buffer);
            }

            var zClaims = GetZClaims();

            command.IdAplication = idAplicacion;
            command.Tkna = zClaims.Tkna;
            command.RemoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;

            //return await _mediator.Send(command);
            
            try
            {
                return await _mediator.Send(command);
            }
            catch (ZSessionEndedException)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Oopss!!!!");
            }
        }
    }
}
