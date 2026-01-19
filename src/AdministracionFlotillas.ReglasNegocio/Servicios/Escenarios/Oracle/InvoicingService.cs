using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class InvoicingService : IInvoicingService
{
    private readonly IInvoicingRepository _repositorio;
    
    public InvoicingService(IInvoicingRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<Invoice>> ObtenerInvoicesAsync()
    {
        var invoices = await _repositorio.ObtenerInvoicesAsync();
        // Regla de negocio: Ordenar por fecha de emisión (más recientes primero)
        return invoices.OrderByDescending(i => i.IssueDate).ToList();
    }
    
    public async Task<Invoice?> ObtenerInvoicePorIdAsync(int idFactura)
    {
        if (idFactura <= 0)
        {
            throw new ArgumentException("El ID de factura debe ser mayor que cero", nameof(idFactura));
        }
        
        return await _repositorio.ObtenerInvoicePorIdAsync(idFactura);
    }
    
    public async Task<List<Invoice>> BuscarInvoicesAsync(int? idOrden = null, string? folio = null, string? estado = null, DateTime? fechaInicio = null, DateTime? fechaFin = null)
    {
        if (fechaInicio.HasValue && fechaFin.HasValue && fechaInicio > fechaFin)
        {
            throw new ArgumentException("La fecha de inicio no puede ser mayor que la fecha de fin");
        }
        
        return await _repositorio.BuscarInvoicesAsync(idOrden, folio, estado, fechaInicio, fechaFin);
    }
}
