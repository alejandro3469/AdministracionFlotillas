using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class AddendumsService : IAddendumsService
{
    private readonly IAddendumsRepository _repositorio;
    
    public AddendumsService(IAddendumsRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<Addendum>> ObtenerAddendumsAsync()
    {
        var addendums = await _repositorio.ObtenerAddendumsAsync();
        // Regla de negocio: Ordenar por fecha de inicio (más recientes primero)
        return addendums.OrderByDescending(a => a.StartDate).ToList();
    }
    
    public async Task<Addendum?> ObtenerAddendumPorIdAsync(int idAdenda)
    {
        if (idAdenda <= 0)
        {
            throw new ArgumentException("El ID de adenda debe ser mayor que cero", nameof(idAdenda));
        }
        
        return await _repositorio.ObtenerAddendumPorIdAsync(idAdenda);
    }
    
    public async Task<List<Addendum>> BuscarAddendumsAsync(int? idCadena, string? estado)
    {
        return await _repositorio.BuscarAddendumsAsync(idCadena, estado);
    }
}
