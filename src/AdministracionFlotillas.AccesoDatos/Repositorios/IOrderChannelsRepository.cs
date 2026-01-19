using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IOrderChannelsRepository
{
    Task<List<OrderChannel>> ObtenerOrderChannelsAsync();
    Task<OrderChannel?> ObtenerOrderChannelPorIdAsync(int idCanal);
    Task<List<OrderChannel>> BuscarOrderChannelsAsync(string? tipo, string? estado);
    Task<int> CrearOrderChannelAsync(OrderChannel canal);
    Task ActualizarOrderChannelAsync(OrderChannel canal);
    Task EliminarOrderChannelAsync(int idCanal);
    Task<int> ContarOrderChannelsActivosAsync();
    Task<int> ContarOrderChannelsInactivosAsync();
}
