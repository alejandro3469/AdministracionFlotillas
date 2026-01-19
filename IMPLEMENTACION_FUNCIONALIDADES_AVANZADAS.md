# Implementación de Funcionalidades Avanzadas de Syncfusion

## Propósito

Este documento detalla la implementación de funcionalidades avanzadas de Syncfusion en AdministracionFlotillas, adaptadas a nuestra arquitectura en capas, base de datos Oracle Sample Schema CO, y convenciones de nomenclatura en español.

**Nota**: Este es un documento atemporal para enseñanza y desarrollo. Todos los ejemplos están adaptados a nuestro stack tecnológico y estructura de base de datos.

## Base de Datos: Oracle Sample Schema CO

### Estructura de Datos

**Schema**: `CO` (Customer Orders)  
**Usuario de Aplicación**: `FLOTILLAS_APP`

**Tablas Principales**:
- **ORDERS**: ORDER_ID, ORDER_TMS, CUSTOMER_ID, ORDER_STATUS, STORE_ID
- **ORDER_ITEMS**: ORDER_ITEM_ID, ORDER_ID, PRODUCT_ID, QUANTITY, UNIT_PRICE, DISCOUNT, SUBTOTAL, TAX, TOTAL
- **CUSTOMERS**: CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, STATUS, CREDIT_LIMIT
- **PRODUCTS**: PRODUCT_ID, PRODUCT_NAME, DESCRIPTION, CATEGORY, UNIT_PRICE, STOCK_QUANTITY, STATUS
- **STORES**: STORE_ID, STORE_NAME, ADDRESS, CITY, STATE, STATUS
- **EMPLOYEES**: EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, HIRE_DATE, SALARY, STORE_ID
- **INVENTORY**: INVENTORY_ID, STORE_ID, PRODUCT_ID, QUANTITY_ON_HAND, REORDER_LEVEL

## Estado de Implementación

### ✅ Completado
- Grid básico con filtrado, ordenamiento, paginación
- Exportación Excel/PDF
- DatePicker, DropDownList, NumericTextBox
- Tabs para organización de contenido
- Navegación con breadcrumbs
- Indicadores compactos en dashboard
- Vista de detalles con items de factura

### 🚧 En Progreso
- Grid avanzado (agrupación, agregaciones, edición)
- Dialog para crear/editar
- Toast notifications
- ProgressBar
- Charts avanzados

### 📋 Pendiente
- Query Builder
- Scheduler/Calendar
- Kanban
- Tree Grid
- Rich Text Editor
- Pivot Table

## Funcionalidades Implementadas

### 1. Grid Avanzado - Agrupación y Agregaciones

**Ubicación**: `Views/Orders/_OrdersGrid.cshtml`

**Características**:
- Agrupación por columnas (Estado, Cliente, Tienda)
- Agregaciones (Suma, Promedio, Conteo)
- Selección múltiple con checkbox
- Reordenamiento de columnas
- Columnas congeladas

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 1.

### 2. Dialog para Crear/Editar

**Ubicación**: `Views/Orders/_DialogCrearEditar.cshtml`

**Características**:
- Dialog modal para crear nueva orden
- Dialog modal para editar orden existente
- Formulario con validación
- Grid de items con edición inline
- Cálculo automático de totales
- Drag and drop del dialog
- Resize del dialog

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 3.

### 3. Toast Notifications

**Ubicación**: `Views/Shared/_Layout.cshtml`

**Características**:
- Notificaciones de éxito (crear, actualizar, eliminar)
- Notificaciones de error (validaciones, errores de servidor)
- Notificaciones de advertencia (acciones importantes)
- Notificaciones de información (estado de procesos)
- Posiciones configurables (top-right, top-left, bottom-right, bottom-left)
- Auto-close configurable
- Progress bar en notificaciones largas

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 4.

### 4. ProgressBar

**Ubicación**: `Views/Shared/_ProgressBar.cshtml`

**Características**:
- Progress bar para exportaciones (Excel, PDF)
- Progress bar para carga de datos
- Progress bar para operaciones batch
- Indeterminate progress (operaciones sin tiempo definido)
- Circular progress (spinner alternativo)

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 5.

### 5. Charts Avanzados

**Ubicación**: `Views/Orders/Analytics.cshtml`

**Características**:
- Múltiples tipos de gráficos (Line, Area, Bar, Spline)
- Drill-down interactivo
- Zoom y Pan
- Exportación a imagen
- Tooltips personalizados
- Legends interactivas
- Data labels configurables

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 6.

### 6. Query Builder

**Ubicación**: `Views/Orders/QueryBuilder.cshtml`

**Características**:
- Construcción de filtros complejos visualmente
- Múltiples condiciones (AND, OR)
- Operadores (equals, contains, greater than, etc.)
- Guardar y cargar filtros predefinidos

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 7.

### 7. Kanban

**Ubicación**: `Views/Orders/Kanban.cshtml`

**Características**:
- Vista Kanban para estados de órdenes
- Columnas por estado (COMPLETE, CANCELLED, REFUNDED)
- Drag and drop entre columnas
- Filtros en Kanban
- Agregaciones por columna

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 8.

### 8. Scheduler/Calendar

**Ubicación**: `Views/Orders/Calendar.cshtml`

**Características**:
- Vista de calendario para órdenes por fecha
- Vista de agenda (lista de eventos)
- Vista de mes (calendario mensual)
- Vista de semana (calendario semanal)
- Vista de día (calendario diario)
- Crear eventos (nuevas órdenes)
- Editar eventos (modificar órdenes)
- Drag and drop de eventos

**Implementación Completa**: Ver `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` sección 9.

## Nomenclatura en Español

### Convenciones Aplicadas

**Métodos C#**:
- `ObtenerOrdersAgrupadosAsync`
- `CrearOrderAsync`
- `ActualizarOrderAsync`
- `EliminarOrderAsync`
- `AplicarFiltrosAvanzadosAsync`
- `ValidarClienteActivoAsync`
- `ValidarStockDisponibleAsync`

**Variables C#**:
- `listaOrdenesAgrupadas`
- `filtrosAvanzados`
- `configuracionAgregaciones`
- `solicitudCrearOrden`
- `nuevoEstado`

**Funciones JavaScript**:
- `CargarDatosAgrupados`
- `AplicarFiltrosAvanzados`
- `MostrarDialogCrear`
- `OcultarDialogCrear`
- `MostrarToastExito`
- `ActualizarTotales`

**Namespaces JavaScript**:
- `Orders.Grid.Agrupacion`
- `Orders.Dialog`
- `Orders.Toast`
- `Orders.QueryBuilder`
- `Orders.Kanban`
- `Orders.Calendar`
- `Orders.Analytics`

## Arquitectura por Capas

### Capa Web

#### Controllers
- `OrdersController.cs` - Endpoints para operaciones CRUD
  - `CrearOrder` - Crear nueva orden
  - `ActualizarOrder` - Actualizar orden existente
  - `CancelarOrder` - Cancelar última orden
  - `ObtenerVentasPorMes` - Ventas agrupadas por mes
  - `ObtenerEstadoOrdenes` - Conteo por estado
  - `ObtenerTendencias` - Tendencias temporales
  - `AplicarFiltrosAvanzados` - Filtros complejos

#### Views
- `_OrdersGrid.cshtml` - Grid con funcionalidades avanzadas
- `_DialogCrearEditar.cshtml` - Dialog para crear/editar
- `_ToastContainer.cshtml` - Contenedor de notificaciones
- `Analytics.cshtml` - Gráficos avanzados
- `QueryBuilder.cshtml` - Query Builder
- `Kanban.cshtml` - Vista Kanban
- `Calendar.cshtml` - Vista Calendar

#### ViewModels
- `OrderViewModel.cs` - ViewModel para operaciones básicas
- `OrderEdicionViewModel.cs` - ViewModel para edición
- `SolicitudCrearOrden.cs` - Solicitud de creación
- `SolicitudActualizarEstado.cs` - Solicitud de actualización de estado

### Capa ReglasNegocio

#### Services
- `OrdersServiceOracle.cs` - Lógica de validación para edición
  - `ValidarClienteActivoAsync` - Validar cliente activo
  - `ValidarStockDisponibleAsync` - Validar stock disponible
  - `CrearOrderAsync` - Crear orden con validaciones
  - `ActualizarEstadoAsync` - Actualizar estado con validaciones
  - `CancelarOrderAsync` - Cancelar orden con validaciones

### Capa AccesoDatos

#### Repositories
- `OrdersRepository.cs` - Métodos para operaciones CRUD
  - `CrearOrderAsync` - Insertar nueva orden
  - `ActualizarOrderAsync` - Actualizar orden
  - `CancelarOrderAsync` - Cancelar orden
  - `ObtenerVentasPorMesAsync` - Agregación por mes
  - `ObtenerEstadoOrdenesAsync` - Conteo por estado
  - `ObtenerTendenciasAsync` - Tendencias temporales

### Capa ModelosComunes

#### Models
- `Order.cs` - Modelo básico
- `OrderItem.cs` - Modelo de item
- `SolicitudCrearOrden.cs` - Solicitud de creación
- `SolicitudActualizarEstado.cs` - Solicitud de actualización de estado

## Reglas de Negocio Implementadas

### Órdenes
- ✅ Solo se puede cancelar la última orden de un cliente
- ✅ Al cancelar, los productos vuelven al inventario
- ✅ El cliente debe estar activo para crear orden
- ✅ Debe haber stock disponible para todos los productos
- ✅ El precio unitario no puede ser menor al precio base
- ✅ El precio unitario puede ser mayor (permite ajustes)

### Productos
- ✅ No se pueden vender productos sin stock
- ✅ Alerta cuando el stock está bajo el nivel de reorden
- ✅ El precio unitario no puede ser menor al precio base

### Clientes
- ✅ Clientes inactivos no pueden realizar compras
- ✅ Las órdenes de crédito no pueden exceder el límite
- ✅ Se mantiene historial completo de compras

## Stored Procedures Implementados

### PKG_ORDERS
- `SP_OBTENER_ORDERS` - Obtener todas las órdenes
- `SP_OBTENER_ORDER_POR_ID` - Obtener orden por ID
- `SP_BUSCAR_ORDERS` - Buscar órdenes con filtros
- `SP_OBTENER_ORDERS_POR_RANGO_FECHAS` - Órdenes por rango de fechas
- `SP_CREAR_ORDER` - Crear nueva orden (pendiente)
- `SP_ACTUALIZAR_ESTADO` - Actualizar estado (pendiente)
- `SP_OBTENER_VENTAS_POR_MES` - Ventas agrupadas por mes (pendiente)

## Próximos Pasos

1. ✅ Implementar Grid avanzado con agrupación y agregaciones
2. ✅ Implementar Dialog para crear/editar
3. ✅ Implementar Toast notifications
4. ✅ Implementar ProgressBar
5. ✅ Expandir Charts con más tipos
6. ✅ Implementar Query Builder
7. ✅ Implementar Kanban
8. ✅ Implementar Scheduler/Calendar
9. ⏳ Implementar Tree Grid
10. ⏳ Implementar Rich Text Editor
11. ⏳ Implementar Pivot Table
12. ⏳ Crear stored procedures adicionales
13. ⏳ Actualizar documentación

## Referencias a Documentación

- [Guía Completa de Funcionalidades Avanzadas](docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md)
- [Syncfusion Grid - Grouping](https://help.syncfusion.com/aspnet-core/grid/grouping)
- [Syncfusion Grid - Aggregation](https://help.syncfusion.com/aspnet-core/grid/aggregate)
- [Syncfusion Grid - Editing](https://help.syncfusion.com/aspnet-core/grid/editing)
- [Syncfusion Dialog](https://help.syncfusion.com/aspnet-core/dialog/getting-started)
- [Syncfusion Toast](https://help.syncfusion.com/aspnet-core/toast/getting-started)
- [Syncfusion ProgressBar](https://help.syncfusion.com/aspnet-core/progressbar/getting-started)
- [Syncfusion Charts](https://help.syncfusion.com/aspnet-core/chart/getting-started)
- [Syncfusion Query Builder](https://help.syncfusion.com/aspnet-core/query-builder/getting-started)
- [Syncfusion Kanban](https://help.syncfusion.com/aspnet-core/kanban/getting-started)
- [Syncfusion Scheduler](https://help.syncfusion.com/aspnet-core/scheduler/getting-started)

---

**Última actualización**: 2026-01-18  
**Versión**: 2.0  
**Propósito**: Enseñanza y desarrollo  
**Base de Datos**: Oracle Sample Schema CO
