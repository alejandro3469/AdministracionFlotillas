using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Configurar TNS_ADMIN para Oracle Wallet (ANTES de cualquier conexión)
var tnsAdmin = builder.Configuration["OracleSettings:TnsAdmin"];
if (!string.IsNullOrEmpty(tnsAdmin))
{
    Environment.SetEnvironmentVariable("TNS_ADMIN", tnsAdmin);
}

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    {
        // Mantener PascalCase para compatibilidad con JavaScript
        options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
    }); // Para soporte de JSON en AJAX

// Repositorios
builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>();
builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();

// Servicios (por ahora usamos directamente Oracle, luego se puede usar Factory)
builder.Services.AddScoped<IEmployeesService, EmployeesServiceOracle>();
builder.Services.AddScoped<IOrdersService, OrdersServiceOracle>();

var app = builder.Build();

// Registrar licencia de Syncfusion (DESPUÉS de builder.Build())
// License Key Trial válida hasta: Febrero 16, 2026
// Community License solicitada en ticket #803702
// Para obtener licencia permanente, contacta soporte con el ticket #803702
SyncfusionLicenseProvider.RegisterLicense("Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCfEx3Q3xbf1x2ZFRGalxSTndXUiweQnxTdENjWH5ZcXRUQ2BUVkB+W0leYQ==");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Debe ir ANTES de UseRouting()
app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();
