using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ActorsCafe
{
    public class Program
    {
        public static int Main(string[] args)
        {
            int Usage(string error, int status = -1)
            {
                Console.Error.WriteLine($@"-- {error} --

Usage: 
(no subcommand): Run the ActorsCafé Server
version: Show the current version of ActorsCafé.
help: Show this help.
usage: Show this help.
normalize: Normalize posts count, followings count, etc of database.
set-admin <userId>: Mark the specified user as admin.
unset-admin <userId>: Unmark the specified user as admin.");

                return status;
            }

            int SetAdmin(string uid, bool value)
            {
                var user = Server.I.UserManager.Show(id: uid);
                if (user == null)
                {
                    Console.Error.WriteLine("No such user.");
                    return -2;
                }
                user.IsAdmin = true;
                Server.I.UserManager.UpdateUser(user);
                return 0;
            }

            if (args.Length > 0)
            {
                switch (args[0].ToLowerInvariant())
                {
                    case "set-admin":
                        return args.Length > 1 ? SetAdmin(args[1], true) : Usage("Specify user id.");
                    case "unset-admin":
                        return args.Length > 1 ? SetAdmin(args[1], false) : Usage("Specify user id.");
                    case "normalize":
                        Server.I.Normalize();
                        return 0;
                    case "version":
                        Console.WriteLine($"ActorsCafé Version {Server.I.Version}({Server.I.CodeName})");
                        return 0;
                    case "help":
                    case "usage":
                        return Usage("ActorsCafé", 0);
                    default:
                        return Usage($"Unexpected subcommand {args[0]}");
                }
            }

            CreateWebHostBuilder(args).Build().Run();
            return 0;
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseUrls($"https://localhost:{Environment.GetEnvironmentVariable("PORT") ?? "8080"}")
                .UseStartup<Startup>();
    }
}
