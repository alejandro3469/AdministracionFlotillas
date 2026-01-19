using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.Web.Models;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class HomeController : Controller
{
    public IActionResult Index()
    {
        var breadcrumb = new BreadcrumbViewModel
        {
            Items = new List<BreadcrumbItem>
            {
                new BreadcrumbItem { Text = "Dashboard", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }

    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerMetricas()
    {
        // Datos mock para el dashboard - simular integración con Oracle/JDE
        var metricas = new
        {
            totalVentas = 125450.75m,
            ordenesHoy = 23,
            clientesActivos = 156,
            totalProductos = 342
        };
        
        return Json(new { exito = true, datos = metricas });
    }

    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerVentasMensuales()
    {
        // Datos mock - simular datos de Oracle Sample Schema
        var ventasMensuales = new[]
        {
            new { mes = "Enero", ventas = 45230.50m },
            new { mes = "Febrero", ventas = 38920.25m },
            new { mes = "Marzo", ventas = 52140.75m },
            new { mes = "Abril", ventas = 47890.00m },
            new { mes = "Mayo", ventas = 56320.50m },
            new { mes = "Junio", ventas = 61250.25m }
        };
        
        return Json(new { exito = true, datos = ventasMensuales });
    }

    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerEstadoOrdenes()
    {
        // Datos mock - simular distribución de órdenes
        var estadoOrdenes = new[]
        {
            new { estado = "COMPLETE", cantidad = 1250 },
            new { estado = "CANCELLED", cantidad = 85 },
            new { estado = "REFUNDED", cantidad = 42 }
        };
        
        return Json(new { exito = true, datos = estadoOrdenes });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
