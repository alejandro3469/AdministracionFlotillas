namespace AdministracionFlotillas.Web.ViewModels;

public class InvoiceViewModel
{
    public int IdFactura { get; set; }
    public int IdOrden { get; set; }
    public string Folio { get; set; } = string.Empty;
    public string UUID { get; set; } = string.Empty;
    public string RFCEmisor { get; set; } = string.Empty;
    public string RFCReceptor { get; set; } = string.Empty;
    public DateTime FechaEmision { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Impuesto { get; set; }
    public decimal Total { get; set; }
    public string Estado { get; set; } = "DRAFT";
    public string MetodoPago { get; set; } = "PUE";
    public string FormaPago { get; set; } = "03";
    public string Moneda { get; set; } = "MXN";
    public DateTime? FechaCancelacion { get; set; }
    public string MotivoCancelacion { get; set; } = string.Empty;
    public string RutaXML { get; set; } = string.Empty;
    public string RutaPDF { get; set; } = string.Empty;
}
