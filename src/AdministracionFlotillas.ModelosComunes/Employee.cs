using System;

namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Modelo de negocio para la tabla EMPLOYEES de Oracle HR
/// Basado en la estructura estándar de la base de datos HR
/// </summary>
public class Employee
{
    public int EmployeeId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Email personal alternativo del empleado (opcional)
    /// </summary>
    public string? EmailPersonal {  get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime HireDate { get; set; }
    public int JobId { get; set; }
    public decimal? Salary { get; set; }
    public decimal? CommissionPct { get; set; }
    public int? ManagerId { get; set; }
    public int? DepartmentId { get; set; }
    
    public int? Antiguedad { get; set; }
    
    public string? NombreDepartamento { get; set; }
}

