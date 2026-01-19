using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class ChainsService : IChainsService
{
    private readonly IChainsRepository _repositorio;
    
    public ChainsService(IChainsRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<Chain>> ObtenerChainsAsync()
    {
        var chains = await _repositorio.ObtenerChainsAsync();
        // Regla de negocio: Ordenar por nombre
        return chains.OrderBy(c => c.ChainName).ToList();
    }
    
    public async Task<Chain?> ObtenerChainPorIdAsync(int idCadena)
    {
        if (idCadena <= 0)
        {
            throw new ArgumentException("El ID de cadena debe ser mayor que cero", nameof(idCadena));
        }
        
        return await _repositorio.ObtenerChainPorIdAsync(idCadena);
    }
    
    public async Task<List<Chain>> BuscarChainsAsync(string? nombre, string? estado)
    {
        return await _repositorio.BuscarChainsAsync(nombre, estado);
    }
}
