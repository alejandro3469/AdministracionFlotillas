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
    private readonly IEmployeesRepository _repository;
    
    public EmployeesServiceOracle(IEmployeesRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<List<Employee>> ObtenerEmployeesAsync()
    {
        // Reglas de negocio específicas para Oracle
        var employees = await _repository.ObtenerEmployeesAsync();
        
        // Validaciones específicas para Oracle
        // Ejemplo: Filtrar empleados activos (con salario > 0)
        return employees.Where(e => e.Salary > 0).ToList();
    }
    
    public async Task<Employee?> ObtenerEmployeePorIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        return await _repository.ObtenerEmployeePorIdAsync(id);
    }
}

