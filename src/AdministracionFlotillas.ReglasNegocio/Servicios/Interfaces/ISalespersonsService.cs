using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface ISalespersonsService
{
    Task<List<Salesperson>> ObtenerSalespersonsAsync();
    Task<Salesperson?> ObtenerSalespersonPorIdAsync(int idVendedor);
    Task<List<Salesperson>> BuscarSalespersonsAsync(string? nombre, string? zona, string? estado);
}
