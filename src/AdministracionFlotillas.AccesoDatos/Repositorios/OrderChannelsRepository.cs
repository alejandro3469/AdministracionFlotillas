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
        },
        // Escenarios adicionales para pruebas
        new OrderChannel
        {
            ChannelId = 5,
            ChannelName = "Aplicación Móvil Premium",
            ChannelType = "MOBILE",
            Description = "Versión premium de la aplicación móvil",
            Status = "ACTIVE",
            TotalOrders = 567,
            ConversionRate = 92.5m,
            AverageOrderValue = 12000.00m,
            CreationDate = new DateTime(2023, 6, 1),
            LastOrderDate = DateTime.Now.AddMinutes(-15),
            OrdersToday = 28,
            OrdersThisMonth = 567,
            Efficiency = 95.2m
        },
        new OrderChannel
        {
            ChannelId = 6,
            ChannelName = "Call Center VIP",
            ChannelType = "CALL_CENTER",
            Description = "Línea VIP para clientes corporativos",
            Status = "ACTIVE",
            TotalOrders = 234,
            ConversionRate = 88.0m,
            AverageOrderValue = 25000.00m,
            CreationDate = new DateTime(2023, 3, 1),
            LastOrderDate = DateTime.Now.AddHours(-1),
            OrdersToday = 12,
            OrdersThisMonth = 234,
            Efficiency = 90.5m
        },
        new OrderChannel
        {
            ChannelId = 7,
            ChannelName = "WhatsApp Business",
            ChannelType = "MOBILE",
            Description = "Pedidos recibidos por WhatsApp Business",
            Status = "ACTIVE",
            TotalOrders = 890,
            ConversionRate = 75.3m,
            AverageOrderValue = 6500.00m,
            CreationDate = new DateTime(2023, 8, 1),
            LastOrderDate = DateTime.Now.AddMinutes(-45),
            OrdersToday = 35,
            OrdersThisMonth = 890,
            Efficiency = 82.1m
        },
        new OrderChannel
        {
            ChannelId = 8,
            ChannelName = "Portal Web B2B",
            ChannelType = "WEB",
            Description = "Portal web para clientes B2B",
            Status = "ACTIVE",
            TotalOrders = 345,
            ConversionRate = 68.5m,
            AverageOrderValue = 18000.00m,
            CreationDate = new DateTime(2023, 4, 15),
            LastOrderDate = DateTime.Now.AddHours(-3),
            OrdersToday = 15,
            OrdersThisMonth = 345,
            Efficiency = 78.9m
        },
        new OrderChannel
        {
            ChannelId = 9,
            ChannelName = "Correo Electrónico B2B",
            ChannelType = "EMAIL",
            Description = "Pedidos por correo para clientes corporativos",
            Status = "ACTIVE",
            TotalOrders = 123,
            ConversionRate = 55.2m,
            AverageOrderValue = 30000.00m,
            CreationDate = new DateTime(2023, 2, 1),
            LastOrderDate = DateTime.Now.AddHours(-6),
            OrdersToday = 5,
            OrdersThisMonth = 123,
            Efficiency = 65.8m
        },
        new OrderChannel
        {
            ChannelId = 10,
            ChannelName = "Aplicación Móvil Inactiva",
            ChannelType = "MOBILE",
            Description = "Aplicación móvil descontinuada",
            Status = "INACTIVE",
            TotalOrders = 234,
            ConversionRate = 70.0m,
            AverageOrderValue = 8000.00m,
            CreationDate = new DateTime(2022, 1, 1),
            LastOrderDate = new DateTime(2023, 12, 31),
            OrdersToday = 0,
            OrdersThisMonth = 0,
            Efficiency = 0
        },
        new OrderChannel
        {
            ChannelId = 11,
            ChannelName = "Call Center Mantenimiento",
            ChannelType = "CALL_CENTER",
            Description = "Call center en mantenimiento",
            Status = "MAINTENANCE",
            TotalOrders = 456,
            ConversionRate = 72.3m,
            AverageOrderValue = 11000.00m,
            CreationDate = new DateTime(2022, 6, 1),
            LastOrderDate = DateTime.Now.AddDays(-2),
            OrdersToday = 0,
            OrdersThisMonth = 0,
            Efficiency = 0
        },
        new OrderChannel
        {
            ChannelId = 12,
            ChannelName = "Portal Web Nuevo",
            ChannelType = "WEB",
            Description = "Nuevo portal web recién lanzado",
            Status = "ACTIVE",
            TotalOrders = 12,
            ConversionRate = 45.0m,
            AverageOrderValue = 5000.00m,
            CreationDate = DateTime.Now.AddDays(-10),
            LastOrderDate = DateTime.Now.AddHours(-2),
            OrdersToday = 3,
            OrdersThisMonth = 12,
            Efficiency = 50.0m
        },
        new OrderChannel
        {
            ChannelId = 13,
            ChannelName = "API Integración",
            ChannelType = "WEB",
            Description = "Pedidos recibidos vía API de integración",
            Status = "ACTIVE",
            TotalOrders = 567,
            ConversionRate = 95.0m,
            AverageOrderValue = 15000.00m,
            CreationDate = new DateTime(2023, 9, 1),
            LastOrderDate = DateTime.Now.AddMinutes(-10),
            OrdersToday = 45,
            OrdersThisMonth = 567,
            Efficiency = 96.5m
        },
        new OrderChannel
        {
            ChannelId = 14,
            ChannelName = "Redes Sociales",
            ChannelType = "MOBILE",
            Description = "Pedidos recibidos a través de redes sociales",
            Status = "ACTIVE",
            TotalOrders = 234,
            ConversionRate = 60.5m,
            AverageOrderValue = 4500.00m,
            CreationDate = new DateTime(2023, 10, 1),
            LastOrderDate = DateTime.Now.AddHours(-4),
            OrdersToday = 18,
            OrdersThisMonth = 234,
            Efficiency = 68.2m
        },
        new OrderChannel
        {
            ChannelId = 15,
            ChannelName = "Chatbot",
            ChannelType = "WEB",
            Description = "Pedidos procesados por chatbot",
            Status = "ACTIVE",
            TotalOrders = 345,
            ConversionRate = 58.3m,
            AverageOrderValue = 7200.00m,
            CreationDate = new DateTime(2023, 11, 1),
            LastOrderDate = DateTime.Now.AddMinutes(-20),
            OrdersToday = 22,
            OrdersThisMonth = 345,
            Efficiency = 65.7m
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

    public Task<int> CrearOrderChannelAsync(OrderChannel canal)
    {
        canal.ChannelId = _channelsMock.Any() ? _channelsMock.Max(c => c.ChannelId) + 1 : 1;
        canal.CreationDate = DateTime.Now;
        _channelsMock.Add(canal);
        return Task.FromResult(canal.ChannelId);
    }

    public Task ActualizarOrderChannelAsync(OrderChannel canal)
    {
        var index = _channelsMock.FindIndex(c => c.ChannelId == canal.ChannelId);
        if (index != -1)
        {
            _channelsMock[index] = canal;
        }
        return Task.CompletedTask;
    }

    public Task EliminarOrderChannelAsync(int idCanal)
    {
        _channelsMock.RemoveAll(c => c.ChannelId == idCanal);
        return Task.CompletedTask;
    }

    public Task<int> ContarOrderChannelsActivosAsync()
    {
        return Task.FromResult(_channelsMock.Count(c => c.Status == "ACTIVE"));
    }

    public Task<int> ContarOrderChannelsInactivosAsync()
    {
        return Task.FromResult(_channelsMock.Count(c => c.Status == "INACTIVE" || c.Status == "MAINTENANCE"));
    }
}
