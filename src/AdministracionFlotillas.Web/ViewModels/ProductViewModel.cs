namespace AdministracionFlotillas.Web.ViewModels;

public class ProductViewModel
{
    public int IdProducto { get; set; }
    public string NombreProducto { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public decimal PrecioUnitario { get; set; }
    public int CantidadStock { get; set; }
    public string Estado { get; set; } = "ACTIVE";
    public string? UrlImagen { get; set; }
    public string? CodigoBarras { get; set; }
    public decimal PrecioCosto { get; set; }
    public decimal MargenGanancia { get; set; }
}
