namespace AdministracionFlotillas.ModelosComunes;

public class Order
{
    public int OrderId { get; set; }
    public DateTime OrderTms { get; set; }  // ORDER_TMS en Oracle (TIMESTAMP)
    public int CustomerId { get; set; }
    public string OrderStatus { get; set; } = string.Empty;  // COMPLETE, CANCELLED, REFUNDED
    public int StoreId { get; set; }
}
