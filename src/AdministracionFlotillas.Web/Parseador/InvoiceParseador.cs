using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

public static class InvoiceParseador
{
    public static InvoiceViewModel ConvertirAVista(Invoice invoice)
    {
        if (invoice == null)
        {
            throw new ArgumentNullException(nameof(invoice));
        }

        return new InvoiceViewModel
        {
            IdFactura = invoice.InvoiceId,
            IdOrden = invoice.OrderId,
            Folio = invoice.Folio,
            UUID = invoice.UUID,
            RFCEmisor = invoice.IssuerRFC,
            RFCReceptor = invoice.ReceiverRFC,
            FechaEmision = invoice.IssueDate,
            Subtotal = invoice.Subtotal,
            Impuesto = invoice.Tax,
            Total = invoice.Total,
            Estado = invoice.Status,
            MetodoPago = invoice.PaymentMethod,
            FormaPago = invoice.PaymentForm,
            Moneda = invoice.Currency,
            FechaCancelacion = invoice.CancellationDate,
            MotivoCancelacion = invoice.CancellationReason,
            RutaXML = invoice.XMLPath,
            RutaPDF = invoice.PDFPath
        };
    }

    public static List<InvoiceViewModel> ConvertirListaAVista(List<Invoice> invoices)
    {
        if (invoices == null)
        {
            return new List<InvoiceViewModel>();
        }

        return invoices.Select(ConvertirAVista).ToList();
    }
}
