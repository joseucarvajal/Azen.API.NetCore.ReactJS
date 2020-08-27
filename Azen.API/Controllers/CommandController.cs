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

namespace Azen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandController : ControllerBase
    {
        LogHandler _logHandler;
        bool siLogActividad;
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

        [HttpPost("aceptarlogin")]
        public async Task<ActionResult<string>> AceptarLogin(Model.ZCommand.Execute.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPost("{idaplicacion}/execute")]
        [Authorize]
        public async Task<ActionResult<string>> Execute([FromRoute] string idAplicacion, [FromBody] Model.ZCommand.Execute.Command command)
        {
            string zClaimsStr = HttpContext.Items["ZClaims"] as string;

            var zClaims = JsonConvert.DeserializeObject<ZClaims>(zClaimsStr);

            command.IdAplication = idAplicacion;
            command.Tkna = zClaims.Tkna;

            return await _mediator.Send(command);
        }

        [HttpGet]
        public IActionResult Get(
            string idApl,
            string opcion,
            [FromHeader] int cmd,
            [FromHeader] string dominio,
            [FromHeader] string buffer,
            [FromHeader] string tkna,
            [FromHeader] string tkns,
            [FromHeader] int log,
            [FromHeader] int puerto
            )
        {
            string result = string.Empty;
            // Ejecuta solo opcion
            if (cmd == ZCommandConst.CM_EJECSOLOOPCION)
            {
                result = _zsck.EjecutarSoloOpcion(idApl, opcion, buffer, dominio, log, tkna);
            }
            // cualquier otro comando
            else
            {
                result = _zsck.EjecutarComando(idApl, dominio, buffer, tkna, tkns, log, puerto, cmd);
            }

            return Ok(result);
        }
    }
}
