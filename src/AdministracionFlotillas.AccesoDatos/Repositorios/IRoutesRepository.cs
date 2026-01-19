using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IRoutesRepository
{
    Task<List<Route>> ObtenerRoutesAsync();
    Task<Route?> ObtenerRoutePorIdAsync(int idRuta);
    Task<List<Route>> BuscarRoutesAsync(string? nombre, string? zona, string? estado);
    Task<int> CrearRouteAsync(Route ruta);
    Task ActualizarRouteAsync(Route ruta);
    Task EliminarRouteAsync(int idRuta);
    Task<int> ContarRoutesActivasAsync();
    Task<int> ContarRoutesInactivasAsync();
}
