using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

/// <summary>
/// Interfaz para el servicio de Employees
/// Define las reglas de negocio para la entidad Employee
/// </summary>
public interface IEmployeesService
{
    Task<List<Employee>> ObtenerEmployeesAsync();
    Task<Employee?> ObtenerEmployeePorIdAsync(int id);
}

