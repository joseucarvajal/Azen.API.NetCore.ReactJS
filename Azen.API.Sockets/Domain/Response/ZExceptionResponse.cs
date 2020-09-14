using System;
using System.Collections.Generic;
using System.Text;

namespace Azen.API.Sockets.Domain.Response
{
    public class ZExceptionResponse
    {
        public string Title { get; set; }
        public IDictionary<string, string[]> Errors { get; set; }
    }
}
