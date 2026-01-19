using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface IInvoicingService
{
    Task<List<Invoice>> ObtenerInvoicesAsync();
    Task<Invoice?> ObtenerInvoicePorIdAsync(int idFactura);
    Task<List<Invoice>> BuscarInvoicesAsync(int? idOrden, string? estado, DateTime? fechaInicio, DateTime? fechaFin);
}
