using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

/// <summary>
/// Interfaz para el servicio de Empleados
/// Define las reglas de negocio para la entidad Employee
/// </summary>
public interface IEmployeesService
{
    /// <summary>
    /// Obtiene todos los empleados aplicando reglas de negocio
    /// </summary>
    Task<List<Employee>> ObtenerEmployeesAsync();
    
    /// <summary>
    /// Obtiene un empleado por ID aplicando validaciones de negocio
    /// </summary>
    /// <param name="id">ID del empleado a buscar</param>
    /// <returns>El empleado encontrado o null si no existe</returns>
    Task<Employee?> ObtenerEmployeePorIdAsync(int id);
}

