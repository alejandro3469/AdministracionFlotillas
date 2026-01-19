using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

public static class SalespersonParseador
{
    public static SalespersonViewModel ConvertirAVista(Salesperson salesperson)
    {
        if (salesperson == null)
        {
            throw new ArgumentNullException(nameof(salesperson));
        }

        return new SalespersonViewModel
        {
            IdVendedor = salesperson.SalespersonId,
            NombreCompleto = salesperson.FullName,
            Email = salesperson.Email,
            Telefono = salesperson.Phone,
            ZonaCobertura = salesperson.CoverageZone,
            ComisionBase = salesperson.BaseCommission,
            ComisionVariable = salesperson.VariableCommission,
            Estado = salesperson.Status,
            FechaContratacion = salesperson.HireDate,
            TotalOrdenes = salesperson.TotalOrders,
            TotalVentas = salesperson.TotalSales,
            TotalComisiones = salesperson.TotalCommissions,
            CadenasAsignadas = salesperson.AssignedChains
        };
    }

    public static List<SalespersonViewModel> ConvertirListaAVista(List<Salesperson> salespersons)
    {
        if (salespersons == null)
        {
            return new List<SalespersonViewModel>();
        }

        return salespersons.Select(ConvertirAVista).ToList();
    }
}
