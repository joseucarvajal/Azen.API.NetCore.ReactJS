using Azen.API.Models.ZService;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Domain.Service;
using Azen.API.Sockets.General;
using Azen.API.Sockets.Utils;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Azen.API.Hubs
{
    public class ServiceHub : AzenBaseHub
    {
        private readonly IMediator _mediator;
        LogHandler _logHandler;
        bool _siLogActividad;
        ZSocket _zsck;

        public ServiceHub(LogHandler logHandler, ZSocket zsck)
        {
            _logHandler = logHandler;
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task<ActionResult<string>> Login(Models.ZService.SoloLogin.Command command)
        {
            string response = await _mediator.Send(command);
            return response;
        }

        private async Task<ActionResult<ZServiceResponse>> SaveAccept(
              string idAplicacion,
              string opcion,
              int? log,
              object objectBuffer,
              System.Web.Mvc.HttpVerbs methodVerb
  )
        {
            var zClaims = GetZClaims();


            Execute.Command command = new Execute.Command
            {
                Tkna = zClaims.Tkna,
                IdAplication = idAplicacion,
                Opcion = opcion,
                Cmd = ZCommandConst.CM_EJECSERVICIO,
                Log = log ?? 0,
                ObjectBuffer = objectBuffer,
                HttpMethod = methodVerb,
                //TODO: get ip
                //RemoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString()
            };

            _logHandler.Debug($"Request: {JsonConvert.SerializeObject(command)}");

            var zResponse = await _mediator.Send(command);
            //TODO: set status
            //Response.StatusCode = (int)zResponse.Status;

            _logHandler.Debug($"Response: {JsonConvert.SerializeObject(zResponse)}");
            return zResponse;
        }

        //[Authorize]
        public async Task<ActionResult<ZServiceResponse>> Post(
                        string idAplicacion,
                        string opcion,
                        int? log,
                        object json
            )
        {
            return await SaveAccept(idAplicacion, opcion, log, json, System.Web.Mvc.HttpVerbs.Post);
        }

        //[Authorize]
        public async Task<ActionResult<ZServiceResponse>> Get(
                        string idAplicacion,
                        string opcion,
                        int? log,
                        string parameters
            )
        {
            var urlParameters = HttpUtility.ParseQueryString(parameters);

            var dictionary = urlParameters.AllKeys.ToDictionary(k => k, k => urlParameters[k]);

            return await SaveAccept(idAplicacion, opcion, log, dictionary, System.Web.Mvc.HttpVerbs.Get);
        }


        private string EjecutarServicio(string idApl, string opcion, string dominio, string tkna, string log, string content, string buffer, int cmd, string metodo)
        {
            if (null != log)
                _siLogActividad = (1 == Int32.Parse(log));

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

        public string Version()
        {
            return Constants.VERSION_AZEN_MIDDLEWARE;
        }
    }
}
