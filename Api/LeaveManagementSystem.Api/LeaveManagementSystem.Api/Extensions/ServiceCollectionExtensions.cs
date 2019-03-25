using AutoMapper;
using LeaveManagementSystem.Api.Services;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using LeaveManagementSystem.Data.Enums;
using LeaveManagementSystem.Data.Models;
using Microsoft.Extensions.DependencyInjection;
using System;

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
                configExpression.CreateMap<LeaveCategory, LeaveCategoryViewModel>()
                    .ForMember((target) => target.UpperLimitOfLeaves,
                        (options) => options.MapFrom((source) => source.CarryFwdUpperLimit))
                    .ForMember((target) => target.Status,
                        (options) => options.MapFrom((source) => ((Status)source.Status).ToString()));

                configExpression.CreateMap<LeaveCategoryViewModel, LeaveCategory>()
                    .ForMember((target) => target.CarryFwdUpperLimit,
                        (options) => options.MapFrom((source) => source.UpperLimitOfLeaves))
                    .ForMember((target) => target.Status,
                        (options) => options.MapFrom((source) => Enum.Parse<Status>(source.Status)))
                    .ForMember((target) => target.UpdatedDate, options => options.Ignore())
                    .ForMember((target) => target.UpdatedDate, options => options.Ignore());
            });
            services.AddSingleton(configuration.CreateMapper());
        }
    }
}
