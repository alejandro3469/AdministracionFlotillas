using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class ProductsController : Controller
{
    public IActionResult Index()
    {
        var breadcrumb = new BreadcrumbViewModel
        {
            Items = new List<BreadcrumbItem>
            {
                new BreadcrumbItem { Text = "Dashboard", Url = Url.Action("Index", "Home") },
                new BreadcrumbItem { Text = "Catálogos", Url = "#" },
                new BreadcrumbItem { Text = "Productos", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerProducts()
    {
        try
        {
            // Datos mock - simular integración con Oracle/JDE
            var productos = new List<ProductViewModel>
            {
                new ProductViewModel
                {
                    IdProducto = 1,
                    NombreProducto = "Producto A",
                    Descripcion = "Descripción del Producto A",
                    Categoria = "Categoría 1",
                    PrecioUnitario = 150.00m,
                    CantidadStock = 45,
                    Estado = "ACTIVE",
                    PrecioCosto = 100.00m,
                    MargenGanancia = 50.00m
                },
                new ProductViewModel
                {
                    IdProducto = 2,
                    NombreProducto = "Producto B",
                    Descripcion = "Descripción del Producto B",
                    Categoria = "Categoría 2",
                    PrecioUnitario = 250.00m,
                    CantidadStock = 30,
                    Estado = "ACTIVE",
                    PrecioCosto = 180.00m,
                    MargenGanancia = 70.00m,
                    CodigoBarras = "1234567890124"
                },
                new ProductViewModel
                {
                    IdProducto = 3,
                    NombreProducto = "Producto C",
                    Descripcion = "Descripción del Producto C",
                    Categoria = "Categoría 1",
                    PrecioUnitario = 75.50m,
                    CantidadStock = 120,
                    Estado = "ACTIVE",
                    PrecioCosto = 50.00m,
                    MargenGanancia = 25.50m,
                    CodigoBarras = "1234567890125"
                },
                new ProductViewModel
                {
                    IdProducto = 4,
                    NombreProducto = "Producto D",
                    Descripcion = "Descripción del Producto D",
                    Categoria = "Categoría 3",
                    PrecioUnitario = 320.00m,
                    CantidadStock = 15,
                    Estado = "ACTIVE",
                    PrecioCosto = 240.00m,
                    MargenGanancia = 80.00m
                },
                new ProductViewModel
                {
                    IdProducto = 5,
                    NombreProducto = "Producto E",
                    Descripcion = "Descripción del Producto E",
                    Categoria = "Categoría 2",
                    PrecioUnitario = 95.00m,
                    CantidadStock = 0,
                    Estado = "INACTIVE",
                    PrecioCosto = 70.00m,
                    MargenGanancia = 25.00m
                }
            };
            
            return Json(new { exito = true, datos = productos });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult BuscarProducts([FromBody] SolicitudBuscarProductos solicitud)
    {
        try
        {
            // Simular búsqueda - en producción vendría de Oracle/JDE
            var todosProductos = new List<ProductViewModel>
            {
                new ProductViewModel { IdProducto = 1, NombreProducto = "Producto A", Categoria = "Categoría 1", PrecioUnitario = 150.00m, CantidadStock = 45, Estado = "ACTIVE", PrecioCosto = 100.00m, MargenGanancia = 50.00m },
                new ProductViewModel { IdProducto = 2, NombreProducto = "Producto B", Categoria = "Categoría 2", PrecioUnitario = 250.00m, CantidadStock = 30, Estado = "ACTIVE", PrecioCosto = 180.00m, MargenGanancia = 70.00m },
                new ProductViewModel { IdProducto = 3, NombreProducto = "Producto C", Categoria = "Categoría 1", PrecioUnitario = 75.50m, CantidadStock = 120, Estado = "ACTIVE", PrecioCosto = 50.00m, MargenGanancia = 25.50m }
            };
            
            var productosFiltrados = todosProductos;
            
            if (!string.IsNullOrEmpty(solicitud.Categoria))
            {
                productosFiltrados = productosFiltrados.Where(p => p.Categoria == solicitud.Categoria).ToList();
            }
            
            if (!string.IsNullOrEmpty(solicitud.Estado))
            {
                productosFiltrados = productosFiltrados.Where(p => p.Estado == solicitud.Estado).ToList();
            }
            
            if (solicitud.PrecioMinimo.HasValue)
            {
                productosFiltrados = productosFiltrados.Where(p => p.PrecioUnitario >= solicitud.PrecioMinimo.Value).ToList();
            }
            
            if (solicitud.PrecioMaximo.HasValue)
            {
                productosFiltrados = productosFiltrados.Where(p => p.PrecioUnitario <= solicitud.PrecioMaximo.Value).ToList();
            }
            
            return Json(new { exito = true, datos = productosFiltrados });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerProductPorId([FromBody] int idProducto)
    {
        try
        {
            // Simular obtención de producto por ID - en producción vendría de Oracle/JDE
            var todosProductos = new List<ProductViewModel>
            {
                new ProductViewModel { IdProducto = 1, NombreProducto = "Producto A", Descripcion = "Descripción del Producto A", Categoria = "Categoría 1", PrecioUnitario = 150.00m, CantidadStock = 45, Estado = "ACTIVE", PrecioCosto = 100.00m, MargenGanancia = 50.00m, CodigoBarras = "1234567890123" },
                new ProductViewModel { IdProducto = 2, NombreProducto = "Producto B", Descripcion = "Descripción del Producto B", Categoria = "Categoría 2", PrecioUnitario = 250.00m, CantidadStock = 30, Estado = "ACTIVE", PrecioCosto = 180.00m, MargenGanancia = 70.00m, CodigoBarras = "1234567890124" },
                new ProductViewModel { IdProducto = 3, NombreProducto = "Producto C", Descripcion = "Descripción del Producto C", Categoria = "Categoría 1", PrecioUnitario = 75.50m, CantidadStock = 120, Estado = "ACTIVE", PrecioCosto = 50.00m, MargenGanancia = 25.50m, CodigoBarras = "1234567890125" }
            };
            
            var producto = todosProductos.FirstOrDefault(p => p.IdProducto == idProducto);
            
            if (producto == null)
            {
                return Json(new { exito = false, mensaje = "Producto no encontrado" });
            }
            
            return Json(new { exito = true, datos = producto });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerMetricas()
    {
        try
        {
            var metricas = new
            {
                totalProductos = 342,
                productosActivos = 298,
                productosInactivos = 44,
                stockBajo = 12, // Productos con stock < 20
                valorInventario = 1250000.00m
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
    public IActionResult ActualizarProduct([FromBody] SolicitudActualizarProducto solicitud)
    {
        try
        {
            if (solicitud == null || solicitud.IdProducto <= 0)
            {
                return Json(new { exito = false, mensaje = "Datos de actualización inválidos" });
            }
            
            // Validaciones de negocio
            if (solicitud.PrecioUnitario.HasValue && solicitud.PrecioUnitario.Value < 0)
            {
                return Json(new { exito = false, mensaje = "El precio unitario no puede ser negativo" });
            }
            
            if (solicitud.CantidadStock.HasValue && solicitud.CantidadStock.Value < 0)
            {
                return Json(new { exito = false, mensaje = "La cantidad en stock no puede ser negativa" });
            }
            
            if (!string.IsNullOrEmpty(solicitud.Estado) && 
                solicitud.Estado != "ACTIVE" && solicitud.Estado != "INACTIVE")
            {
                return Json(new { exito = false, mensaje = "Estado inválido. Debe ser ACTIVE o INACTIVE" });
            }
            
            // Simular actualización - en producción se actualizaría en Oracle/JDE
            // Por ahora retornamos éxito para simular la operación
            return Json(new { exito = true, mensaje = "Producto actualizado correctamente" });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

// Clase auxiliar para solicitudes
public class SolicitudBuscarProductos
{
    public string? Categoria { get; set; }
    public string? Estado { get; set; }
    public decimal? PrecioMinimo { get; set; }
    public decimal? PrecioMaximo { get; set; }
}

public class SolicitudActualizarProducto
{
    public int IdProducto { get; set; }
    public decimal? PrecioUnitario { get; set; }
    public int? CantidadStock { get; set; }
    public string? Estado { get; set; }
    public string? Categoria { get; set; }
}
