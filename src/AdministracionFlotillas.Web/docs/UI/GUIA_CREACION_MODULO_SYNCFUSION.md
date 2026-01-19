# Guía Paso a Paso: Creación de Nuevo Módulo con Syncfusion y Stored Procedures

Esta guía detalla el proceso completo para crear un nuevo módulo basado en la estructura del módulo Employees, pero utilizando componentes complejos de Syncfusion y conexión a base de datos Oracle mediante stored procedures.

## Convenciones de Nomenclatura

**Todos los nombres de variables, métodos, clases y funciones deben estar en español** y seguir estas convenciones para máxima legibilidad:

- **Métodos C#**: Verbo en infinitivo + sustantivo, PascalCase (ej: `ObtenerOrdersAsync`, `BuscarOrdenesAsync`)
- **Variables C#**: Sustantivo descriptivo en camelCase (ej: `listaOrdenes`, `idCliente`, `fechaInicio`, `conexion`, `comando`, `lector`, `orden`, `ordenes`)
- **Parámetros**: Sustantivo descriptivo en camelCase (ej: `idOrden`, `idCliente`, `estado`, `fechaInicio`, `fechaFin`)
- **Clases**: Sustantivo en singular, PascalCase (ej: `Order`, `SolicitudBuscarOrdenes`, `SolicitudRangoFechas`)
- **Propiedades**: Sustantivo descriptivo, PascalCase (ej: `IdOrden`, `FechaOrden`, `EstadoOrden`, `IdCliente`, `IdTienda`)
- **Eventos JavaScript**: Prefijo "Al" + verbo en infinitivo (ej: `AlCrear`, `AlSeleccionarFila`, `AlCompletarAccion`, `AlCambiarEstado`)
- **Funciones JavaScript**: Verbo en infinitivo, PascalCase (ej: `CargarDatos`, `AplicarFiltros`, `ActualizarMetricas`, `ObtenerIdCliente`)
- **Namespaces JavaScript**: Sustantivo en plural, PascalCase (ej: `Orders.Grid`, `Orders.Filtros`, `Orders.Detalles`, `Orders.Graficos`)
- **Excepciones**: Variable `excepcion` en lugar de `ex` o `e`

**Objetivo**: El código debe leerse como enunciados en español, no como código técnico difícil de interpretar.

## Objetivo

Crear un nuevo módulo que:
- Siga la misma estructura y nomenclatura del módulo Employees
- Use componentes complejos de Syncfusion (Grid, Charts, Dashboard, etc.)
- Se conecte a base de datos Oracle mediante stored procedures
- Implemente análisis de información con componentes especializados
- Adapte el flujo de trabajo a los datos reales de la base de datos

## Estructura Real de la Base de Datos

**Base de Datos**: AdministracionFlotillas  
**Connection String**: `jdbc:oracle:thin:@adminflotillas_high`  
**Usuario**: ADMIN

**Tabla ORDERS** (estructura real):
- `ORDER_ID` (NUMBER) - Identificador único de la orden
- `ORDER_TMS` (TIMESTAMP) - Fecha y hora de la orden (formato: "2022-02-24 17:17:13.907822")
- `CUSTOMER_ID` (NUMBER) - Identificador del cliente
- `ORDER_STATUS` (VARCHAR2) - Estado de la orden: "COMPLETE", "CANCELLED", "REFUNDED"
- `STORE_ID` (NUMBER) - Identificador de la tienda

**Nota**: Esta guía está basada en la estructura real de la base de datos proporcionada. Todos los ejemplos reflejan esta estructura.

## Diferencias Clave con el Módulo Employees

| Aspecto | Módulo Employees (V1) | Nuevo Módulo (V2) |
|---------|------------------------|-------------------|
| **UI Library** | DataTables + Bootstrap | Syncfusion Components |
| **Fuente de Datos** | Datos mock (hardcoded) | Base de datos Oracle real |
| **Acceso a Datos** | Métodos directos | Stored Procedures |
| **Componentes** | Tabla básica, filtros simples | Grid avanzado, Charts, Dashboard, Analytics |
| **Análisis** | Visualización básica | Análisis profundo con gráficos y métricas |

## Estructura del Nuevo Módulo

El nuevo módulo seguirá la misma estructura que Employees:

```
ModelosComunes/
  └── [Entidad].cs

AccesoDatos/Repositorios/
  ├── I[Entidad]Repository.cs
  └── [Entidad]Repository.cs (con stored procedures)

ReglasNegocio/Servicios/
  ├── Interfaces/I[Entidad]Service.cs
  └── Escenarios/Oracle/[Entidad]ServiceOracle.cs

Web/
  ├── Controllers/[Entidad]Controller.cs
  ├── ViewModels/[Entidad]ViewModel.cs
  ├── Parseador/[Entidad]Parseador.cs
  ├── Views/[Entidad]/
  │   ├── Index.cshtml (Dashboard con Syncfusion)
  │   ├── _[Entidad]Grid.cshtml (Grid Syncfusion)
  │   ├── Analytics.cshtml (Gráficos y análisis)
  │   └── Details.cshtml (Vista detallada con Tabs)
  └── Scripts/[Entidad]/
      └── [Entidad].js (Namespaces JavaScript)
```

## Fase 1: Preparación y Configuración

### Paso 1.1: Verificar Licencia de Syncfusion

**Objetivo**: Asegurar que Syncfusion está correctamente instalado y licenciado.

**Pasos**:
1. Verificar que el paquete NuGet `Syncfusion.EJ2.AspNet.Core` está instalado
2. Verificar que la licencia está registrada en `Program.cs` (DESPUÉS de `var app = builder.Build();`):
   ```csharp
   using Syncfusion.Licensing;
   
   var app = builder.Build();
   
   // Registrar licencia (para .NET 8.0/.NET 9.0)
   SyncfusionLicenseProvider.RegisterLicense("TU_LICENCIA_AQUI");
   ```
3. Verificar que los estilos y scripts están en `_Layout.cshtml`:
   ```html
   <!-- En <head> -->
   <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/32.1.19/fluent.css" />
   
   <!-- Antes de </body> -->
   <script src="https://cdn.syncfusion.com/ej2/32.1.19/dist/ej2.min.js"></script>
   <ejs-scripts></ejs-scripts>
   ```
4. Verificar que el Tag Helper está en `_ViewImports.cshtml`:
   ```csharp
   @addTagHelper *, Syncfusion.EJ2
   ```

**Referencia oficial**: [Getting Started with ASP.NET Core Grid](https://ej2.syncfusion.com/aspnetcore/documentation/grid/getting-started-core)

**Referencias**:
- [REGISTRO_LICENCIA_SYNCFUSION.md](REGISTRO_LICENCIA_SYNCFUSION.md)
- [COMPONENTES_SYNCFUSION.md](COMPONENTES_SYNCFUSION.md)

### Paso 1.2: Verificar Conexión a Base de Datos Oracle

**Objetivo**: Asegurar que la conexión a Oracle está configurada correctamente.

**Pasos**:
1. Verificar `appsettings.json` tiene el connection string:
   ```json
   {
     "ConnectionStrings": {
       "OracleConnection": "Data Source=TU_DATASOURCE?TNS_ADMIN=/ruta/al/wallet;User Id=TU_USUARIO;Password=TU_PASSWORD;"
     }
   }
   ```
2. Verificar que el paquete `Oracle.ManagedDataAccess.Core` está instalado en `AdministracionFlotillas.AccesoDatos`
3. Probar conexión desde DataGrip o SQL Developer
4. Verificar que el schema tiene las tablas necesarias

**Referencias**:
- [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)
- [BASE_DATOS/GUIA_BASE_DATOS.md](../BASE_DATOS/GUIA_BASE_DATOS.md)

### Paso 1.3: Definir Entidad y Tabla de Base de Datos

**Objetivo**: Identificar la entidad principal y su tabla correspondiente.

**Pasos**:
1. Decidir qué entidad se va a implementar (ej: Orders, Customers, Products)
2. Identificar la tabla en Oracle (ej: `ORDERS` en el schema ADMIN)
3. Revisar la estructura de la tabla:
   ```sql
   DESCRIBE ORDERS;
   SELECT * FROM ORDERS WHERE ROWNUM <= 5;
   ```
4. Documentar las columnas principales y sus tipos de datos
5. Identificar relaciones con otras tablas (foreign keys)

**Nota**: Esta guía usa "Orders" como ejemplo, pero aplica a cualquier entidad.

## Fase 2: Creación de Stored Procedures

### Paso 2.1: Crear Paquete de Stored Procedures

**Objetivo**: Crear un paquete Oracle con procedimientos almacenados para las operaciones CRUD.

**Ubicación**: Ejecutar en Oracle (DataGrip, SQL Developer, o Database Actions)

**Estructura del Paquete**:
```sql
-- Crear especificación del paquete
CREATE OR REPLACE PACKAGE PKG_[ENTIDAD] AS
    -- Obtener todos los registros
    PROCEDURE SP_OBTENER_[ENTIDAD]ES(
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener por ID
    PROCEDURE SP_OBTENER_[ENTIDAD]_POR_ID(
        P_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener con filtros
    PROCEDURE SP_BUSCAR_[ENTIDAD]ES(
        P_FILTRO_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_FILTRO_FECHA_INICIO IN DATE DEFAULT NULL,
        P_FILTRO_FECHA_FIN IN DATE DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Insertar nuevo registro
    PROCEDURE SP_INSERTAR_[ENTIDAD](
        P_DATOS IN [TIPO_DATOS],
        P_NUEVO_ID OUT NUMBER,
        P_EXITO OUT NUMBER,
        P_MENSAJE OUT VARCHAR2
    );
    
    -- Actualizar registro
    PROCEDURE SP_ACTUALIZAR_[ENTIDAD](
        P_ID IN NUMBER,
        P_DATOS IN [TIPO_DATOS],
        P_EXITO OUT NUMBER,
        P_MENSAJE OUT VARCHAR2
    );
    
    -- Eliminar registro (lógico)
    PROCEDURE SP_ELIMINAR_[ENTIDAD](
        P_ID IN NUMBER,
        P_EXITO OUT NUMBER,
        P_MENSAJE OUT VARCHAR2
    );
END PKG_[ENTIDAD];
/
```

**Ejemplo para Orders**:
```sql
CREATE OR REPLACE PACKAGE PKG_ORDERS AS
    PROCEDURE SP_OBTENER_ORDERS(
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    PROCEDURE SP_OBTENER_ORDER_POR_ID(
        P_ORDER_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    PROCEDURE SP_BUSCAR_ORDERS(
        P_CUSTOMER_ID IN NUMBER DEFAULT NULL,
        P_STORE_ID IN NUMBER DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_FECHA_INICIO IN DATE DEFAULT NULL,
        P_FECHA_FIN IN DATE DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    PROCEDURE SP_OBTENER_ORDERS_POR_RANGO_FECHAS(
        P_FECHA_INICIO IN DATE,
        P_FECHA_FIN IN DATE,
        P_RESULTADO OUT SYS_REFCURSOR
    );
END PKG_ORDERS;
/
```

### Paso 2.2: Implementar Cuerpo del Paquete

**Objetivo**: Implementar la lógica de los stored procedures.

**Estructura del Cuerpo**:
```sql
CREATE OR REPLACE PACKAGE BODY PKG_[ENTIDAD] AS
    
    PROCEDURE SP_OBTENER_[ENTIDAD]ES(
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                [COLUMNAS]
            FROM [TABLA]
            ORDER BY [COLUMNA_ORDEN] DESC;
    END SP_OBTENER_[ENTIDAD]ES;
    
    PROCEDURE SP_OBTENER_[ENTIDAD]_POR_ID(
        P_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                [COLUMNAS]
            FROM [TABLA]
            WHERE [ID_COLUMN] = P_ID;
    END SP_OBTENER_[ENTIDAD]_POR_ID;
    
    PROCEDURE SP_BUSCAR_[ENTIDAD]ES(
        P_FILTRO_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_FILTRO_FECHA_INICIO IN DATE DEFAULT NULL,
        P_FILTRO_FECHA_FIN IN DATE DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                [COLUMNAS]
            FROM [TABLA]
            WHERE 
                (P_FILTRO_NOMBRE IS NULL OR UPPER([NOMBRE_COLUMN]) LIKE '%' || UPPER(P_FILTRO_NOMBRE) || '%')
                AND (P_FILTRO_FECHA_INICIO IS NULL OR [FECHA_COLUMN] >= P_FILTRO_FECHA_INICIO)
                AND (P_FILTRO_FECHA_FIN IS NULL OR [FECHA_COLUMN] <= P_FILTRO_FECHA_FIN)
            ORDER BY [COLUMNA_ORDEN] DESC;
    END SP_BUSCAR_[ENTIDAD]ES;
    
END PKG_[ENTIDAD];
/
```

**Ejemplo para Orders** (basado en estructura real de la base de datos):
```sql
CREATE OR REPLACE PACKAGE BODY PKG_ORDERS AS
    
    PROCEDURE SP_OBTENER_ORDERS(
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                ORDER_ID,
                ORDER_TMS,
                CUSTOMER_ID,
                ORDER_STATUS,
                STORE_ID
            FROM ORDERS
            ORDER BY ORDER_TMS DESC;
    END SP_OBTENER_ORDERS;
    
    PROCEDURE SP_OBTENER_ORDER_POR_ID(
        P_ORDER_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                ORDER_ID,
                ORDER_TMS,
                CUSTOMER_ID,
                ORDER_STATUS,
                STORE_ID
            FROM ORDERS
            WHERE ORDER_ID = P_ORDER_ID;
    END SP_OBTENER_ORDER_POR_ID;
    
    PROCEDURE SP_BUSCAR_ORDERS(
        P_CUSTOMER_ID IN NUMBER DEFAULT NULL,
        P_STORE_ID IN NUMBER DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_FECHA_INICIO IN TIMESTAMP DEFAULT NULL,
        P_FECHA_FIN IN TIMESTAMP DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                ORDER_ID,
                ORDER_TMS,
                CUSTOMER_ID,
                ORDER_STATUS,
                STORE_ID
            FROM ORDERS
            WHERE 
                (P_CUSTOMER_ID IS NULL OR CUSTOMER_ID = P_CUSTOMER_ID)
                AND (P_STORE_ID IS NULL OR STORE_ID = P_STORE_ID)
                AND (P_STATUS IS NULL OR ORDER_STATUS = P_STATUS)
                AND (P_FECHA_INICIO IS NULL OR ORDER_TMS >= P_FECHA_INICIO)
                AND (P_FECHA_FIN IS NULL OR ORDER_TMS <= P_FECHA_FIN)
            ORDER BY ORDER_TMS DESC;
    END SP_BUSCAR_ORDERS;
    
    PROCEDURE SP_OBTENER_ORDERS_POR_RANGO_FECHAS(
        P_FECHA_INICIO IN TIMESTAMP,
        P_FECHA_FIN IN TIMESTAMP,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                ORDER_ID,
                ORDER_TMS,
                CUSTOMER_ID,
                ORDER_STATUS,
                STORE_ID
            FROM ORDERS
            WHERE ORDER_TMS BETWEEN P_FECHA_INICIO AND P_FECHA_FIN
            ORDER BY ORDER_TMS;
    END SP_OBTENER_ORDERS_POR_RANGO_FECHAS;
    
END PKG_ORDERS;
/
```

**Nota sobre la estructura real**:
- La tabla `ORDERS` tiene las columnas: `ORDER_ID`, `ORDER_TMS`, `CUSTOMER_ID`, `ORDER_STATUS`, `STORE_ID`
- `ORDER_TMS` es de tipo TIMESTAMP (no DATE)
- No hay campos `ORDER_TOTAL`, `ORDER_DATE`, ni relaciones directas con tablas `CUSTOMERS` o `STORES` en la estructura mostrada
- Si necesitas información de clientes o tiendas, deberás crear JOINs adicionales o stored procedures separados

### Paso 2.3: Probar Stored Procedures

**Objetivo**: Verificar que los stored procedures funcionan correctamente.

**Pasos**:
1. Ejecutar cada stored procedure desde DataGrip o SQL Developer
2. Verificar que retornan datos correctos
3. Probar con diferentes parámetros
4. Verificar manejo de errores

**Ejemplo de Prueba**:
```sql
-- Probar SP_OBTENER_ORDERS
DECLARE
    V_CURSOR SYS_REFCURSOR;
    V_ORDER_ID NUMBER;
    V_ORDER_TMS TIMESTAMP;
    V_CUSTOMER_ID NUMBER;
    V_ORDER_STATUS VARCHAR2(20);
    V_STORE_ID NUMBER;
BEGIN
    PKG_ORDERS.SP_OBTENER_ORDERS(V_CURSOR);
    
    LOOP
        FETCH V_CURSOR INTO V_ORDER_ID, V_ORDER_TMS, V_CUSTOMER_ID, V_ORDER_STATUS, V_STORE_ID;
        EXIT WHEN V_CURSOR%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE('Order ID: ' || V_ORDER_ID || ', Status: ' || V_ORDER_STATUS || ', Date: ' || TO_CHAR(V_ORDER_TMS, 'DD/MM/YYYY HH24:MI:SS'));
    END LOOP;
    
    CLOSE V_CURSOR;
END;
/
```

## Fase 3: Desarrollo del Backend

### Paso 3.1: Crear Modelo Común

**Objetivo**: Crear el modelo de negocio en `AdministracionFlotillas.ModelosComunes`.

**Ubicación**: `src/AdministracionFlotillas.ModelosComunes/[Entidad].cs`

**Estructura**:
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class [Entidad]
{
    public int [Id] { get; set; }
    // Propiedades según la tabla de Oracle
    // Usar tipos de datos de C# equivalentes a Oracle
    // Ejemplo: NUMBER -> int o decimal, VARCHAR2 -> string, DATE -> DateTime
}
```

**Ejemplo para Order** (basado en estructura real de la base de datos):
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class Order
{
    public int OrderId { get; set; }
    public DateTime OrderTms { get; set; }  // ORDER_TMS en Oracle (TIMESTAMP)
    public int CustomerId { get; set; }
    public string OrderStatus { get; set; } = string.Empty;  // COMPLETE, CANCELLED, REFUNDED
    public int StoreId { get; set; }
}
```

**Nota**: La estructura real de la tabla `ORDERS` en la base de datos es:
- `ORDER_ID` (NUMBER) → `OrderId` (int)
- `ORDER_TMS` (TIMESTAMP) → `OrderTms` (DateTime)
- `CUSTOMER_ID` (NUMBER) → `CustomerId` (int)
- `ORDER_STATUS` (VARCHAR2) → `OrderStatus` (string) - Valores: "COMPLETE", "CANCELLED", "REFUNDED"
- `STORE_ID` (NUMBER) → `StoreId` (int)

**Configuración de Conexión**:
La base de datos está configurada con:
- **Connection String JDBC**: `jdbc:oracle:thin:@adminflotillas_high`
- **Usuario**: `ADMIN`
- **Schema**: `ADMIN` (las tablas están directamente en este schema, no en un schema separado como `CO`)

Para configurar la cadena de conexión en `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_PASSWORD;"
  }
}
```

**Convenciones de Nomenclatura en Español**:
- **Clases**: Nombre en singular, PascalCase (ej: `Order`, `Orden`)
- **Métodos**: Verbo en infinitivo + sustantivo, PascalCase (ej: `ObtenerOrdersAsync`, `BuscarOrdenesAsync`)
- **Variables locales**: Sustantivo descriptivo en español, camelCase (ej: `listaOrdenes`, `idCliente`, `fechaInicio`)
- **Parámetros**: Sustantivo descriptivo en español, camelCase (ej: `idOrden`, `idCliente`, `estado`)
- **Propiedades**: Sustantivo descriptivo, PascalCase (ej: `IdOrden`, `FechaOrden`, `EstadoOrden`)
- **Eventos JavaScript**: Prefijo "Al" + verbo en infinitivo (ej: `AlCrear`, `AlSeleccionarFila`, `AlCompletarAccion`)
- **Funciones JavaScript**: Verbo en infinitivo, PascalCase (ej: `CargarDatos`, `AplicarFiltros`, `ActualizarMetricas`)
- **Namespaces JavaScript**: Sustantivo en plural, PascalCase (ej: `Orders.Grid`, `Orders.Filtros`, `Orders.Detalles`)
- Usar tipos nullable (`?`) cuando la columna permite NULL
- Nombres deben ser claros y legibles como enunciados (ej: "Obtener ordenes" en lugar de "GetOrders")

### Paso 3.2: Crear Interfaz del Repositorio

**Objetivo**: Definir el contrato del repositorio.

**Ubicación**: `src/AdministracionFlotillas.AccesoDatos/Repositorios/I[Entidad]Repository.cs`

**Estructura**:
```csharp
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface I[Entidad]Repository
{
    Task<List<[Entidad]>> Obtener[Entidad]esAsync();
    Task<[Entidad]?> Obtener[Entidad]PorIdAsync(int id);
    Task<List<[Entidad]>> Buscar[Entidad]esAsync(
        string? filtroNombre = null,
        DateTime? filtroFechaInicio = null,
        DateTime? filtroFechaFin = null
    );
}
```

**Ejemplo para Orders**:
```csharp
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IOrdersRepository
{
    Task<List<Order>> ObtenerOrdersAsync();
    Task<Order?> ObtenerOrderPorIdAsync(int idOrden);
    Task<List<Order>> BuscarOrdersAsync(
        int? idCliente = null,
        int? idTienda = null,
        string? estado = null,
        DateTime? fechaInicio = null,
        DateTime? fechaFin = null
    );
    Task<List<Order>> ObtenerOrdersPorRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin);
}
```

### Paso 3.3: Implementar Repositorio con Stored Procedures

**Objetivo**: Implementar el repositorio que ejecuta stored procedures.

**Ubicación**: `src/AdministracionFlotillas.AccesoDatos/Repositorios/[Entidad]Repository.cs`

**Estructura Base**:
```csharp
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;
using Microsoft.Extensions.Configuration;
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public class [Entidad]Repository : I[Entidad]Repository
{
    private readonly string _connectionString;
    
    public [Entidad]Repository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("OracleConnection") 
            ?? throw new InvalidOperationException("Connection string 'OracleConnection' not found.");
    }
    
    // Nota: La cadena de conexión debe estar en formato:
    // "Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_PASSWORD;"
    // O usar el formato TNS:
    // "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=tu_host)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=adminflotillas_high)));User Id=ADMIN;Password=TU_PASSWORD;"
    
    public async Task<List<[Entidad]>> Obtener[Entidad]esAsync()
    {
        var lista = new List<[Entidad]>();
        
        using var connection = new OracleConnection(_connectionString);
        await connection.OpenAsync();
        
        using var command = new OracleCommand("PKG_[ENTIDAD].SP_OBTENER_[ENTIDAD]ES", connection)
        {
            CommandType = CommandType.StoredProcedure
        };
        
        var resultadoParam = new OracleParameter("P_RESULTADO", OracleDbType.RefCursor)
        {
            Direction = ParameterDirection.Output
        };
        command.Parameters.Add(resultadoParam);
        
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            lista.Add(new [Entidad]
            {
                // Mapear columnas del reader a propiedades del modelo
            });
        }
        
        return lista;
    }
    
    // Implementar otros métodos siguiendo el mismo patrón
}
```

**Ejemplo Completo para Orders**:
```csharp
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
        await conexion.OpenAsync();
        
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
            listaOrdenes.Add(new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.GetString(lector.GetOrdinal("ORDER_STATUS")),
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
            return new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.GetString(lector.GetOrdinal("ORDER_STATUS")),
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
            listaOrdenes.Add(new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.GetString(lector.GetOrdinal("ORDER_STATUS")),
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
            listaOrdenes.Add(new Order
            {
                OrderId = lector.GetInt32(lector.GetOrdinal("ORDER_ID")),
                OrderTms = lector.GetDateTime(lector.GetOrdinal("ORDER_TMS")),
                CustomerId = lector.GetInt32(lector.GetOrdinal("CUSTOMER_ID")),
                OrderStatus = lector.GetString(lector.GetOrdinal("ORDER_STATUS")),
                StoreId = lector.GetInt32(lector.GetOrdinal("STORE_ID"))
            });
        }
        
        return listaOrdenes;
    }
}
```

**Notas Importantes**:
- Siempre usar `using` para asegurar que las conexiones se cierren
- Manejar valores NULL con `IsDBNull()` antes de leer
- Usar `OracleDbType` correcto para cada parámetro
- Para `SYS_REFCURSOR`, usar `OracleDbType.RefCursor` con `Direction = ParameterDirection.Output`

### Paso 3.4: Crear Interfaz del Servicio

**Objetivo**: Definir el contrato del servicio de negocio.

**Ubicación**: `src/AdministracionFlotillas.ReglasNegocio/Servicios/Interfaces/I[Entidad]Service.cs`

**Estructura**:
```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

public interface I[Entidad]Service
{
    Task<List<[Entidad]>> Obtener[Entidad]esAsync();
    Task<[Entidad]?> Obtener[Entidad]PorIdAsync(int id);
    Task<List<[Entidad]>> Buscar[Entidad]esAsync(
        string? filtroNombre = null,
        DateTime? filtroFechaInicio = null,
        DateTime? filtroFechaFin = null
    );
}
```

### Paso 3.5: Implementar Servicio de Negocio

**Objetivo**: Implementar la lógica de negocio.

**Ubicación**: `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/[Entidad]ServiceOracle.cs`

**Estructura**:
```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

public class [Entidad]ServiceOracle : I[Entidad]Service
{
    private readonly I[Entidad]Repository _repositorio;
    
    public [Entidad]ServiceOracle(I[Entidad]Repository repositorio)
    {
        _repositorio = repositorio;
    }
    
    public async Task<List<[Entidad]>> Obtener[Entidad]esAsync()
    {
        var [entidades] = await _repositorio.Obtener[Entidad]esAsync();
        
        // Aplicar reglas de negocio aquí
        // Ejemplo: filtrar, ordenar, calcular, validar
        
        return [entidades];
    }
    
    // Implementar otros métodos
}
```

**Ejemplo para Orders**:
```csharp
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
        int? customerId = null,
        int? storeId = null,
        string? status = null,
        DateTime? fechaInicio = null,
        DateTime? fechaFin = null)
    {
        // Validar rango de fechas
        if (fechaInicio.HasValue && fechaFin.HasValue && fechaInicio > fechaFin)
        {
            throw new ArgumentException("Fecha inicio no puede ser mayor que fecha fin");
        }
        
        return await _repositorio.BuscarOrdersAsync(customerId, storeId, status, fechaInicio, fechaFin);
    }
    
    public async Task<List<Order>> ObtenerOrdersPorRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin)
    {
        if (fechaInicio > fechaFin)
        {
            throw new ArgumentException("Fecha inicio no puede ser mayor que fecha fin");
        }
        
        return await _repositorio.ObtenerOrdersPorRangoFechasAsync(fechaInicio, fechaFin);
    }
}
```

### Paso 3.6: Crear ViewModel

**Objetivo**: Crear el modelo para la vista con propiedades en español.

**Ubicación**: `src/AdministracionFlotillas.Web/ViewModels/[Entidad]ViewModel.cs`

**Estructura**:
```csharp
namespace AdministracionFlotillas.Web.ViewModels;

public class [Entidad]ViewModel
{
    public int Id[Entidad] { get; set; }
    // Propiedades en español, formateadas para la vista
    // Ejemplo: fechas como string, monedas formateadas, etc.
}
```

**Ejemplo para OrderViewModel** (basado en estructura real):
```csharp
namespace AdministracionFlotillas.Web.ViewModels;

public class OrderViewModel
{
    public int IdOrden { get; set; }
    public string FechaOrden { get; set; } = string.Empty; // ORDER_TMS formateada como string
    public int IdCliente { get; set; }
    public string EstadoOrden { get; set; } = string.Empty; // COMPLETE, CANCELLED, REFUNDED
    public int IdTienda { get; set; }
}
```

### Paso 3.7: Crear Parseador

**Objetivo**: Convertir entre modelo de negocio y ViewModel.

**Ubicación**: `src/AdministracionFlotillas.Web/Parseador/[Entidad]Parseador.cs`

**Estructura**:
```csharp
using System.Collections.Generic;
using System.Linq;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

public static class [Entidad]Parseador
{
    public static [Entidad]ViewModel ConvertirAVista([Entidad] modelo)
    {
        if (modelo == null)
            return new [Entidad]ViewModel();
        
        return new [Entidad]ViewModel
        {
            // Mapear propiedades y formatear
        };
    }
    
    public static List<[Entidad]ViewModel> ConvertirListaAVista(List<[Entidad]> modelos)
    {
        return modelos.Select(ConvertirAVista).ToList();
    }
    
    public static [Entidad] ConvertirAModelo([Entidad]ViewModel vista)
    {
        if (vista == null)
            return new [Entidad]();
        
        return new [Entidad]
        {
            // Mapear propiedades
        };
    }
}
```

**Ejemplo para OrderParseador** (basado en estructura real):
```csharp
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
        
        return new OrderViewModel
        {
            IdOrden = orden.OrderId,
            FechaOrden = orden.OrderTms.ToString("dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture),
            IdCliente = orden.CustomerId,
            EstadoOrden = orden.OrderStatus,
            IdTienda = orden.StoreId
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
            CustomerId = vista.IdCliente,
            StoreId = vista.IdTienda,
            OrderStatus = vista.EstadoOrden
        };
    }
}
```

### Paso 3.8: Crear Controlador

**Objetivo**: Crear el controlador con endpoints AJAX.

**Ubicación**: `src/AdministracionFlotillas.Web/Controllers/[Entidad]Controller.cs`

**Estructura**:
```csharp
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.ViewModels;
using AdministracionFlotillas.Web.Parseador;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class [Entidad]Controller : Controller
{
    private readonly I[Entidad]Service _servicio;
    
    public [Entidad]Controller(I[Entidad]Service servicio)
    {
        _servicio = servicio;
    }
    
    public IActionResult Index()
    {
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> Obtener[Entidad]es()
    {
        try
        {
            var [entidades] = await _servicio.Obtener[Entidad]esAsync();
            var modelosVista = [Entidad]Parseador.ConvertirListaAVista([entidades]);
            
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    // Más endpoints según necesidades
}
```

**Ejemplo para OrdersController**:
```csharp
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.ViewModels;
using AdministracionFlotillas.Web.Parseador;

namespace AdministracionFlotillas.Web.Controllers;

[AllowAnonymous]
public class OrdersController : Controller
{
    private readonly IOrdersService _servicio;
    
    public OrdersController(IOrdersService servicio)
    {
        _servicio = servicio;
    }
    
    public IActionResult Index()
    {
        return View();
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrders()
    {
        try
        {
            var ordenes = await _servicio.ObtenerOrdersAsync();
            var modelosVista = OrderParseador.ConvertirListaAVista(ordenes);
            
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrderPorId([FromBody] int idOrden)
    {
        try
        {
            var orden = await _servicio.ObtenerOrderPorIdAsync(idOrden);
            
            if (orden == null)
            {
                return Json(new { exito = false, mensaje = "Orden no encontrada" });
            }
            
            var modeloVista = OrderParseador.ConvertirAVista(orden);
            return Json(new { exito = true, datos = modeloVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> BuscarOrders([FromBody] SolicitudBuscarOrdenes solicitud)
    {
        try
        {
            var ordenes = await _servicio.BuscarOrdersAsync(
                solicitud.IdCliente,
                solicitud.IdTienda,
                solicitud.Estado,
                solicitud.FechaInicio,
                solicitud.FechaFin
            );
            
            var modelosVista = OrderParseador.ConvertirListaAVista(ordenes);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
    
    [HttpPost]
    [IgnoreAntiforgeryToken]
    public async Task<IActionResult> ObtenerOrdersPorRangoFechas([FromBody] SolicitudRangoFechas solicitud)
    {
        try
        {
            var ordenes = await _servicio.ObtenerOrdersPorRangoFechasAsync(
                solicitud.FechaInicio,
                solicitud.FechaFin
            );
            
            var modelosVista = OrderParseador.ConvertirListaAVista(ordenes);
            return Json(new { exito = true, datos = modelosVista });
        }
        catch (Exception excepcion)
        {
            return Json(new { exito = false, mensaje = excepcion.Message });
        }
    }
}

// Clases auxiliares para solicitudes
public class SolicitudBuscarOrdenes
{
    public int? IdCliente { get; set; }
    public int? IdTienda { get; set; }
    public string? Estado { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
}

public class SolicitudRangoFechas
{
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
}
```

### Paso 3.9: Registrar Dependencias en Program.cs

**Objetivo**: Registrar repositorios y servicios en el contenedor de inyección de dependencias.

**Ubicación**: `src/AdministracionFlotillas.Web/Program.cs`

**Agregar**:
```csharp
// Repositorios
builder.Services.AddScoped<I[Entidad]Repository, [Entidad]Repository>();

// Servicios
builder.Services.AddScoped<I[Entidad]Service, [Entidad]ServiceOracle>();
```

**Ejemplo**:
```csharp
// Repositorios
builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();

// Servicios
builder.Services.AddScoped<IOrdersService, OrdersServiceOracle>();
```

## Fase 4: Desarrollo del Frontend con Syncfusion

### Paso 4.1: Crear Vista Principal (Dashboard)

**Objetivo**: Crear la vista principal con dashboard usando componentes Syncfusion.

**Ubicación**: `src/AdministracionFlotillas.Web/Views/[Entidad]/Index.cshtml`

**Estructura Base**:
```html
@{
    ViewData["Title"] = "[Entidad]";
}

<div class="container-fluid">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a asp-controller="Home" asp-action="Index">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">[Entidad]</li>
        </ol>
    </nav>
    
    <!-- Título -->
    <div class="mb-4">
        <h2>[Entidad]</h2>
        <p class="text-muted">Gestión y análisis de [entidad]</p>
    </div>
    
    <!-- Dashboard con métricas -->
    <div class="row mb-4">
        <!-- Cards con métricas usando Syncfusion Cards o Bootstrap Cards -->
    </div>
    
    <!-- Grid principal -->
    @await Html.PartialAsync("_[Entidad]Grid")
</div>

@section Scripts {
    <script src="~/js/bundles/[entidad].min.js" asp-append-version="true"></script>
}
```

**Ejemplo Completo para Orders con Dashboard**:
```html
@{
    ViewData["Title"] = "Órdenes";
}

<div class="container-fluid">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a asp-controller="Home" asp-action="Index">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Órdenes</li>
        </ol>
    </nav>
    
    <!-- Título -->
    <div class="mb-4">
        <h2>Órdenes de Venta</h2>
        <p class="text-muted">Gestión y análisis de órdenes de venta</p>
    </div>
    
    <!-- Dashboard con métricas -->
    <div class="row mb-4">
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Total Órdenes</h5>
                    <h2 id="totalOrders">-</h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Órdenes Pendientes</h5>
                    <h2 id="pendingOrders">-</h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Total Ventas</h5>
                    <h2 id="totalSales">-</h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Promedio por Orden</h5>
                    <h2 id="averageOrder">-</h2>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Grid principal -->
    @await Html.PartialAsync("_OrdersGrid")
</div>

@section Scripts {
    <script src="~/js/bundles/orders.min.js" asp-append-version="true"></script>
}
```

### Paso 4.2: Crear Vista Parcial del Grid

**Objetivo**: Crear el grid usando Syncfusion Grid component.

**Ubicación**: `src/AdministracionFlotillas.Web/Views/[Entidad]/_[Entidad]Grid.cshtml`

**Estructura con Syncfusion Grid**:
```html
<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">Lista de [Entidad]</h5>
    </div>
    <div class="card-body">
        <!-- Filtros -->
        <div class="row mb-3">
            <!-- Filtros usando Syncfusion DatePicker, DropDownList, etc. -->
        </div>
        
        <!-- Grid Syncfusion -->
        <ejs-grid id="[entidad]Grid" 
                  dataSource="@Url.Action("Obtener[Entidad]es", "[Entidad]")"
                  allowPaging="true"
                  allowFiltering="true"
                  allowSorting="true"
                  allowSelection="true"
                  pageSettings="@(new Syncfusion.EJ2.Grids.PageSettings { PageSize = 10 })">
            <e-grid-columns>
                <e-grid-column field="Id[Entidad]" headerText="ID" width="80"></e-grid-column>
                <!-- Más columnas -->
            </e-grid-columns>
        </ejs-grid>
    </div>
</div>
```

**Ejemplo Completo para Orders Grid**:
```html
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Órdenes</h5>
        <div>
            <button type="button" class="btn btn-primary btn-sm" onclick="Orders.Grid.Recargar()">
                <i class="fas fa-sync-alt"></i> Actualizar
            </button>
        </div>
    </div>
    <div class="card-body">
        <!-- Filtros -->
        <div class="row mb-3">
            <div class="col-md-3">
                <label class="form-label">ID Cliente</label>
                <ejs-numerictextbox id="filtroClienteId" 
                                     placeholder="Todos los clientes"
                                     change="Orders.Filtros.AlCambiarIdCliente">
                </ejs-numerictextbox>
            </div>
            <div class="col-md-3">
                <label class="form-label">Estado</label>
                <ejs-dropdownlist id="filtroEstado" 
                                  placeholder="Todos los estados"
                                  dataSource="@(new string[] { "COMPLETE", "CANCELLED", "REFUNDED" })"
                                  change="Orders.Filtros.AlCambiarEstado">
                </ejs-dropdownlist>
            </div>
            <div class="col-md-3">
                <label class="form-label">ID Tienda</label>
                <ejs-numerictextbox id="filtroTiendaId" 
                                     placeholder="Todas las tiendas"
                                     change="Orders.Filtros.AlCambiarIdTienda">
                </ejs-numerictextbox>
            </div>
            <div class="col-md-3">
                <label class="form-label">Fecha Inicio</label>
                <ejs-datepicker id="filtroFechaInicio" 
                                placeholder="Desde"
                                change="Orders.Filtros.AlCambiarFechaInicio">
                </ejs-datepicker>
            </div>
            <div class="col-md-3">
                <label class="form-label">Fecha Fin</label>
                <ejs-datepicker id="filtroFechaFin" 
                                placeholder="Hasta"
                                change="Orders.Filtros.AlCambiarFechaFin">
                </ejs-datepicker>
            </div>
        </div>
        
        <!-- Grid Syncfusion -->
        <!-- Nota: Para binding remoto, usar dataSource con URL o DataManager -->
        <ejs-grid id="ordersGrid" 
                  allowPaging="true"
                  allowFiltering="true"
                  allowSorting="true"
                  allowSelection="true"
                  rowSelected="Orders.Grid.AlSeleccionarFila"
                  actionComplete="Orders.Grid.AlCompletarAccion"
                  created="Orders.Grid.AlCrear">
            <e-grid-pagesettings pageSize="10"></e-grid-pagesettings>
            <e-grid-toolbar>
                <e-items>
                    <e-item text="Search"></e-item>
                    <e-item text="ExcelExport"></e-item>
                    <e-item text="PdfExport"></e-item>
                </e-items>
            </e-grid-toolbar>
            <e-grid-columns>
                <e-grid-column field="IdOrden" headerText="ID" width="80" isPrimaryKey="true"></e-grid-column>
                <e-grid-column field="FechaOrden" headerText="Fecha y Hora" width="150"></e-grid-column>
                <e-grid-column field="IdCliente" headerText="ID Cliente" width="100"></e-grid-column>
                <e-grid-column field="EstadoOrden" headerText="Estado" width="120">
                    <e-content-template>
                        <span class="badge ${if(EstadoOrden === 'COMPLETE')}bg-success${else if(EstadoOrden === 'CANCELLED')}bg-danger${else if(EstadoOrden === 'REFUNDED')}bg-warning${else}bg-secondary${/if}">
                            ${EstadoOrden}
                        </span>
                    </e-content-template>
                </e-grid-column>
                <e-grid-column field="IdTienda" headerText="ID Tienda" width="100"></e-grid-column>
                <e-grid-column headerText="Acciones" width="150" template="#accionesTemplate"></e-grid-column>
            </e-grid-columns>
        </ejs-grid>
        
        <!-- Template para acciones -->
        <script id="accionesTemplate" type="text/x-template">
            <div>
                <button class="btn btn-sm btn-info" onclick="Orders.Detalles.Ver(${IdOrden})">
                    <i class="fas fa-eye"></i> Ver
                </button>
            </div>
        </script>
    </div>
</div>
```

### Paso 4.3: Crear Vista de Análisis (Analytics)

**Objetivo**: Crear vista con gráficos y análisis usando Syncfusion Charts.

**Ubicación**: `src/AdministracionFlotillas.Web/Views/[Entidad]/Analytics.cshtml`

**Estructura con Charts**:
```html
@{
    ViewData["Title"] = "Análisis de [Entidad]";
}

<div class="container-fluid">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a asp-controller="Home" asp-action="Index">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a asp-controller="[Entidad]" asp-action="Index">[Entidad]</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Análisis</li>
        </ol>
    </nav>
    
    <h2>Análisis de [Entidad]</h2>
    
    <div class="row">
        <div class="col-md-6">
            <!-- Gráfico 1 -->
            <ejs-chart id="chart1" 
                       dataSource="@Url.Action("ObtenerDatosGrafico1", "[Entidad]")">
                <!-- Configuración del gráfico -->
            </ejs-chart>
        </div>
        <div class="col-md-6">
            <!-- Gráfico 2 -->
            <ejs-chart id="chart2" 
                       dataSource="@Url.Action("ObtenerDatosGrafico2", "[Entidad]")">
                <!-- Configuración del gráfico -->
            </ejs-chart>
        </div>
    </div>
</div>
```

**Ejemplo Completo para Orders Analytics**:
```html
@{
    ViewData["Title"] = "Análisis de Órdenes";
}

<div class="container-fluid">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a asp-controller="Home" asp-action="Index">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a asp-controller="Orders" asp-action="Index">Órdenes</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Análisis</li>
        </ol>
    </nav>
    
    <h2>Análisis de Órdenes</h2>
    
    <div class="row mb-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h5>Ventas por Mes</h5>
                </div>
                <div class="card-body">
                    <ejs-chart id="chartVentasPorMes" 
                               dataSource="@Url.Action("ObtenerVentasPorMes", "Orders")"
                               load="Orders.Graficos.AlCargarGrafico">
                        <e-chart-primaryxaxis valueType="Category"></e-chart-primaryxaxis>
                        <e-chart-primaryyaxis valueType="Double"></e-chart-primaryyaxis>
                        <e-series-collection>
                            <e-series type="Column" 
                                      xName="mes" 
                                      yName="total"
                                      name="Ventas">
                            </e-series>
                        </e-series-collection>
                    </ejs-chart>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Órdenes por Estado</h5>
                </div>
                <div class="card-body">
                    <ejs-chart id="chartOrdenesPorEstado" 
                               dataSource="@Url.Action("ObtenerOrdenesPorEstado", "Orders")">
                        <e-series-collection>
                            <e-series type="Pie" 
                                      xName="estado" 
                                      yName="cantidad"
                                      radius="70%">
                            </e-series>
                        </e-series-collection>
                    </ejs-chart>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Top 10 Clientes</h5>
                </div>
                <div class="card-body">
                    <ejs-chart id="chartTopClientes" 
                               dataSource="@Url.Action("ObtenerTopClientes", "Orders")">
                        <e-chart-primaryxaxis valueType="Category"></e-chart-primaryxaxis>
                        <e-chart-primaryyaxis valueType="Double"></e-chart-primaryyaxis>
                        <e-series-collection>
                            <e-series type="Bar" 
                                      xName="cliente" 
                                      yName="total"
                                      name="Ventas">
                            </e-series>
                        </e-series-collection>
                    </ejs-chart>
                </div>
            </div>
        </div>
    </div>
</div>

@section Scripts {
    <script src="~/js/bundles/orders.min.js" asp-append-version="true"></script>
}
```

### Paso 4.4: Crear Vista de Detalles con Tabs

**Objetivo**: Crear vista detallada usando Syncfusion Tabs.

**Ubicación**: `src/AdministracionFlotillas.Web/Views/[Entidad]/Details.cshtml`

**Estructura con Tabs**:
```html
@{
    ViewData["Title"] = "Detalles de [Entidad]";
}

<div class="container-fluid">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a asp-controller="Home" asp-action="Index">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a asp-controller="[Entidad]" asp-action="Index">[Entidad]</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Detalles</li>
        </ol>
    </nav>
    
    <h2>Detalles de [Entidad]</h2>
    
    <div id="detallesContainer">
        <!-- Se llena dinámicamente con JavaScript -->
    </div>
</div>

<script id="detallesTemplate" type="text/x-template">
    <ejs-tabs>
        <e-tabitems>
            <e-tabitem header="Información General" content="#infoGeneral"></e-tabitem>
            <e-tabitem header="Detalles Adicionales" content="#detallesAdicionales"></e-tabitem>
        </e-tabitems>
    </ejs-tabs>
    
    <div id="infoGeneral">
        <!-- Información general -->
    </div>
    
    <div id="detallesAdicionales">
        <!-- Detalles adicionales -->
    </div>
</script>
```

### Paso 4.5: Crear JavaScript con Namespaces

**Objetivo**: Crear JavaScript organizado en namespaces para el nuevo módulo.

**Ubicación**: `src/AdministracionFlotillas.Web/Scripts/[Entidad]/[Entidad].js`

**Estructura Base**:
```javascript
// Namespace principal
window.[Entidad] = window.[Entidad] || {};

(function() {
    'use strict';
    
    // Sub-namespace para Grid
    window.[Entidad].Grid = {
        Inicializar: function() {
            // Inicializar Syncfusion Grid
        },
        
        Recargar: function() {
            // Recargar datos del grid
        },
        
        AlSeleccionarFila: function(argumentos) {
            // Manejar selección de fila
        },
        
        AlCompletarAccion: function(argumentos) {
            // Manejar acciones completadas
        }
    };
    
    // Sub-namespace para Filtros
    window.[Entidad].Filtros = {
        Aplicar: function() {
            // Aplicar todos los filtros
        },
        
        AlCambiarCliente: function(argumentos) {
            // Manejar cambio de filtro cliente
        }
    };
    
    // Sub-namespace para Graficos
    window.[Entidad].Graficos = {
        AlCargarGrafico: function(argumentos) {
            // Configurar gráfico al cargar
        }
    };
    
    // Sub-namespace para Detalles
    window.[Entidad].Detalles = {
        Ver: function(id) {
            // Ver detalles de un registro
        }
    };
    
    // Auto-inicialización cuando el DOM está listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.[Entidad].Grid !== 'undefined') {
                window.[Entidad].Grid.Inicializar();
            }
        });
    } else {
        if (typeof window.[Entidad].Grid !== 'undefined') {
            window.[Entidad].Grid.Inicializar();
        }
    }
})();
```

**Ejemplo Completo para Orders.js**:
```javascript
// Namespace principal
window.Orders = window.Orders || {};

(function() {
    'use strict';
    
    // Sub-namespace para Grid
    window.Orders.Grid = {
        Inicializar: function() {
            // El grid se inicializa automáticamente con Syncfusion
            // Aquí se pueden configurar eventos adicionales
            this.CargarDatos();
        },
        
        AlCrear: function() {
            // Evento que se dispara cuando el grid se crea
            // Cargar datos iniciales
            Orders.Grid.CargarDatos();
        },
        
        CargarDatos: function() {
            var grid = document.getElementById('ordersGrid').ej2_instances[0];
            if (!grid) return;
            
            // Cargar datos desde el servidor
            $.ajax({
                url: '/Orders/ObtenerOrders',
                method: 'POST',
                contentType: 'application/json',
                success: function(respuesta) {
                    if (respuesta.exito) {
                        grid.dataSource = respuesta.datos;
                    }
                },
                error: function(error) {
                    console.error('Error al cargar datos:', error);
                }
            });
        },
        
        Recargar: function() {
            this.CargarDatos();
        },
        
        AlSeleccionarFila: function(argumentos) {
            console.log('Fila seleccionada:', argumentos.data);
            // Actualizar métricas o detalles
        },
        
        AlCompletarAccion: function(argumentos) {
            if (argumentos.requestType === 'filtering') {
                // Actualizar contadores después de filtrar
                Orders.Dashboard.ActualizarMetricas();
            }
        }
    };
    
    // Sub-namespace para Filtros
    window.Orders.Filtros = {
        Aplicar: function() {
            var grid = document.getElementById('ordersGrid').ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                IdCliente: this.ObtenerIdCliente(),
                IdTienda: this.ObtenerIdTienda(),
                Estado: this.ObtenerEstado(),
                FechaInicio: this.ObtenerFechaInicio() ? new Date(this.ObtenerFechaInicio()) : null,
                FechaFin: this.ObtenerFechaFin() ? new Date(this.ObtenerFechaFin()) : null
            };
            
            // Enviar filtros al servidor
            $.ajax({
                url: '/Orders/BuscarOrders',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(filtros),
                success: function(respuesta) {
                    if (respuesta.exito) {
                        grid.dataSource = respuesta.datos;
                        grid.refresh();
                    }
                },
                error: function(error) {
                    console.error('Error al aplicar filtros:', error);
                }
            });
        },
        
        AlCambiarIdCliente: function(argumentos) {
            this.Aplicar();
        },
        
        AlCambiarIdTienda: function(argumentos) {
            this.Aplicar();
        },
        
        AlCambiarEstado: function(argumentos) {
            this.Aplicar();
        },
        
        AlCambiarFechaInicio: function(argumentos) {
            this.Aplicar();
        },
        
        AlCambiarFechaFin: function(argumentos) {
            this.Aplicar();
        },
        
        ObtenerIdCliente: function() {
            var campoNumerico = document.getElementById('filtroClienteId').ej2_instances[0];
            return campoNumerico ? campoNumerico.value : null;
        },
        
        ObtenerIdTienda: function() {
            var campoNumerico = document.getElementById('filtroTiendaId').ej2_instances[0];
            return campoNumerico ? campoNumerico.value : null;
        },
        
        ObtenerEstado: function() {
            var listaDesplegable = document.getElementById('filtroEstado').ej2_instances[0];
            return listaDesplegable ? listaDesplegable.value : null;
        },
        
        ObtenerFechaInicio: function() {
            var selectorFecha = document.getElementById('filtroFechaInicio').ej2_instances[0];
            return selectorFecha ? selectorFecha.value : null;
        },
        
        ObtenerFechaFin: function() {
            var selectorFecha = document.getElementById('filtroFechaFin').ej2_instances[0];
            return selectorFecha ? selectorFecha.value : null;
        }
    };
    
    // Sub-namespace para Dashboard
    window.Orders.Dashboard = {
        ActualizarMetricas: function() {
            // Obtener métricas del servidor y actualizar cards
            $.ajax({
                url: '/Orders/ObtenerMetricas',
                method: 'POST',
                success: function(respuesta) {
                    if (respuesta.exito) {
                        $('#totalOrders').text(respuesta.datos.totalOrders || 0);
                        $('#completedOrders').text(respuesta.datos.completedOrders || 0);
                        $('#cancelledOrders').text(respuesta.datos.cancelledOrders || 0);
                        $('#refundedOrders').text(respuesta.datos.refundedOrders || 0);
                    }
                }
            });
        }
    };
    
    // Sub-namespace para Graficos
    window.Orders.Graficos = {
        AlCargarGrafico: function(argumentos) {
            // Configurar gráfico al cargar
            // Ejemplo: personalizar colores, títulos, etc.
        },
        
        ActualizarGrafico: function(tipoGrafico, datos) {
            // Actualizar un gráfico específico con nuevos datos
            var grafico = document.getElementById(tipoGrafico).ej2_instances[0];
            if (grafico) {
                grafico.dataSource = datos;
                grafico.refresh();
            }
        }
    };
    
    // Sub-namespace para Detalles
    window.Orders.Detalles = {
        Ver: function(idOrden) {
            // Obtener detalles y mostrar en modal o nueva página
            $.ajax({
                url: '/Orders/ObtenerOrderPorId',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(idOrden),
                success: function(respuesta) {
                    if (respuesta.exito) {
                        // Mostrar detalles
                        window.location.href = '/Orders/Details?id=' + idOrden;
                    }
                }
            });
        }
    };
    
    // Auto-inicialización
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            Orders.Grid.Inicializar();
            Orders.Dashboard.ActualizarMetricas();
        });
    } else {
        Orders.Grid.Inicializar();
        Orders.Dashboard.ActualizarMetricas();
    }
})();
```

### Paso 4.6: Configurar Bundle

**Objetivo**: Agregar el nuevo módulo al sistema de bundles.

**Ubicación**: `src/AdministracionFlotillas.Web/bundleconfig.json`

**Agregar**:
```json
{
  "outputFileName": "wwwroot/js/bundles/[entidad].min.js",
  "inputFiles": [
    "Scripts/Common/Utils.js",
    "Scripts/[Entidad]/[Entidad].js"
  ],
  "minify": {
    "enabled": true,
    "renameLocals": true
  }
}
```

**Ejemplo para Orders**:
```json
{
  "outputFileName": "wwwroot/js/bundles/orders.min.js",
  "inputFiles": [
    "Scripts/Common/Utils.js",
    "Scripts/Orders/Orders.js"
  ],
  "minify": {
    "enabled": true,
    "renameLocals": true
  }
}
```

## Fase 5: Componentes Avanzados de Syncfusion

### Paso 5.1: Implementar Query Builder

**Objetivo**: Agregar Query Builder para búsquedas avanzadas.

**Componente**: Syncfusion Query Builder

**Uso**:
```html
<ejs-querybuilder id="queryBuilder" 
                  dataSource="@Url.Action("Obtener[Entidad]es", "[Entidad]")"
                  rule="Orders.QueryBuilder.GetDefaultRules()">
</ejs-querybuilder>
```

### Paso 5.2: Implementar Tree Grid

**Objetivo**: Mostrar datos jerárquicos.

**Componente**: Syncfusion Tree Grid

**Uso**:
```html
<ejs-treegrid id="treeGrid" 
               dataSource="@Url.Action("ObtenerDatosJerarquicos", "[Entidad]")"
               childMapping="items"
               treeColumnIndex="0">
    <e-treegrid-columns>
        <e-treegrid-column field="nombre" headerText="Nombre"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Paso 5.3: Implementar Kanban

**Objetivo**: Gestión visual de estados.

**Componente**: Syncfusion Kanban

**Uso**:
```html
<ejs-kanban id="kanban" 
            dataSource="@Url.Action("Obtener[Entidad]es", "[Entidad]")"
            keyField="EstadoOrden"
            cardSettings="@(new Syncfusion.EJ2.Kanban.CardSettings { ContentField = "Nombre", HeaderField = "IdOrden" })">
    <e-kanban-columns>
        <e-kanban-column headerText="Pendiente" keyField="Pendiente"></e-kanban-column>
        <e-kanban-column headerText="En Proceso" keyField="En Proceso"></e-kanban-column>
        <e-kanban-column headerText="Completada" keyField="Completada"></e-kanban-column>
    </e-kanban-columns>
</ejs-kanban>
```

## Fase 6: Pruebas y Validación

### Paso 6.1: Probar Conexión a Base de Datos

**Pasos**:
1. Verificar que la aplicación se conecta a Oracle
2. Probar que los stored procedures se ejecutan correctamente
3. Verificar que los datos se mapean correctamente

### Paso 6.2: Probar Componentes Syncfusion

**Pasos**:
1. Verificar que el Grid carga datos
2. Probar filtros y búsqueda
3. Probar exportación a Excel/PDF
4. Verificar que los gráficos muestran datos correctos
5. Probar responsive en diferentes tamaños de pantalla

### Paso 6.3: Probar Flujo Completo

**Pasos**:
1. Cargar vista principal
2. Aplicar filtros
3. Ver detalles de un registro
4. Navegar a Analytics
5. Verificar que todas las métricas se actualizan correctamente

## Consideraciones Finales

### Mantener Módulo Employees Intacto

- **NO modificar** ningún archivo del módulo Employees
- El módulo Employees sigue usando DataTables y datos mock
- Ambos módulos coexisten sin conflictos

### Nomenclatura Consistente

- Seguir las mismas convenciones de nomenclatura que Employees
- Usar nombres en español para ViewModels
- Mantener estructura de namespaces en JavaScript

### Documentación

- Documentar stored procedures creados
- Documentar endpoints del controlador
- Documentar componentes Syncfusion utilizados

### Referencias

- [COMPONENTES_SYNCFUSION.md](COMPONENTES_SYNCFUSION.md) - Componentes disponibles
- [PLAN_MIGRACION_UI.md](PLAN_MIGRACION_UI.md) - Estrategia general
- [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md) - Configuración de BD
- [ESTRUCTURA_ACTUAL_PROYECTO.md](../ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md) - Estructura del proyecto

---

**Última actualización**: Enero 2026
**Versión**: 1.0
**Tipo**: Guía Paso a Paso Atemporal
