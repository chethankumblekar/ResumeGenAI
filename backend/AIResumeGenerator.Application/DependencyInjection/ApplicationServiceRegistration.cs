using AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;
using AIResumeGenerator.Application.Features.Resume.Queries.GetResumeById;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;

namespace AIResumeGenerator.Application.DependencyInjection;

public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(typeof(CreateResumeCommand).Assembly);
            cfg.RegisterServicesFromAssembly(typeof(GetResumeByIdQuery).Assembly);
        });

        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<CreateResumeCommandValidator>();
        services.AddValidatorsFromAssemblyContaining<GetResumeByIdQueryValidator>();

        return services;
    }
}