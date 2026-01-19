using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface IChainsService
{
    Task<List<Chain>> ObtenerChainsAsync();
    Task<Chain?> ObtenerChainPorIdAsync(int idCadena);
    Task<List<Chain>> BuscarChainsAsync(string? nombre, string? estado);
}
