using LeaveManagementSystem.Data.Contracts;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Data;

namespace LeaveManagementSystem.Data.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDataCore<T>(this IServiceCollection services, string connectionString) where T:IDbConnection
        {
            services.AddScoped((p) =>
            {
                var connection = (IDbConnection)Activator.CreateInstance(typeof(T), connectionString);
                connection.Open();
                return connection;
            });

            services.AddScoped((p) =>
            {
                var connection = p.GetRequiredService<IDbConnection>();
                return new TransactionManager(connection);
            });

            services.AddScoped<ITransactionManager>((p) =>
            {
                return p.GetRequiredService<TransactionManager>();
            });

            services.AddTransient<ILeaveCategoryRepository, LeaveCategoryRepository>();
            services.AddTransient<ILocationRepository, LocationRepository>();
            services.AddTransient<IHolidayRepository, HolidayRepository>();
        }

    }
}
