namespace AdministracionFlotillas.Web.ViewModels;

public class CustomerViewModel
{
    public int IdCliente { get; set; }
    public string NombreCliente { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Telefono { get; set; }
    public string? Direccion { get; set; }
    public string? Ciudad { get; set; }
    public string? Estado { get; set; }
    public string? CodigoPostal { get; set; }
    public string? Pais { get; set; }
    public string EstadoCliente { get; set; } = "ACTIVE";
    public DateTime? FechaRegistro { get; set; }
    public decimal? LimiteCredito { get; set; }
    public int TotalOrdenes { get; set; }
    public decimal TotalCompras { get; set; }
}
