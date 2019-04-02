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
            services.AddTransient<ILocationService, LocationService>();
            services.AddTransient<IHolidayService, HolidayService>();
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
                    .ForMember((target) => target.CreatedDate, options => options.Ignore());

                configExpression.CreateMap<Location, LocationViewModel>()
                    .ForMember((target) => target.Status,
                        (options) => options.MapFrom((source) => ((Status)source.Status).ToString()));

                configExpression.CreateMap<LocationHoliday, HolidayViewModel>()
                    .ForMember((target) => target.Status,
                        (options) => options.MapFrom((source) => ((Status)source.Status).ToString()))
                    .ForMember((target) => target.Location, (options) => options.MapFrom((source) => new LocationViewModel()
                    {
                        Id = source.LocationId.Value,
                        Name = source.LocationName
                    }))
                    .ForMember((target) => target.Day, (options)=>options.MapFrom((source)=>source.EffectiveDate.Value.DayOfWeek));

                configExpression.CreateMap<HolidayViewModel, LocationHoliday>()
                    .ForMember((target) => target.Status,
                        (options) => options.MapFrom((source) => Enum.Parse<Status>(source.Status)))
                    .ForMember((target) => target.LocationId, options => options.MapFrom((source) => source.Location.Id))
                    .ForMember((target) => target.UpdatedDate, (options) => options.Ignore())
                    .ForMember((target) => target.CreatedDate, (options) => options.Ignore());
            });
            services.AddSingleton(configuration.CreateMapper());
        }
    }
}
