namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Modelo de dominio para Rutas de Reparto
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class Route
{
    public int RouteId { get; set; }
    public string RouteName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string GeographicZone { get; set; } = string.Empty;
    public int EstimatedTime { get; set; } // Tiempo estimado en minutos
    public int MaxCapacity { get; set; } // Capacidad máxima de entregas
    public string Status { get; set; } = "ACTIVE"; // ACTIVE, INACTIVE, MAINTENANCE
    public string AssignedDriver { get; set; } = string.Empty; // Nombre del repartidor
    public int AssignedDriverId { get; set; } // ID del repartidor (si existe en sistema)
    public DateTime CreationDate { get; set; }
    public int TotalDeliveries { get; set; }
    public decimal AverageDeliveryTime { get; set; } // Tiempo promedio en minutos
    public decimal Efficiency { get; set; } // Eficiencia de la ruta (%)
}
