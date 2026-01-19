namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Representa un producto en el catálogo
/// </summary>
public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int StockQuantity { get; set; }
    public string Status { get; set; } = "ACTIVE"; // ACTIVE, INACTIVE, DISCONTINUED
    public string? ImageUrl { get; set; }
    public string? Barcode { get; set; }
    public decimal CostPrice { get; set; }
}
