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
public class ChainsController : Controller
{
    private readonly IChainsService _servicio;
    
    public ChainsController(IChainsService servicio)
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
                new BreadcrumbItem { Text = "Cadenas", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerChains()
    {
        try
        {
            var chains = await _servicio.ObtenerChainsAsync();
            var modelosVista = ChainParseador.ConvertirListaAVista(chains);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerChainPorId([FromBody] int idCadena)
    {
        try
        {
            var chain = await _servicio.ObtenerChainPorIdAsync(idCadena);
            
            if (chain == null)
            {
                return Json(new { exito = false, mensaje = "Cadena no encontrada" });
            }
            
            var modeloVista = ChainParseador.ConvertirAVista(chain);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarChains([FromBody] SolicitudBuscarChains solicitud)
    {
        try
        {
            var chains = await _servicio.BuscarChainsAsync(solicitud.Nombre, solicitud.Estado);
            var modelosVista = ChainParseador.ConvertirListaAVista(chains);
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
            var chains = await _servicio.ObtenerChainsAsync();
            
            var metricas = new
            {
                totalCadenas = chains.Count,
                cadenasActivas = chains.Count(c => c.Status == "ACTIVE"),
                cadenasInactivas = chains.Count(c => c.Status == "INACTIVE"),
                totalSucursales = chains.Sum(c => c.NumberOfStores),
                totalVentas = chains.Sum(c => c.TotalSales)
            };
            
            return Json(new { exito = true, datos = metricas });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

// Clase auxiliar para solicitudes
public class SolicitudBuscarChains
{
    public string? Nombre { get; set; }
    public string? Estado { get; set; }
}
