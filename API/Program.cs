using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddIdentityServices();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<DocfinderContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// string connString;
// if (builder.Environment.IsDevelopment())
//     connString = builder.Configuration.GetConnectionString("DefaultConnection");
// else
// {
//     // Use connection string provided at runtime by FlyIO.
//     var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
//
//     // Parse connection URL to connection string for Npgsql
//     connUrl = connUrl.Replace("postgres://", string.Empty);
//     var pgUserPass = connUrl.Split("@")[0];
//     var pgHostPortDb = connUrl.Split("@")[1];
//     var pgHostPort = pgHostPortDb.Split("/")[0];
//     var pgDb = pgHostPortDb.Split("/")[1];
//     var pgUser = pgUserPass.Split(":")[0];
//     var pgPass = pgUserPass.Split(":")[1];
//     var pgHost = pgHostPort.Split(":")[0];
//     var pgPort = pgHostPort.Split(":")[1];
//     var updatedHost = pgHost.Replace("flycast", "internal");
//
//     connString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
// }
// builder.Services.AddDbContext<DocfinderContext>(opt =>
// {
//     opt.UseNpgsql(connString);
// });

builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");

app.Run();
