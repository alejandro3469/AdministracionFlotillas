using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IChainsRepository
{
    Task<List<Chain>> ObtenerChainsAsync();
    Task<Chain?> ObtenerChainPorIdAsync(int idCadena);
    Task<List<Chain>> BuscarChainsAsync(string? nombre, string? estado);
}
