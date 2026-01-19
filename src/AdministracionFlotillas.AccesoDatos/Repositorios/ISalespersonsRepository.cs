using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface ISalespersonsRepository
{
    Task<List<Salesperson>> ObtenerSalespersonsAsync();
    Task<Salesperson?> ObtenerSalespersonPorIdAsync(int idVendedor);
    Task<List<Salesperson>> BuscarSalespersonsAsync(string? nombre, string? zona, string? estado);
}
