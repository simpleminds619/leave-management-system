using AutoMapper;
using LeaveManagementSystem.Api.Services;
using LeaveManagementSystem.Api.Services.Contracts;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddTransient<ILeaveCategoryService, LeaveCategoryService>();
        }

        public static void AddMappings(this IServiceCollection services)
        {
            var configuration = new MapperConfiguration((configExpression) =>
            {

            });
            services.AddSingleton(configuration.CreateMapper());
        }
    }
}
