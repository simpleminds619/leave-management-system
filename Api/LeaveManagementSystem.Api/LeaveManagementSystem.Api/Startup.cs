using LeaveManagementSystem.Api.Extensions;
using LeaveManagementSystem.Api.Filters;
using LeaveManagementSystem.Api.ValueProviders;
using LeaveManagementSystem.Data.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using System.Data.SqlClient;

namespace LeaveManagementSystem.Api
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                        .SetBasePath(env.ContentRootPath)
                        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                        .AddEnvironmentVariables();

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore()
                .AddJsonFormatters((serializer) =>
                {
                    serializer.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                    serializer.ContractResolver = new CamelCasePropertyNamesContractResolver();
                })
                .AddMvcOptions((options) =>
                {
                    options.Filters.Add(typeof(ApiResultFilter));
                    options.Filters.Add(typeof(ApiExceptionFilter));
                    options.Filters.Add(typeof(ApiValidateModelFilter));
                    options.Filters.Add(typeof(ExecutionContextFilter));


                    options.ValueProviderFactories.Add(new JsonHttpPostValueProviderFactory());
                }).SetCompatibilityVersion(CompatibilityVersion.Latest);
            services.AddCors();
            services.AddDataCore<SqlConnection>(Configuration.GetConnectionString("LeaveManagementSystemDb"));
            services.AddMappings();
            services.AddCustomServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod()
            );
            app.UseMvc();
        }
    }
}