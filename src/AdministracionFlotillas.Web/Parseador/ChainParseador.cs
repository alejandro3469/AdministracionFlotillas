using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

public static class ChainParseador
{
    public static ChainViewModel ConvertirAVista(Chain chain)
    {
        if (chain == null)
        {
            throw new ArgumentNullException(nameof(chain));
        }

        return new ChainViewModel
        {
            IdCadena = chain.ChainId,
            NombreCadena = chain.ChainName,
            RazonSocial = chain.BusinessName,
            RFC = chain.RFC,
            NumeroSucursales = chain.NumberOfStores,
            LimiteCredito = chain.CreditLimit,
            DiasCredito = chain.CreditDays,
            Estado = chain.Status,
            FechaRegistro = chain.RegistrationDate,
            ContactEmail = chain.ContactEmail,
            ContactPhone = chain.ContactPhone,
            Direccion = chain.Address,
            Ciudad = chain.City,
            EstadoDireccion = chain.State,
            CodigoPostal = chain.PostalCode,
            Pais = chain.Country,
            TotalOrdenes = chain.TotalOrders,
            TotalVentas = chain.TotalSales
        };
    }

    public static List<ChainViewModel> ConvertirListaAVista(List<Chain> chains)
    {
        if (chains == null)
        {
            return new List<ChainViewModel>();
        }

        return chains.Select(ConvertirAVista).ToList();
    }
}
