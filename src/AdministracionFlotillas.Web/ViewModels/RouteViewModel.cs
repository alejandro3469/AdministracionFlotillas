namespace AdministracionFlotillas.Web.ViewModels;

public class RouteViewModel
{
    public int IdRuta { get; set; }
    public string NombreRuta { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string ZonaGeografica { get; set; } = string.Empty;
    public int TiempoEstimado { get; set; }
    public int CapacidadMaxima { get; set; }
    public string Estado { get; set; } = "ACTIVE";
    public string RepartidorAsignado { get; set; } = string.Empty;
    public int RepartidorAsignadoId { get; set; }
    public DateTime FechaCreacion { get; set; }
    public int TotalEntregas { get; set; }
    public decimal TiempoPromedioEntrega { get; set; }
    public decimal Eficiencia { get; set; }
}
