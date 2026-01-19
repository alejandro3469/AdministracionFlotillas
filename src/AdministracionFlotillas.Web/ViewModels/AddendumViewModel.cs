namespace AdministracionFlotillas.Web.ViewModels;

public class AddendumViewModel
{
    public int IdAdenda { get; set; }
    public int IdCadena { get; set; }
    public string NombreCadena { get; set; } = string.Empty;
    public string NombreAdenda { get; set; } = string.Empty;
    public decimal DescuentoEspecial { get; set; }
    public int DiasCredito { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
    public string Estado { get; set; } = "ACTIVE";
    public string CondicionesEspeciales { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaUltimaRenovacion { get; set; }
    public bool RenovacionAutomatica { get; set; }
    public decimal MontoMinimoPedido { get; set; }
}
