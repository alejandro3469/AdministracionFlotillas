using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface IInvoicingService
{
    Task<List<Invoice>> ObtenerInvoicesAsync();
    Task<Invoice?> ObtenerInvoicePorIdAsync(int idFactura);
    Task<List<Invoice>> BuscarInvoicesAsync(int? idOrden = null, string? folio = null, string? estado = null, DateTime? fechaInicio = null, DateTime? fechaFin = null);
}
