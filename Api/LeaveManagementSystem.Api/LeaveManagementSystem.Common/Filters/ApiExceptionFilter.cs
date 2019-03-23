using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Dynamic;

namespace LeaveManagementSystem.Api.Filters
{
    public class ApiExceptionFilter : IExceptionFilter
    {
        private readonly IHostingEnvironment m_hostingEnvironment;
        private readonly ILogger m_logger;

        public ApiExceptionFilter(IHostingEnvironment hostingEnvironment, ILogger<ApiExceptionFilter> logger)
        {
            this.m_hostingEnvironment = hostingEnvironment;
            this.m_logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            dynamic value = new ExpandoObject();
            value.Ok = false;

            var isProduction = true;
            if (m_hostingEnvironment != null)
            {
                isProduction = m_hostingEnvironment.IsProduction();
            }

            var exception = context.Exception;

            var exceptionData = exception.ToString()
                .Split(Environment.NewLine.ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            value.Error = new ApiError()
            {
                Message = exception.Message,
                Type = exception.GetType().Name,
                DebugInfo = isProduction ? null : exceptionData,
                Data = new Dictionary<string, object>()
            };

            var keys = exception.Data.Keys;
            foreach (var key in keys)
            {
                var item = exception.Data[key];

                // We can also allow other types for value, maybe 'string' can be useful
                if ((key is string) && (item is int))
                {
                    value.Error.Data.Add((string) key, item);
                }
            }

            m_logger.LogError(exception, $"An error occurred while processing the request. Reason: {exception.Message}.");
            context.Result = new JsonResult(value);
        }
    }
}
