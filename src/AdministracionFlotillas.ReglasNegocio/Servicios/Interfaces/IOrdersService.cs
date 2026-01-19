using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface IOrdersService
{
    Task<List<Order>> ObtenerOrdersAsync();
    Task<Order?> ObtenerOrderPorIdAsync(int idOrden);
    Task<List<Order>> BuscarOrdersAsync(
        int? idCliente = null,
        int? idTienda = null,
        string? estado = null,
        DateTime? fechaInicio = null,
        DateTime? fechaFin = null
    );
    Task<List<Order>> ObtenerOrdersPorRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin);
}
