using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio de Canales de Pedidos con datos mock
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class OrderChannelsRepository : IOrderChannelsRepository
{
    private readonly List<OrderChannel> _channelsMock = new()
    {
        new OrderChannel
        {
            ChannelId = 1,
            ChannelName = "Aplicación Móvil",
            ChannelType = "MOBILE",
            Description = "Pedidos desde aplicación móvil (GloriaMovil)",
            Status = "ACTIVE",
            TotalOrders = 1250,
            ConversionRate = 85.5m,
            AverageOrderValue = 8500.00m,
            CreationDate = new DateTime(2023, 1, 15),
            LastOrderDate = DateTime.Now.AddHours(-2),
            OrdersToday = 45,
            OrdersThisMonth = 1250,
            Efficiency = 92.3m
        },
        new OrderChannel
        {
            ChannelId = 2,
            ChannelName = "Call Center",
            ChannelType = "CALL_CENTER",
            Description = "Pedidos recibidos por teléfono a través del call center",
            Status = "ACTIVE",
            TotalOrders = 890,
            ConversionRate = 72.3m,
            AverageOrderValue = 12000.00m,
            CreationDate = new DateTime(2022, 6, 1),
            LastOrderDate = DateTime.Now.AddMinutes(-30),
            OrdersToday = 32,
            OrdersThisMonth = 890,
            Efficiency = 78.5m
        },
        new OrderChannel
        {
            ChannelId = 3,
            ChannelName = "Correo Electrónico",
            ChannelType = "EMAIL",
            Description = "Pedidos recibidos por correo electrónico",
            Status = "ACTIVE",
            TotalOrders = 456,
            ConversionRate = 65.8m,
            AverageOrderValue = 15000.00m,
            CreationDate = new DateTime(2022, 8, 10),
            LastOrderDate = DateTime.Now.AddHours(-5),
            OrdersToday = 18,
            OrdersThisMonth = 456,
            Efficiency = 71.2m
        },
        new OrderChannel
        {
            ChannelId = 4,
            ChannelName = "Portal Web",
            ChannelType = "WEB",
            Description = "Pedidos realizados desde el portal web",
            Status = "ACTIVE",
            TotalOrders = 678,
            ConversionRate = 78.9m,
            AverageOrderValue = 9800.00m,
            CreationDate = new DateTime(2023, 3, 20),
            LastOrderDate = DateTime.Now.AddHours(-1),
            OrdersToday = 28,
            OrdersThisMonth = 678,
            Efficiency = 85.7m
        }
    };

    public Task<List<OrderChannel>> ObtenerOrderChannelsAsync()
    {
        return Task.FromResult(_channelsMock.ToList());
    }

    public Task<OrderChannel?> ObtenerOrderChannelPorIdAsync(int idCanal)
    {
        var channel = _channelsMock.FirstOrDefault(c => c.ChannelId == idCanal);
        return Task.FromResult(channel);
    }

    public Task<List<OrderChannel>> BuscarOrderChannelsAsync(string? tipo, string? estado)
    {
        var resultado = _channelsMock.AsQueryable();

        if (!string.IsNullOrWhiteSpace(tipo))
        {
            resultado = resultado.Where(c => c.ChannelType == tipo);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            resultado = resultado.Where(c => c.Status == estado);
        }

        return Task.FromResult(resultado.ToList());
    }
}
