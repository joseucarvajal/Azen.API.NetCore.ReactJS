using MediatR;
using Microsoft.AspNetCore.Mvc.Internal;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Azen.API.Sockets.Domain.Command
{
    public class ZCommandDTO : IRequest<string>
    {
        public string Tkna { get; set; }
        public string TokenJWT { get; set; }
        public string IdAplication { get; set; }
        public int Port { get; set; }
        public string Buffer { get; set; }
        public int Log { get; set; }
        public int Cmd { get; set; }
        public string Opcion { get; set; }
        public IPAddress RemoteIpAddress { get; set; }
        public void CopyTo(ZCommandDTO target)
        {
            target.Tkna = Tkna;
            target.TokenJWT = TokenJWT;
            target.IdAplication = IdAplication;
            target.Port = Port;
            target.Buffer = Buffer;
            target.Log = Log;
            target.Cmd = Cmd;
            target.Opcion = Opcion;
            target.RemoteIpAddress = RemoteIpAddress;
        }
    }

    public class ZColaEventos
    {
        public int NumEventos { get; set; }
        public IEnumerable<ZEvento> Eventos { get; set; }
    }

    public class ZEvento
    {
        public int Evento { get; set; }
        public ZDatoEvento Dato { get; set; }
    }

    public class ZDatoEvento
    {
        public int Tipo { get; set; }
        public int Tec { get; set; }
        public int Cmd { get; set; }
        public string Inf { get; set; }
        public ZBuffer Buffer { get; set; }
    }
    public class ZBuffer
    {
        public string Fto { get; set; }
        public string Dato { get; set; }
    }
}
