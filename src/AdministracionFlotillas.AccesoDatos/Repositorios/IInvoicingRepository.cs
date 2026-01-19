using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IInvoicingRepository
{
    Task<List<Invoice>> ObtenerInvoicesAsync();
    Task<Invoice?> ObtenerInvoicePorIdAsync(int idFactura);
    Task<List<Invoice>> BuscarInvoicesAsync(int? idOrden = null, string? folio = null, string? estado = null, DateTime? fechaInicio = null, DateTime? fechaFin = null);
    Task<int> CrearInvoiceAsync(Invoice factura);
    Task ActualizarInvoiceAsync(Invoice factura);
    Task EliminarInvoiceAsync(int idFactura);
    Task<int> ContarInvoicesPendientesAsync();
    Task<int> ContarInvoicesPagadasAsync();
}
