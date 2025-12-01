
// #define FORCE_RELEASE 

using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Routing;
using VueCliMiddleware;
using System.Net;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

Console.WriteLine($"Config files: appsettings.{builder.Environment.EnvironmentName}.json");

int spaPort = builder.Configuration.GetSection("environmentVariables").GetValue<int>("VITE_PORT");
spaPort = spaPort > 0 ? spaPort : 3001;

builder.Services.AddControllers();

// Configure Kestrel to use applicationUrl from appsettings
var applicationUrl = builder.Configuration.GetValue<string>("applicationUrl");
Console.WriteLine($"Application URL from config: {applicationUrl}");
if (!string.IsNullOrEmpty(applicationUrl))
{
    builder.WebHost.UseUrls(applicationUrl.Split(';', System.StringSplitOptions.RemoveEmptyEntries).Select(u => u.Trim()).ToArray());
}

//For localhost reverse proxy
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    // options.KnownProxies.Add(IPAddress.Parse("127.0.0.1"));
    options.KnownProxies.Add(IPAddress.Any);
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // app.UseHttpsRedirection();
    //app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseWhen(context => !context.Request.Path.StartsWithSegments("/api"),
    uwApp =>
    {
        #if FORCE_RELEASE
        if (true)
        {
            Console.WriteLine("DEBUG: SPA PRODUCTION MODE");
            var spaDistPath = Path.Combine(Directory.GetCurrentDirectory(), "PortfolioClient", "dist");
            var fileProvider = new PhysicalFileProvider(spaDistPath);
            
            var defaultFilesOptions = new DefaultFilesOptions { FileProvider = fileProvider };
            defaultFilesOptions.DefaultFileNames.Add("index.html");
            uwApp.UseDefaultFiles(defaultFilesOptions);
            
            uwApp.UseSpaStaticFiles(new StaticFileOptions
            {
                FileProvider = fileProvider,
                RequestPath = "",
            });
        }
        #else
        if (!app.Environment.IsDevelopment())
        {
            Console.WriteLine("DEBUG: SPA PRODUCTION MODE");
            var spaDistPath = Path.Combine(Directory.GetCurrentDirectory(), "PortfolioClient", "dist");
            var fileProvider = new PhysicalFileProvider(spaDistPath);
            
            var defaultFilesOptions = new DefaultFilesOptions { FileProvider = fileProvider };
            defaultFilesOptions.DefaultFileNames.Add("index.html");
            uwApp.UseDefaultFiles(defaultFilesOptions);
            
            uwApp.UseSpaStaticFiles(new StaticFileOptions
            {
                FileProvider = fileProvider,
                RequestPath = "",
            });
        }
        else
        {
            Console.WriteLine("SPA DEVELOPMENT MODE");
            Console.WriteLine($"SPA PORT: {spaPort}");
            uwApp.UseSpa(spabuilder =>
            {
                spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient");
                spabuilder.UseVueCli(npmScript: "dev", port: spaPort, forceKill: true, regex: "ready in", https: false);
                spabuilder.Options.StartupTimeout = TimeSpan.FromSeconds(12);

            });
        }
        #endif
    }
);
app.UseWhen(context => context.Request.Path.StartsWithSegments("/api"),
    uwApp =>
    {
        uwApp.Map("/api", mapApp =>
        {
            mapApp.UseRouting();
            mapApp.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        });
    }
);


app.Run();

