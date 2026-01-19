using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class SalespersonsService : ISalespersonsService
{
    private readonly ISalespersonsRepository _repositorio;
    
    public SalespersonsService(ISalespersonsRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<Salesperson>> ObtenerSalespersonsAsync()
    {
        var salespersons = await _repositorio.ObtenerSalespersonsAsync();
        // Regla de negocio: Ordenar por nombre completo
        return salespersons.OrderBy(s => s.FullName).ToList();
    }
    
    public async Task<Salesperson?> ObtenerSalespersonPorIdAsync(int idVendedor)
    {
        if (idVendedor <= 0)
        {
            throw new ArgumentException("El ID de vendedor debe ser mayor que cero", nameof(idVendedor));
        }
        
        return await _repositorio.ObtenerSalespersonPorIdAsync(idVendedor);
    }
    
    public async Task<List<Salesperson>> BuscarSalespersonsAsync(string? nombre, string? zona, string? estado)
    {
        return await _repositorio.BuscarSalespersonsAsync(nombre, zona, estado);
    }
}
