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
        },
        // Escenarios adicionales para pruebas
        new Invoice
        {
            InvoiceId = 9,
            OrderId = 1009,
            Folio = "FAC-2024-0009",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "MEX123456YZA",
            IssueDate = new DateTime(2024, 1, 23, 11, 0, 0),
            Subtotal = 25000.00m,
            Tax = 4000.00m,
            Total = 29000.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0009.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0009.pdf"
        },
        new Invoice
        {
            InvoiceId = 10,
            OrderId = 1010,
            Folio = "FAC-2024-0010",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "DIL456789BCD",
            IssueDate = new DateTime(2024, 1, 24, 14, 30, 0),
            Subtotal = 5000.00m,
            Tax = 800.00m,
            Total = 5800.00m,
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
            InvoiceId = 11,
            OrderId = 1011,
            Folio = "FAC-2024-0011",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CON123456ABC",
            IssueDate = new DateTime(2024, 1, 25, 9, 15, 0),
            Subtotal = 45000.00m,
            Tax = 7200.00m,
            Total = 52200.00m,
            Status = "STAMPED",
            PaymentMethod = "PPD",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0011.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0011.pdf"
        },
        new Invoice
        {
            InvoiceId = 12,
            OrderId = 1012,
            Folio = "FAC-2024-0012",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "SDS789012DEF",
            IssueDate = new DateTime(2024, 1, 26, 16, 45, 0),
            Subtotal = 30000.00m,
            Tax = 4800.00m,
            Total = 34800.00m,
            Status = "PAID",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0012.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0012.pdf"
        },
        new Invoice
        {
            InvoiceId = 13,
            OrderId = 1013,
            Folio = "FAC-2024-0013",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "TDC345678GHI",
            IssueDate = new DateTime(2024, 1, 27, 10, 30, 0),
            Subtotal = 15000.00m,
            Tax = 2400.00m,
            Total = 17400.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "04",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0013.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0013.pdf"
        },
        new Invoice
        {
            InvoiceId = 14,
            OrderId = 1014,
            Folio = "FAC-2024-0014",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "MRE901234JKL",
            IssueDate = new DateTime(2024, 1, 28, 13, 0, 0),
            Subtotal = 80000.00m,
            Tax = 12800.00m,
            Total = 92800.00m,
            Status = "STAMPED",
            PaymentMethod = "PPD",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0014.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0014.pdf"
        },
        new Invoice
        {
            InvoiceId = 15,
            OrderId = 1015,
            Folio = "FAC-2024-0015",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "DIN567890MNO",
            IssueDate = new DateTime(2024, 1, 29, 8, 45, 0),
            Subtotal = 120000.00m,
            Tax = 19200.00m,
            Total = 139200.00m,
            Status = "CANCELLED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = new DateTime(2024, 1, 30, 10, 0, 0),
            CancellationReason = "Error en datos del cliente",
            XMLPath = "/facturas/xml/FAC-2024-0015.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0015.pdf"
        },
        new Invoice
        {
            InvoiceId = 16,
            OrderId = 1016,
            Folio = "FAC-2024-0016",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CES234567PQR",
            IssueDate = new DateTime(2024, 1, 30, 15, 20, 0),
            Subtotal = 55000.00m,
            Tax = 8800.00m,
            Total = 63800.00m,
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
            InvoiceId = 17,
            OrderId = 1017,
            Folio = "FAC-2024-0017",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "STO678901STU",
            IssueDate = new DateTime(2024, 1, 31, 11, 30, 0),
            Subtotal = 28000.00m,
            Tax = 4480.00m,
            Total = 32480.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0017.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0017.pdf"
        },
        new Invoice
        {
            InvoiceId = 18,
            OrderId = 1018,
            Folio = "FAC-2024-0018",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CPR890123VWX",
            IssueDate = new DateTime(2024, 2, 1, 9, 0, 0),
            Subtotal = 65000.00m,
            Tax = 10400.00m,
            Total = 75400.00m,
            Status = "PAID",
            PaymentMethod = "PPD",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0018.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0018.pdf"
        },
        new Invoice
        {
            InvoiceId = 19,
            OrderId = 1019,
            Folio = "FAC-2024-0019",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "MEX123456YZA",
            IssueDate = new DateTime(2024, 2, 2, 14, 15, 0),
            Subtotal = 95000.00m,
            Tax = 15200.00m,
            Total = 110200.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0019.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0019.pdf"
        },
        new Invoice
        {
            InvoiceId = 20,
            OrderId = 1020,
            Folio = "FAC-2024-0020",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CON123456ABC",
            IssueDate = new DateTime(2024, 2, 3, 10, 45, 0),
            Subtotal = 150000.00m,
            Tax = 24000.00m,
            Total = 174000.00m,
            Status = "STAMPED",
            PaymentMethod = "PPD",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0020.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0020.pdf"
        },
        new Invoice
        {
            InvoiceId = 21,
            OrderId = 1021,
            Folio = "FAC-2024-0021",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "SDS789012DEF",
            IssueDate = new DateTime(2024, 2, 4, 16, 30, 0),
            Subtotal = 32000.00m,
            Tax = 5120.00m,
            Total = 37120.00m,
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
            InvoiceId = 22,
            OrderId = 1022,
            Folio = "FAC-2024-0022",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "TDC345678GHI",
            IssueDate = new DateTime(2024, 2, 5, 8, 0, 0),
            Subtotal = 75000.00m,
            Tax = 12000.00m,
            Total = 87000.00m,
            Status = "CANCELLED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = new DateTime(2024, 2, 6, 9, 0, 0),
            CancellationReason = "Cliente solicitó cancelación",
            XMLPath = "/facturas/xml/FAC-2024-0022.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0022.pdf"
        },
        new Invoice
        {
            InvoiceId = 23,
            OrderId = 1023,
            Folio = "FAC-2024-0023",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "MRE901234JKL",
            IssueDate = new DateTime(2024, 2, 6, 12, 0, 0),
            Subtotal = 180000.00m,
            Tax = 28800.00m,
            Total = 208800.00m,
            Status = "PAID",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0023.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0023.pdf"
        },
        new Invoice
        {
            InvoiceId = 24,
            OrderId = 1024,
            Folio = "FAC-2024-0024",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "DIN567890MNO",
            IssueDate = new DateTime(2024, 2, 7, 15, 45, 0),
            Subtotal = 42000.00m,
            Tax = 6720.00m,
            Total = 48720.00m,
            Status = "STAMPED",
            PaymentMethod = "PPD",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0024.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0024.pdf"
        },
        new Invoice
        {
            InvoiceId = 25,
            OrderId = 1025,
            Folio = "FAC-2024-0025",
            UUID = Guid.NewGuid().ToString().ToUpper(),
            IssuerRFC = "EMP123456ABC",
            ReceiverRFC = "CES234567PQR",
            IssueDate = new DateTime(2024, 2, 8, 9, 30, 0),
            Subtotal = 110000.00m,
            Tax = 17600.00m,
            Total = 127600.00m,
            Status = "STAMPED",
            PaymentMethod = "PUE",
            PaymentForm = "03",
            Currency = "MXN",
            CancellationDate = null,
            CancellationReason = string.Empty,
            XMLPath = "/facturas/xml/FAC-2024-0025.xml",
            PDFPath = "/facturas/pdf/FAC-2024-0025.pdf"
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

    public Task<List<Invoice>> BuscarInvoicesAsync(int? idOrden = null, string? folio = null, string? estado = null, DateTime? fechaInicio = null, DateTime? fechaFin = null)
    {
        var resultado = _invoicesMock.AsQueryable();

        if (idOrden.HasValue)
        {
            resultado = resultado.Where(i => i.OrderId == idOrden.Value);
        }

        if (!string.IsNullOrWhiteSpace(folio))
        {
            resultado = resultado.Where(i => i.Folio != null && i.Folio.Contains(folio, StringComparison.OrdinalIgnoreCase));
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

    public Task<int> CrearInvoiceAsync(Invoice factura)
    {
        factura.InvoiceId = _invoicesMock.Any() ? _invoicesMock.Max(i => i.InvoiceId) + 1 : 1;
        factura.IssueDate = DateTime.Now;
        _invoicesMock.Add(factura);
        return Task.FromResult(factura.InvoiceId);
    }

    public Task ActualizarInvoiceAsync(Invoice factura)
    {
        var index = _invoicesMock.FindIndex(i => i.InvoiceId == factura.InvoiceId);
        if (index != -1)
        {
            _invoicesMock[index] = factura;
        }
        return Task.CompletedTask;
    }

    public Task EliminarInvoiceAsync(int idFactura)
    {
        _invoicesMock.RemoveAll(i => i.InvoiceId == idFactura);
        return Task.CompletedTask;
    }

    public Task<int> ContarInvoicesPendientesAsync()
    {
        return Task.FromResult(_invoicesMock.Count(i => i.Status == "DRAFT"));
    }

    public Task<int> ContarInvoicesPagadasAsync()
    {
        return Task.FromResult(_invoicesMock.Count(i => i.Status == "PAID"));
    }
}
