namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Modelo de dominio para Cadenas Comerciales (clientes corporativos grandes)
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class Chain
{
    public int ChainId { get; set; }
    public string ChainName { get; set; } = string.Empty;
    public string BusinessName { get; set; } = string.Empty;
    public string RFC { get; set; } = string.Empty;
    public int NumberOfStores { get; set; }
    public decimal CreditLimit { get; set; }
    public int CreditDays { get; set; }
    public string Status { get; set; } = "ACTIVE"; // ACTIVE, INACTIVE, SUSPENDED
    public DateTime RegistrationDate { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string Country { get; set; } = "México";
    public decimal TotalOrders { get; set; }
    public decimal TotalSales { get; set; }
}
