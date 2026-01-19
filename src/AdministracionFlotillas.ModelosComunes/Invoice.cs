namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Modelo de dominio para Facturas CFDI (Facturación Electrónica)
/// Adaptado de requerimientos de Cremería Americana - Compliance SAT
/// </summary>
public class Invoice
{
    public int InvoiceId { get; set; }
    public int OrderId { get; set; }
    public string Folio { get; set; } = string.Empty; // Folio fiscal
    public string UUID { get; set; } = string.Empty; // UUID del CFDI
    public string IssuerRFC { get; set; } = string.Empty; // RFC del emisor
    public string ReceiverRFC { get; set; } = string.Empty; // RFC del receptor
    public DateTime IssueDate { get; set; } // Fecha de emisión
    public decimal Subtotal { get; set; }
    public decimal Tax { get; set; } // IVA
    public decimal Total { get; set; }
    public string Status { get; set; } = "DRAFT"; // DRAFT, STAMPED, CANCELLED, PAID
    public string PaymentMethod { get; set; } = "PUE"; // PUE (Pago en una exhibición), PPD (Pago en parcialidades)
    public string PaymentForm { get; set; } = "03"; // 03 = Transferencia electrónica
    public string Currency { get; set; } = "MXN";
    public DateTime? CancellationDate { get; set; }
    public string CancellationReason { get; set; } = string.Empty;
    public string XMLPath { get; set; } = string.Empty; // Ruta al XML del CFDI
    public string PDFPath { get; set; } = string.Empty; // Ruta al PDF
}
