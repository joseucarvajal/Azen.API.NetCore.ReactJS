using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Azen.API.Sockets.Helpers;
using Azen.API.Sockets.Utils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Azen.API.Controllers
{
	public class DownloadReportController : Controller
	{
		LogHandler _logHandler;

		public DownloadReportController(LogHandler logHandler)
		{
			_logHandler = logHandler;
		}

		[HttpGet("downloadreport/{filename}/{log?}")]
		public async Task<IActionResult> Index(
			[FromRoute] string fileName,
			[FromRoute] int? log)
		{
			string[] paths = { @"tmp", fileName };
			string fullPath = Path.Combine(paths);

			byte[] data = await System.IO.File.ReadAllBytesAsync (fullPath);

			if ((log ?? 0) != 0)
			{
				_logHandler.Debug($"File: {fileName}, Length: {data.Length}");
			}

			string contentType;
			var provider = new FileExtensionContentTypeProvider();
			if (!provider.TryGetContentType(fileName, out contentType))
			{
				contentType = "text/plain";
			}

			System.IO.File.Delete(fullPath);

			return File(data, contentType);
		}
	}
}
