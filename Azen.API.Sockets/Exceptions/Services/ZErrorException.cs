using Azen.API.Sockets.Domain.Response;
using Azen.API.Sockets.Domain.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace Azen.API.Sockets.Exceptions.Services
{
    public class ZErrorException : Exception
    {
        public ZServiceResponse ZServiceResponse { get; }
        public ZErrorException(ZServiceResponse zServiceResponse)
        {
            ZServiceResponse = zServiceResponse;
        }
    }
}
