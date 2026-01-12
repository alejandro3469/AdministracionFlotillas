namespace AdministracionFlotillas.Web.ViewModels;

public class FlotillaViewModel
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public string FechaCreacion { get; set; } = string.Empty; // String para UI
}

