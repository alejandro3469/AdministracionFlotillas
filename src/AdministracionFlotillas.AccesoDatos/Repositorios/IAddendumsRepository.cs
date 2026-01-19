using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IAddendumsRepository
{
    Task<List<Addendum>> ObtenerAddendumsAsync();
    Task<Addendum?> ObtenerAddendumPorIdAsync(int idAdenda);
    Task<List<Addendum>> BuscarAddendumsAsync(int? idCadena, string? estado);
    Task<int> CrearAddendumAsync(Addendum adenda);
    Task ActualizarAddendumAsync(Addendum adenda);
    Task EliminarAddendumAsync(int idAdenda);
    Task<int> ContarAddendumsActivasAsync();
    Task<int> ContarAddendumsExpiradasAsync();
}
