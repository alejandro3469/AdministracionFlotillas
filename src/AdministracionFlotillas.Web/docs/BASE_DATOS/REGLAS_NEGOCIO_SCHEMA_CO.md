# Reglas de Negocio - Schema CO (Customer Orders)

## Propósito

Este documento define las reglas de negocio realistas basadas en el Oracle Sample Schema CO, adaptadas a nuestro proyecto AdministracionFlotillas para simular un entorno real de gestión de ventas, facturación e inventario.

**Nota**: Este es un documento atemporal para enseñanza y desarrollo. Todas las reglas están adaptadas a nuestra estructura de base de datos y arquitectura.

## Base de Datos: Oracle Sample Schema CO

### Estructura de Datos

**Schema**: `CO` (Customer Orders)  
**Usuario de Aplicación**: `FLOTILLAS_APP`

**Tablas Principales**:
- **ORDERS**: Órdenes de venta
- **ORDER_ITEMS**: Items individuales de cada orden
- **CUSTOMERS**: Información de clientes
- **PRODUCTS**: Catálogo de productos
- **STORES**: Tiendas/almacenes
- **EMPLOYEES**: Empleados asociados a tiendas
- **INVENTORY**: Control de inventario por tienda y producto
- **SHIPMENTS**: Información de envíos y entregas

## Reglas de Negocio por Entidad

### 1. Órdenes (ORDERS)

#### 1.1 Creación de Órdenes

**RN-ORD-001**: Una orden debe tener al menos un item
- **Validación**: Al crear una orden, debe incluir al menos un item en ORDER_ITEMS
- **Mensaje de Error**: "Una orden debe tener al menos un item"
- **Implementación**: Validar en `OrdersServiceOracle.CrearOrderAsync`

**RN-ORD-002**: El cliente debe estar activo
- **Validación**: El cliente (CUSTOMER_ID) debe tener STATUS = 'ACTIVE' en CUSTOMERS
- **Mensaje de Error**: "El cliente no está activo. No se pueden crear órdenes para clientes inactivos"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarClienteActivoAsync`

**RN-ORD-003**: Los productos deben tener stock disponible
- **Validación**: Todos los productos en los items deben tener QUANTITY_ON_HAND >= cantidad solicitada en INVENTORY
- **Mensaje de Error**: "No hay stock suficiente para el producto {PRODUCT_NAME}. Stock disponible: {QUANTITY_ON_HAND}"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarStockDisponibleAsync`

**RN-ORD-004**: El precio unitario no puede ser menor al precio base
- **Validación**: UNIT_PRICE en ORDER_ITEMS >= UNIT_PRICE en PRODUCTS
- **Mensaje de Error**: "El precio unitario no puede ser menor al precio base del producto"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarPrecioUnitario`

**RN-ORD-005**: El precio unitario puede ser mayor al precio base
- **Validación**: Se permite UNIT_PRICE > UNIT_PRICE base (permite ajustes y descuentos)
- **Justificación**: Permite aplicar descuentos o ajustes de precio según negociación
- **Implementación**: Permitir en validación de precio

**RN-ORD-006**: La tienda debe estar activa
- **Validación**: La tienda (STORE_ID) debe tener STATUS = 'ACTIVE' en STORES
- **Mensaje de Error**: "La tienda no está activa"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarTiendaActivaAsync`

#### 1.2 Estados de Órdenes

**RN-ORD-007**: Estados válidos de órdenes
- **Estados permitidos**: 'COMPLETE', 'CANCELLED', 'REFUNDED', 'PENDING'
- **Estado inicial**: 'PENDING' al crear
- **Transiciones permitidas**:
  - PENDING → COMPLETE (confirmar orden)
  - PENDING → CANCELLED (cancelar orden)
  - COMPLETE → REFUNDED (reembolsar orden)
  - CANCELLED → (no se puede cambiar)
  - REFUNDED → (no se puede cambiar)
- **Implementación**: Validar en `OrdersServiceOracle.ValidarCambioEstado`

**RN-ORD-008**: Solo se puede cancelar la última orden de un cliente
- **Validación**: Al cancelar, verificar que ORDER_ID sea el máximo ORDER_ID para ese CUSTOMER_ID
- **Mensaje de Error**: "Solo se puede cancelar la última orden emitida al cliente"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarCancelacionOrden`

**RN-ORD-009**: Al cancelar, los productos vuelven al inventario
- **Validación**: Al cambiar estado a 'CANCELLED', actualizar INVENTORY.QUANTITY_ON_HAND sumando las cantidades
- **Implementación**: Actualizar en `OrdersServiceOracle.CancelarOrderAsync`

**RN-ORD-010**: Al reembolsar, los productos vuelven al inventario
- **Validación**: Al cambiar estado a 'REFUNDED', actualizar INVENTORY.QUANTITY_ON_HAND sumando las cantidades
- **Implementación**: Actualizar en `OrdersServiceOracle.ReembolsarOrderAsync`

#### 1.3 Cálculo de Totales

**RN-ORD-011**: Cálculo de Subtotal por Item
- **Fórmula**: SUBTOTAL = (QUANTITY × UNIT_PRICE) - DISCOUNT
- **Implementación**: Calcular en `OrdersServiceOracle.CalcularSubtotalItem`

**RN-ORD-012**: Cálculo de Impuesto
- **Fórmula**: TAX = SUBTOTAL × 0.16 (16% IVA en México)
- **Implementación**: Calcular en `OrdersServiceOracle.CalcularImpuesto`

**RN-ORD-013**: Cálculo de Total por Item
- **Fórmula**: TOTAL = SUBTOTAL + TAX
- **Implementación**: Calcular en `OrdersServiceOracle.CalcularTotalItem`

**RN-ORD-014**: Cálculo de Total de Orden
- **Fórmula**: ORDER_TOTAL = Suma de TOTAL de todos los items
- **Implementación**: Calcular en `OrdersServiceOracle.CalcularTotalOrden`

#### 1.4 Fechas y Tiempos

**RN-ORD-015**: Fecha de orden automática
- **Validación**: ORDER_TMS se establece automáticamente al crear la orden (SYSTIMESTAMP)
- **Implementación**: Establecer en stored procedure `SP_CREAR_ORDER`

**RN-ORD-016**: No se pueden crear órdenes con fecha futura
- **Validación**: ORDER_TMS no puede ser mayor a SYSTIMESTAMP
- **Mensaje de Error**: "No se pueden crear órdenes con fecha futura"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarFechaOrden`

### 2. Items de Órdenes (ORDER_ITEMS)

#### 2.1 Validaciones de Items

**RN-ITM-001**: La cantidad debe ser mayor a cero
- **Validación**: QUANTITY > 0
- **Mensaje de Error**: "La cantidad debe ser mayor a cero"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarItem`

**RN-ORD-002**: El descuento no puede ser mayor al subtotal
- **Validación**: DISCOUNT <= (QUANTITY × UNIT_PRICE)
- **Mensaje de Error**: "El descuento no puede ser mayor al subtotal del item"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarDescuento`

**RN-ITM-003**: El producto debe estar activo
- **Validación**: El producto (PRODUCT_ID) debe tener STATUS = 'ACTIVE' en PRODUCTS
- **Mensaje de Error**: "El producto no está activo"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarProductoActivo`

**RN-ITM-004**: No se pueden duplicar productos en la misma orden
- **Validación**: No puede haber dos items con el mismo PRODUCT_ID en la misma ORDER_ID
- **Mensaje de Error**: "El producto ya está incluido en esta orden. Actualice la cantidad en lugar de agregar otro item"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarProductoDuplicado`

### 3. Clientes (CUSTOMERS)

#### 3.1 Estados de Clientes

**RN-CLI-001**: Estados válidos de clientes
- **Estados permitidos**: 'ACTIVE', 'INACTIVE'
- **Estado inicial**: 'ACTIVE' al crear
- **Implementación**: Validar en `CustomersServiceOracle.ValidarEstado`

**RN-CLI-002**: Clientes inactivos no pueden realizar compras
- **Validación**: Al crear orden, el cliente debe tener STATUS = 'ACTIVE'
- **Mensaje de Error**: "El cliente no está activo. No se pueden crear órdenes para clientes inactivos"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarClienteActivoAsync`

**RN-CLI-003**: Se puede reactivar un cliente inactivo
- **Validación**: Permitir cambio de STATUS de 'INACTIVE' a 'ACTIVE'
- **Implementación**: Permitir en `CustomersServiceOracle.ActualizarEstadoAsync`

#### 3.2 Límite de Crédito

**RN-CLI-004**: Las órdenes de crédito no pueden exceder el límite
- **Validación**: Si CREDIT_LIMIT > 0, la suma de órdenes pendientes no puede exceder CREDIT_LIMIT
- **Mensaje de Error**: "El límite de crédito se ha excedido. Límite: {CREDIT_LIMIT}, Utilizado: {UTILIZADO}, Disponible: {DISPONIBLE}"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarLimiteCreditoAsync`

**RN-CLI-005**: Cálculo de crédito utilizado
- **Fórmula**: CREDITO_UTILIZADO = Suma de ORDER_TOTAL de órdenes con STATUS = 'PENDING' o 'COMPLETE' y pago = 'CREDIT'
- **Implementación**: Calcular en `CustomersServiceOracle.CalcularCreditoUtilizadoAsync`

**RN-CLI-006**: Cálculo de crédito disponible
- **Fórmula**: CREDITO_DISPONIBLE = CREDIT_LIMIT - CREDITO_UTILIZADO
- **Implementación**: Calcular en `CustomersServiceOracle.CalcularCreditoDisponibleAsync`

#### 3.3 Historial de Compras

**RN-CLI-007**: Se mantiene historial completo de compras
- **Validación**: No se eliminan órdenes, solo se cambian de estado
- **Implementación**: Soft delete en lugar de hard delete

**RN-CLI-008**: Cálculo de total de compras
- **Fórmula**: TOTAL_COMPRAS = Suma de ORDER_TOTAL de órdenes con STATUS = 'COMPLETE'
- **Implementación**: Calcular en `CustomersServiceOracle.CalcularTotalComprasAsync`

**RN-CLI-009**: Cálculo de última fecha de compra
- **Fórmula**: ULTIMA_COMPRA = MAX(ORDER_TMS) de órdenes con STATUS = 'COMPLETE'
- **Implementación**: Calcular en `CustomersServiceOracle.ObtenerUltimaCompraAsync`

### 4. Productos (PRODUCTS)

#### 4.1 Estados de Productos

**RN-PRO-001**: Estados válidos de productos
- **Estados permitidos**: 'ACTIVE', 'INACTIVE', 'DISCONTINUED'
- **Estado inicial**: 'ACTIVE' al crear
- **Implementación**: Validar en `ProductsServiceOracle.ValidarEstado`

**RN-PRO-002**: Productos inactivos no se pueden vender
- **Validación**: Al crear item de orden, el producto debe tener STATUS = 'ACTIVE'
- **Mensaje de Error**: "El producto no está activo. No se puede agregar a la orden"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarProductoActivo`

**RN-PRO-003**: Productos descontinuados no se pueden vender
- **Validación**: Al crear item de orden, el producto no debe tener STATUS = 'DISCONTINUED'
- **Mensaje de Error**: "El producto está descontinuado. No se puede agregar a la orden"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarProductoActivo`

#### 4.2 Precios

**RN-PRO-004**: El precio unitario debe ser mayor a cero
- **Validación**: UNIT_PRICE > 0
- **Mensaje de Error**: "El precio unitario debe ser mayor a cero"
- **Implementación**: Validar en `ProductsServiceOracle.ValidarPrecio`

**RN-PRO-005**: El precio de costo debe ser menor al precio de venta
- **Validación**: COST_PRICE < UNIT_PRICE (recomendado, no obligatorio)
- **Mensaje de Advertencia**: "El precio de costo es mayor o igual al precio de venta. Esto puede resultar en pérdidas"
- **Implementación**: Validar en `ProductsServiceOracle.ValidarMargenGanancia`

**RN-PRO-006**: Cálculo de margen de ganancia
- **Fórmula**: MARGEN_GANANCIA = UNIT_PRICE - COST_PRICE
- **Fórmula Porcentaje**: MARGEN_PORCENTAJE = ((UNIT_PRICE - COST_PRICE) / COST_PRICE) × 100
- **Implementación**: Calcular en `ProductsServiceOracle.CalcularMargenGanancia`

#### 4.3 Stock

**RN-PRO-007**: El stock inicial debe ser mayor o igual a cero
- **Validación**: STOCK_QUANTITY >= 0
- **Mensaje de Error**: "El stock inicial no puede ser negativo"
- **Implementación**: Validar en `ProductsServiceOracle.ValidarStock`

**RN-PRO-008**: No se pueden vender productos sin stock
- **Validación**: Al crear item de orden, verificar que QUANTITY_ON_HAND >= QUANTITY en INVENTORY
- **Mensaje de Error**: "No hay stock suficiente. Stock disponible: {QUANTITY_ON_HAND}"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarStockDisponibleAsync`

### 5. Inventario (INVENTORY)

#### 5.1 Control de Inventario

**RN-INV-001**: El inventario se controla por tienda y producto
- **Validación**: Cada combinación (STORE_ID, PRODUCT_ID) tiene un registro único en INVENTORY
- **Implementación**: Unique constraint en (STORE_ID, PRODUCT_ID)

**RN-INV-002**: La cantidad en mano no puede ser negativa
- **Validación**: QUANTITY_ON_HAND >= 0
- **Mensaje de Error**: "La cantidad en mano no puede ser negativa"
- **Implementación**: Validar en `InventoryServiceOracle.ValidarCantidad`

**RN-INV-003**: Al crear orden, se reserva el stock
- **Validación**: Al crear orden, actualizar INVENTORY.QUANTITY_ON_HAND restando las cantidades
- **Implementación**: Actualizar en `OrdersServiceOracle.CrearOrderAsync`

**RN-INV-004**: Al cancelar orden, se libera el stock
- **Validación**: Al cancelar orden, actualizar INVENTORY.QUANTITY_ON_HAND sumando las cantidades
- **Implementación**: Actualizar en `OrdersServiceOracle.CancelarOrderAsync`

**RN-INV-005**: Al reembolsar orden, se libera el stock
- **Validación**: Al reembolsar orden, actualizar INVENTORY.QUANTITY_ON_HAND sumando las cantidades
- **Implementación**: Actualizar en `OrdersServiceOracle.ReembolsarOrderAsync`

#### 5.2 Nivel de Reorden

**RN-INV-006**: El nivel de reorden debe ser mayor o igual a cero
- **Validación**: REORDER_LEVEL >= 0
- **Mensaje de Error**: "El nivel de reorden no puede ser negativo"
- **Implementación**: Validar en `InventoryServiceOracle.ValidarNivelReorden`

**RN-INV-007**: Alerta cuando el stock está bajo el nivel de reorden
- **Validación**: Si QUANTITY_ON_HAND <= REORDER_LEVEL, generar alerta
- **Mensaje de Alerta**: "Stock bajo: {PRODUCT_NAME}. Cantidad actual: {QUANTITY_ON_HAND}, Nivel de reorden: {REORDER_LEVEL}"
- **Implementación**: Validar en `InventoryServiceOracle.ValidarStockBajo`

**RN-INV-008**: Última fecha de reposición
- **Validación**: LAST_RESTOCK_DATE se actualiza automáticamente al reponer stock
- **Implementación**: Actualizar en `InventoryServiceOracle.ReponerStockAsync`

### 6. Tiendas (STORES)

#### 6.1 Estados de Tiendas

**RN-STO-001**: Estados válidos de tiendas
- **Estados permitidos**: 'ACTIVE', 'INACTIVE'
- **Estado inicial**: 'ACTIVE' al crear
- **Implementación**: Validar en `StoresServiceOracle.ValidarEstado`

**RN-STO-002**: Tiendas inactivas no pueden procesar órdenes
- **Validación**: Al crear orden, la tienda debe tener STATUS = 'ACTIVE'
- **Mensaje de Error**: "La tienda no está activa. No se pueden crear órdenes en tiendas inactivas"
- **Implementación**: Validar en `OrdersServiceOracle.ValidarTiendaActivaAsync`

### 7. Empleados (EMPLOYEES)

#### 7.1 Validaciones de Empleados

**RN-EMP-001**: El empleado debe estar asociado a una tienda
- **Validación**: STORE_ID debe existir en STORES
- **Mensaje de Error**: "El empleado debe estar asociado a una tienda válida"
- **Implementación**: Validar en `EmployeesServiceOracle.ValidarTienda`

**RN-EMP-002**: El salario debe ser mayor a cero
- **Validación**: SALARY > 0
- **Mensaje de Error**: "El salario debe ser mayor a cero"
- **Implementación**: Validar en `EmployeesServiceOracle.ValidarSalario`

**RN-EMP-003**: El porcentaje de comisión debe estar entre 0 y 100
- **Validación**: COMMISSION_PCT >= 0 AND COMMISSION_PCT <= 100
- **Mensaje de Error**: "El porcentaje de comisión debe estar entre 0 y 100"
- **Implementación**: Validar en `EmployeesServiceOracle.ValidarComision`

### 8. Envíos (SHIPMENTS)

#### 8.1 Validaciones de Envíos

**RN-SHI-001**: El envío debe estar asociado a una orden
- **Validación**: ORDER_ID debe existir en ORDERS
- **Mensaje de Error**: "El envío debe estar asociado a una orden válida"
- **Implementación**: Validar en `ShipmentsServiceOracle.ValidarOrden`

**RN-SHI-002**: Estados válidos de envíos
- **Estados permitidos**: 'PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'
- **Estado inicial**: 'PENDING' al crear
- **Implementación**: Validar en `ShipmentsServiceOracle.ValidarEstado`

**RN-SHI-003**: La fecha de envío no puede ser anterior a la fecha de orden
- **Validación**: SHIPMENT_DATE >= ORDER_TMS de la orden asociada
- **Mensaje de Error**: "La fecha de envío no puede ser anterior a la fecha de orden"
- **Implementación**: Validar en `ShipmentsServiceOracle.ValidarFechaEnvio`

## Reglas de Negocio Transversales

### RN-TRA-001: Integridad Referencial
- **Validación**: Todas las foreign keys deben existir en las tablas referenciadas
- **Implementación**: Constraints en base de datos y validaciones en servicios

### RN-TRA-002: Transacciones Atómicas
- **Validación**: Las operaciones que afectan múltiples tablas deben ser atómicas (todo o nada)
- **Implementación**: Usar transacciones en stored procedures y servicios

### RN-TRA-003: Auditoría de Cambios
- **Validación**: Registrar cambios importantes (crear, actualizar, eliminar) con usuario y fecha
- **Implementación**: Campos de auditoría en tablas (CREATED_BY, CREATED_DATE, UPDATED_BY, UPDATED_DATE)

### RN-TRA-004: Validación en Múltiples Capas
- **Validación**: Validar reglas de negocio en cliente (JavaScript), servidor (C#) y base de datos (Stored Procedures)
- **Implementación**: Validaciones en todas las capas

## Implementación de Reglas de Negocio

### En Stored Procedures

```sql
-- Ejemplo: SP_CREAR_ORDER con validaciones
PROCEDURE SP_CREAR_ORDER(
    P_CUSTOMER_ID IN NUMBER,
    P_STORE_ID IN NUMBER,
    P_RESULTADO OUT SYS_REFCURSOR,
    P_EXITO OUT NUMBER,
    P_MENSAJE OUT VARCHAR2
) AS
    V_CLIENTE_ACTIVO NUMBER;
    V_TIENDA_ACTIVA NUMBER;
BEGIN
    -- RN-ORD-002: Validar cliente activo
    SELECT COUNT(*) INTO V_CLIENTE_ACTIVO
    FROM CUSTOMERS
    WHERE CUSTOMER_ID = P_CUSTOMER_ID
      AND STATUS = 'ACTIVE';
    
    IF V_CLIENTE_ACTIVO = 0 THEN
        P_EXITO := 0;
        P_MENSAJE := 'El cliente no está activo. No se pueden crear órdenes para clientes inactivos.';
        RETURN;
    END IF;
    
    -- RN-ORD-006: Validar tienda activa
    SELECT COUNT(*) INTO V_TIENDA_ACTIVA
    FROM STORES
    WHERE STORE_ID = P_STORE_ID
      AND STATUS = 'ACTIVE';
    
    IF V_TIENDA_ACTIVA = 0 THEN
        P_EXITO := 0;
        P_MENSAJE := 'La tienda no está activa.';
        RETURN;
    END IF;
    
    -- Crear orden si todas las validaciones pasan
    -- ...
END SP_CREAR_ORDER;
```

### En Servicios C#

```csharp
public async Task<Order> CrearOrderAsync(SolicitudCrearOrden solicitud)
{
    // RN-ORD-002: Validar cliente activo
    if (!await ValidarClienteActivoAsync(solicitud.IdCliente))
    {
        throw new InvalidOperationException("El cliente no está activo. No se pueden crear órdenes para clientes inactivos.");
    }
    
    // RN-ORD-003: Validar stock disponible
    if (!await ValidarStockDisponibleAsync(solicitud.Items))
    {
        throw new InvalidOperationException("No hay stock suficiente para algunos productos.");
    }
    
    // RN-ORD-001: Validar que tenga al menos un item
    if (solicitud.Items == null || solicitud.Items.Count == 0)
    {
        throw new InvalidOperationException("Una orden debe tener al menos un item.");
    }
    
    // Crear orden
    var orden = await _ordersRepository.CrearOrderAsync(solicitud);
    
    // RN-INV-003: Reservar stock
    foreach (var item in solicitud.Items)
    {
        await _inventoryRepository.ReservarStockAsync(item.IdProducto, item.Cantidad);
    }
    
    return orden;
}
```

### En JavaScript

```javascript
window.Orders.Validaciones = {
    ValidarOrden: function(orden) {
        // RN-ORD-001: Validar que tenga al menos un item
        if (!orden.Items || orden.Items.length === 0) {
            window.Orders.Toast.MostrarError('Validación', 'Una orden debe tener al menos un item.');
            return false;
        }
        
        // RN-ORD-002: Validar cliente
        if (!orden.IdCliente) {
            window.Orders.Toast.MostrarError('Validación', 'Debe seleccionar un cliente.');
            return false;
        }
        
        // RN-ORD-003: Validar stock (se valida en servidor)
        // ...
        
        return true;
    }
};
```

## Referencias

- [Guía de Funcionalidades Avanzadas](../UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md)
- [Oracle Sample Schema CO Documentation](https://github.com/oracle-samples/db-sample-schemas)

---

**Última actualización**: 2026-01-18  
**Versión**: 1.0  
**Propósito**: Enseñanza y desarrollo  
**Base de Datos**: Oracle Sample Schema CO
