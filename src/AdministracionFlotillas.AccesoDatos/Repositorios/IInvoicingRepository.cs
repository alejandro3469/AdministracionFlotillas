using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IInvoicingRepository
{
    Task<List<Invoice>> ObtenerInvoicesAsync();
    Task<Invoice?> ObtenerInvoicePorIdAsync(int idFactura);
    Task<List<Invoice>> BuscarInvoicesAsync(int? idOrden, string? estado, DateTime? fechaInicio, DateTime? fechaFin);
}
