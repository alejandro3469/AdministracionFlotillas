using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IRoutesRepository
{
    Task<List<Route>> ObtenerRoutesAsync();
    Task<Route?> ObtenerRoutePorIdAsync(int idRuta);
    Task<List<Route>> BuscarRoutesAsync(string? nombre, string? zona, string? estado);
}
