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
public class InvoicingController : Controller
{
    private readonly IInvoicingService _servicio;
    
    public InvoicingController(IInvoicingService servicio)
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
                new BreadcrumbItem { Text = "Facturación", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerInvoices()
    {
        try
        {
            var invoices = await _servicio.ObtenerInvoicesAsync();
            var modelosVista = InvoiceParseador.ConvertirListaAVista(invoices);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerInvoicePorId([FromBody] int idFactura)
    {
        try
        {
            var invoice = await _servicio.ObtenerInvoicePorIdAsync(idFactura);
            
            if (invoice == null)
            {
                return Json(new { exito = false, mensaje = "Factura no encontrada" });
            }
            
            var modeloVista = InvoiceParseador.ConvertirAVista(invoice);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarInvoices([FromBody] SolicitudBuscarInvoices solicitud)
    {
        try
        {
            var invoices = await _servicio.BuscarInvoicesAsync(solicitud.IdOrden, solicitud.Folio, solicitud.Estado, solicitud.FechaInicio, solicitud.FechaFin);
            var modelosVista = InvoiceParseador.ConvertirListaAVista(invoices);
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
            var invoices = await _servicio.ObtenerInvoicesAsync();
            
            var metricas = new
            {
                totalFacturas = invoices.Count,
                facturasTimbradas = invoices.Count(f => f.Status == "STAMPED"),
                facturasBorrador = invoices.Count(f => f.Status == "DRAFT"),
                facturasCanceladas = invoices.Count(f => f.Status == "CANCELLED"),
                totalFacturado = invoices.Sum(f => f.Total)
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
    public async Task<IActionResult> ActualizarInvoice([FromBody] SolicitudActualizarInvoice solicitud)
    {
        try
        {
            if (solicitud == null || solicitud.IdFactura <= 0)
            {
                return Json(new { exito = false, mensaje = "Datos de actualización inválidos" });
            }
            
            // Validaciones
            if (!string.IsNullOrEmpty(solicitud.Estado) && 
                solicitud.Estado != "DRAFT" && solicitud.Estado != "STAMPED" && 
                solicitud.Estado != "CANCELLED" && solicitud.Estado != "PENDING")
            {
                return Json(new { exito = false, mensaje = "Estado inválido" });
            }
            
            // Las facturas timbradas no pueden editarse
            // TODO: Validar estado actual antes de permitir edición
            
            // TODO: Implementar actualización real
            return Json(new { exito = true, mensaje = "Factura actualizada correctamente" });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

public class SolicitudBuscarInvoices
{
    public int? IdOrden { get; set; }
    public string? Folio { get; set; }
    public string? Estado { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
}

public class SolicitudActualizarInvoice
{
    public int IdFactura { get; set; }
    public string? Estado { get; set; }
    public string? MetodoPago { get; set; }
    public string? FormaPago { get; set; }
    public string? MotivoCancelacion { get; set; }
}
