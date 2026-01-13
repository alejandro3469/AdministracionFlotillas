using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Interfaz para el repositorio de Empleados
/// Define los métodos para acceder a datos de la tabla EMPLOYEES de Oracle HR
/// </summary>
public interface IEmployeesRepository
{
    /// <summary>
    /// Obtiene todos los empleados de la base de datos
    /// </summary>
    Task<List<Employee>> ObtenerEmployeesAsync();
    
    /// <summary>
    /// Obtiene un empleado específico por su ID
    /// </summary>
    /// <param name="id">ID del empleado a buscar</param>
    /// <returns>El empleado encontrado o null si no existe</returns>
    Task<Employee?> ObtenerEmployeePorIdAsync(int id);
}

