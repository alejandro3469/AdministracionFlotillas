using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface ISalespersonsRepository
{
    Task<List<Salesperson>> ObtenerSalespersonsAsync();
    Task<Salesperson?> ObtenerSalespersonPorIdAsync(int idVendedor);
    Task<List<Salesperson>> BuscarSalespersonsAsync(string? nombre, string? zona, string? estado);
    Task<int> CrearSalespersonAsync(Salesperson vendedor);
    Task ActualizarSalespersonAsync(Salesperson vendedor);
    Task EliminarSalespersonAsync(int idVendedor);
    Task<int> ContarSalespersonsActivosAsync();
    Task<int> ContarSalespersonsInactivosAsync();
}
