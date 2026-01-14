using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.AccesoDatos.Repositorios;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

/// <summary>
/// Implementación de reglas de negocio para Employees en escenario Oracle
/// Aplica validaciones y lógica de negocio específica para Oracle Database
/// </summary>
public class EmployeesServiceOracle : IEmployeesService
{
    private readonly IEmployeesRepository _repositorio;
    private const decimal SalarioMinimo = 1000m;
    private const int AntiguedadMinimaParaBonificacion = 1;
    private const decimal SalarioMinimoParaBonificacion = 2000m;
    
    public EmployeesServiceOracle(IEmployeesRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    /// <summary>
    /// Obtiene todos los empleados aplicando reglas de negocio
    /// </summary>
    public async Task<List<Employee>> ObtenerEmployeesAsync()
    {
        var empleados = await _repositorio.ObtenerEmployeesAsync();
        
        // Regla de negocio: Solo mostrar empleados con salario válido
        var empleadosValidos = empleados.Where(empleado => ValidarSalarioValido(empleado)).ToList();
        
        // Regla de negocio: Ordenar por antigüedad (más antiguos primero)
        return empleadosValidos.OrderByDescending(empleado => CalcularAntiguedadEnAnios(empleado)).ToList();
    }
    
    /// <summary>
    /// Obtiene un empleado por ID aplicando validaciones de negocio
    /// </summary>
    public async Task<Employee?> ObtenerEmployeePorIdAsync(int id)
    {
        ValidarIdEmpleado(id);
        
        var empleado = await _repositorio.ObtenerEmployeePorIdAsync(id);
        
        if (empleado == null)
            return null;
        
        // Regla de negocio: Validar que el empleado cumple criterios de negocio
        if (!ValidarSalarioValido(empleado))
            throw new InvalidOperationException($"El empleado con ID {id} no cumple con los criterios salariales del sistema");
        
        if (!ValidarSalarioMayorADiezMil(empleado))
            throw new InvalidOperationException($"El empleado con ID {id} no es mayor a diez mil");
        
        return empleado;
    }
    
    /// <summary>
    /// Obtiene empleados activos con salario mayor al mínimo establecido
    /// </summary>
    public async Task<List<Employee>> ObtenerEmployeesActivosConSalarioMinimoAsync(decimal salarioMinimo)
    {
        var empleados = await _repositorio.ObtenerEmployeesAsync();
        
        // Regla de negocio: Filtrar por salario mínimo y aplicar validaciones
        return empleados
            .Where(empleado => ValidarSalarioValido(empleado) && 
                              empleado.Salary >= salarioMinimo)
            .OrderByDescending(empleado => empleado.Salary)
            .ToList();
    }
    
    /// <summary>
    /// Calcula la antigüedad de un empleado en años
    /// </summary>
    public int CalcularAntiguedadEnAnios(Employee empleado)
    {
        if (empleado == null)
            throw new ArgumentNullException(nameof(empleado));
        
        var fechaActual = DateTime.Now;
        var antiguedad = fechaActual.Year - empleado.HireDate.Year;
        
        // Ajustar si aún no ha cumplido el año
        if (fechaActual.Month < empleado.HireDate.Month || 
            (fechaActual.Month == empleado.HireDate.Month && fechaActual.Day < empleado.HireDate.Day))
        {
            antiguedad--;
        }
        
        empleado.Antiguedad = antiguedad;
        
        return Math.Max(0, antiguedad);
    }
    
    /// <summary>
    /// Valida si un empleado es elegible para bonificación según reglas de negocio
    /// </summary>
    public bool EsElegibleParaBonificacion(Employee empleado)
    {
        if (empleado == null)
            return false;
        
        var antiguedad = CalcularAntiguedadEnAnios(empleado);
        var tieneSalarioValido = ValidarSalarioValido(empleado);
        var cumpleSalarioMinimo = empleado.Salary >= SalarioMinimoParaBonificacion;
        
        // Regla de negocio: Debe tener al menos 1 año de antigüedad y salario mínimo
        return antiguedad >= AntiguedadMinimaParaBonificacion && 
               tieneSalarioValido && 
               cumpleSalarioMinimo;
    }
    
    /// <summary>
    /// Calcula el salario anual estimado de un empleado incluyendo comisiones
    /// </summary>
    public decimal CalcularSalarioAnualEstimado(Employee empleado)
    {
        if (empleado == null)
            throw new ArgumentNullException(nameof(empleado));
        
        var salarioBase = empleado.Salary ?? 0m;
        var salarioAnual = salarioBase * 12;
        
        // Regla de negocio: Si tiene comisión, calcular comisión anual estimada
        if (empleado.CommissionPct.HasValue && empleado.CommissionPct.Value > 0)
        {
            // Estimación: comisión sobre ventas estimadas (asumiendo un promedio)
            var comisionAnualEstimada = salarioBase * empleado.CommissionPct.Value * 12;
            salarioAnual += comisionAnualEstimada;
        }
        
        return salarioAnual;
    }
    
    /// <summary>
    /// Valida que el salario del empleado cumple con los criterios de negocio
    /// </summary>
    private bool ValidarSalarioValido(Employee empleado)
    {
        if (empleado == null)
            return false;
        
        // Regla de negocio: El salario debe ser mayor al mínimo establecido
        return empleado.Salary.HasValue && empleado.Salary.Value >= SalarioMinimo;
    }
    
    private bool ValidarSalarioMayorADiezMil(Employee empleado)
    {
        if (empleado == null)
            return false;
        
        // Regla de negocio: El salario debe ser mayor al mínimo establecido
        return empleado.Salary.HasValue && empleado.Salary.Value > 10000;
    }
    
    /// <summary>
    /// Valida que el ID del empleado es válido según reglas de negocio
    /// </summary>
    private void ValidarIdEmpleado(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID del empleado debe ser mayor que cero", nameof(id));
    }
}

