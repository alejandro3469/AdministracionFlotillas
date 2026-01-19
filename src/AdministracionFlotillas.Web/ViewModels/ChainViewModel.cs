namespace AdministracionFlotillas.Web.ViewModels;

public class ChainViewModel
{
    public int IdCadena { get; set; }
    public string NombreCadena { get; set; } = string.Empty;
    public string RazonSocial { get; set; } = string.Empty;
    public string RFC { get; set; } = string.Empty;
    public int NumeroSucursales { get; set; }
    public decimal LimiteCredito { get; set; }
    public int DiasCredito { get; set; }
    public string Estado { get; set; } = "ACTIVE";
    public DateTime FechaRegistro { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
    public string Ciudad { get; set; } = string.Empty;
    public string EstadoDireccion { get; set; } = string.Empty;
    public string CodigoPostal { get; set; } = string.Empty;
    public string Pais { get; set; } = "México";
    public decimal TotalOrdenes { get; set; }
    public decimal TotalVentas { get; set; }
}
