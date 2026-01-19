using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;
using Microsoft.Extensions.Configuration;
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public class OrdersRepository : IOrdersRepository
{
    private readonly string _connectionString;
    
    public OrdersRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("OracleConnection") 
            ?? throw new InvalidOperationException("Connection string 'OracleConnection' not found.");
    }
    
    public async Task<List<Order>> ObtenerOrdersAsync()
    {
        var listaOrdenes = new List<Order>();
        
        using var conexion = new OracleConnection(_connectionString);
        try
        {
            await conexion.OpenAsync();
        }
        catch (Oracle.ManagedDataAccess.Client.OracleException ex)
        {
            throw new InvalidOperationException(
                $"Error al conectar con Oracle: {ex.Message}. " +
                $"Verifica: 1) Access Control List en Oracle Cloud, 2) Tu IP está en la lista blanca, 3) Firewall local.", 
                ex);
        }
        
        using var comando = new OracleCommand("PKG_ORDERS.SP_OBTENER_ORDERS", conexion)
        {
            CommandType = CommandType.StoredProcedure
        };
        
        var parametroResultado = new OracleParameter("P_RESULTADO", OracleDbType.RefCursor)
        {
            Direction = ParameterDirection.Output
        };
        comando.Parameters.Add(parametroResultado);
        
        using var lector = await comando.ExecuteReaderAsync();
        
        while (await lector.ReadAsync())
        {
            var orderStatusOrdinal = lector.GetOrdinal("ORDER_STATUS");
            listaOrdenes.Add(new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.IsDBNull(orderStatusOrdinal) ? "PENDING" : lector.GetString(orderStatusOrdinal),
                StoreId = lector.GetInt32(lector.GetOrdinal("STORE_ID"))
            });
        }
        
        return listaOrdenes;
    }
    
    public async Task<Order?> ObtenerOrderPorIdAsync(int idOrden)
    {
        using var conexion = new OracleConnection(_connectionString);
        await conexion.OpenAsync();
        
        using var comando = new OracleCommand("PKG_ORDERS.SP_OBTENER_ORDER_POR_ID", conexion)
        {
            CommandType = CommandType.StoredProcedure
        };
        
        comando.Parameters.Add(new OracleParameter("P_ORDER_ID", OracleDbType.Int32)
        {
            Value = idOrden,
            Direction = ParameterDirection.Input
        });
        
        var parametroResultado = new OracleParameter("P_RESULTADO", OracleDbType.RefCursor)
        {
            Direction = ParameterDirection.Output
        };
        comando.Parameters.Add(parametroResultado);
        
        using var lector = await comando.ExecuteReaderAsync();
        
        if (await lector.ReadAsync())
        {
            var orderStatusOrdinal = lector.GetOrdinal("ORDER_STATUS");
            return new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.IsDBNull(orderStatusOrdinal) ? "PENDING" : lector.GetString(orderStatusOrdinal),
                StoreId = lector.GetInt32(lector.GetOrdinal("STORE_ID"))
            };
        }
        
        return null;
    }
    
    public async Task<List<Order>> BuscarOrdersAsync(
        int? idCliente = null,
        int? idTienda = null,
        string? estado = null,
        DateTime? fechaInicio = null,
        DateTime? fechaFin = null)
    {
        var listaOrdenes = new List<Order>();
        
        using var conexion = new OracleConnection(_connectionString);
        await conexion.OpenAsync();
        
        using var comando = new OracleCommand("PKG_ORDERS.SP_BUSCAR_ORDERS", conexion)
        {
            CommandType = CommandType.StoredProcedure
        };
        
        comando.Parameters.Add(new OracleParameter("P_CUSTOMER_ID", OracleDbType.Int32)
        {
            Value = idCliente ?? (object)DBNull.Value,
            Direction = ParameterDirection.Input
        });
        
        comando.Parameters.Add(new OracleParameter("P_STORE_ID", OracleDbType.Int32)
        {
            Value = idTienda ?? (object)DBNull.Value,
            Direction = ParameterDirection.Input
        });
        
        comando.Parameters.Add(new OracleParameter("P_STATUS", OracleDbType.Varchar2)
        {
            Value = estado ?? (object)DBNull.Value,
            Direction = ParameterDirection.Input
        });
        
        comando.Parameters.Add(new OracleParameter("P_FECHA_INICIO", OracleDbType.TimeStamp)
        {
            Value = fechaInicio ?? (object)DBNull.Value,
            Direction = ParameterDirection.Input
        });
        
        comando.Parameters.Add(new OracleParameter("P_FECHA_FIN", OracleDbType.TimeStamp)
        {
            Value = fechaFin ?? (object)DBNull.Value,
            Direction = ParameterDirection.Input
        });
        
        var parametroResultado = new OracleParameter("P_RESULTADO", OracleDbType.RefCursor)
        {
            Direction = ParameterDirection.Output
        };
        comando.Parameters.Add(parametroResultado);
        
        using var lector = await comando.ExecuteReaderAsync();
        
        while (await lector.ReadAsync())
        {
            var orderStatusOrdinal = lector.GetOrdinal("ORDER_STATUS");
            listaOrdenes.Add(new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.IsDBNull(orderStatusOrdinal) ? "PENDING" : lector.GetString(orderStatusOrdinal),
                StoreId = lector.GetInt32(lector.GetOrdinal("STORE_ID"))
            });
        }
        
        return listaOrdenes;
    }
    
    public async Task<List<Order>> ObtenerOrdersPorRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin)
    {
        var listaOrdenes = new List<Order>();
        
        using var conexion = new OracleConnection(_connectionString);
        await conexion.OpenAsync();
        
        using var comando = new OracleCommand("PKG_ORDERS.SP_OBTENER_ORDERS_POR_RANGO_FECHAS", conexion)
        {
            CommandType = CommandType.StoredProcedure
        };
        
        comando.Parameters.Add(new OracleParameter("P_FECHA_INICIO", OracleDbType.TimeStamp)
        {
            Value = fechaInicio,
            Direction = ParameterDirection.Input
        });
        
        comando.Parameters.Add(new OracleParameter("P_FECHA_FIN", OracleDbType.TimeStamp)
        {
            Value = fechaFin,
            Direction = ParameterDirection.Input
        });
        
        var parametroResultado = new OracleParameter("P_RESULTADO", OracleDbType.RefCursor)
        {
            Direction = ParameterDirection.Output
        };
        comando.Parameters.Add(parametroResultado);
        
        using var lector = await comando.ExecuteReaderAsync();
        
        while (await lector.ReadAsync())
        {
            var orderStatusOrdinal = lector.GetOrdinal("ORDER_STATUS");
            listaOrdenes.Add(new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.IsDBNull(orderStatusOrdinal) ? "PENDING" : lector.GetString(orderStatusOrdinal),
                StoreId = lector.GetInt32(lector.GetOrdinal("STORE_ID"))
            });
        }
        
        return listaOrdenes;
    }
}
