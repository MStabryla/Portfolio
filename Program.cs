
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Razor.TagHelpers;

var builder = WebApplication.CreateBuilder(args);

int spaPort = builder.Configuration.GetSection("environmentVariables").GetValue<int>("VITE_PORT");
spaPort = spaPort > 0 ? spaPort : 3001;

builder.Services.AddControllers();

builder.Services.AddSpaStaticFiles(options =>
{
    // Serve built files from PortfolioClient/dist in production
    options.RootPath = Path.Combine(".", "PortfolioClient", "dist");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Mount the SPA only under the /client path. This creates a branch so any request
// to /client/* is handled by the SPA middleware (static files in production,
// proxy to dev server in development).
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

app.Map("/client", clientApp =>
{
    // Serve static files from PortfolioClient/dist inside the /client branch
    clientApp.UseSpaStaticFiles();

    if (!app.Environment.IsDevelopment())
    {
        clientApp.UseSpa(spabuilder =>
        {
            spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient", "dist");
        });
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "PortfolioClient", "dist", "assets")),
            RequestPath = $"/assets"
        });
    }
    else
    {
        Console.WriteLine($"SPA PORT: {spaPort}");
        clientApp.UseSpa(spabuilder =>
        {
            // spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient");
            // spabuilder.Options.DevServerPort = spaPort;
            // spabuilder.Options.PackageManagerCommand = $"$Env:VITE_PORT={spaPort};npm run dev";
            // spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient");
            spabuilder.UseProxyToSpaDevelopmentServer($"http://localhost:{spaPort}");
        });
        app.MapStaticAssets(spaPort);
    }
});

app.MapControllers();
app.UseRouting();


app.Run();


static class SpaStaticFileExtensions
{
    private static void MapOneStaticAsset(this WebApplication app, string folderPath, int spaPort)
    {
        if (app.Environment.IsDevelopment())
        {
            app.Map($"/{folderPath}", clientApp =>
            {
                clientApp.UseSpa(spabuilder =>
                {
                    spabuilder.UseProxyToSpaDevelopmentServer($"http://localhost:{spaPort}/{folderPath}");
                });
            });
        }
        else
        {
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "PortfolioClient", "dist", folderPath)),
                RequestPath = $"/{folderPath}"
            });
        }

    }
    private static readonly string[] _AssetFolders = ["src", "assets", "node_modules", "@vite"];
    public static void MapStaticAssets(this WebApplication app,int spaPort = 3001)
    {
        foreach (var folderPath in _AssetFolders)
        {
            app.MapOneStaticAsset(folderPath,spaPort);
        }
    }
}
