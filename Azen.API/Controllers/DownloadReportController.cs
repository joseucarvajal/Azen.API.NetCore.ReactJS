﻿using System;
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
		[HttpGet("downloadreport/{filename}")]
		public async Task<IActionResult> Index(string fileName)
		{
			string[] paths = { @"tmp", fileName };
			string fullPath = Path.Combine(paths);

			byte[] data = await System.IO.File.ReadAllBytesAsync (fullPath);

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
