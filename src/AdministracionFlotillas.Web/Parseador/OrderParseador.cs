using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

public static class OrderParseador
{
    public static OrderViewModel ConvertirAVista(Order orden)
    {
        if (orden == null)
            return new OrderViewModel();
        
        // Simular cálculos de facturación - en producción vendrían de Oracle/JDE
        var subtotal = 761.50m; // Simulado
        var descuentos = 15.00m; // Simulado
        var impuestos = 121.84m; // Simulado (16% IVA)
        var total = subtotal - descuentos + impuestos;
        
        return new OrderViewModel
        {
            IdOrden = orden.OrderId,
            FechaOrden = orden.OrderTms,
            IdCliente = orden.CustomerId,
            NombreCliente = $"Cliente {orden.CustomerId}", // Simulado - en producción vendría de JOIN
            EstadoOrden = string.IsNullOrWhiteSpace(orden.OrderStatus) ? "PENDING" : orden.OrderStatus,
            IdTienda = orden.StoreId,
            NombreTienda = $"Tienda {orden.StoreId}", // Simulado - en producción vendría de JOIN
            Subtotal = subtotal,
            Descuentos = descuentos,
            Impuestos = impuestos,
            Total = total
        };
    }
    
    public static List<OrderViewModel> ConvertirListaAVista(List<Order> ordenes)
    {
        return ordenes.Select(ConvertirAVista).ToList();
    }
    
    public static Order ConvertirAModelo(OrderViewModel vista)
    {
        if (vista == null)
            return new Order();
        
        return new Order
        {
            OrderId = vista.IdOrden,
            OrderTms = vista.FechaOrden,
            CustomerId = vista.IdCliente,
            OrderStatus = vista.EstadoOrden,
            StoreId = vista.IdTienda
        };
    }
}
