using System;
using System.Threading.Tasks;
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
    /// El Service aplica reglas de negocio y devuelve datos listos para la vista
    /// </summary>
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerEmployees()
    {
        try
        {
            var empleados = await _servicio.ObtenerEmployeesAsync();
            var modelosVista = EmployeeParseador.ConvertirListaAVista(empleados);
            
            return CrearRespuestaExito(modelosVista);
        }
        catch (Exception excepcion)
        {
            return CrearRespuestaError(excepcion.Message);
        }
    }
    
    /// <summary>
    /// Endpoint AJAX para obtener un empleado por ID
    /// El Service valida y aplica reglas de negocio antes de devolver
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
                return CrearRespuestaError("Empleado no encontrado");
            }
            
            var modeloVista = EmployeeParseador.ConvertirAVista(empleado);
            return CrearRespuestaExito(modeloVista);
        }
        catch (Exception excepcion)
        {
            return CrearRespuestaError(excepcion.Message);
        }
    }
    
    /// <summary>
    /// Crea una respuesta JSON de éxito
    /// </summary>
    private IActionResult CrearRespuestaExito(object datos)
    {
        return Json(new { exito = true, datos = datos });
    }
    
    /// <summary>
    /// Crea una respuesta JSON de error
    /// </summary>
    private IActionResult CrearRespuestaError(string mensaje)
    {
        return Json(new { exito = false, mensaje = mensaje });
    }
}

