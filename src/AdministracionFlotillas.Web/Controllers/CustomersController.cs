using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class CustomersController : Controller
{
    public IActionResult Index()
    {
        var breadcrumb = new BreadcrumbViewModel
        {
            Items = new List<BreadcrumbItem>
            {
                new BreadcrumbItem { Text = "Dashboard", Url = Url.Action("Index", "Home") },
                new BreadcrumbItem { Text = "Catálogos", Url = "#" },
                new BreadcrumbItem { Text = "Clientes", Url = null }
            }
        };
        ViewBag.Breadcrumb = breadcrumb;
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerCustomers()
    {
        try
        {
            // Datos mock - simular integración con Oracle/JDE
            var clientes = new List<CustomerViewModel>
            {
                new CustomerViewModel
                {
                    IdCliente = 1,
                    NombreCliente = "Cliente A",
                    Email = "clientea@example.com",
                    Telefono = "555-0101",
                    Direccion = "Calle Principal 123",
                    Ciudad = "Ciudad A",
                    Estado = "Estado A",
                    CodigoPostal = "12345",
                    Pais = "México",
                    EstadoCliente = "ACTIVE",
                    FechaRegistro = DateTime.Now.AddMonths(-6),
                    LimiteCredito = 50000.00m,
                    TotalOrdenes = 15,
                    TotalCompras = 12500.00m
                },
                new CustomerViewModel
                {
                    IdCliente = 2,
                    NombreCliente = "Cliente B",
                    Email = "clienteb@example.com",
                    Telefono = "555-0102",
                    Direccion = "Avenida Central 456",
                    Ciudad = "Ciudad B",
                    Estado = "Estado B",
                    CodigoPostal = "23456",
                    Pais = "México",
                    EstadoCliente = "ACTIVE",
                    FechaRegistro = DateTime.Now.AddMonths(-3),
                    LimiteCredito = 75000.00m,
                    TotalOrdenes = 8,
                    TotalCompras = 8900.00m
                },
                new CustomerViewModel
                {
                    IdCliente = 3,
                    NombreCliente = "Cliente C",
                    Email = "clientec@example.com",
                    Telefono = "555-0103",
                    Direccion = "Boulevard Norte 789",
                    Ciudad = "Ciudad C",
                    Estado = "Estado C",
                    CodigoPostal = "34567",
                    Pais = "México",
                    EstadoCliente = "ACTIVE",
                    FechaRegistro = DateTime.Now.AddMonths(-12),
                    LimiteCredito = 100000.00m,
                    TotalOrdenes = 32,
                    TotalCompras = 45600.00m
                },
                new CustomerViewModel
                {
                    IdCliente = 4,
                    NombreCliente = "Cliente D",
                    Email = "cliented@example.com",
                    Telefono = "555-0104",
                    Direccion = "Plaza Sur 321",
                    Ciudad = "Ciudad D",
                    Estado = "Estado D",
                    CodigoPostal = "45678",
                    Pais = "México",
                    EstadoCliente = "INACTIVE",
                    FechaRegistro = DateTime.Now.AddMonths(-24),
                    LimiteCredito = 30000.00m,
                    TotalOrdenes = 5,
                    TotalCompras = 3200.00m
                }
            };
            
            return Json(new { exito = true, datos = clientes });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult BuscarCustomers([FromBody] SolicitudBuscarClientes solicitud)
    {
        try
        {
            // Simular búsqueda - en producción vendría de Oracle/JDE
            var todosClientes = new List<CustomerViewModel>
            {
                new CustomerViewModel { IdCliente = 1, NombreCliente = "Cliente A", Email = "clientea@example.com", EstadoCliente = "ACTIVE", TotalOrdenes = 15, TotalCompras = 12500.00m },
                new CustomerViewModel { IdCliente = 2, NombreCliente = "Cliente B", Email = "clienteb@example.com", EstadoCliente = "ACTIVE", TotalOrdenes = 8, TotalCompras = 8900.00m },
                new CustomerViewModel { IdCliente = 3, NombreCliente = "Cliente C", Email = "clientec@example.com", EstadoCliente = "ACTIVE", TotalOrdenes = 32, TotalCompras = 45600.00m },
                new CustomerViewModel { IdCliente = 4, NombreCliente = "Cliente D", Email = "cliented@example.com", EstadoCliente = "INACTIVE", TotalOrdenes = 5, TotalCompras = 3200.00m }
            };
            
            var clientesFiltrados = todosClientes;
            
            if (!string.IsNullOrEmpty(solicitud.Estado))
            {
                clientesFiltrados = clientesFiltrados.Where(c => c.EstadoCliente == solicitud.Estado).ToList();
            }
            
            if (!string.IsNullOrEmpty(solicitud.Nombre))
            {
                clientesFiltrados = clientesFiltrados.Where(c => c.NombreCliente.Contains(solicitud.Nombre, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            
            return Json(new { exito = true, datos = clientesFiltrados });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public IActionResult ObtenerCustomerPorId([FromBody] int idCliente)
    {
        try
        {
            // Simular obtención de cliente por ID - en producción vendría de Oracle/JDE
            var todosClientes = new List<CustomerViewModel>
            {
                new CustomerViewModel { IdCliente = 1, NombreCliente = "Cliente A", Email = "clientea@example.com", Telefono = "555-0101", Direccion = "Calle Principal 123", Ciudad = "Ciudad A", Estado = "Estado A", CodigoPostal = "12345", Pais = "México", EstadoCliente = "ACTIVE", FechaRegistro = DateTime.Now.AddMonths(-6), LimiteCredito = 50000.00m, TotalOrdenes = 15, TotalCompras = 12500.00m },
                new CustomerViewModel { IdCliente = 2, NombreCliente = "Cliente B", Email = "clienteb@example.com", Telefono = "555-0102", Direccion = "Avenida Central 456", Ciudad = "Ciudad B", Estado = "Estado B", CodigoPostal = "23456", Pais = "México", EstadoCliente = "ACTIVE", FechaRegistro = DateTime.Now.AddMonths(-4), LimiteCredito = 30000.00m, TotalOrdenes = 8, TotalCompras = 8900.00m },
                new CustomerViewModel { IdCliente = 3, NombreCliente = "Cliente C", Email = "clientec@example.com", Telefono = "555-0103", Direccion = "Boulevard Norte 789", Ciudad = "Ciudad C", Estado = "Estado C", CodigoPostal = "34567", Pais = "México", EstadoCliente = "ACTIVE", FechaRegistro = DateTime.Now.AddMonths(-12), LimiteCredito = 75000.00m, TotalOrdenes = 32, TotalCompras = 45600.00m },
                new CustomerViewModel { IdCliente = 4, NombreCliente = "Cliente D", Email = "cliented@example.com", Telefono = "555-0104", Direccion = "Calle Sur 321", Ciudad = "Ciudad D", Estado = "Estado D", CodigoPostal = "45678", Pais = "México", EstadoCliente = "INACTIVE", FechaRegistro = DateTime.Now.AddMonths(-18), LimiteCredito = 20000.00m, TotalOrdenes = 5, TotalCompras = 3200.00m }
            };
            
            var cliente = todosClientes.FirstOrDefault(c => c.IdCliente == idCliente);
            
            if (cliente == null)
            {
                return Json(new { exito = false, mensaje = "Cliente no encontrado" });
            }
            
            return Json(new { exito = true, datos = cliente });
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
                totalClientes = 156,
                clientesActivos = 142,
                clientesInactivos = 14,
                clientesNuevos = 8 // Últimos 30 días
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
public class SolicitudBuscarClientes
{
    public string? Nombre { get; set; }
    public string? Estado { get; set; }
}
