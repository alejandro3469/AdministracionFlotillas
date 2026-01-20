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
public class RoutesController : Controller
{
    private readonly IRoutesService _servicio;
    
    public RoutesController(IRoutesService servicio)
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
                new BreadcrumbItem { Text = "Rutas", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerRoutes()
    {
        try
        {
            var routes = await _servicio.ObtenerRoutesAsync();
            var modelosVista = RouteParseador.ConvertirListaAVista(routes);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerRoutePorId([FromBody] int idRuta)
    {
        try
        {
            var route = await _servicio.ObtenerRoutePorIdAsync(idRuta);
            
            if (route == null)
            {
                return Json(new { exito = false, mensaje = "Ruta no encontrada" });
            }
            
            var modeloVista = RouteParseador.ConvertirAVista(route);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarRoutes([FromBody] SolicitudBuscarRoutes solicitud)
    {
        try
        {
            var routes = await _servicio.BuscarRoutesAsync(solicitud.Nombre, solicitud.Zona, solicitud.Estado);
            var modelosVista = RouteParseador.ConvertirListaAVista(routes);
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
            var routes = await _servicio.ObtenerRoutesAsync();
            
            var metricas = new
            {
                totalRutas = routes.Count,
                rutasActivas = routes.Count(r => r.Status == "ACTIVE"),
                rutasInactivas = routes.Count(r => r.Status == "INACTIVE"),
                totalEntregas = routes.Sum(r => r.TotalDeliveries),
                eficienciaPromedio = routes.Count > 0 ? routes.Average(r => r.Efficiency) : 0
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
    public async Task<IActionResult> ActualizarRoute([FromBody] SolicitudActualizarRoute solicitud)
    {
        try
        {
            if (solicitud == null || solicitud.IdRuta <= 0)
            {
                return Json(new { exito = false, mensaje = "Datos de actualización inválidos" });
            }
            
            // Validaciones
            if (solicitud.TiempoEstimado.HasValue && solicitud.TiempoEstimado.Value < 0)
            {
                return Json(new { exito = false, mensaje = "El tiempo estimado no puede ser negativo" });
            }
            
            if (solicitud.CapacidadMaxima.HasValue && solicitud.CapacidadMaxima.Value < 0)
            {
                return Json(new { exito = false, mensaje = "La capacidad máxima no puede ser negativa" });
            }
            
            if (!string.IsNullOrEmpty(solicitud.Estado) && 
                solicitud.Estado != "ACTIVE" && solicitud.Estado != "INACTIVE")
            {
                return Json(new { exito = false, mensaje = "Estado inválido" });
            }
            
            // TODO: Implementar actualización real
            return Json(new { exito = true, mensaje = "Ruta actualizada correctamente" });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

public class SolicitudBuscarRoutes
{
    public string? Nombre { get; set; }
    public string? Zona { get; set; }
    public string? Estado { get; set; }
}

public class SolicitudActualizarRoute
{
    public int IdRuta { get; set; }
    public string? NombreRuta { get; set; }
    public string? Descripcion { get; set; }
    public string? ZonaGeografica { get; set; }
    public int? TiempoEstimado { get; set; }
    public int? CapacidadMaxima { get; set; }
    public string? Estado { get; set; }
    public string? RepartidorAsignado { get; set; }
}
