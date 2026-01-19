# Guía de Nuevas Funcionalidades y Vistas

## Propósito

Esta guía documenta nuevas funcionalidades y vistas adaptadas específicamente a nuestros datos del Oracle Sample Schema CO, implementadas con componentes Syncfusion y siguiendo nuestra arquitectura en capas.

**Nota**: Este es un documento atemporal para enseñanza y desarrollo. Todas las funcionalidades están adaptadas a nuestro stack tecnológico y estructura de base de datos.

## Base de Datos: Oracle Sample Schema CO

### Estructura de Datos Disponible

**Schema**: `CO` (Customer Orders)  
**Usuario de Aplicación**: `FLOTILLAS_APP`

**Tablas Principales**:
- **ORDERS**: ORDER_ID, ORDER_TMS, CUSTOMER_ID, ORDER_STATUS, STORE_ID
- **ORDER_ITEMS**: ORDER_ITEM_ID, ORDER_ID, PRODUCT_ID, QUANTITY, UNIT_PRICE, DISCOUNT, SUBTOTAL, TAX, TOTAL
- **CUSTOMERS**: CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, STATUS, CREDIT_LIMIT, REGISTRATION_DATE
- **PRODUCTS**: PRODUCT_ID, PRODUCT_NAME, DESCRIPTION, CATEGORY, UNIT_PRICE, STOCK_QUANTITY, STATUS, COST_PRICE
- **STORES**: STORE_ID, STORE_NAME, ADDRESS, CITY, STATE, STATUS
- **EMPLOYEES**: EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, HIRE_DATE, SALARY, STORE_ID
- **INVENTORY**: INVENTORY_ID, STORE_ID, PRODUCT_ID, QUANTITY_ON_HAND, REORDER_LEVEL, LAST_RESTOCK_DATE
- **SHIPMENTS**: SHIPMENT_ID, ORDER_ID, SHIPMENT_DATE, SHIPMENT_STATUS, TRACKING_NUMBER, CARRIER

## Nuevas Vistas y Funcionalidades

### 1. Vista de Análisis de Ventas por Tienda

#### Descripción
Vista que muestra análisis detallado de ventas agrupadas por tienda, incluyendo gráficos, métricas y comparativas.

#### Ruta
`/Stores/Analytics/{storeId?}`

#### Funcionalidades
- **Métricas por Tienda**:
  - Total de ventas del mes
  - Número de órdenes completadas
  - Promedio de venta por orden
  - Cliente más frecuente
  - Producto más vendido
  
- **Gráficos**:
  - Ventas diarias del mes (Line Chart)
  - Comparación de ventas por mes (Column Chart)
  - Distribución de órdenes por estado (Pie Chart)
  - Top 10 productos más vendidos (Bar Chart)
  
- **Tabla de Detalle**:
  - Grid con todas las órdenes de la tienda
  - Filtros por fecha, estado, cliente
  - Exportación Excel/PDF

#### Implementación

**Controller**: `StoresController.cs`
```csharp
[HttpGet]
public IActionResult Analytics(int? storeId)
{
    ViewBag.StoreId = storeId;
    return View();
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerMetricasTienda([FromBody] int storeId)
{
    try
    {
        var metricas = _storesService.ObtenerMetricasTiendaAsync(storeId).Result;
        return Json(new { exito = true, datos = metricas });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerVentasDiariasTienda([FromBody] SolicitudVentasDiarias solicitud)
{
    try
    {
        var datos = _storesService.ObtenerVentasDiariasAsync(solicitud).Result;
        return Json(new { exito = true, datos = datos });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerTopProductosTienda([FromBody] int storeId)
{
    try
    {
        var productos = _storesService.ObtenerTopProductosAsync(storeId, 10).Result;
        return Json(new { exito = true, datos = productos });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}
```

**View**: `Views/Stores/Analytics.cshtml`
```html
@{
    ViewData["Title"] = "Análisis de Tienda";
}

<div class="container-fluid">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a asp-controller="Home" asp-action="Index">Dashboard</a></li>
            <li class="breadcrumb-item"><a asp-controller="Stores" asp-action="Index">Tiendas</a></li>
            <li class="breadcrumb-item active" aria-current="page">Análisis</li>
        </ol>
    </nav>

    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-0">Análisis de Tienda</h2>
            <p class="text-muted">Análisis detallado de ventas y rendimiento</p>
        </div>
    </div>

    <!-- Selector de Tienda -->
    <div class="row mb-3">
        <div class="col-md-4">
            <label class="form-label">Seleccionar Tienda</label>
            <ejs-dropdownlist id="ddlTiendaAnalytics" 
                              placeholder="Seleccionar tienda"
                              dataSource="@(new List<object>())"
                              fields="@(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings { 
                                  Value = "IdTienda", 
                                  Text = "NombreTienda" 
                              })"
                              change="ddlTiendaAnalyticsChange">
            </ejs-dropdownlist>
        </div>
    </div>

    <!-- Métricas Compactas -->
    <div class="row mb-3">
        <div class="col-12">
            <div class="card">
                <div class="card-body py-2">
                    <div class="d-flex flex-wrap align-items-center gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-dollar-sign text-primary"></i>
                            <span class="text-muted small">Ventas del Mes:</span>
                            <strong class="text-primary" id="ventasMes">$0.00</strong>
                        </div>
                        <div class="vr"></div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-shopping-cart text-success"></i>
                            <span class="text-muted small">Órdenes Completadas:</span>
                            <strong class="text-success" id="ordenesCompletadas">0</strong>
                        </div>
                        <div class="vr"></div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-chart-line text-info"></i>
                            <span class="text-muted small">Promedio por Orden:</span>
                            <strong class="text-info" id="promedioOrden">$0.00</strong>
                        </div>
                        <div class="vr"></div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-star text-warning"></i>
                            <span class="text-muted small">Producto Top:</span>
                            <strong class="text-warning" id="productoTop">-</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Gráficos -->
    <div class="row mb-3">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Ventas Diarias del Mes</h5>
                </div>
                <div class="card-body">
                    <ejs-chart id="chartVentasDiarias" 
                               title="Ventas Diarias"
                               enableAnimation="true">
                        <e-chart-primaryxaxis valueType="DateTime" 
                                             labelFormat="dd/MM"></e-chart-primaryxaxis>
                        <e-chart-primaryyaxis valueType="Double" 
                                             labelFormat="C2"></e-chart-primaryyaxis>
                        <e-series-collection>
                            <e-series type="Line" 
                                     xName="fecha" 
                                     yName="ventas" 
                                     name="Ventas Diarias"
                                     marker="@(new Syncfusion.EJ2.Charts.ChartMarkerSettings { 
                                         Visible = true,
                                         Width = 8,
                                         Height = 8
                                     })"
                                     dataSource="@(new List<object>())">
                            </e-series>
                        </e-series-collection>
                    </ejs-chart>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Top 10 Productos Más Vendidos</h5>
                </div>
                <div class="card-body">
                    <ejs-chart id="chartTopProductos" 
                               title="Productos Más Vendidos"
                               enableAnimation="true">
                        <e-chart-primaryxaxis valueType="Category"></e-chart-primaryxaxis>
                        <e-chart-primaryyaxis valueType="Double"></e-chart-primaryyaxis>
                        <e-series-collection>
                            <e-series type="Bar" 
                                     xName="producto" 
                                     yName="cantidad" 
                                     name="Cantidad Vendida"
                                     dataSource="@(new List<object>())">
                            </e-series>
                        </e-series-collection>
                    </ejs-chart>
                </div>
            </div>
        </div>
    </div>

    <!-- Grid de Órdenes de la Tienda -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Órdenes de la Tienda</h5>
                </div>
                <div class="card-body">
                    <ejs-grid id="gridOrdenesTienda" 
                              allowPaging="true"
                              allowFiltering="true"
                              allowSorting="true"
                              allowExcelExport="true"
                              allowPdfExport="true"
                              is-responsive="true">
                        <e-grid-pagesettings pageSize="10" pageSizes="@(new int[] { 10, 25, 50, 100 })"></e-grid-pagesettings>
                        <e-grid-columns>
                            <e-grid-column field="IdOrden" headerText="ID" width="80" type="number" isPrimaryKey="true"></e-grid-column>
                            <e-grid-column field="FechaOrden" headerText="Fecha" width="150" type="date" format="dd/MM/yyyy HH:mm"></e-grid-column>
                            <e-grid-column field="IdCliente" headerText="Cliente ID" width="100" type="number"></e-grid-column>
                            <e-grid-column field="EstadoOrden" headerText="Estado" width="120" template="#estadoTemplate"></e-grid-column>
                            <e-grid-column field="Total" headerText="Total" width="120" type="number" format="C2" textAlign="Right"></e-grid-column>
                            <e-grid-column headerText="Acciones" width="150" template="#accionesTemplate"></e-grid-column>
                        </e-grid-columns>
                    </ejs-grid>
                </div>
            </div>
        </div>
    </div>
</div>

@section Scripts {
    <script src="~/js/Stores/Analytics.js" asp-append-version="true"></script>
}
```

**JavaScript**: `wwwroot/js/Stores/Analytics.js`
```javascript
window.Stores = window.Stores || {};
window.Stores.Analytics = window.Stores.Analytics || {};

(function() {
    'use strict';
    
    window.Stores.Analytics.CargarTiendas = function() {
        $.ajax({
            url: '/Stores/ObtenerStores',
            method: 'POST',
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var ddl = document.getElementById('ddlTiendaAnalytics').ej2_instances[0];
                    if (ddl) {
                        ddl.dataSource = respuesta.datos;
                        ddl.dataBind();
                    }
                }
            }
        });
    };
    
    window.Stores.Analytics.CargarMetricas = function(storeId) {
        if (!storeId) return;
        
        $.ajax({
            url: '/Stores/ObtenerMetricasTienda',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(storeId),
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var metricas = respuesta.datos;
                    $('#ventasMes').text('$' + parseFloat(metricas.ventasMes || 0).toFixed(2));
                    $('#ordenesCompletadas').text(metricas.ordenesCompletadas || 0);
                    $('#promedioOrden').text('$' + parseFloat(metricas.promedioOrden || 0).toFixed(2));
                    $('#productoTop').text(metricas.productoTop || '-');
                }
            }
        });
    };
    
    window.Stores.Analytics.CargarVentasDiarias = function(storeId) {
        if (!storeId) return;
        
        var fechaInicio = new Date();
        fechaInicio.setDate(1); // Primer día del mes
        var fechaFin = new Date();
        
        $.ajax({
            url: '/Stores/ObtenerVentasDiariasTienda',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                StoreId: storeId,
                FechaInicio: fechaInicio.toISOString(),
                FechaFin: fechaFin.toISOString()
            }),
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var chart = document.getElementById('chartVentasDiarias').ej2_instances[0];
                    if (chart) {
                        chart.series[0].dataSource = respuesta.datos;
                        chart.refresh();
                    }
                }
            }
        });
    };
    
    window.Stores.Analytics.CargarTopProductos = function(storeId) {
        if (!storeId) return;
        
        $.ajax({
            url: '/Stores/ObtenerTopProductosTienda',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(storeId),
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var chart = document.getElementById('chartTopProductos').ej2_instances[0];
                    if (chart) {
                        chart.series[0].dataSource = respuesta.datos;
                        chart.refresh();
                    }
                }
            }
        });
    };
    
    window.Stores.Analytics.CargarOrdenes = function(storeId) {
        if (!storeId) return;
        
        $.ajax({
            url: '/Orders/BuscarOrders',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                IdTienda: storeId,
                Estado: null,
                FechaInicio: null,
                FechaFin: null
            }),
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var grid = document.getElementById('gridOrdenesTienda').ej2_instances[0];
                    if (grid) {
                        grid.dataSource = respuesta.datos;
                        grid.refresh();
                    }
                }
            }
        });
    };
    
    window.ddlTiendaAnalyticsChange = function(args) {
        var storeId = args.value;
        if (storeId) {
            window.Stores.Analytics.CargarMetricas(storeId);
            window.Stores.Analytics.CargarVentasDiarias(storeId);
            window.Stores.Analytics.CargarTopProductos(storeId);
            window.Stores.Analytics.CargarOrdenes(storeId);
        }
    };
    
    $(document).ready(function() {
        window.Stores.Analytics.CargarTiendas();
    });
})();
```

**Stored Procedure**: `SP_OBTENER_METRICAS_TIENDA`
```sql
PROCEDURE SP_OBTENER_METRICAS_TIENDA(
    P_STORE_ID IN NUMBER,
    P_RESULTADO OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_RESULTADO FOR
        SELECT 
            NVL(SUM(OI.TOTAL), 0) AS VENTAS_MES,
            COUNT(DISTINCT O.ORDER_ID) AS ORDENES_COMPLETADAS,
            CASE 
                WHEN COUNT(DISTINCT O.ORDER_ID) > 0 
                THEN NVL(SUM(OI.TOTAL), 0) / COUNT(DISTINCT O.ORDER_ID)
                ELSE 0 
            END AS PROMEDIO_ORDEN,
            (SELECT PRODUCT_NAME 
             FROM (
                 SELECT P.PRODUCT_NAME, SUM(OI.QUANTITY) AS TOTAL_CANTIDAD
                 FROM ORDER_ITEMS OI
                 JOIN ORDERS O ON OI.ORDER_ID = O.ORDER_ID
                 JOIN PRODUCTS P ON OI.PRODUCT_ID = P.PRODUCT_ID
                 WHERE O.STORE_ID = P_STORE_ID
                   AND O.ORDER_STATUS = 'COMPLETE'
                   AND TRUNC(O.ORDER_TMS, 'MM') = TRUNC(SYSTIMESTAMP, 'MM')
                 GROUP BY P.PRODUCT_NAME
                 ORDER BY TOTAL_CANTIDAD DESC
             ) WHERE ROWNUM = 1
            ) AS PRODUCTO_TOP
        FROM ORDERS O
        LEFT JOIN ORDER_ITEMS OI ON O.ORDER_ID = OI.ORDER_ID
        WHERE O.STORE_ID = P_STORE_ID
          AND O.ORDER_STATUS = 'COMPLETE'
          AND TRUNC(O.ORDER_TMS, 'MM') = TRUNC(SYSTIMESTAMP, 'MM');
END SP_OBTENER_METRICAS_TIENDA;
```

### 2. Vista de Gestión de Inventario

#### Descripción
Vista para gestionar inventario por tienda y producto, con alertas de stock bajo y funcionalidad de reposición.

#### Ruta
`/Inventory/Index`

#### Funcionalidades
- **Grid de Inventario**:
  - Mostrar inventario por tienda y producto
  - Filtros por tienda, producto, nivel de reorden
  - Indicadores visuales de stock bajo
  - Edición inline de cantidad y nivel de reorden
  
- **Alertas de Stock Bajo**:
  - Lista de productos con stock bajo
  - Indicador visual (badge rojo/amarillo)
  - Filtro rápido para ver solo productos con stock bajo
  
- **Reposición de Stock**:
  - Dialog para reponer stock
  - Actualizar cantidad en mano
  - Actualizar fecha de última reposición
  - Registrar motivo de reposición

#### Implementación

**Controller**: `InventoryController.cs`
```csharp
[HttpGet]
public IActionResult Index()
{
    return View();
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerInventario([FromBody] SolicitudBuscarInventario solicitud)
{
    try
    {
        var inventario = _inventoryService.BuscarInventarioAsync(solicitud).Result;
        return Json(new { exito = true, datos = inventario });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerProductosStockBajo([FromBody] int? storeId)
{
    try
    {
        var productos = _inventoryService.ObtenerProductosStockBajoAsync(storeId).Result;
        return Json(new { exito = true, datos = productos });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ReponerStock([FromBody] SolicitudReponerStock solicitud)
{
    try
    {
        var resultado = _inventoryService.ReponerStockAsync(solicitud).Result;
        if (resultado)
        {
            return Json(new { exito = true, mensaje = "Stock repuesto correctamente." });
        }
        else
        {
            return Json(new { exito = false, mensaje = "No se pudo reponer el stock." });
        }
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}
```

**View**: `Views/Inventory/Index.cshtml`
```html
@{
    ViewData["Title"] = "Gestión de Inventario";
}

<div class="container-fluid">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a asp-controller="Home" asp-action="Index">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Inventario</li>
        </ol>
    </nav>

    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-0">Gestión de Inventario</h2>
            <p class="text-muted">Control de stock por tienda y producto</p>
        </div>
    </div>

    <!-- Indicadores Compactos -->
    <div class="row mb-3">
        <div class="col-12">
            <div class="card">
                <div class="card-body py-2">
                    <div class="d-flex flex-wrap align-items-center gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-box text-primary"></i>
                            <span class="text-muted small">Total Productos:</span>
                            <strong class="text-primary" id="totalProductos">0</strong>
                        </div>
                        <div class="vr"></div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-exclamation-triangle text-warning"></i>
                            <span class="text-muted small">Stock Bajo:</span>
                            <strong class="text-warning" id="stockBajo">0</strong>
                        </div>
                        <div class="vr"></div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-check-circle text-success"></i>
                            <span class="text-muted small">Stock Normal:</span>
                            <strong class="text-success" id="stockNormal">0</strong>
                        </div>
                        <div class="vr"></div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fas fa-dollar-sign text-info"></i>
                            <span class="text-muted small">Valor Total:</span>
                            <strong class="text-info" id="valorTotal">$0.00</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Filtros -->
    <div class="row mb-3 g-3">
        <div class="col-md-3">
            <label class="form-label">Tienda</label>
            <ejs-dropdownlist id="filtroTiendaInventario" 
                              placeholder="Todas las tiendas"
                              dataSource="@(new List<object>())"
                              fields="@(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings { 
                                  Value = "IdTienda", 
                                  Text = "NombreTienda" 
                              })"
                              change="filtroTiendaInventarioChange">
            </ejs-dropdownlist>
        </div>
        <div class="col-md-3">
            <label class="form-label">Producto</label>
            <ejs-autocomplete id="filtroProductoInventario" 
                              placeholder="Buscar producto"
                              dataSource="@(new List<object>())"
                              fields="@(new Syncfusion.EJ2.DropDowns.AutoCompleteFieldSettings { 
                                  Value = "IdProducto", 
                                  Text = "NombreProducto" 
                              })"
                              change="filtroProductoInventarioChange">
            </ejs-autocomplete>
        </div>
        <div class="col-md-3">
            <label class="form-label">Estado de Stock</label>
            <ejs-dropdownlist id="filtroEstadoStock" 
                              placeholder="Todos"
                              dataSource="@(new string[] { "Normal", "Bajo", "Crítico" })"
                              change="filtroEstadoStockChange">
            </ejs-dropdownlist>
        </div>
        <div class="col-md-3 d-flex align-items-end">
            <button type="button" class="btn btn-primary w-100" onclick="Inventory.Filtros.Aplicar()">
                <i class="fas fa-filter"></i> Aplicar Filtros
            </button>
        </div>
    </div>

    <!-- Grid de Inventario -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Inventario</h5>
                    <button type="button" class="btn btn-success btn-sm" onclick="Inventory.Dialog.MostrarReponer()">
                        <i class="fas fa-plus"></i> Reponer Stock
                    </button>
                </div>
                <div class="card-body">
                    <ejs-grid id="gridInventario" 
                              allowPaging="true"
                              allowFiltering="true"
                              allowSorting="true"
                              allowEditing="true"
                              editSettings="@(new Syncfusion.EJ2.Grids.GridEditSettings { 
                                  AllowEditing = true,
                                  AllowAdding = false,
                                  AllowDeleting = false,
                                  Mode = Syncfusion.EJ2.Grids.EditMode.Normal
                              })"
                              actionComplete="gridInventarioActionComplete"
                              is-responsive="true">
                        <e-grid-pagesettings pageSize="10" pageSizes="@(new int[] { 10, 25, 50, 100 })"></e-grid-pagesettings>
                        <e-grid-columns>
                            <e-grid-column field="IdTienda" headerText="Tienda ID" width="100" type="number"></e-grid-column>
                            <e-grid-column field="NombreTienda" headerText="Tienda" width="150"></e-grid-column>
                            <e-grid-column field="IdProducto" headerText="Producto ID" width="100" type="number"></e-grid-column>
                            <e-grid-column field="NombreProducto" headerText="Producto" width="200"></e-grid-column>
                            <e-grid-column field="CantidadEnMano" headerText="Cantidad" width="120" type="number" 
                                         editType="numericedit"
                                         template="#cantidadTemplate"></e-grid-column>
                            <e-grid-column field="NivelReorden" headerText="Nivel Reorden" width="120" type="number" 
                                         editType="numericedit"></e-grid-column>
                            <e-grid-column field="UltimaReposicion" headerText="Última Reposición" width="150" type="date" format="dd/MM/yyyy"></e-grid-column>
                            <e-grid-column field="EstadoStock" headerText="Estado" width="120" template="#estadoStockTemplate"></e-grid-column>
                            <e-grid-column headerText="Acciones" width="150" template="#accionesInventarioTemplate"></e-grid-column>
                        </e-grid-columns>
                    </ejs-grid>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Dialog para Reponer Stock -->
<ejs-dialog id="dialogReponerStock" 
            header="Reponer Stock"
            showCloseIcon="true"
            width="500px"
            isModal="true"
            visible="false"
            allowDragging="true">
    <e-content-template>
        <div class="container-fluid p-3">
            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Producto</label>
                    <ejs-dropdownlist id="ddlProductoReponer" 
                                      placeholder="Seleccionar producto"
                                      dataSource="@(new List<object>())"
                                      fields="@(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings { 
                                          Value = "IdProducto", 
                                          Text = "NombreProducto" 
                                      })">
                    </ejs-dropdownlist>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Tienda</label>
                    <ejs-dropdownlist id="ddlTiendaReponer" 
                                      placeholder="Seleccionar tienda"
                                      dataSource="@(new List<object>())"
                                      fields="@(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings { 
                                          Value = "IdTienda", 
                                          Text = "NombreTienda" 
                                      })">
                    </ejs-dropdownlist>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Cantidad a Reponer</label>
                    <ejs-numerictextbox id="txtCantidadReponer" 
                                        placeholder="Cantidad"
                                        min="1"
                                        value="1">
                    </ejs-numerictextbox>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Motivo</label>
                    <ejs-textbox id="txtMotivoReponer" 
                                 placeholder="Motivo de reposición"
                                 multiline="true"
                                 rows="3">
                    </ejs-textbox>
                </div>
            </div>
        </div>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="@(new Syncfusion.EJ2.Popups.DialogButtonModel { 
            Content = "Cancelar", 
            IsPrimary = false
        })" click="btnCancelarReponerClick"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton buttonModel="@(new Syncfusion.EJ2.Popups.DialogButtonModel { 
            Content = "Reponer", 
            IsPrimary = true
        })" click="btnReponerClick"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>

<script id="cantidadTemplate" type="text/x-template">
    <span class="${getCantidadClass(CantidadEnMano, NivelReorden)}">${CantidadEnMano}</span>
</script>

<script id="estadoStockTemplate" type="text/x-template">
    <span class="badge ${getEstadoStockBadgeClass(EstadoStock)}">${EstadoStock}</span>
</script>

<script id="accionesInventarioTemplate" type="text/x-template">
    <div>
        <button class="btn btn-sm btn-success" onclick="Inventory.Acciones.Reponer(${IdInventario})">
            <i class="fas fa-plus"></i> Reponer
        </button>
    </div>
</script>

@section Scripts {
    <script src="~/js/Inventory/Inventory.js" asp-append-version="true"></script>
    <script>
        window.getCantidadClass = function(cantidad, nivelReorden) {
            if (cantidad <= nivelReorden * 0.5) {
                return 'text-danger fw-bold';
            } else if (cantidad <= nivelReorden) {
                return 'text-warning fw-bold';
            } else {
                return 'text-success';
            }
        };
        
        window.getEstadoStockBadgeClass = function(estado) {
            if (estado === 'Crítico') {
                return 'bg-danger';
            } else if (estado === 'Bajo') {
                return 'bg-warning';
            } else {
                return 'bg-success';
            }
        };
    </script>
}
```

### 3. Vista de Reporte de Ventas por Cliente

#### Descripción
Vista que muestra reporte detallado de ventas por cliente, incluyendo historial de compras, totales y análisis.

#### Ruta
`/Customers/Report/{customerId?}`

#### Funcionalidades
- **Información del Cliente**:
  - Datos básicos del cliente
  - Estado de cuenta
  - Crédito disponible
  - Total de compras históricas
  
- **Gráficos**:
  - Evolución de compras por mes (Line Chart)
  - Distribución de compras por estado (Pie Chart)
  - Comparación de montos por año (Column Chart)
  
- **Tabla de Historial**:
  - Grid con todas las órdenes del cliente
  - Filtros por fecha, estado, tienda
  - Exportación Excel/PDF

### 4. Vista de Análisis de Productos

#### Descripción
Vista para analizar rendimiento de productos, incluyendo productos más vendidos, menos vendidos, y análisis de rentabilidad.

#### Ruta
`/Products/Analytics`

#### Funcionalidades
- **Métricas de Productos**:
  - Total de productos activos
  - Productos con stock bajo
  - Productos más vendidos
  - Productos menos vendidos
  - Margen de ganancia promedio
  
- **Gráficos**:
  - Top 20 productos más vendidos (Bar Chart)
  - Distribución de productos por categoría (Pie Chart)
  - Análisis de rentabilidad (Scatter Chart: precio vs cantidad vendida)
  - Tendencias de ventas por producto (Line Chart)
  
- **Tabla de Productos**:
  - Grid con todos los productos
  - Filtros por categoría, estado, stock
  - Edición inline de precios
  - Exportación Excel/PDF

### 5. Vista de Dashboard de Envíos

#### Descripción
Vista para gestionar y monitorear envíos, con seguimiento de estados y tiempos de entrega.

#### Ruta
`/Shipments/Index`

#### Funcionalidades
- **Kanban de Envíos**:
  - Columnas por estado (PENDING, SHIPPED, DELIVERED, CANCELLED)
  - Drag and drop entre estados
  - Información de tracking
  - Filtros por fecha, tienda, estado
  
- **Métricas**:
  - Envíos pendientes
  - Envíos en tránsito
  - Envíos entregados
  - Tiempo promedio de entrega
  
- **Tabla de Envíos**:
  - Grid con todos los envíos
  - Filtros avanzados
  - Actualización de estado
  - Exportación Excel/PDF

### 6. Vista de Reporte de Empleados

#### Descripción
Vista para analizar rendimiento de empleados, incluyendo ventas por empleado y comisiones.

#### Ruta
`/Employees/Report`

#### Funcionalidades
- **Métricas por Empleado**:
  - Total de ventas
  - Número de órdenes procesadas
  - Comisiones ganadas
  - Promedio de venta por orden
  
- **Gráficos**:
  - Ranking de empleados por ventas (Bar Chart)
  - Distribución de comisiones (Pie Chart)
  - Evolución de ventas por empleado (Line Chart)
  
- **Tabla de Empleados**:
  - Grid con todos los empleados
  - Filtros por tienda, departamento
  - Exportación Excel/PDF

## Modelos Adicionales Necesarios

### SolicitudVentasDiarias.cs
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class SolicitudVentasDiarias
{
    public int StoreId { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
}
```

### SolicitudBuscarInventario.cs
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class SolicitudBuscarInventario
{
    public int? StoreId { get; set; }
    public int? ProductId { get; set; }
    public string? EstadoStock { get; set; } // "Normal", "Bajo", "Crítico"
}
```

### SolicitudReponerStock.cs
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class SolicitudReponerStock
{
    public int InventoryId { get; set; }
    public int Cantidad { get; set; }
    public string? Motivo { get; set; }
}
```

## Stored Procedures Adicionales

### PKG_INVENTORY
```sql
CREATE OR REPLACE PACKAGE PKG_INVENTORY AS
    PROCEDURE SP_BUSCAR_INVENTARIO(
        P_STORE_ID IN NUMBER DEFAULT NULL,
        P_PRODUCT_ID IN NUMBER DEFAULT NULL,
        P_ESTADO_STOCK IN VARCHAR2 DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    PROCEDURE SP_OBTENER_PRODUCTOS_STOCK_BAJO(
        P_STORE_ID IN NUMBER DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    PROCEDURE SP_REPONER_STOCK(
        P_INVENTORY_ID IN NUMBER,
        P_CANTIDAD IN NUMBER,
        P_MOTIVO IN VARCHAR2 DEFAULT NULL,
        P_EXITO OUT NUMBER,
        P_MENSAJE OUT VARCHAR2
    );
END PKG_INVENTORY;
/
```

### PKG_STORES
```sql
CREATE OR REPLACE PACKAGE PKG_STORES AS
    PROCEDURE SP_OBTENER_METRICAS_TIENDA(
        P_STORE_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    PROCEDURE SP_OBTENER_VENTAS_DIARIAS(
        P_STORE_ID IN NUMBER,
        P_FECHA_INICIO IN TIMESTAMP,
        P_FECHA_FIN IN TIMESTAMP,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    PROCEDURE SP_OBTENER_TOP_PRODUCTOS(
        P_STORE_ID IN NUMBER,
        P_LIMITE IN NUMBER DEFAULT 10,
        P_RESULTADO OUT SYS_REFCURSOR
    );
END PKG_STORES;
/
```

## Convenciones de Nomenclatura

### Español - Consistente

**Métodos C#**:
- `ObtenerMetricasTiendaAsync`
- `ObtenerVentasDiariasAsync`
- `ObtenerTopProductosAsync`
- `BuscarInventarioAsync`
- `ObtenerProductosStockBajoAsync`
- `ReponerStockAsync`

**Variables C#**:
- `metricasTienda`
- `ventasDiarias`
- `topProductos`
- `inventario`
- `productosStockBajo`
- `solicitudReponerStock`

**Funciones JavaScript**:
- `CargarMetricas`
- `CargarVentasDiarias`
- `CargarTopProductos`
- `CargarInventario`
- `CargarProductosStockBajo`
- `ReponerStock`

**Namespaces JavaScript**:
- `Stores.Analytics`
- `Inventory.Grid`
- `Inventory.Dialog`
- `Inventory.Filtros`
- `Inventory.Acciones`

## Referencias

- [Guía de Funcionalidades Avanzadas](GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md)
- [Reglas de Negocio - Schema CO](../BASE_DATOS/REGLAS_NEGOCIO_SCHEMA_CO.md)
- [Plan de Expansión](../../../../PLAN_EXPANSION_SYNCFUSION.md)

---

**Última actualización**: 2026-01-18  
**Versión**: 1.0  
**Propósito**: Enseñanza y desarrollo  
**Base de Datos**: Oracle Sample Schema CO
