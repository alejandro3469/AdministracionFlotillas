using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface IAddendumsService
{
    Task<List<Addendum>> ObtenerAddendumsAsync();
    Task<Addendum?> ObtenerAddendumPorIdAsync(int idAdenda);
    Task<List<Addendum>> BuscarAddendumsAsync(int? idCadena, string? estado);
}
