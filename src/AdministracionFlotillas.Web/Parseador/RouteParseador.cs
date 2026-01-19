using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;
using Route = AdministracionFlotillas.ModelosComunes.Route;

namespace AdministracionFlotillas.Web.Parseador;

public static class RouteParseador
{
    public static RouteViewModel ConvertirAVista(Route route)
    {
        if (route == null)
        {
            throw new ArgumentNullException(nameof(route));
        }

        return new RouteViewModel
        {
            IdRuta = route.RouteId,
            NombreRuta = route.RouteName,
            Descripcion = route.Description,
            ZonaGeografica = route.GeographicZone,
            TiempoEstimado = route.EstimatedTime,
            CapacidadMaxima = route.MaxCapacity,
            Estado = route.Status,
            RepartidorAsignado = route.AssignedDriver,
            RepartidorAsignadoId = route.AssignedDriverId,
            FechaCreacion = route.CreationDate,
            TotalEntregas = route.TotalDeliveries,
            TiempoPromedioEntrega = route.AverageDeliveryTime,
            Eficiencia = route.Efficiency
        };
    }

    public static List<RouteViewModel> ConvertirListaAVista(List<Route> routes)
    {
        if (routes == null)
        {
            return new List<RouteViewModel>();
        }

        return routes.Select(ConvertirAVista).ToList();
    }
}
