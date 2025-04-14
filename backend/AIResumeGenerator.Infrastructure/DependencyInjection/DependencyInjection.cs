using System.Data;
using AIResumeGenerator.Application.Common.Interfaces;
using AIResumeGenerator.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Data.SqlClient;

namespace AIResumeGenerator.Infrastructure.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services,IConfiguration configuration)
    {
        services.AddScoped<IDbConnection>(sp=>
            new SqlConnection(configuration.GetConnectionString("DefaultConnection")));
        services.AddScoped<IResumeRepository, ResumeRepository>();
        return services;
    }
}