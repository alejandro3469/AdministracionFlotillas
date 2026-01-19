# Documentación de Stored Procedures

**Fecha**: 2026-01-18  
**Base de Datos**: Oracle Database  
**Schema**: CO

---

## Índice

1. [PKG_ORDERS](#pkg_orders)
2. [PKG_PRODUCTS](#pkg_products)
3. [PKG_CUSTOMERS](#pkg_customers)

---

## PKG_ORDERS

Paquete de stored procedures para el módulo de Órdenes.

### SP_OBTENER_ORDERS

Obtiene todas las órdenes ordenadas por fecha descendente.

**Parámetros**:
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**:
- `ORDER_ID` (NUMBER): Identificador único de la orden
- `ORDER_TMS` (TIMESTAMP): Fecha y hora de la orden
- `CUSTOMER_ID` (NUMBER): Identificador del cliente
- `ORDER_STATUS` (VARCHAR2): Estado de la orden (COMPLETE, CANCELLED, REFUNDED, PENDING)
- `STORE_ID` (NUMBER): Identificador de la tienda

**Uso en C#**:
```csharp
var ordenes = await _repositorio.ObtenerOrdersAsync();
```

---

### SP_OBTENER_ORDER_POR_ID

Obtiene una orden específica por su ID.

**Parámetros**:
- `P_ORDER_ID` (IN NUMBER): Identificador de la orden
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con el resultado

**Retorna**: Mismos campos que `SP_OBTENER_ORDERS` para una sola orden

**Uso en C#**:
```csharp
var orden = await _repositorio.ObtenerOrderPorIdAsync(idOrden);
```

---

### SP_BUSCAR_ORDERS

Busca órdenes aplicando filtros opcionales.

**Parámetros**:
- `P_CUSTOMER_ID` (IN NUMBER DEFAULT NULL): Filtrar por ID de cliente
- `P_STORE_ID` (IN NUMBER DEFAULT NULL): Filtrar por ID de tienda
- `P_STATUS` (IN VARCHAR2 DEFAULT NULL): Filtrar por estado
- `P_FECHA_INICIO` (IN TIMESTAMP DEFAULT NULL): Fecha de inicio del rango
- `P_FECHA_FIN` (IN TIMESTAMP DEFAULT NULL): Fecha de fin del rango
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de órdenes que cumplen con los filtros aplicados

**Nota**: Todos los filtros son opcionales. Si un filtro es NULL, no se aplica.

**Uso en C#**:
```csharp
var ordenes = await _repositorio.BuscarOrdersAsync(
    idCliente: 123,
    idTienda: null,
    estado: "COMPLETE",
    fechaInicio: DateTime.Now.AddDays(-30),
    fechaFin: DateTime.Now
);
```

---

### SP_OBTENER_ORDERS_POR_RANGO_FECHAS

Obtiene órdenes dentro de un rango de fechas específico.

**Parámetros**:
- `P_FECHA_INICIO` (IN TIMESTAMP): Fecha de inicio (requerido)
- `P_FECHA_FIN` (IN TIMESTAMP): Fecha de fin (requerido)
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de órdenes en el rango de fechas especificado

**Uso en C#**:
```csharp
var ordenes = await _repositorio.ObtenerOrdersPorRangoFechasAsync(
    fechaInicio: DateTime.Now.AddMonths(-1),
    fechaFin: DateTime.Now
);
```

---

## PKG_PRODUCTS

Paquete de stored procedures para el módulo de Productos.

### SP_OBTENER_PRODUCTS

Obtiene todos los productos ordenados por nombre ascendente.

**Parámetros**:
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**:
- `PRODUCT_ID` (NUMBER): Identificador único del producto
- `PRODUCT_NAME` (VARCHAR2): Nombre del producto
- `DESCRIPTION` (VARCHAR2): Descripción del producto
- `CATEGORY` (VARCHAR2): Categoría del producto
- `UNIT_PRICE` (NUMBER): Precio unitario
- `STOCK_QUANTITY` (NUMBER): Cantidad en stock
- `STATUS` (VARCHAR2): Estado (ACTIVE, INACTIVE)
- `COST_PRICE` (NUMBER): Precio de costo
- `MARGEN_GANANCIA` (NUMBER): Margen de ganancia calculado (UNIT_PRICE - COST_PRICE)

---

### SP_OBTENER_PRODUCT_POR_ID

Obtiene un producto específico por su ID.

**Parámetros**:
- `P_PRODUCT_ID` (IN NUMBER): Identificador del producto
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con el resultado

**Retorna**: Mismos campos que `SP_OBTENER_PRODUCTS` para un solo producto

---

### SP_BUSCAR_PRODUCTS

Busca productos aplicando múltiples filtros opcionales.

**Parámetros**:
- `P_CATEGORY` (IN VARCHAR2 DEFAULT NULL): Filtrar por categoría
- `P_STATUS` (IN VARCHAR2 DEFAULT NULL): Filtrar por estado
- `P_NOMBRE` (IN VARCHAR2 DEFAULT NULL): Buscar por nombre (búsqueda parcial, case-insensitive)
- `P_STOCK_MINIMO` (IN NUMBER DEFAULT NULL): Filtrar por stock mínimo
- `P_PRECIO_MINIMO` (IN NUMBER DEFAULT NULL): Filtrar por precio mínimo
- `P_PRECIO_MAXIMO` (IN NUMBER DEFAULT NULL): Filtrar por precio máximo
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de productos que cumplen con los filtros aplicados

**Notas**:
- La búsqueda por nombre usa `LIKE` con comodines
- Las comparaciones de texto son case-insensitive (UPPER)

---

### SP_OBTENER_PRODUCTS_POR_CATEGORIA

Obtiene todos los productos de una categoría específica.

**Parámetros**:
- `P_CATEGORY` (IN VARCHAR2): Categoría a buscar (requerido)
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de productos de la categoría especificada

---

### SP_OBTENER_PRODUCTS_STOCK_BAJO

Obtiene productos con stock bajo (menor o igual al nivel de reorden).

**Parámetros**:
- `P_NIVEL_REORDEN` (IN NUMBER DEFAULT 10): Nivel de reorden (default: 10)
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de productos activos con stock bajo, ordenados por cantidad ascendente

**Nota**: Solo retorna productos con STATUS = 'ACTIVE'

---

### SP_OBTENER_PRODUCTS_POR_ESTADO

Obtiene todos los productos de un estado específico.

**Parámetros**:
- `P_STATUS` (IN VARCHAR2): Estado a buscar (requerido)
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de productos con el estado especificado

---

## PKG_CUSTOMERS

Paquete de stored procedures para el módulo de Clientes.

### SP_OBTENER_CUSTOMERS

Obtiene todos los clientes ordenados por nombre ascendente.

**Parámetros**:
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**:
- `CUSTOMER_ID` (NUMBER): Identificador único del cliente
- `CUSTOMER_NAME` (VARCHAR2): Nombre del cliente
- `EMAIL` (VARCHAR2): Correo electrónico
- `PHONE` (VARCHAR2): Teléfono
- `ADDRESS` (VARCHAR2): Dirección
- `CITY` (VARCHAR2): Ciudad
- `STATE` (VARCHAR2): Estado/Provincia
- `ZIP_CODE` (VARCHAR2): Código postal
- `COUNTRY` (VARCHAR2): País
- `STATUS` (VARCHAR2): Estado (ACTIVE, INACTIVE)
- `REGISTRATION_DATE` (DATE): Fecha de registro
- `CREDIT_LIMIT` (NUMBER): Límite de crédito

---

### SP_OBTENER_CUSTOMER_POR_ID

Obtiene un cliente específico por su ID.

**Parámetros**:
- `P_CUSTOMER_ID` (IN NUMBER): Identificador del cliente
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con el resultado

**Retorna**: Mismos campos que `SP_OBTENER_CUSTOMERS` para un solo cliente

---

### SP_BUSCAR_CUSTOMERS

Busca clientes aplicando múltiples filtros opcionales.

**Parámetros**:
- `P_NOMBRE` (IN VARCHAR2 DEFAULT NULL): Buscar por nombre (búsqueda parcial, case-insensitive)
- `P_STATUS` (IN VARCHAR2 DEFAULT NULL): Filtrar por estado
- `P_CIUDAD` (IN VARCHAR2 DEFAULT NULL): Filtrar por ciudad
- `P_ESTADO` (IN VARCHAR2 DEFAULT NULL): Filtrar por estado/provincia
- `P_PAIS` (IN VARCHAR2 DEFAULT NULL): Filtrar por país
- `P_LIMITE_CREDITO_MINIMO` (IN NUMBER DEFAULT NULL): Filtrar por límite de crédito mínimo
- `P_LIMITE_CREDITO_MAXIMO` (IN NUMBER DEFAULT NULL): Filtrar por límite de crédito máximo
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de clientes que cumplen con los filtros aplicados

---

### SP_OBTENER_CUSTOMERS_POR_ESTADO

Obtiene todos los clientes de un estado específico.

**Parámetros**:
- `P_STATUS` (IN VARCHAR2): Estado a buscar (requerido)
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de clientes con el estado especificado

---

### SP_OBTENER_CUSTOMERS_POR_CIUDAD

Obtiene todos los clientes de una ciudad específica.

**Parámetros**:
- `P_CIUDAD` (IN VARCHAR2): Ciudad a buscar (requerido)
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de clientes de la ciudad especificada

---

### SP_OBTENER_CUSTOMERS_CON_LIMITE_CREDITO

Obtiene clientes activos con límite de crédito mayor o igual al especificado.

**Parámetros**:
- `P_LIMITE_MINIMO` (IN NUMBER DEFAULT 0): Límite mínimo de crédito
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de clientes activos ordenados por límite de crédito descendente

**Nota**: Solo retorna clientes con STATUS = 'ACTIVE'

---

### SP_OBTENER_CUSTOMERS_POR_RANGO_FECHAS

Obtiene clientes registrados dentro de un rango de fechas.

**Parámetros**:
- `P_FECHA_INICIO` (IN DATE): Fecha de inicio (requerido)
- `P_FECHA_FIN` (IN DATE): Fecha de fin (requerido)
- `P_RESULTADO` (OUT SYS_REFCURSOR): Cursor con los resultados

**Retorna**: Lista de clientes registrados en el rango de fechas, ordenados por fecha de registro descendente

---

## Notas Generales

### Manejo de NULLs

Todos los stored procedures manejan correctamente valores NULL en los filtros. Si un parámetro de filtro es NULL, ese filtro no se aplica.

### Orden de Resultados

- **Órdenes**: Ordenadas por `ORDER_TMS DESC` (más recientes primero)
- **Productos**: Ordenados por `PRODUCT_NAME ASC` (alfabético)
- **Clientes**: Ordenados por `CUSTOMER_NAME ASC` (alfabético)

### Case Sensitivity

Las búsquedas de texto (nombres, categorías, etc.) son case-insensitive usando `UPPER()`.

### Permisos Requeridos

El usuario `FLOTILLAS_APP` debe tener permisos `EXECUTE` sobre estos paquetes:

```sql
GRANT EXECUTE ON CO.PKG_ORDERS TO FLOTILLAS_APP;
GRANT EXECUTE ON CO.PKG_PRODUCTS TO FLOTILLAS_APP;
GRANT EXECUTE ON CO.PKG_CUSTOMERS TO FLOTILLAS_APP;
```

---

**Última actualización**: 2026-01-18
