using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.General;
using Azen.API.Sockets.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using MediatR;
using Azen.API.Sockets.Helpers;
using Newtonsoft.Json;
using Azen.API.Sockets.Auth;
using Microsoft.AspNetCore.Cors;

namespace Azen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandController : ControllerBase
    {
        LogHandler _logHandler;
        ZSocket _zsck;
        private readonly IOptions<AzenSettings> _azenSettings;
        private readonly IMediator _mediator;

        public CommandController(IOptions<AzenSettings> azenSettings, ZSocket zSocket, LogHandler logHandler, IMediator mediator)
        {
            _azenSettings = azenSettings;
            _logHandler = logHandler;
            _zsck = zSocket;
            _mediator = mediator;
        }

        //[EnableCors]
        [HttpPost("aceptarlogin")]
        public async Task<ActionResult<string>> AceptarLogin(Model.ZCommand.Execute.Command command)
        {
            string response = await _mediator.Send(command);
            return response;
        }
        
        [HttpPost("{idaplicacion}/execute")]
        [Authorize]
        public async Task<ActionResult<string>> Execute([FromRoute] string idAplicacion, [FromBody] Model.ZCommand.Execute.Command command)
        {
            string zClaimsStr = HttpContext.Items["ZClaims"] as string;

            var zClaims = JsonConvert.DeserializeObject<ZClaims>(zClaimsStr);

            command.IdAplication = idAplicacion;
            command.Tkna = zClaims.Tkna;

            string response = await _mediator.Send(command);

            return response;
        }
    }
}
