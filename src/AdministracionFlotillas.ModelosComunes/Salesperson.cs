namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Modelo de dominio para Vendedores (intermediarios)
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class Salesperson
{
    public int SalespersonId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string CoverageZone { get; set; } = string.Empty; // Zona de cobertura
    public decimal BaseCommission { get; set; } // Comisión base (%)
    public decimal VariableCommission { get; set; } // Comisión variable (%)
    public string Status { get; set; } = "ACTIVE"; // ACTIVE, INACTIVE, ON_LEAVE
    public DateTime HireDate { get; set; }
    public int TotalOrders { get; set; }
    public decimal TotalSales { get; set; }
    public decimal TotalCommissions { get; set; }
    public int AssignedChains { get; set; } // Número de cadenas asignadas
}
