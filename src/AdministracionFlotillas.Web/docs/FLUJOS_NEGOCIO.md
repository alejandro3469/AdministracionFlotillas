# Flujos de Negocio - AdministracionFlotillas

**Fecha**: 2026-01-18  
**Versión**: 1.0

---

## Índice

1. [Flujo de Gestión de Órdenes](#flujo-órdenes)
2. [Flujo de Gestión de Productos](#flujo-productos)
3. [Flujo de Gestión de Clientes](#flujo-clientes)
4. [Flujo de Facturación](#flujo-facturación)
5. [Flujo de Inventario](#flujo-inventario)

---

## Flujo de Gestión de Órdenes

### Crear Nueva Orden

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Click "Nueva Orden"
    UI->>UI: Mostrar formulario
    U->>UI: Llenar datos (Cliente, Productos, Cantidades)
    UI->>C: POST /Orders/Crear
    C->>S: CrearOrderAsync()
    S->>S: Validar Cliente Activo (RN-ORD-002)
    S->>S: Validar Stock Disponible (RN-ORD-003)
    S->>S: Validar Precios (RN-ORD-004)
    S->>S: Calcular Totales (RN-ORD-011 a RN-ORD-013)
    S->>R: GuardarOrderAsync()
    R->>DB: INSERT INTO ORDERS
    R->>DB: INSERT INTO ORDER_ITEMS
    DB-->>R: Confirmación
    R-->>S: Order creada
    S-->>C: OrderViewModel
    C-->>UI: Respuesta JSON
    UI->>UI: Mostrar éxito
    UI->>UI: Actualizar grid
```

**Reglas de Negocio Aplicadas**:
- RN-ORD-001: Orden debe tener al menos un item
- RN-ORD-002: Cliente debe estar activo
- RN-ORD-003: Productos deben tener stock disponible
- RN-ORD-004: Precio unitario no puede ser menor al precio base
- RN-ORD-006: Tienda debe estar activa

---

### Cambiar Estado de Orden

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Seleccionar orden(es) y cambiar estado
    UI->>C: POST /Orders/CambiarEstadoBatch
    C->>S: CambiarEstadoBatchAsync()
    S->>S: Validar Transición de Estado (RN-ORD-007)
    alt Estado = CANCELLED
        S->>S: Devolver Productos al Inventario (RN-ORD-009)
    else Estado = REFUNDED
        S->>S: Devolver Productos al Inventario (RN-ORD-010)
    end
    S->>R: ActualizarEstadoAsync()
    R->>DB: UPDATE ORDERS SET ORDER_STATUS = ...
    DB-->>R: Confirmación
    R-->>S: Actualización exitosa
    S-->>C: Resultado
    C-->>UI: Respuesta JSON
    UI->>UI: Mostrar éxito
    UI->>UI: Actualizar grid
```

**Reglas de Negocio Aplicadas**:
- RN-ORD-007: Estados válidos y transiciones permitidas
- RN-ORD-009: Al cancelar, productos vuelven al inventario
- RN-ORD-010: Al reembolsar, productos vuelven al inventario

---

## Flujo de Gestión de Productos

### Consultar Productos

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Navegar a /Products
    UI->>C: POST /Products/ObtenerProducts
    C->>S: ObtenerProductsAsync()
    S->>R: ObtenerProductsAsync()
    R->>DB: SP_OBTENER_PRODUCTS
    DB-->>R: Cursor con productos
    R-->>S: List<Product>
    S-->>C: List<Product>
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con productos
    UI->>UI: Mostrar en Grid Syncfusion
```

### Buscar Productos con Filtros

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Aplicar filtros (Categoría, Estado, Precio, Stock)
    UI->>C: POST /Products/BuscarProducts
    C->>S: BuscarProductsAsync(filtros)
    S->>R: BuscarProductsAsync(filtros)
    R->>DB: SP_BUSCAR_PRODUCTS(P_CATEGORY, P_STATUS, ...)
    DB-->>R: Cursor con productos filtrados
    R-->>S: List<Product>
    S-->>C: List<Product>
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con productos filtrados
    UI->>UI: Actualizar Grid
```

---

## Flujo de Gestión de Clientes

### Consultar Clientes

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Navegar a /Customers
    UI->>C: POST /Customers/ObtenerCustomers
    C->>S: ObtenerCustomersAsync()
    S->>R: ObtenerCustomersAsync()
    R->>DB: SP_OBTENER_CUSTOMERS
    DB-->>R: Cursor con clientes
    R-->>S: List<Customer>
    S-->>C: List<Customer>
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con clientes
    UI->>UI: Mostrar en Grid Syncfusion
```

### Ver Detalles de Cliente

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Click "Ver" en cliente
    UI->>UI: Abrir Modal Syncfusion Dialog
    UI->>C: POST /Customers/ObtenerCustomerPorId
    C->>S: ObtenerCustomerPorIdAsync(id)
    S->>R: ObtenerCustomerPorIdAsync(id)
    R->>DB: SP_OBTENER_CUSTOMER_POR_ID(P_CUSTOMER_ID)
    DB-->>R: Cursor con cliente
    R-->>S: Customer
    S-->>C: Customer
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con datos del cliente
    UI->>UI: Mostrar datos en Modal
    UI->>UI: Mostrar tooltips informativos
```

---

## Flujo de Facturación

### Visualizar Factura de Orden

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Click "Ver" en orden
    UI->>UI: Abrir Modal de Orden
    UI->>C: POST /Orders/ObtenerOrderPorId
    C->>S: ObtenerOrderPorIdAsync(id)
    S->>R: ObtenerOrderPorIdAsync(id)
    R->>DB: SP_OBTENER_ORDER_POR_ID(P_ORDER_ID)
    DB-->>R: Cursor con orden
    R-->>S: Order
    S-->>C: Order
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con datos de orden
    
    UI->>C: POST /Orders/ObtenerItemsFactura
    C->>C: Retornar items mock (simulación)
    C-->>UI: JSON con items de factura
    
    UI->>UI: Mostrar información general
    UI->>UI: Mostrar items en Grid
    UI->>UI: Mostrar totales calculados
    UI->>UI: Mostrar tooltips informativos
```

**Cálculos Aplicados**:
- Subtotal por item: `(Cantidad × Precio Unitario) - Descuento`
- Impuesto: `Subtotal × 0.16` (16% IVA)
- Total por item: `Subtotal + Impuesto`
- Total de orden: `Suma de todos los totales de items`

---

## Flujo de Inventario

### Consultar Stock de Productos

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Navegar a /Products
    UI->>UI: Ver columna "Stock" en Grid
    UI->>C: POST /Products/ObtenerProducts
    C->>S: ObtenerProductsAsync()
    S->>R: ObtenerProductsAsync()
    R->>DB: SP_OBTENER_PRODUCTS
    DB-->>R: Cursor con productos y stock
    R-->>S: List<Product> (incluye STOCK_QUANTITY)
    S-->>C: List<Product>
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con productos y stock
    UI->>UI: Mostrar stock en Grid
    UI->>UI: Aplicar formato condicional (stock bajo en rojo)
```

### Productos con Stock Bajo

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Click en indicador "Stock Bajo"
    UI->>C: POST /Products/BuscarProducts
    C->>S: BuscarProductsAsync(filtros)
    S->>R: BuscarProductsAsync(filtros)
    R->>DB: SP_OBTENER_PRODUCTS_STOCK_BAJO(P_NIVEL_REORDEN)
    DB-->>R: Cursor con productos stock bajo
    R-->>S: List<Product>
    S-->>C: List<Product>
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con productos stock bajo
    UI->>UI: Filtrar Grid mostrando solo stock bajo
```

---

## Flujo de Dashboard

### Cargar Métricas del Dashboard

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Navegar a /Home (Dashboard)
    UI->>C: POST /Home/ObtenerMetricas
    C->>C: Retornar métricas mock (simulación)
    C-->>UI: JSON con métricas
    
    UI->>C: POST /Orders/ObtenerOrders
    C->>S: ObtenerOrdersAsync()
    S->>R: ObtenerOrdersAsync()
    R->>DB: SP_OBTENER_ORDERS
    DB-->>R: Cursor con órdenes
    R-->>S: List<Order>
    S-->>C: List<Order>
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con órdenes
    
    UI->>UI: Mostrar métricas en cards
    UI->>UI: Mostrar órdenes en Grid
    UI->>UI: Actualizar breadcrumbs con contadores
```

---

## Flujo de Exportación

### Exportar Datos a Excel/PDF

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant SF as Syncfusion Grid

    U->>UI: Click en botón "Excel Export" o "PDF Export"
    UI->>SF: grid.excelExport() o grid.pdfExport()
    SF->>SF: Generar archivo desde datos del grid
    SF->>U: Descargar archivo (Excel/PDF)
    U->>U: Abrir archivo descargado
```

**Características**:
- Exporta solo los datos visibles en el grid
- Respeta filtros aplicados
- Incluye formato y estilos
- Nombre de archivo incluye fecha

---

## Flujo de Búsqueda y Filtrado

### Aplicar Filtros Avanzados

```mermaid
sequenceDiagram
    participant U as Usuario
    participant UI as Interfaz
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB

    U->>UI: Aplicar filtros (Filter Menu del Grid)
    UI->>UI: Validar filtros
    UI->>C: POST /Orders/BuscarOrders (con filtros)
    C->>S: BuscarOrdersAsync(filtros)
    S->>R: BuscarOrdersAsync(filtros)
    R->>DB: SP_BUSCAR_ORDERS(P_CUSTOMER_ID, P_STORE_ID, P_STATUS, ...)
    DB-->>R: Cursor con órdenes filtradas
    R-->>S: List<Order>
    S-->>C: List<Order>
    C->>C: Convertir a ViewModel
    C-->>UI: JSON con órdenes filtradas
    UI->>UI: Actualizar Grid
    UI->>UI: Actualizar contadores en breadcrumbs
    UI->>UI: Mostrar mensaje de éxito
```

---

## Resumen de Flujos

### Flujos de Lectura (GET)
- Consultar órdenes, productos, clientes
- Ver detalles (modals)
- Cargar métricas del dashboard
- Exportar datos

### Flujos de Escritura (POST/PUT)
- Crear órdenes (futuro)
- Cambiar estado de órdenes
- Actualizar productos (futuro)
- Actualizar clientes (futuro)

### Flujos de Validación
- Validar stock disponible
- Validar cliente activo
- Validar transiciones de estado
- Validar precios

---

**Última actualización**: 2026-01-18
