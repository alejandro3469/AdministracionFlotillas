namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Modelo de dominio para Adendas (contratos especiales para clientes grandes)
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class Addendum
{
    public int AddendumId { get; set; }
    public int ChainId { get; set; }
    public string ChainName { get; set; } = string.Empty;
    public string AddendumName { get; set; } = string.Empty;
    public decimal SpecialDiscount { get; set; } // Descuento especial (%)
    public int CreditDays { get; set; } // Días de crédito extendidos
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; } = "ACTIVE"; // ACTIVE, EXPIRED, CANCELLED
    public string SpecialConditions { get; set; } = string.Empty; // Condiciones especiales
    public DateTime CreationDate { get; set; }
    public DateTime? LastRenewalDate { get; set; }
    public bool AutoRenewal { get; set; } // Renovación automática
    public decimal MinimumOrderAmount { get; set; } // Monto mínimo de pedido
}
