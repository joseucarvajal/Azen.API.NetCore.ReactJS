using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using MediatR;
using Azen.API.Sockets.Helpers;
using Azen.API.Models.ZService;
using Azen.API.Sockets.Domain.Service;

namespace Azen.API.Controllers
{
    public class ServiceController : AzenBaseController
    {
        LogHandler _logHandler;
        bool siLogActividad;
        ZSocket _zsck;
        private readonly IOptions<AzenSettings> _azenSettings;
        private readonly IMediator _mediator;

        public ServiceController(IOptions<AzenSettings> azenSettings, ZSocket zsck, LogHandler logHandler, IMediator mediator)
        {
            _azenSettings = azenSettings;
            _logHandler = logHandler;
            _zsck = zsck;
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(Models.ZService.SoloLogin.Command command)
        {
            //var ip = HttpContext.Connection.RemoteIpAddress.ToString();

            string response = await _mediator.Send(command);
            return response;
        }

       

        [HttpPost("{idaplicacion}/{opcion}/{cmd}/{log?}")]
        [Authorize]
        public async Task<ActionResult<string>> Post(
                        [FromRoute] string idAplicacion,
                        [FromRoute] string opcion,
                        [FromRoute] int cmd,
                        [FromRoute] int? log,
                        [FromBody] object json
            )
        {
            var zClaims = GetZClaims();

            Execute.Command command = new Execute.Command
            {
                Tkna = zClaims.Tkna,
                IdAplication = idAplicacion,
                Opcion = opcion,
                Cmd = cmd,
                Log = log ?? 0,
                JsonBuffer = json,
                HttpMethod = System.Web.Mvc.HttpVerbs.Post
            };

            return await _mediator.Send(command);
        }

        [HttpGet]
        public IActionResult Get(
            string idApl,
            string opcion,
            [FromHeader] string dominio,
            [FromHeader] string tkna,
            [FromHeader] string log,
            [FromHeader] string metodo,
            [FromHeader] string buffer,
            [FromHeader] int cmd
            )
        {
            string result = EjecutarServicio(idApl, opcion, dominio, tkna, log, string.Empty, buffer, cmd, metodo != null ? metodo : "GET");
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(
            string idApl,
            string opcion,
            [FromHeader] string dominio,
            [FromHeader] string tkna,
            [FromHeader] string log,
            [FromHeader] string metodo,
            [FromHeader] int cmd
            )
        {
            string content = await new StreamReader(Request.Body).ReadToEndAsync();
            string result = EjecutarServicio(idApl, opcion, dominio, tkna, log, content, string.Empty, cmd, metodo != null ? metodo : "POST");
            return Ok(result);

        }

        [HttpPut]
        public async Task<IActionResult> PutAsync(
            string idApl,
            string opcion,
            [FromHeader] string dominio,
            [FromHeader] string tkna,
            [FromHeader] string log,
            [FromHeader] string metodo,
            [FromHeader] int cmd
            )
        {
            string content = await new StreamReader(Request.Body).ReadToEndAsync();
            string result = EjecutarServicio(idApl, opcion, dominio, tkna, log, content, string.Empty, cmd, metodo != null ? metodo : "PUT");
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(
            string idApl,
            string opcion,
            [FromHeader] string dominio,
            [FromHeader] string tkna,
            [FromHeader] string log,
            [FromHeader] string metodo,
            [FromHeader] int cmd
            )
        {
            string content = await new StreamReader(Request.Body).ReadToEndAsync();

            string result = EjecutarServicio(idApl, opcion, dominio, tkna, log, content, string.Empty, cmd, metodo != null ? metodo : "DELETE");
            return Ok(result);
        }

        private string EjecutarServicio(string idApl, string opcion, string dominio, string tkna, string log, string content, string buffer, int cmd, string metodo)
        {
            if (null != log)
                siLogActividad = (1 == Int32.Parse(log));

            string cadenaXmlBody =
                ZTag.ZTAG_I_PARAMETROS +
                ZTag.ZTAG_I_FMT + "xml" + ZTag.ZTAG_F_FMT +
                ZTag.ZTAG_I_OPER + metodo + ZTag.ZTAG_F_OPER +
                ZTag.ZTAG_I_DATOS + JsonToXml(content) + ZTag.ZTAG_F_DATOS +
                ZTag.ZTAG_F_PARAMETROS;


            _logHandler.Info("************ ejecutarServicio: idApl: " + idApl + "-- opcion: " + opcion + "--operacion :" + metodo + "-- body json:" + content + "--body xml :" + cadenaXmlBody);

            // Ejecuta aplicacion
            _logHandler.Info("---- CM_APLICACION " + idApl + "Opc:" + opcion);

            switch (cmd)
            {
                // Cmd que se da cuando se entra parametros de logeo
                case ZCommandConst.CM_SOLOLOGIN: // Retorna tkna
                    buffer = ZTag.ZTAG_I_CMDEVT + "SOLOLOGIN" + ZTag.ZTAG_F_CMDEVT + buffer;
                    return _zsck.SocketClienteEnviar(buffer);
                case ZCommandConst.CM_EJECSERVICIO:
                    // Arma buffer para enviar con parametros de logeo
                    buffer =
                    ZTag.ZTAG_I_CMDEVT + "EJECUTAR" + ZTag.ZTAG_F_CMDEVT +
                    ZTag.ZTAG_I_TKNA + tkna + ZTag.ZTAG_F_TKNA +
                    ZTag.ZTAG_I_IPSC + "0000" + ZTag.ZTAG_F_IPSC +
                    ZTag.ZTAG_I_PSC + "0000" + ZTag.ZTAG_F_PSC +
                    ZTag.ZTAG_I_CLIENTE + "web" + ZTag.ZTAG_F_CLIENTE +
                    ZTag.ZTAG_I_IDAPLI + idApl + ZTag.ZTAG_F_IDAPLI +
                    ZTag.ZTAG_I_LOG + log + ZTag.ZTAG_F_LOG +
                    ZTag.ZTAG_I_OPC + opcion + ZTag.ZTAG_F_OPC +
                    ZTag.ZTAG_I_PARAMETROS + "si" + ZTag.ZTAG_F_PARAMETROS; // Indica que es servicio

                    _logHandler.Info("---- antes CM_APLICACION EJECUTAR SERVICIO Buffer: " + buffer);
                    break;
            }

            string cadena = _zsck.SocketClienteEnviar(buffer);

            _logHandler.Info("---- despues CM_APLICACION EJECUTAR SERVICIO resultado: " + cadena);

            //Obtiene puerto donde se ejecuta la aplciacion
            int puertoSrvAplicacion = Int32.Parse(_zsck.GetTagValue(ZTag.ZTAG_PSC, cadena));
            string tkns = _zsck.GetTagValue(ZTag.ZTAG_TKNS, cadena);
            _logHandler.Info(puertoSrvAplicacion);
            _logHandler.Info(tkns);

            _logHandler.Info("---- CM_EJECSERVICIO");

            string datoTkns = ZTag.ZTAG_I_TKNS + tkns + ZTag.ZTAG_F_TKNS;

            string cadEvento = new ZEvent(2, 0, ZCommandConst.CM_EJECSERVICIO, "", "").ArmarCadenaSocket();

            string cadenaEnviar = cadEvento + datoTkns + cadenaXmlBody;

            return _zsck.SocketClienteEnviar(cadenaEnviar, puertoSrvAplicacion, ZCommandConst.CM_EJECSERVICIO);
        }

        private string JsonToXml(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                return string.Empty;
            }

            string xmlResult = "";

            JObject json = JObject.Parse(data);

            foreach (var item in json)
            {
                xmlResult += "<campo><nc>" + item.Key + "</nc><vc>" + item.Value + "</vc></campo>";
            }

            return xmlResult;
        }

        [HttpGet("Version")]
        public IActionResult Version()
        {
            return Ok(Constants.VERSION_AZEN_MIDDLEWARE);
        }

    }
}
