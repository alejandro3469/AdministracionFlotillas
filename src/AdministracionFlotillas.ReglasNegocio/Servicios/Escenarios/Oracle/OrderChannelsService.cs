using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class OrderChannelsService : IOrderChannelsService
{
    private readonly IOrderChannelsRepository _repositorio;
    
    public OrderChannelsService(IOrderChannelsRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<OrderChannel>> ObtenerOrderChannelsAsync()
    {
        var channels = await _repositorio.ObtenerOrderChannelsAsync();
        // Regla de negocio: Ordenar por nombre de canal
        return channels.OrderBy(c => c.ChannelName).ToList();
    }
    
    public async Task<OrderChannel?> ObtenerOrderChannelPorIdAsync(int idCanal)
    {
        if (idCanal <= 0)
        {
            throw new ArgumentException("El ID de canal debe ser mayor que cero", nameof(idCanal));
        }
        
        return await _repositorio.ObtenerOrderChannelPorIdAsync(idCanal);
    }
    
    public async Task<List<OrderChannel>> BuscarOrderChannelsAsync(string? tipo, string? estado)
    {
        return await _repositorio.BuscarOrderChannelsAsync(tipo, estado);
    }
}
