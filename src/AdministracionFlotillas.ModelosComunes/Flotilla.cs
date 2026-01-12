namespace AdministracionFlotillas.ModelosComunes;

public class Flotilla
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty; // Activo, Inactivo
    public DateTime FechaCreacion { get; set; }
}

