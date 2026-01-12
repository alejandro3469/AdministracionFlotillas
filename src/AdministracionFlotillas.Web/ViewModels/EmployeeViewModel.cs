namespace AdministracionFlotillas.Web.ViewModels;

/// <summary>
/// ViewModel para la entidad Employee
/// Usado para mostrar datos en las vistas
/// </summary>
public class EmployeeViewModel
{
    public int EmployeeId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string HireDate { get; set; } = string.Empty; // String para UI
    public int JobId { get; set; }
    public string? Salary { get; set; } // String formateado para UI
    public string? CommissionPct { get; set; } // String formateado para UI
    public int? ManagerId { get; set; }
    public int? DepartmentId { get; set; }
    public string? FullName { get; set; } // Computado: FirstName + LastName
    public string? DepartmentName { get; set; } // Para mostrar en la vista
    public string? JobTitle { get; set; } // Para mostrar en la vista
}

