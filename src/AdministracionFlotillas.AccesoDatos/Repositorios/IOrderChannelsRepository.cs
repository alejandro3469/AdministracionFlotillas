using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IOrderChannelsRepository
{
    Task<List<OrderChannel>> ObtenerOrderChannelsAsync();
    Task<OrderChannel?> ObtenerOrderChannelPorIdAsync(int idCanal);
    Task<List<OrderChannel>> BuscarOrderChannelsAsync(string? tipo, string? estado);
}
