using Azen.API.Sockets.Auth;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Helpers;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Azen.API.Model.ZCommand;

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

        public CommandController(
            IOptions<AzenSettings> azenSettings, 
            ZSocket zSocket, 
            LogHandler logHandler, 
            IMediator mediator)
        {
            _azenSettings = azenSettings;
            _logHandler = logHandler;
            _zsck = zSocket;
            _mediator = mediator;
        }
        
        [HttpPost("aceptarlogin")]
        public async Task<ActionResult<string>> AceptarLogin(Execute.Command command)
        {
            string response = await _mediator.Send(command);
            return response;
        }
        
        [HttpPost("{idaplicacion}/execute")]
        [Authorize]
        public async Task<ActionResult<string>> Execute(
            [FromRoute] string idAplicacion, 
            [FromBody] Execute.Command command)
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
