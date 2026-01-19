using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio de Rutas de Reparto con datos mock
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class RoutesRepository : IRoutesRepository
{
    private readonly List<Route> _routesMock = new()
    {
        new Route
        {
            RouteId = 1,
            RouteName = "Ruta Norte - Zona 1",
            Description = "Cobertura norte de la ciudad, incluye zonas residenciales y comerciales",
            GeographicZone = "Norte",
            EstimatedTime = 120,
            MaxCapacity = 50,
            Status = "ACTIVE",
            AssignedDriver = "Pedro Martínez",
            AssignedDriverId = 1,
            CreationDate = new DateTime(2023, 1, 15),
            TotalDeliveries = 1245,
            AverageDeliveryTime = 115.5m,
            Efficiency = 92.5m
        },
        new Route
        {
            RouteId = 2,
            RouteName = "Ruta Sur - Zona 2",
            Description = "Cobertura sur de la ciudad, incluye zonas industriales",
            GeographicZone = "Sur",
            EstimatedTime = 150,
            MaxCapacity = 60,
            Status = "ACTIVE",
            AssignedDriver = "Luis Hernández",
            AssignedDriverId = 2,
            CreationDate = new DateTime(2023, 2, 20),
            TotalDeliveries = 1567,
            AverageDeliveryTime = 142.3m,
            Efficiency = 88.7m
        },
        new Route
        {
            RouteId = 3,
            RouteName = "Ruta Centro - Zona 3",
            Description = "Cobertura centro histórico y zona comercial",
            GeographicZone = "Centro",
            EstimatedTime = 90,
            MaxCapacity = 40,
            Status = "ACTIVE",
            AssignedDriver = "Ana García",
            AssignedDriverId = 3,
            CreationDate = new DateTime(2023, 3, 10),
            TotalDeliveries = 987,
            AverageDeliveryTime = 88.2m,
            Efficiency = 94.2m
        },
        new Route
        {
            RouteId = 4,
            RouteName = "Ruta Este - Zona 4",
            Description = "Cobertura este de la ciudad, zonas residenciales",
            GeographicZone = "Este",
            EstimatedTime = 110,
            MaxCapacity = 45,
            Status = "ACTIVE",
            AssignedDriver = "Carmen López",
            AssignedDriverId = 4,
            CreationDate = new DateTime(2023, 4, 5),
            TotalDeliveries = 1123,
            AverageDeliveryTime = 105.8m,
            Efficiency = 91.3m
        },
        new Route
        {
            RouteId = 5,
            RouteName = "Ruta Oeste - Zona 5",
            Description = "Cobertura oeste, incluye zonas suburbanas",
            GeographicZone = "Oeste",
            EstimatedTime = 180,
            MaxCapacity = 70,
            Status = "ACTIVE",
            AssignedDriver = "Roberto Sánchez",
            AssignedDriverId = 5,
            CreationDate = new DateTime(2023, 5, 12),
            TotalDeliveries = 856,
            AverageDeliveryTime = 172.5m,
            Efficiency = 85.2m
        },
        new Route
        {
            RouteId = 6,
            RouteName = "Ruta Metropolitana",
            Description = "Cobertura área metropolitana completa",
            GeographicZone = "Metropolitana",
            EstimatedTime = 240,
            MaxCapacity = 100,
            Status = "ACTIVE",
            AssignedDriver = "Miguel Torres",
            AssignedDriverId = 6,
            CreationDate = new DateTime(2022, 12, 1),
            TotalDeliveries = 2345,
            AverageDeliveryTime = 228.7m,
            Efficiency = 87.8m
        },
        new Route
        {
            RouteId = 7,
            RouteName = "Ruta Express - Urgente",
            Description = "Ruta para entregas urgentes y prioritarias",
            GeographicZone = "Todas",
            EstimatedTime = 60,
            MaxCapacity = 20,
            Status = "ACTIVE",
            AssignedDriver = "Jorge Ramírez",
            AssignedDriverId = 7,
            CreationDate = new DateTime(2024, 1, 8),
            TotalDeliveries = 456,
            AverageDeliveryTime = 58.3m,
            Efficiency = 96.1m
        },
        new Route
        {
            RouteId = 8,
            RouteName = "Ruta Norte - Zona 2",
            Description = "Segunda ruta de cobertura norte",
            GeographicZone = "Norte",
            EstimatedTime = 130,
            MaxCapacity = 55,
            Status = "ACTIVE",
            AssignedDriver = "Fernando Díaz",
            AssignedDriverId = 8,
            CreationDate = new DateTime(2023, 8, 15),
            TotalDeliveries = 678,
            AverageDeliveryTime = 125.4m,
            Efficiency = 90.1m
        },
        new Route
        {
            RouteId = 9,
            RouteName = "Ruta Sur - Zona 3",
            Description = "Tercera ruta de cobertura sur",
            GeographicZone = "Sur",
            EstimatedTime = 140,
            MaxCapacity = 50,
            Status = "MAINTENANCE",
            AssignedDriver = "Alejandro Morales",
            AssignedDriverId = 9,
            CreationDate = new DateTime(2023, 9, 22),
            TotalDeliveries = 523,
            AverageDeliveryTime = 135.2m,
            Efficiency = 89.5m
        },
        new Route
        {
            RouteId = 10,
            RouteName = "Ruta Periférica",
            Description = "Cobertura periférica de la ciudad",
            GeographicZone = "Periferia",
            EstimatedTime = 200,
            MaxCapacity = 80,
            Status = "ACTIVE",
            AssignedDriver = "Ricardo Vega",
            AssignedDriverId = 10,
            CreationDate = new DateTime(2023, 10, 30),
            TotalDeliveries = 789,
            AverageDeliveryTime = 195.6m,
            Efficiency = 86.3m
        },
        // Escenarios adicionales para pruebas
        new Route
        {
            RouteId = 11,
            RouteName = "Ruta Nueva - Sin Entregas",
            Description = "Ruta recién creada sin entregas aún",
            GeographicZone = "Norte",
            EstimatedTime = 100,
            MaxCapacity = 30,
            Status = "ACTIVE",
            AssignedDriver = "Nuevo Repartidor",
            AssignedDriverId = 11,
            CreationDate = DateTime.Now.AddDays(-5),
            TotalDeliveries = 0,
            AverageDeliveryTime = 0,
            Efficiency = 0
        },
        new Route
        {
            RouteId = 12,
            RouteName = "Ruta Inactiva",
            Description = "Ruta desactivada temporalmente",
            GeographicZone = "Sur",
            EstimatedTime = 120,
            MaxCapacity = 40,
            Status = "INACTIVE",
            AssignedDriver = "Repartidor Inactivo",
            AssignedDriverId = 12,
            CreationDate = new DateTime(2023, 1, 1),
            TotalDeliveries = 234,
            AverageDeliveryTime = 115.0m,
            Efficiency = 88.5m
        },
        new Route
        {
            RouteId = 13,
            RouteName = "Ruta Alta Eficiencia",
            Description = "Ruta con eficiencia superior al 95%",
            GeographicZone = "Centro",
            EstimatedTime = 80,
            MaxCapacity = 35,
            Status = "ACTIVE",
            AssignedDriver = "Repartidor Eficiente",
            AssignedDriverId = 13,
            CreationDate = new DateTime(2023, 6, 1),
            TotalDeliveries = 567,
            AverageDeliveryTime = 76.5m,
            Efficiency = 97.8m
        },
        new Route
        {
            RouteId = 14,
            RouteName = "Ruta Baja Eficiencia",
            Description = "Ruta con eficiencia inferior al 70%",
            GeographicZone = "Oeste",
            EstimatedTime = 200,
            MaxCapacity = 60,
            Status = "ACTIVE",
            AssignedDriver = "Repartidor Lento",
            AssignedDriverId = 14,
            CreationDate = new DateTime(2023, 3, 1),
            TotalDeliveries = 234,
            AverageDeliveryTime = 210.0m,
            Efficiency = 65.2m
        },
        new Route
        {
            RouteId = 15,
            RouteName = "Ruta Capacidad Máxima",
            Description = "Ruta con capacidad máxima de entregas",
            GeographicZone = "Metropolitana",
            EstimatedTime = 300,
            MaxCapacity = 150,
            Status = "ACTIVE",
            AssignedDriver = "Repartidor Experto",
            AssignedDriverId = 15,
            CreationDate = new DateTime(2022, 1, 1),
            TotalDeliveries = 5000,
            AverageDeliveryTime = 285.0m,
            Efficiency = 90.5m
        },
        new Route
        {
            RouteId = 16,
            RouteName = "Ruta Sin Repartidor",
            Description = "Ruta sin repartidor asignado",
            GeographicZone = "Este",
            EstimatedTime = 110,
            MaxCapacity = 45,
            Status = "ACTIVE",
            AssignedDriver = "",
            AssignedDriverId = 0,
            CreationDate = new DateTime(2024, 1, 1),
            TotalDeliveries = 0,
            AverageDeliveryTime = 0,
            Efficiency = 0
        },
        new Route
        {
            RouteId = 17,
            RouteName = "Ruta Mantenimiento",
            Description = "Ruta en mantenimiento",
            GeographicZone = "Norte",
            EstimatedTime = 130,
            MaxCapacity = 50,
            Status = "MAINTENANCE",
            AssignedDriver = "Repartidor Mantenimiento",
            AssignedDriverId = 16,
            CreationDate = new DateTime(2023, 5, 1),
            TotalDeliveries = 345,
            AverageDeliveryTime = 125.0m,
            Efficiency = 87.5m
        },
        new Route
        {
            RouteId = 18,
            RouteName = "Ruta Tiempo Mínimo",
            Description = "Ruta con tiempo estimado mínimo",
            GeographicZone = "Centro",
            EstimatedTime = 30,
            MaxCapacity = 15,
            Status = "ACTIVE",
            AssignedDriver = "Repartidor Rápido",
            AssignedDriverId = 17,
            CreationDate = new DateTime(2024, 2, 1),
            TotalDeliveries = 89,
            AverageDeliveryTime = 28.5m,
            Efficiency = 98.5m
        },
        new Route
        {
            RouteId = 19,
            RouteName = "Ruta Tiempo Máximo",
            Description = "Ruta con tiempo estimado máximo",
            GeographicZone = "Periferia",
            EstimatedTime = 480,
            MaxCapacity = 120,
            Status = "ACTIVE",
            AssignedDriver = "Repartidor Largo",
            AssignedDriverId = 18,
            CreationDate = new DateTime(2022, 6, 1),
            TotalDeliveries = 1234,
            AverageDeliveryTime = 465.0m,
            Efficiency = 82.3m
        },
        new Route
        {
            RouteId = 20,
            RouteName = "Ruta Antigua",
            Description = "Ruta creada hace mucho tiempo",
            GeographicZone = "Metropolitana",
            EstimatedTime = 180,
            MaxCapacity = 80,
            Status = "ACTIVE",
            AssignedDriver = "Repartidor Antiguo",
            AssignedDriverId = 19,
            CreationDate = new DateTime(2015, 1, 1),
            TotalDeliveries = 10000,
            AverageDeliveryTime = 175.0m,
            Efficiency = 91.2m
        }
    };

    public Task<List<Route>> ObtenerRoutesAsync()
    {
        return Task.FromResult(_routesMock.ToList());
    }

    public Task<Route?> ObtenerRoutePorIdAsync(int idRuta)
    {
        var route = _routesMock.FirstOrDefault(r => r.RouteId == idRuta);
        return Task.FromResult(route);
    }

    public Task<List<Route>> BuscarRoutesAsync(string? nombre, string? zona, string? estado)
    {
        var resultado = _routesMock.AsQueryable();

        if (!string.IsNullOrWhiteSpace(nombre))
        {
            resultado = resultado.Where(r => 
                r.RouteName.Contains(nombre, StringComparison.OrdinalIgnoreCase) ||
                r.Description.Contains(nombre, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(zona))
        {
            resultado = resultado.Where(r => r.GeographicZone == zona);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            resultado = resultado.Where(r => r.Status == estado);
        }

        return Task.FromResult(resultado.ToList());
    }

    public Task<int> CrearRouteAsync(Route ruta)
    {
        ruta.RouteId = _routesMock.Any() ? _routesMock.Max(r => r.RouteId) + 1 : 1;
        ruta.CreationDate = DateTime.Now;
        _routesMock.Add(ruta);
        return Task.FromResult(ruta.RouteId);
    }

    public Task ActualizarRouteAsync(Route ruta)
    {
        var index = _routesMock.FindIndex(r => r.RouteId == ruta.RouteId);
        if (index != -1)
        {
            _routesMock[index] = ruta;
        }
        return Task.CompletedTask;
    }

    public Task EliminarRouteAsync(int idRuta)
    {
        _routesMock.RemoveAll(r => r.RouteId == idRuta);
        return Task.CompletedTask;
    }

    public Task<int> ContarRoutesActivasAsync()
    {
        return Task.FromResult(_routesMock.Count(r => r.Status == "ACTIVE"));
    }

    public Task<int> ContarRoutesInactivasAsync()
    {
        return Task.FromResult(_routesMock.Count(r => r.Status == "INACTIVE" || r.Status == "MAINTENANCE"));
    }
}
