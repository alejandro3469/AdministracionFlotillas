using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

public static class AddendumParseador
{
    public static AddendumViewModel ConvertirAVista(Addendum addendum)
    {
        if (addendum == null)
        {
            throw new ArgumentNullException(nameof(addendum));
        }

        return new AddendumViewModel
        {
            IdAdenda = addendum.AddendumId,
            IdCadena = addendum.ChainId,
            NombreCadena = addendum.ChainName,
            NombreAdenda = addendum.AddendumName,
            DescuentoEspecial = addendum.SpecialDiscount,
            DiasCredito = addendum.CreditDays,
            FechaInicio = addendum.StartDate,
            FechaFin = addendum.EndDate,
            Estado = addendum.Status,
            CondicionesEspeciales = addendum.SpecialConditions,
            FechaCreacion = addendum.CreationDate,
            FechaUltimaRenovacion = addendum.LastRenewalDate,
            RenovacionAutomatica = addendum.AutoRenewal,
            MontoMinimoPedido = addendum.MinimumOrderAmount
        };
    }

    public static List<AddendumViewModel> ConvertirListaAVista(List<Addendum> addendums)
    {
        if (addendums == null)
        {
            return new List<AddendumViewModel>();
        }

        return addendums.Select(ConvertirAVista).ToList();
    }
}
