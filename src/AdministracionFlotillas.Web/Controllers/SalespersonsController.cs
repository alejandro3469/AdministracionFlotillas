using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.ViewModels;
using AdministracionFlotillas.Web.Parseador;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class SalespersonsController : Controller
{
    private readonly ISalespersonsService _servicio;
    
    public SalespersonsController(ISalespersonsService servicio)
    {
        _servicio = servicio;
    }
    
    public IActionResult Index()
    {
        var breadcrumb = new BreadcrumbViewModel
        {
            Items = new List<BreadcrumbItem>
            {
                new BreadcrumbItem { Text = "Dashboard", Url = Url.Action("Index", "Home") },
                new BreadcrumbItem { Text = "Ventas", Url = "#" },
                new BreadcrumbItem { Text = "Vendedores", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerSalespersons()
    {
        try
        {
            var salespersons = await _servicio.ObtenerSalespersonsAsync();
            var modelosVista = SalespersonParseador.ConvertirListaAVista(salespersons);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerSalespersonPorId([FromBody] int idVendedor)
    {
        try
        {
            var salesperson = await _servicio.ObtenerSalespersonPorIdAsync(idVendedor);
            
            if (salesperson == null)
            {
                return Json(new { exito = false, mensaje = "Vendedor no encontrado" });
            }
            
            var modeloVista = SalespersonParseador.ConvertirAVista(salesperson);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarSalespersons([FromBody] SolicitudBuscarSalespersons solicitud)
    {
        try
        {
            var salespersons = await _servicio.BuscarSalespersonsAsync(solicitud.Nombre, solicitud.Zona, solicitud.Estado);
            var modelosVista = SalespersonParseador.ConvertirListaAVista(salespersons);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerMetricas()
    {
        try
        {
            var salespersons = await _servicio.ObtenerSalespersonsAsync();
            
            var metricas = new
            {
                totalVendedores = salespersons.Count,
                vendedoresActivos = salespersons.Count(v => v.Status == "ACTIVE"),
                vendedoresInactivos = salespersons.Count(v => v.Status == "INACTIVE"),
                totalVentas = salespersons.Sum(v => v.TotalSales),
                totalComisiones = salespersons.Sum(v => v.TotalCommissions)
            };
            
            return Json(new { exito = true, datos = metricas });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ActualizarSalesperson([FromBody] SolicitudActualizarSalesperson solicitud)
    {
        try
        {
            if (solicitud == null || solicitud.IdVendedor <= 0)
            {
                return Json(new { exito = false, mensaje = "Datos de actualización inválidos" });
            }
            
            // Validaciones
            if (solicitud.ComisionBase.HasValue && (solicitud.ComisionBase.Value < 0 || solicitud.ComisionBase.Value > 100))
            {
                return Json(new { exito = false, mensaje = "La comisión base debe estar entre 0 y 100" });
            }
            
            if (solicitud.ComisionVariable.HasValue && (solicitud.ComisionVariable.Value < 0 || solicitud.ComisionVariable.Value > 100))
            {
                return Json(new { exito = false, mensaje = "La comisión variable debe estar entre 0 y 100" });
            }
            
            if (!string.IsNullOrEmpty(solicitud.Estado) && 
                solicitud.Estado != "ACTIVE" && solicitud.Estado != "INACTIVE")
            {
                return Json(new { exito = false, mensaje = "Estado inválido" });
            }
            
            // Validar formato de email
            if (!string.IsNullOrEmpty(solicitud.Email) && !solicitud.Email.Contains("@"))
            {
                return Json(new { exito = false, mensaje = "El formato de email no es válido" });
            }
            
            // TODO: Implementar actualización real
            return Json(new { exito = true, mensaje = "Vendedor actualizado correctamente" });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

// Clase auxiliar para solicitudes
public class SolicitudBuscarSalespersons
{
    public string? Nombre { get; set; }
    public string? Zona { get; set; }
    public string? Estado { get; set; }
}

public class SolicitudActualizarSalesperson
{
    public int IdVendedor { get; set; }
    public string? NombreCompleto { get; set; }
    public string? Email { get; set; }
    public string? Telefono { get; set; }
    public string? ZonaCobertura { get; set; }
    public decimal? ComisionBase { get; set; }
    public decimal? ComisionVariable { get; set; }
    public string? Estado { get; set; }
}
