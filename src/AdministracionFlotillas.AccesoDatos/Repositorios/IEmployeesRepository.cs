using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Interfaz para el repositorio de Employees
/// Define los métodos para acceder a datos de la tabla EMPLOYEES
/// </summary>
public interface IEmployeesRepository
{
    Task<List<Employee>> ObtenerEmployeesAsync();
    Task<Employee?> ObtenerEmployeePorIdAsync(int id);
}

