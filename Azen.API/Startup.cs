using Azen.API.ExceptionsHandling;
using Azen.API.Sockets.Auth;
using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Comunications.ZFile;
using Azen.API.Sockets.Cryptography;
using Azen.API.Sockets.General;
using Azen.API.Sockets.Helpers;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
            services.AddCors(options =>
                options.AddDefaultPolicy(builder =>
                    builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                )
            );

            services.AddRazorPages();

            services.AddControllers();
            services.Configure<AzenSettings>(Configuration.GetSection("AzenSettings"));
            services.Configure<IdentitySettings>(Configuration.GetSection("IdentitySettings"));
            services.Configure<ZCryptographySettings>(Configuration.GetSection("ZCryptographySettings"));
            services.Configure<ZTransferFileSettings>(Configuration.GetSection("ZTransferFileSettings"));

            services.AddSingleton<LogHandler>();

            services.AddScoped<AuthService>();
            services.AddScoped<ZCryptography>();
            services.AddScoped<ZTransferFile>();            

            services.AddSingleton<ZTag>();
            services.AddTransient<ZSocket>();

            services.AddMediatR(typeof(Models.ZCommand.Execute).Assembly);
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
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseMiddleware<ExceptionHandlerMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }        
    }
}
