using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface IOrderChannelsService
{
    Task<List<OrderChannel>> ObtenerOrderChannelsAsync();
    Task<OrderChannel?> ObtenerOrderChannelPorIdAsync(int idCanal);
    Task<List<OrderChannel>> BuscarOrderChannelsAsync(string? tipo, string? estado);
}
