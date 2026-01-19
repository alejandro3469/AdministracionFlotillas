using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class RoutesService : IRoutesService
{
    private readonly IRoutesRepository _repositorio;
    
    public RoutesService(IRoutesRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<Route>> ObtenerRoutesAsync()
    {
        var routes = await _repositorio.ObtenerRoutesAsync();
        // Regla de negocio: Ordenar por nombre de ruta
        return routes.OrderBy(r => r.RouteName).ToList();
    }
    
    public async Task<Route?> ObtenerRoutePorIdAsync(int idRuta)
    {
        if (idRuta <= 0)
        {
            throw new ArgumentException("El ID de ruta debe ser mayor que cero", nameof(idRuta));
        }
        
        return await _repositorio.ObtenerRoutePorIdAsync(idRuta);
    }
    
    public async Task<List<Route>> BuscarRoutesAsync(string? nombre, string? zona, string? estado)
    {
        return await _repositorio.BuscarRoutesAsync(nombre, zona, estado);
    }
}
