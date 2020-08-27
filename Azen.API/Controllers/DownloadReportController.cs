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
			return View();
		}
		public FileResult DownloadFile()
		{
			// this will append the content-disposition header and download the file to the computer as "downloaded_file.txt"
			return File("/temp/test.txt", "text/plain", "downloaded_file.txt");
		}
	}
}
