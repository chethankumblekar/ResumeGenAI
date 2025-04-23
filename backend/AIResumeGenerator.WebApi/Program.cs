using AIResumeGenerator.Application.DependencyInjection;
using AIResumeGenerator.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Register application and infrastructure services
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructure(builder.Configuration);

// Register controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(option =>
{
    option.AddPolicy("CorsPolicy", options=> options
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.notes

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger middleware
    app.UseSwaggerUI(); // Enable Swagger UI
}

app.UseCors("CorsPolicy");
app.MapControllers();
app.UseHttpsRedirection();
app.Run();