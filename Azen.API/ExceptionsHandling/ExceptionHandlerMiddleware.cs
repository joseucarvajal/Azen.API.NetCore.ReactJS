using Azen.API.Sockets.Utils;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Azen.API.ExceptionsHandling
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        LogHandler _logHandler;

        public ExceptionHandlerMiddleware(RequestDelegate next, LogHandler logHandler)
        {
            _next = next;
            _logHandler = logHandler;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (UnauthorizedAccessException e)
            {
                _logHandler.Error(e.ToString());
                httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await httpContext.Response.WriteAsync(e.Message);
            }
            catch (Exception e)
            {
                _logHandler.Error(e.ToString());
                httpContext.Items["exceptionMessage"] = e.ToString();
                throw e;
            }

        }

    }

}
