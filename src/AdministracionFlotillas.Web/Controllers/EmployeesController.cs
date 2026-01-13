using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class EmployeesController : Controller
{
    private readonly IEmployeesService _service;
    private readonly IMapper _mapper;
    
    public EmployeesController(IEmployeesService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }
    
    // Vista principal
    public IActionResult Index()
    {
        return View();
    }
    
    // Endpoint AJAX para obtener employees
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerEmployees()
    {
        try
        {
            var employees = await _service.ObtenerEmployeesAsync();
            var viewModels = _mapper.Map<List<EmployeeViewModel>>(employees);
            
            return Json(new { success = true, data = viewModels });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = ex.Message });
        }
    }
    
    // Endpoint AJAX para obtener employee por ID
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerEmployeePorId([FromBody] int id)
    {
        try
        {
            var employee = await _service.ObtenerEmployeePorIdAsync(id);
            if (employee == null)
            {
                return Json(new { success = false, message = "Employee no encontrado" });
            }
            
            var viewModel = _mapper.Map<EmployeeViewModel>(employee);
            return Json(new { success = true, data = viewModel });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = ex.Message });
        }
    }
}

