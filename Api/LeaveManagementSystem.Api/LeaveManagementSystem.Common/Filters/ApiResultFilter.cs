using LeaveManagementSystem.Api.Attributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;

namespace LeaveManagementSystem.Api.Filters
{
    public class ApiResultFilter : IResultFilter
    {
        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (context.Result == null)
            {
                throw new InvalidOperationException("The API result cannot by null.");
            }

            dynamic @object = new ExpandoObject();
            @object.Ok = true;

            switch (context.Result)
            {
                case ObjectResult objectResult:
                    var type = objectResult.Value == null ? objectResult.DeclaredType : objectResult.Value.GetType();

                    if (objectResult.Value == null || IsResultEmpty(objectResult.Value))
                    {
                        (@object as IDictionary<string, object>)?.Add("warning", $"{context.HttpContext.Request.Path.Value} yielded no results.");
                    }
                    else
                    {
                        var resultNameAttr = GetResultNameAttribute(context);

                        if (IsResultNameMarkableType(type) && resultNameAttr == null)
                        {
                            throw new InvalidOperationException("Methods return primitive types, string, IEnumerable or Dictionary must be marked with ResultName attribute.");
                        }

                        var valueName = resultNameAttr == null ? type.Name : resultNameAttr.Name;

                        (@object as IDictionary<string, object>)?.Add(valueName, objectResult.Value);
                    }

                    break;

                case EmptyResult emptyResult:
                    //noop
                    break;

                default:
                    throw new NotSupportedException($"The ApiResultFilter only supports results of type '{typeof(ObjectResult)}'.");
            }

            context.Result = new JsonResult(@object);
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
            // nop
        }

        private ResultNameAttribute GetResultNameAttribute(ResultExecutingContext context)
        {
            if (context.ActionDescriptor is ControllerActionDescriptor ctrlActionDescriptior)
            {
                return ctrlActionDescriptior.MethodInfo.GetCustomAttributes(typeof(ResultNameAttribute), false).FirstOrDefault() as ResultNameAttribute;
            }

            return null;
        }

        /// <summary>
        /// All Controller methods returning the following types must mark the method with ResultName attribute
        ///     1. primitive types
        ///     2. string
        ///     3. IEnmerable<T>
        ///     4. Dictionary<K,V>
        /// </summary>
        /// <param name="type">type of the result</param>
        /// <returns>true if is one of the types list above, false otherwise</returns>
        private bool IsResultNameMarkableType(Type type)
        {
            return type.IsPrimitive
                || type == typeof(string)
                || type.IsGenericType && typeof(IEnumerable<object>).IsAssignableFrom(type)
                || type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Dictionary<,>)
                || !type.IsGenericType && type.GetInterfaces().Any(a => a == typeof(IDictionary))
                || !type.IsGenericType && type.GetInterfaces().Any(a => a == typeof(IEnumerable));
        }

        private bool IsResultEmpty(object value)
        {
            return value is IEnumerable<object> collection && !collection.Any();
        }
    }
}
