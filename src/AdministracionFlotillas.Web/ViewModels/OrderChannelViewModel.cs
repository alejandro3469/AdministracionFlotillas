namespace AdministracionFlotillas.Web.ViewModels;

public class OrderChannelViewModel
{
    public int IdCanal { get; set; }
    public string NombreCanal { get; set; } = string.Empty;
    public string TipoCanal { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Estado { get; set; } = "ACTIVE";
    public int TotalPedidos { get; set; }
    public decimal TasaConversion { get; set; }
    public decimal ValorPromedioPedido { get; set; }
    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaUltimoPedido { get; set; }
    public int PedidosHoy { get; set; }
    public int PedidosEsteMes { get; set; }
    public decimal Eficiencia { get; set; }
}
