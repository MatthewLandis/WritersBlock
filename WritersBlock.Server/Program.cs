using WritersBlock.Server.Databases;
using WritersBlock.Server.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISql, Sql>();

builder.Services.Configure<WritersBlock.Server.Settings>(builder.Configuration);

builder.Services.AddCors(static options =>
{
    options.AddPolicy("AllowAngularApp", static policy =>
    {
        _ = policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

WebApplication app = builder.Build();

app.UseCors("AllowAngularApp");
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");
app.Run();
