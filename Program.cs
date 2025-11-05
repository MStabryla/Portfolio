
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// builder.Services.AddRazorPages();

builder.Services.AddControllers();

builder.Services.AddSpaStaticFiles(options =>
{
    options.RootPath = Path.Combine(".", "PortfolioClient");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseSpa(spabuilder =>
    {
        spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient", "dist");
    });
    app.UseSpaStaticFiles(options: new StaticFileOptions { RequestPath = "/Client" });
    app.UseHsts();
}
else
{
    app.UseSpa(spabuilder =>
    {
        spabuilder.Options.SourcePath = Path.Combine(".", "PortfolioClient");
        spabuilder.Options.DevServerPort = 3001;
        spabuilder.Options.PackageManagerCommand = "npm run dev";
        spabuilder.UseProxyToSpaDevelopmentServer("http://localhost:3001");
    });
    app.UseSpaStaticFiles(options: new StaticFileOptions { RequestPath = "/Client" });
}

//app.UseHttpsRedirection();
app.MapControllers();
// app.UseRouting();


app.Run();
