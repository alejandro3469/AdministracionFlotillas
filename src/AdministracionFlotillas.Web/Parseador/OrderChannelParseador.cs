using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

public static class OrderChannelParseador
{
    public static OrderChannelViewModel ConvertirAVista(OrderChannel channel)
    {
        if (channel == null)
        {
            throw new ArgumentNullException(nameof(channel));
        }

        return new OrderChannelViewModel
        {
            IdCanal = channel.ChannelId,
            NombreCanal = channel.ChannelName,
            TipoCanal = channel.ChannelType,
            Descripcion = channel.Description,
            Estado = channel.Status,
            TotalPedidos = channel.TotalOrders,
            TasaConversion = channel.ConversionRate,
            ValorPromedioPedido = channel.AverageOrderValue,
            FechaCreacion = channel.CreationDate,
            FechaUltimoPedido = channel.LastOrderDate,
            PedidosHoy = channel.OrdersToday,
            PedidosEsteMes = channel.OrdersThisMonth,
            Eficiencia = channel.Efficiency
        };
    }

    public static List<OrderChannelViewModel> ConvertirListaAVista(List<OrderChannel> channels)
    {
        if (channels == null)
        {
            return new List<OrderChannelViewModel>();
        }

        return channels.Select(ConvertirAVista).ToList();
    }
}
