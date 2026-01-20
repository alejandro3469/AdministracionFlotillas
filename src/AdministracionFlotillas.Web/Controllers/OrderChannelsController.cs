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
public class OrderChannelsController : Controller
{
    private readonly IOrderChannelsService _servicio;
    
    public OrderChannelsController(IOrderChannelsService servicio)
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
                new BreadcrumbItem { Text = "Canales de Pedidos", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrderChannels()
    {
        try
        {
            var channels = await _servicio.ObtenerOrderChannelsAsync();
            var modelosVista = OrderChannelParseador.ConvertirListaAVista(channels);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrderChannelPorId([FromBody] int idCanal)
    {
        try
        {
            var channel = await _servicio.ObtenerOrderChannelPorIdAsync(idCanal);
            
            if (channel == null)
            {
                return Json(new { exito = false, mensaje = "Canal no encontrado" });
            }
            
            var modeloVista = OrderChannelParseador.ConvertirAVista(channel);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarOrderChannels([FromBody] SolicitudBuscarOrderChannels solicitud)
    {
        try
        {
            var channels = await _servicio.BuscarOrderChannelsAsync(solicitud.Tipo, solicitud.Estado);
            var modelosVista = OrderChannelParseador.ConvertirListaAVista(channels);
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
            var channels = await _servicio.ObtenerOrderChannelsAsync();
            
            var metricas = new
            {
                totalCanales = channels.Count,
                canalesActivos = channels.Count(c => c.Status == "ACTIVE"),
                totalPedidos = channels.Sum(c => c.TotalOrders),
                tasaConversionPromedio = channels.Count > 0 ? channels.Average(c => c.ConversionRate) : 0,
                eficienciaPromedio = channels.Count > 0 ? channels.Average(c => c.Efficiency) : 0
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
    public async Task<IActionResult> ActualizarOrderChannel([FromBody] SolicitudActualizarOrderChannel solicitud)
    {
        try
        {
            if (solicitud == null || solicitud.IdCanal <= 0)
            {
                return Json(new { exito = false, mensaje = "Datos de actualización inválidos" });
            }
            
            // Validaciones
            if (!string.IsNullOrEmpty(solicitud.Estado) && 
                solicitud.Estado != "ACTIVE" && solicitud.Estado != "INACTIVE")
            {
                return Json(new { exito = false, mensaje = "Estado inválido" });
            }
            
            // TODO: Implementar actualización real
            return Json(new { exito = true, mensaje = "Canal actualizado correctamente" });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

public class SolicitudBuscarOrderChannels
{
    public string? Tipo { get; set; }
    public string? Estado { get; set; }
}

public class SolicitudActualizarOrderChannel
{
    public int IdCanal { get; set; }
    public string? NombreCanal { get; set; }
    public string? TipoCanal { get; set; }
    public string? Descripcion { get; set; }
    public string? Estado { get; set; }
}
