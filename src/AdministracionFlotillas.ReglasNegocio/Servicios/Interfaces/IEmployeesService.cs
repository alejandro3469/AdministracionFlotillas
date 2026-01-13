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
    
    /// <summary>
    /// Obtiene empleados activos con salario mayor al mínimo establecido
    /// </summary>
    /// <param name="salarioMinimo">Salario mínimo requerido</param>
    /// <returns>Lista de empleados que cumplen los criterios de negocio</returns>
    Task<List<Employee>> ObtenerEmployeesActivosConSalarioMinimoAsync(decimal salarioMinimo);
    
    /// <summary>
    /// Calcula la antigüedad de un empleado en años
    /// </summary>
    /// <param name="empleado">Empleado para calcular antigüedad</param>
    /// <returns>Antigüedad en años</returns>
    int CalcularAntiguedadEnAnios(Employee empleado);
    
    /// <summary>
    /// Valida si un empleado es elegible para bonificación según reglas de negocio
    /// </summary>
    /// <param name="empleado">Empleado a validar</param>
    /// <returns>True si es elegible, false en caso contrario</returns>
    bool EsElegibleParaBonificacion(Employee empleado);
    
    /// <summary>
    /// Calcula el salario anual estimado de un empleado incluyendo comisiones
    /// </summary>
    /// <param name="empleado">Empleado para calcular salario anual</param>
    /// <returns>Salario anual estimado</returns>
    decimal CalcularSalarioAnualEstimado(Employee empleado);
}

