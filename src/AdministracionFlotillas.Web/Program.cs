using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(); // Para soporte de JSON en AJAX

// Repositorios
builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>();

// Servicios (por ahora usamos directamente Oracle, luego se puede usar Factory)
builder.Services.AddScoped<IEmployeesService, EmployeesServiceOracle>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();
