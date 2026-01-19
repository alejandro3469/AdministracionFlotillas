using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface IRoutesService
{
    Task<List<Route>> ObtenerRoutesAsync();
    Task<Route?> ObtenerRoutePorIdAsync(int idRuta);
    Task<List<Route>> BuscarRoutesAsync(string? nombre, string? zona, string? estado);
}
