using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IOrdersRepository
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
