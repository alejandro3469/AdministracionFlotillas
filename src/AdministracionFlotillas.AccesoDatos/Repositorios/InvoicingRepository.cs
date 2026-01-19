using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio de Facturas CFDI con datos mock
/// Adaptado de requerimientos de Cremería Americana - Compliance SAT
/// </summary>
public class InvoicingRepository : IInvoicingRepository
{
    private readonly List<Invoice> _invoicesMock = new()
    {
        new Invoice
        {
            InvoiceId = 1,
            OrderId = 1001,
            Folio = "FAC-2024-0001",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CON123456ABC",
            IssueDate = new DateTime(2024, 1, 15, 10, 30, 0),
            Subtotal = 10000.00m,
            Tax = 1600.00m,
            Total = 11600.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0001.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0001.pdf"
        },
        new Invoice
        {
            InvoiceId = 2,
            OrderId = 1002,
            Folio = "FAC-2024-0002",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "SDS789012DEF",
            IssueDate = new DateTime(2024, 1, 16, 14, 15, 0),
            Subtotal = 15000.00m,
            Tax = 2400.00m,
            Total = 17400.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0002.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0002.pdf"
        },
        new Invoice
        {
            InvoiceId = 3,
            OrderId = 1003,
            Folio = "FAC-2024-0003",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "TDC345678GHI",
            IssueDate = new DateTime(2024, 1, 17, 9, 0, 0),
            Subtotal = 8500.00m,
            Tax = 1360.00m,
            Total = 9860.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0003.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0003.pdf"
        },
        new Invoice
        {
            InvoiceId = 4,
            OrderId = 1004,
            Folio = "FAC-2024-0004",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "MRE901234JKL",
            IssueDate = new DateTime(2024, 1, 18, 11, 45, 0),
            Subtotal = 22000.00m,
            Tax = 3520.00m,
            Total = 25520.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0004.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0004.pdf"
        },
        new Invoice
        {
            InvoiceId = 5,
            OrderId = 1005,
            Folio = "FAC-2024-0005",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "DIN567890MNO",
            IssueDate = new DateTime(2024, 1, 19, 16, 20, 0),
            Subtotal = 35000.00m,
            Tax = 5600.00m,
            Total = 40600.00m,
            Status = "STAMPED",
            PaymentMethod = "PPD",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0005.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0005.pdf"
        },
        new Invoice
        {
            InvoiceId = 6,
            OrderId = 1006,
            Folio = "FAC-2024-0006",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CES234567PQR",
            IssueDate = new DateTime(2024, 1, 20, 10, 0, 0),
            Subtotal = 12000.00m,
            Tax = 1920.00m,
            Total = 13920.00m,
            Status = "DRAFT",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = string.Empty,
            PDFPath = string.Empty
        },
        new Invoice
        {
            InvoiceId = 7,
            OrderId = 1007,
            Folio = "FAC-2024-0007",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "STO678901STU",
            IssueDate = new DateTime(2024, 1, 21, 13, 30, 0),
            Subtotal = 9500.00m,
            Tax = 1520.00m,
            Total = 11020.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0007.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0007.pdf"
        },
        new Invoice
        {
            InvoiceId = 8,
            OrderId = 1008,
            Folio = "FAC-2024-0008",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CPR890123VWX",
            IssueDate = new DateTime(2024, 1, 22, 9, 15, 0),
            Subtotal = 18000.00m,
            Tax = 2880.00m,
            Total = 20880.00m,
            Status = "CANCELLED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = new DateTime(2024, 1, 23, 10, 0, 0),
            CancellationReason = "Cancelación solicitada por el cliente",
            XMLPath = "/facturas/xml/FAC-2024-0008.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0008.pdf"
        }
    };

    public Task<List<Invoice>> ObtenerInvoicesAsync()
    {
        return Task.FromResult(_invoicesMock.ToList());
    }

    public Task<Invoice?> ObtenerInvoicePorIdAsync(int idFactura)
    {
        var invoice = _invoicesMock.FirstOrDefault(i => i.InvoiceId == idFactura);
        return Task.FromResult(invoice);
    }

    public Task<List<Invoice>> BuscarInvoicesAsync(int? idOrden, string? estado, DateTime? fechaInicio, DateTime? fechaFin)
    {
        var resultado = _invoicesMock.AsQueryable();

        if (idOrden.HasValue)
        {
            resultado = resultado.Where(i => i.OrderId == idOrden.Value);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            resultado = resultado.Where(i => i.Status == estado);
        }

        if (fechaInicio.HasValue)
        {
            resultado = resultado.Where(i => i.IssueDate >= fechaInicio.Value);
        }

        if (fechaFin.HasValue)
        {
            resultado = resultado.Where(i => i.IssueDate <= fechaFin.Value);
        }

        return Task.FromResult(resultado.ToList());
    }
}
