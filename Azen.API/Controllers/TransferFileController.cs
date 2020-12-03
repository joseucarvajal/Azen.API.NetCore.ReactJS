﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Azen.API.Sockets.Helpers;
using Azen.API.Models.ZTransferFile;
using MediatR;
using Azen.API.Sockets.Utils;
using System.Text;
using System.IO;

namespace Azen.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TransferFileController : AzenBaseController
    {
        private readonly IMediator _mediator;
        LogHandler _logHandler;

        public TransferFileController(IMediator mediator, LogHandler logHandler)
        {
            _mediator = mediator;
            _logHandler = logHandler;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="command"></param>
        /// <param name="log">1=length, 2=length and content</param>
        /// <returns></returns>
        [HttpPost("{log?}")]
        [ActionName("file")]
        [Authorize]
        public async Task<ActionResult<string>> Post([FromForm] TransferFile.Command command,
            [FromRoute] int? log)
        {
            Response.StatusCode = 201;

            if ((log ?? 0) != 0)
            {
                _logHandler.Debug($"File: {command.File.FileName}, Length: {command.File.Length}");
                if (log == 2)
                {
                    var result = new StringBuilder();
                    using (var reader = new StreamReader(command.File.OpenReadStream()))
                    {
                        while (reader.Peek() >= 0)
                            result.AppendLine(await reader.ReadLineAsync());
                    }
                    _logHandler.Debug($"File: {command.File.FileName}, Content: {result}");
                }
            }

            return await _mediator.Send(command);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="command"></param>
        /// <param name="log">1=length, 2=length and content</param>
        /// <returns></returns>
        [HttpPost("{log?}")]
        [ActionName("fileevent")]
        [Authorize]
        public async Task<ActionResult<string>> Post([FromForm] TransferFileEvent.Command command,
            [FromRoute] int? log)
        {
            Response.StatusCode = 201;

            if ((log ?? 0) != 0)
            {
                _logHandler.Debug($"File: {command.File.FileName}, Length: {command.File.Length}");
                if (log == 2)
                {
                    var result = new StringBuilder();
                    using (var reader = new StreamReader(command.File.OpenReadStream()))
                    {
                        while (reader.Peek() >= 0)
                            result.AppendLine(await reader.ReadLineAsync());
                    }
                    _logHandler.Debug($"File: {command.File.FileName}, Content: {result}");
                }
            }

            return await _mediator.Send(command);
        }

    }
}
