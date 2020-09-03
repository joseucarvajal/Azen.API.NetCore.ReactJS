using Azen.API.ExceptionsHandling.Exceptions;
using Azen.API.Sockets.Utils;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Renci.SshNet.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Helpers;

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
                await WriteErrorResponse(httpContext, HttpStatusCode.Unauthorized, e);
            }
            catch (SftpPermissionDeniedException e)
            {
                await WriteErrorResponse(httpContext, HttpStatusCode.Forbidden, e);
            }
            catch (ZValidatorException e)
            {
                await WriteErrorResponse(httpContext, HttpStatusCode.BadRequest, e);
            }
            catch (Exception e)
            {
                await WriteErrorResponse(httpContext, HttpStatusCode.InternalServerError, e);
            }
        }

        private async Task WriteErrorResponse(HttpContext httpContext, HttpStatusCode httpStatusCode, Exception exception)
        {
            _logHandler.Error(exception.ToString());

            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = (int)httpStatusCode;

            ZValidationResult zValidationResult = new ZValidationResult
            {
                Title = exception.Message
            };

            if (exception is ZValidatorException)
            {
                ZValidatorException zValidatorException = exception as ZValidatorException;

                zValidationResult.Title = "Se produjeron uno o más errores de validación.";

                if (zValidatorException.ValidationResult.Errors.Count > 0)
                {
                    zValidationResult.Errors = new Dictionary<string, string[]>
                    {
                        {
                            zValidatorException.ValidationResult.Errors[0].PropertyName,
                            new string[]{ zValidatorException.ValidationResult.Errors[0].ErrorMessage }
                        }
                    };
                }
            }

            await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(zValidationResult));
        }

    }

    public class ZValidationResult
    {
        public string Title { get; set; }
        public IDictionary<string, string[]> Errors { get; set; }
    }

}
