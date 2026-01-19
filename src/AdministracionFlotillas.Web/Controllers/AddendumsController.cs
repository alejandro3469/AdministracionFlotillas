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
public class AddendumsController : Controller
{
    private readonly IAddendumsService _servicio;
    
    public AddendumsController(IAddendumsService servicio)
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
                new BreadcrumbItem { Text = "Administración", Url = "#" },
                new BreadcrumbItem { Text = "Adendas", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerAddendums()
    {
        try
        {
            var addendums = await _servicio.ObtenerAddendumsAsync();
            var modelosVista = AddendumParseador.ConvertirListaAVista(addendums);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerAddendumPorId([FromBody] int idAdenda)
    {
        try
        {
            var addendum = await _servicio.ObtenerAddendumPorIdAsync(idAdenda);
            
            if (addendum == null)
            {
                return Json(new { exito = false, mensaje = "Adenda no encontrada" });
            }
            
            var modeloVista = AddendumParseador.ConvertirAVista(addendum);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarAddendums([FromBody] SolicitudBuscarAddendums solicitud)
    {
        try
        {
            var addendums = await _servicio.BuscarAddendumsAsync(solicitud.IdCadena, solicitud.Estado);
            var modelosVista = AddendumParseador.ConvertirListaAVista(addendums);
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
            var addendums = await _servicio.ObtenerAddendumsAsync();
            
            var metricas = new
            {
                totalAdendas = addendums.Count,
                adendasActivas = addendums.Count(a => a.Status == "ACTIVE"),
                adendasExpiradas = addendums.Count(a => a.Status == "EXPIRED"),
                adendasCanceladas = addendums.Count(a => a.Status == "CANCELLED")
            };
            
            return Json(new { exito = true, datos = metricas });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

public class SolicitudBuscarAddendums
{
    public int? IdCadena { get; set; }
    public string? Estado { get; set; }
}
