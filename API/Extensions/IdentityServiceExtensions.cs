using System.Text;
using API.Data;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static void AddIdentityServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddIdentityCore<AppUser>(opt =>
          {
              opt.Password.RequireNonAlphanumeric = false;
          })
            .AddEntityFrameworkStores<DocfinderContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key here aiming for 12 characters!!"));

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                            .AddJwtBearer(opt =>
                            {
                                opt.TokenValidationParameters = new TokenValidationParameters
                                {
                                    ValidateIssuerSigningKey = true,
                                    IssuerSigningKey = key,
                                    ValidateIssuer = false,
                                    ValidateAudience = false
                                };
                            });

            builder.Services.AddScoped<TokenService>();
        }
    }
}