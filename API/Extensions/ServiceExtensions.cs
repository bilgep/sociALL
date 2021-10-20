
using Application.Core;
using Application.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConn"));
            });

            services.AddCors(option =>
                option.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                })
            );

            services.AddMediatR(typeof(List.Handler).Assembly); //We're specifying the assembly that contains the MediatR 

            services.AddAutoMapper(typeof(MappingProfiles).Assembly); //We're specifying the assembly that contains the AutoMapper 


            return services;
        }

    }
}