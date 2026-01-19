namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Representa un item individual de una orden (línea de factura)
/// </summary>
public class OrderItem
{
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Discount { get; set; } = 0;
    public decimal Subtotal { get; set; }
    public decimal Tax { get; set; } = 0;
    public decimal Total { get; set; }
}
