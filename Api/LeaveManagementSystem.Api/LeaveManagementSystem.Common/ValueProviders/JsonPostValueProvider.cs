using LeaveManagementSystem.Extensions;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.ValueProviders
{
    public class JsonHttpPostValueProvider : IValueProvider
    {
        public JObject Content
        {
            get;
            set;
        }

        public JsonHttpPostValueProvider(JObject content)
        {
            this.Content = content;
        }

        public bool ContainsPrefix(string prefix)
        {
            JToken token;
            return Content.TryGetValue(prefix, StringComparison.InvariantCultureIgnoreCase, out token);
        }

        public ValueProviderResult GetValue(string key)
        {
            JToken token;
            if (Content.TryGetValue(key, StringComparison.InvariantCultureIgnoreCase, out token))
            {
                StringValues values = new StringValues(token.ToString());
                return new ValueProviderResult(values);
            }

            return ValueProviderResult.None;
        }
    }

    public class JsonHttpPostValueProviderFactory : IValueProviderFactory
    {
        private readonly HashSet<Type> m_supportedTypes = new HashSet<Type>()
        {
            typeof(int),
            typeof(string),
            typeof(Guid),
            typeof(bool),
            typeof(DateTime)
        };

        public async Task CreateValueProviderAsync(ValueProviderFactoryContext context)
        {
            ActionDescriptor descriptor = context.ActionContext.ActionDescriptor;
            if (HasHttpPostConstraint(descriptor) && AreParameterTypesSupported(descriptor))
            {
                Stream requestStream = context.ActionContext.HttpContext.Request.Body;
                JObject content = await requestStream.JsonDeserializeAsync<JObject>();

                JsonHttpPostValueProvider valueProvider = new JsonHttpPostValueProvider(content);
                context.ValueProviders.Add(valueProvider);
            }
        }

        private bool AreParameterTypesSupported(ActionDescriptor descriptor)
        {
            var parameters = descriptor.Parameters;
            if (parameters == null)
            {
                return false;
            }

            foreach (ParameterDescriptor parameter in parameters)
            {
                Type type = parameter.ParameterType;

                if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    type = type.GetGenericArguments().First();
                }

                if (m_supportedTypes.Contains(type))
                {
                    return true;
                }
            }

            return false;
        }

        private bool HasHttpPostConstraint(ActionDescriptor descriptor)
        {
            return descriptor.ActionConstraints != null && descriptor.ActionConstraints.Any(c =>
            {
                if (c is HttpMethodActionConstraint methodConstraint)
                {
                    return methodConstraint.HttpMethods.Any(s => s == "POST");
                }

                return false;
            });
        }
    }
}
