namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Modelo de dominio para Canales de Pedidos
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class OrderChannel
{
    public int ChannelId { get; set; }
    public string ChannelName { get; set; } = string.Empty;
    public string ChannelType { get; set; } = string.Empty; // MOBILE, CALL_CENTER, EMAIL, WEB
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "ACTIVE"; // ACTIVE, INACTIVE, MAINTENANCE
    public int TotalOrders { get; set; }
    public decimal ConversionRate { get; set; } // Tasa de conversión (%)
    public decimal AverageOrderValue { get; set; } // Valor promedio de pedido
    public DateTime CreationDate { get; set; }
    public DateTime? LastOrderDate { get; set; }
    public int OrdersToday { get; set; }
    public int OrdersThisMonth { get; set; }
    public decimal Efficiency { get; set; } // Eficiencia del canal (%)
}
