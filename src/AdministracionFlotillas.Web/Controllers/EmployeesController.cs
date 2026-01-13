using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class EmployeesController : Controller
{
    private readonly IEmployeesService _servicio;
    private readonly IMapper _mapeador;
    
    public EmployeesController(IEmployeesService servicio, IMapper mapeador)
    {
        _servicio = servicio;
        _mapeador = mapeador;
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
            var modelosVista = _mapeador.Map<List<EmployeeViewModel>>(empleados);
            
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
            
            var modeloVista = _mapeador.Map<EmployeeViewModel>(empleado);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

