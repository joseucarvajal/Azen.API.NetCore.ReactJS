using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Azen.API.Controllers
{
    public class DownloadReportController : Controller
    {
        public IActionResult Index()
        {
            Response.ContentType = "text/plain";
            Response.AddHeader("Content-Disposition", "attachment; filename=file.txt");
            Response.TransmitFile(Server.MapPath("file.txt"));
            return View();
        }
    }
}
