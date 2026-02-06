namespace AdministracionFlotillas.Web.ViewModels;

/// <summary>
/// ViewModel para la entidad Empleado
/// Usado para mostrar datos en las vistas
/// Todas las propiedades están en español
/// </summary>
public class EmployeeViewModel
{
    public int IdEmpleado { get; set; }
    public string? PrimerNombre { get; set; }
    public string? Apellido { get; set; }
    public string CorreoElectronico { get; set; } = string.Empty;
    public string? EmailPersonal { get; set; }
    public string? NumeroTelefono { get; set; }
    public string FechaContratacion { get; set; } = string.Empty; // String formateado para UI
    public int IdPuesto { get; set; }
    public string? Salario { get; set; } // String formateado para UI (ej: "$24,000.00")
    public string? SalarioAnual { get; set; }
    public string? PorcentajeComision { get; set; } // String formateado para UI (ej: "15.50%")
    public int? IdGerente { get; set; }
    public int? IdDepartamento { get; set; }
    public string? NombreCompleto { get; set; } // Computado: PrimerNombre + Apellido
    public string? NombreDepartamento { get; set; } // Para mostrar en la vista
    public string? TituloPuesto { get; set; } // Para mostrar en la vista
}
