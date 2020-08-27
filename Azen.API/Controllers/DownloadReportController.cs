using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Azen.API.Sockets.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Azen.API.Controllers
{
    public class DownloadReportController : Controller
    {
		[Authorize]
		public FileResult Index(string filename)
		{
			string[] paths = { @"temp", filename };
			string fullPath = Path.Combine(paths);

			byte[] data = System.IO.File.ReadAllBytes(fullPath);

			string contentType;
			var provider = new FileExtensionContentTypeProvider();
			if(!provider.TryGetContentType(filename, out contentType))
			{
				contentType = "text/plain";
			}

			System.IO.File.Delete(fullPath);

			return File(data, contentType);
		}
	}
}
