
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Builder;
using VueCliMiddleware;

var builder = WebApplication.CreateBuilder(args);

int spaPort = builder.Configuration.GetSection("environmentVariables").GetValue<int>("VITE_PORT");
spaPort = spaPort > 0 ? spaPort : 3001;

builder.Services.AddControllers();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHttpsRedirection();
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseWhen(context => !context.Request.Path.StartsWithSegments("/api"),
    uwApp =>
    {
        if (!app.Environment.IsDevelopment())
        {
            uwApp.UseSpa(spabuilder =>
            {
                spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient", "dist");
            });
        }
        else
        {
            Console.WriteLine($"SPA PORT: {spaPort}");
            uwApp.UseSpa(spabuilder =>
            {
                spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient");
                spabuilder.UseVueCli(npmScript: "dev", port: spaPort, forceKill: true, regex: "ready in", https: false);
                spabuilder.Options.StartupTimeout = TimeSpan.FromSeconds(12);

            });
        }
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

