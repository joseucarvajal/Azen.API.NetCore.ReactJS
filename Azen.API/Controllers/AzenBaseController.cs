using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azen.API.Sockets.Auth;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Azen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AzenBaseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        protected ZClaims GetZClaims()
        {
            string zClaimsStr = HttpContext.Items["ZClaims"] as string;

            return JsonConvert.DeserializeObject<ZClaims>(zClaimsStr);
        }
    }
}
