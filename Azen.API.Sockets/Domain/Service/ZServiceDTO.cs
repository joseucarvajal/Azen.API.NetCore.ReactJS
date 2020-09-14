using MediatR;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;

namespace Azen.API.Sockets.Domain.Service
{
    public class ZServiceDTO : IRequest<ZServiceResponse>
    {
        public string Tkna { get; set; }
        public string IdAplication { get; set; }
        public int Log { get; set; }
        public int Cmd { get; set; }
        public string Opcion { get; set; }
        public object JsonBuffer { get; set; }

        public HttpVerbs HttpMethod { get; set; }

        public void CopyTo(ZServiceDTO target)
        {
            target.Tkna = Tkna;
            target.IdAplication = IdAplication;
            target.Log = Log;
            target.Cmd = Cmd;
            target.Opcion = Opcion;
            target.HttpMethod = HttpMethod;
        }
    }
}
