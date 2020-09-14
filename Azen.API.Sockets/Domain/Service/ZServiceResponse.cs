using Azen.API.Sockets.Domain.Response;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Azen.API.Sockets.Domain.Service
{
    public class ZServiceResponse : ZExceptionResponse
    {
        public HttpStatusCode Status { get; set; }
        public string Type { get; set; }
        public object Data { get; set; }
    }

    public class ZColaServiceEventos
    {
        public int NumEventos { get; set; }
        public IEnumerable<ZServiceEvento> Eventos { get; set; }
    }

    public class ZServiceEvento
    {
        public int Evento { get; set; }
        public ZDatoServiceEvento Dato { get; set; }
    }

    public class ZDatoServiceEvento
    {
        public int Tipo { get; set; }
        public int Tec { get; set; }
        public int Cmd { get; set; }
        public string Inf { get; set; }
        public ZServiceBuffer Buffer { get; set; }
    }
    public class ZServiceBuffer  : ZServiceResponse
    {

    }
}
