using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.AccesoDatos.Repositorios;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

/// <summary>
/// Implementación de reglas de negocio para Employees en escenario Oracle
/// Aplica validaciones y lógica específica para Oracle Database
/// </summary>
public class EmployeesServiceOracle : IEmployeesService
{
    private readonly IEmployeesRepository _repositorio;
    
    public EmployeesServiceOracle(IEmployeesRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    /// <summary>
    /// Obtiene todos los empleados aplicando reglas de negocio
    /// </summary>
    public async Task<List<Employee>> ObtenerEmployeesAsync()
    {
        // Reglas de negocio específicas para Oracle
        var empleados = await _repositorio.ObtenerEmployeesAsync();
        
        // Validaciones específicas para Oracle
        // Ejemplo: Filtrar empleados activos (con salario > 0)
        return empleados.Where(empleado => empleado.Salary > 0).ToList();
    }
    
    /// <summary>
    /// Obtiene un empleado por ID aplicando validaciones de negocio
    /// </summary>
    public async Task<Employee?> ObtenerEmployeePorIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        return await _repositorio.ObtenerEmployeePorIdAsync(id);
    }
}

