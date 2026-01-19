namespace AdministracionFlotillas.Web.ViewModels;

public class SalespersonViewModel
{
    public int IdVendedor { get; set; }
    public string NombreCompleto { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string ZonaCobertura { get; set; } = string.Empty;
    public decimal ComisionBase { get; set; }
    public decimal ComisionVariable { get; set; }
    public string Estado { get; set; } = "ACTIVE";
    public DateTime FechaContratacion { get; set; }
    public int TotalOrdenes { get; set; }
    public decimal TotalVentas { get; set; }
    public decimal TotalComisiones { get; set; }
    public int CadenasAsignadas { get; set; }
}
