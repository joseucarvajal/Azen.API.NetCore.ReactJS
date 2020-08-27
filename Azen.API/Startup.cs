using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azen.API.Sockets.Auth;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.General;
using Azen.API.Sockets.Helpers;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Azen.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.Configure<AzenSettings>(Configuration.GetSection("Azen"));
            services.Configure<IdentitySettings>(Configuration.GetSection("Identity"));

            services.AddSingleton<LogHandler>();
            services.AddScoped<AuthService>();

            services.AddSingleton<ZTag>();
            services.AddTransient<ZSocket>();

            services.AddMediatR(typeof(Model.ZCommand.Execute).Assembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            System.IO.Directory.SetCurrentDirectory(env.ContentRootPath);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }        
    }
}
