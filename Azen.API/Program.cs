using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Azen.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

         /*public static IHostBuilder CreateHostBuilder(string[] args) =>
             Host.CreateDefaultBuilder(args)
                 .ConfigureWebHostDefaults(webBuilder =>
                 {
                     webBuilder.UseStartup<Startup>().UseKestrel(options =>
                     {
                         int port = 5443;
                         if (args.Length > 0)
                             int.TryParse(args[0], out port);

                         options.ListenAnyIP(port); // is no cert and password specified the run the server as HTTP one
                     });
                 });
         */
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.ConfigureKestrel(serverOptions =>
                {
                    int port = 5000;
                    if (args.Length > 0)
                        int.TryParse(args[0], out port);

                    serverOptions.ListenAnyIP(port); // is no cert and password specified the run the server as HTTP one
                })
                .UseStartup<Startup>();
            });
    }
}
