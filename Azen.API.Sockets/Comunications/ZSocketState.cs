using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Azen.API.Sockets.Comunications
{
    public class ZSocketState
    {
        public IDictionary<string, ZSocketStateInfo> OpenSockets { get; set; }

        public ZSocketState()
        {
            OpenSockets = new Dictionary<string, ZSocketStateInfo>();
        }
    }
    public class ZSocketStateInfo
    {
        public Socket socket { get; set; }
        public DateTime LastEvent { get; set; }
        public string TokenJWT { get; set; }
    }
}
