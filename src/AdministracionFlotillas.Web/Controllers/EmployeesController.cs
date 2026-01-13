using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.ViewModels;
using AdministracionFlotillas.Web.Parseador;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class EmployeesController : Controller
{
    private readonly IEmployeesService _servicio;
    
    public EmployeesController(IEmployeesService servicio)
    {
        _servicio = servicio;
    }
    
    /// <summary>
    /// Vista principal de empleados
    /// </summary>
    public IActionResult Index()
    {
        return View();
    }
    
    /// <summary>
    /// Endpoint AJAX para obtener todos los empleados
    /// </summary>
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerEmployees()
    {
        try
        {
            var empleados = await _servicio.ObtenerEmployeesAsync();
            var modelosVista = EmployeeParseador.ConvertirListaAVista(empleados);
            
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    /// <summary>
    /// Endpoint AJAX para obtener un empleado por ID
    /// </summary>
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerEmployeePorId([FromBody] int id)
    {
        try
        {
            var empleado = await _servicio.ObtenerEmployeePorIdAsync(id);
            if (empleado == null)
            {
                return Json(new { exito = false, mensaje = "Empleado no encontrado" });
            }
            
            var modeloVista = EmployeeParseador.ConvertirAVista(empleado);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

