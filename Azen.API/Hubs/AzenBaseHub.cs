using Azen.API.Sockets.Auth;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Azen.API.Hubs
{
    public class AzenBaseHub : Hub
    {
        protected ZClaims GetZClaims()
        {
            //Todo:
            //string zClaimsStr = HttpContext.Items["ZClaims"] as string;
            string zClaimsStr = string.Empty;
            return JsonConvert.DeserializeObject<ZClaims>(zClaimsStr);
        }
    }
}
