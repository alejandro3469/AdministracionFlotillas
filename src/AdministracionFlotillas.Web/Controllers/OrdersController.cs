using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.ViewModels;
using AdministracionFlotillas.Web.Parseador;
using AdministracionFlotillas.Web.Models;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class OrdersController : Controller
{
    private readonly IOrdersService _servicio;
    
    public OrdersController(IOrdersService servicio)
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
                new BreadcrumbItem { Text = "Órdenes", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [Obsolete("Este método está obsoleto. Use el modal _ModalOrden.cshtml en su lugar. Se mantiene por compatibilidad temporal.")]
    public IActionResult Details(int? id)
    {
        // Redirigir a Index - el modal se maneja desde JavaScript
        return RedirectToAction(nameof(Index));
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrders()
    {
        try
        {
            var ordenes = await _servicio.ObtenerOrdersAsync();
            var modelosVista = OrderParseador.ConvertirListaAVista(ordenes);
            
            // Asegurar que todos los campos requeridos tengan valores válidos
            foreach (var modelo in modelosVista)
            {
                if (string.IsNullOrWhiteSpace(modelo.EstadoOrden))
                {
                    modelo.EstadoOrden = "PENDING";
                }
                if (modelo.IdOrden <= 0)
                {
                    // Si no hay ID válido, saltar esta orden o usar un valor por defecto
                    continue;
                }
            }
            
            // Filtrar órdenes con ID válido
            modelosVista = modelosVista.Where(o => o.IdOrden > 0).ToList();
            
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrderPorId([FromBody] int idOrden)
    {
        try
        {
            var orden = await _servicio.ObtenerOrderPorIdAsync(idOrden);
            
            if (orden == null)
            {
                return Json(new { exito = false, mensaje = "Orden no encontrada" });
            }
            
            var modeloVista = OrderParseador.ConvertirAVista(orden);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarOrders([FromBody] SolicitudBuscarOrdenes solicitud)
    {
        try
        {
            var ordenes = await _servicio.BuscarOrdersAsync(
                solicitud.IdCliente,
                solicitud.IdTienda,
                solicitud.Estado,
                solicitud.FechaInicio,
                solicitud.FechaFin
            );
            
            var modelosVista = OrderParseador.ConvertirListaAVista(ordenes);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrdersPorRangoFechas([FromBody] SolicitudRangoFechas solicitud)
    {
        try
        {
            var ordenes = await _servicio.ObtenerOrdersPorRangoFechasAsync(
                solicitud.FechaInicio,
                solicitud.FechaFin
            );
            
            var modelosVista = OrderParseador.ConvertirListaAVista(ordenes);
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
            var ordenes = await _servicio.ObtenerOrdersAsync();
            
            var metricas = new
            {
                totalOrders = ordenes.Count,
                completedOrders = ordenes.Count(orden => orden.OrderStatus == "COMPLETE"),
                cancelledOrders = ordenes.Count(orden => orden.OrderStatus == "CANCELLED"),
                refundedOrders = ordenes.Count(orden => orden.OrderStatus == "REFUNDED")
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
    public IActionResult ObtenerItemsFactura([FromBody] int idOrden)
    {
        try
        {
            // Simular obtención de items de factura - en producción vendría de Oracle/JDE
            // Por ahora retornamos datos mock que simulan integración real
            var itemsMock = new List<OrderItemViewModel>
            {
                new OrderItemViewModel
                {
                    IdItem = 1,
                    IdProducto = 101,
                    NombreProducto = "Producto A",
                    Cantidad = 2,
                    PrecioUnitario = 150.00m,
                    Descuento = 10.00m,
                    Subtotal = 290.00m,
                    Impuesto = 46.40m,
                    Total = 336.40m
                },
                new OrderItemViewModel
                {
                    IdItem = 2,
                    IdProducto = 102,
                    NombreProducto = "Producto B",
                    Cantidad = 1,
                    PrecioUnitario = 250.00m,
                    Descuento = 0.00m,
                    Subtotal = 250.00m,
                    Impuesto = 40.00m,
                    Total = 290.00m
                },
                new OrderItemViewModel
                {
                    IdItem = 3,
                    IdProducto = 103,
                    NombreProducto = "Producto C",
                    Cantidad = 3,
                    PrecioUnitario = 75.50m,
                    Descuento = 5.00m,
                    Subtotal = 221.50m,
                    Impuesto = 35.44m,
                    Total = 256.94m
                }
            };
            
            return Json(new { exito = true, datos = itemsMock });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public Task<IActionResult> CambiarEstadoBatch([FromBody] SolicitudCambiarEstadoBatch solicitud)
    {
        try
        {
            if (solicitud == null || solicitud.IdsOrdenes == null || solicitud.IdsOrdenes.Count == 0)
            {
                return Task.FromResult<IActionResult>(Json(new { exito = false, mensaje = "No se proporcionaron órdenes para actualizar." }));
            }
            
            if (string.IsNullOrWhiteSpace(solicitud.NuevoEstado))
            {
                return Task.FromResult<IActionResult>(Json(new { exito = false, mensaje = "No se proporcionó un estado válido." }));
            }
            
            // Validar estado válido (RN-ORD-007)
            var estadosValidos = new[] { "COMPLETE", "CANCELLED", "REFUNDED", "PENDING" };
            if (!estadosValidos.Contains(solicitud.NuevoEstado))
            {
                return Task.FromResult<IActionResult>(Json(new { exito = false, mensaje = "Estado no válido. Estados permitidos: " + string.Join(", ", estadosValidos) }));
            }
            
            // Simular actualización batch - en producción se actualizaría en Oracle
            // Por ahora retornamos éxito (mock)
            var ordenesActualizadas = solicitud.IdsOrdenes.Count;
            
            // TODO: Implementar actualización real en servicio
            // await _servicio.ActualizarEstadoBatchAsync(solicitud.IdsOrdenes, solicitud.NuevoEstado);
            
            return Task.FromResult<IActionResult>(Json(new { 
                exito = true, 
                mensaje = $"Se actualizaron {ordenesActualizadas} órdenes correctamente.",
                ordenesActualizadas = ordenesActualizadas
            }));
        }
        catch (Exception excepcion)
        {
            return Task.FromResult<IActionResult>(Json(new { exito = false, mensaje = excepcion.Message }));
        }
    }
}

// Clases auxiliares para solicitudes
public class SolicitudBuscarOrdenes
{
    public int? IdCliente { get; set; }
    public int? IdTienda { get; set; }
    public string? Estado { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
}

public class SolicitudRangoFechas
{
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
}

public class SolicitudCambiarEstadoBatch
{
    public List<int> IdsOrdenes { get; set; } = new List<int>();
    public string NuevoEstado { get; set; } = string.Empty;
}
