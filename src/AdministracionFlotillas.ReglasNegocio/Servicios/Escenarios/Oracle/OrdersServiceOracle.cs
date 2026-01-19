using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class OrdersServiceOracle : IOrdersService
{
    private readonly IOrdersRepository _repositorio;
    
    public OrdersServiceOracle(IOrdersRepository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<Order>> ObtenerOrdersAsync()
    {
        var ordenes = await _repositorio.ObtenerOrdersAsync();
        
        // Regla de negocio: Ordenar por fecha más reciente
        return ordenes.OrderByDescending(orden => orden.OrderTms).ToList();
    }
    
    public async Task<Order?> ObtenerOrderPorIdAsync(int idOrden)
    {
        if (idOrden <= 0)
        {
            throw new ArgumentException("El ID de orden debe ser mayor que cero", nameof(idOrden));
        }
        
        return await _repositorio.ObtenerOrderPorIdAsync(idOrden);
    }
    
    public async Task<List<Order>> BuscarOrdersAsync(
        int? idCliente = null,
        int? idTienda = null,
        string? estado = null,
        DateTime? fechaInicio = null,
        DateTime? fechaFin = null)
    {
        return await _repositorio.BuscarOrdersAsync(idCliente, idTienda, estado, fechaInicio, fechaFin);
    }
    
    public async Task<List<Order>> ObtenerOrdersPorRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin)
    {
        if (fechaInicio > fechaFin)
        {
            throw new ArgumentException("La fecha de inicio no puede ser mayor que la fecha de fin");
        }
        
        return await _repositorio.ObtenerOrdersPorRangoFechasAsync(fechaInicio, fechaFin);
    }
}
