# Plan de Migración de UI a Syncfusion ASP.NET Core MVC

**ESTADO ACTUAL: LICENCIA APROBADA - LISTO PARA IMPLEMENTACIÓN**

Este documento detalla la estrategia de migración a Syncfusion ASP.NET Core MVC usando un enfoque de módulos paralelos, manteniendo el módulo Employees intacto como referencia (V1) y creando un nuevo módulo basado en Oracle Sample Schema CO (Customer Orders) con Syncfusion desde el inicio (V2).

## Estrategia de Migración: Módulos Paralelos

### Enfoque Adoptado

En lugar de migrar el módulo Employees existente, se implementará una estrategia de **módulos paralelos**:

- **Módulo Employees (V1)**: Se mantiene **completamente intacto** con DataTables + Bootstrap
  - Sin modificaciones
  - Funcional al 100%
  - Sirve como referencia y ejemplo de la UI actual
  - Continúa funcionando para el equipo que trabaja con él

- **Módulo Ventas/Órdenes (V2)**: Nuevo módulo creado desde cero con Syncfusion
  - Basado en Oracle Sample Schema CO (Customer Orders)
  - Usa Syncfusion UI desde el inicio
  - Implementa todas las funcionalidades de Employees y más
  - Demuestra capacidades avanzadas de Syncfusion
  - Conectado a base de datos Oracle real

### Ventajas de Este Enfoque

1. **Sin interrupciones**: El equipo puede seguir trabajando con Employees sin cambios
2. **Comparación directa**: Permite comparar ambas implementaciones lado a lado
3. **Aprendizaje gradual**: El equipo aprende Syncfusion sin presión
4. **Rollback innecesario**: Si hay problemas, Employees sigue funcionando
5. **Datos reales**: El nuevo módulo usa datos reales de Oracle, no mocks

## Estado de la Migración

### Licencia Aprobada

La Community License de Syncfusion ha sido **aprobada y recibida**. El proyecto está listo para comenzar la implementación del nuevo módulo con Syncfusion.

**Información del Proceso de Licencia**:
- **Ticket de referencia**: #803702
- **Fecha de solicitud**: 14 de enero de 2026
- **Estado**: ✅ Aprobada - Community License permanente recibida
- **Clave de prueba recibida**: Sí (7 días, temporal - ya no necesaria)
- **Licencia permanente**: ✅ Recibida y lista para usar

**Próximos Pasos**:
1. ✅ Instalar y configurar Syncfusion en el proyecto (ver [INSTALACION_POST_APROBACION.md](INSTALACION_POST_APROBACION.md))
2. ✅ Registrar la licencia permanente en `Program.cs`
3. Comenzar desarrollo del nuevo módulo siguiendo [GUIA_CREACION_MODULO_SYNCFUSION.md](GUIA_CREACION_MODULO_SYNCFUSION.md)

**Documentación Relacionada**:
- [PROCESO_SOLICITUD_LICENCIA.md](PROCESO_SOLICITUD_LICENCIA.md) - Proceso completo de solicitud
- [LICENCIA_SYNCFUSION.md](LICENCIA_SYNCFUSION.md) - Información sobre la licencia
- [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md) - Configuración de Oracle Cloud con Schema CO

## Base de Datos: Oracle Sample Schema CO

### Schema CO (Customer Orders)

El nuevo módulo se basará en el **Oracle Sample Schema CO (Customer Orders)**, que incluye:

**Tablas Principales**:
- **ORDERS**: Órdenes de venta con información completa
- **ORDER_ITEMS**: Items individuales de cada orden
- **CUSTOMERS**: Información de clientes
- **PRODUCTS**: Catálogo de productos
- **STORES**: Tiendas/almacenes
- **SHIPMENTS**: Información de envíos
- **INVENTORY**: Control de inventario
- **EMPLOYEES**: Empleados asociados a tiendas
- **REGIONS, COUNTRIES, LOCATIONS**: Datos geográficos

**Características**:
- Miles de registros realistas
- Relaciones complejas (foreign keys, joins)
- Datos históricos para análisis temporal
- Múltiples estados de órdenes
- Soporte para JSON en algunas tablas

**Documentación Completa**: Ver [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)

## Fase 1: Configuración de Base de Datos

### 1.1 Configurar Oracle Cloud Always Free

**Tarea**: Crear cuenta y provisionar Autonomous Database Always Free

**Pasos**:
1. Crear cuenta en Oracle Cloud (https://www.oracle.com/cloud/free/)
2. Provisionar Autonomous Database Always Free
3. Descargar Wallet de conexión
4. Configurar conexión en DataGrip

**Tiempo estimado**: 1-2 horas

**Documentación**: [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)

### 1.2 Instalar Sample Schema CO

**Tarea**: Instalar el schema CO en la base de datos Oracle Cloud

**Pasos**:
1. Conectarse a Database Actions como ADMIN
2. Descargar scripts del schema CO desde GitHub de Oracle
3. Ejecutar script `co_main.sql`
4. Verificar instalación y datos

**Tiempo estimado**: 30 minutos

**Documentación**: [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)

### 1.3 Configurar Conexión en Proyecto

**Tarea**: Configurar connection string en appsettings.json

**Archivo**: `src/AdministracionFlotillas.Web/appsettings.json`

**Cambios**:
```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=ADMINFLOTILLAS_high?TNS_ADMIN=/ruta/al/wallet;User Id=CO;Password=TU_PASSWORD;"
  }
}
```

**Tiempo estimado**: 15 minutos

**Total Fase 1**: ~2-3 horas

## Fase 2: Desarrollo del Backend (Nuevo Módulo)

### 2.1 Crear Modelos Comunes

**Tarea**: Crear modelos basados en las tablas del schema CO

**Archivos a Crear**:
- `src/AdministracionFlotillas.ModelosComunes/Order.cs`
- `src/AdministracionFlotillas.ModelosComunes/OrderItem.cs`
- `src/AdministracionFlotillas.ModelosComunes/Customer.cs`
- `src/AdministracionFlotillas.ModelosComunes/Product.cs`
- `src/AdministracionFlotillas.ModelosComunes/Store.cs`
- `src/AdministracionFlotillas.ModelosComunes/Shipment.cs`
- `src/AdministracionFlotillas.ModelosComunes/Inventory.cs`

**Estructura de ejemplo (Order.cs)**:
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class Order
{
    public int OrderId { get; set; }
    public int CustomerId { get; set; }
    public int StoreId { get; set; }
    public int? SalesRepId { get; set; }
    public DateTime OrderDate { get; set; }
    public string OrderStatus { get; set; }
    public decimal OrderTotal { get; set; }
    // ... más propiedades según tabla ORDERS
}
```

**Tiempo estimado**: 2 horas

### 2.2 Crear Repositorios

**Tarea**: Crear repositorios con conexión real a Oracle

**Archivos a Crear**:
- `src/AdministracionFlotillas.AccesoDatos/Repositorios/IOrdersRepository.cs`
- `src/AdministracionFlotillas.AccesoDatos/Repositorios/OrdersRepository.cs`
- `src/AdministracionFlotillas.AccesoDatos/Repositorios/ICustomersRepository.cs`
- `src/AdministracionFlotillas.AccesoDatos/Repositorios/CustomersRepository.cs`
- Y más según necesidades

**Implementación con Oracle**:
```csharp
public async Task<List<Order>> ObtenerOrdersAsync()
{
    using var connection = new OracleConnection(_connectionString);
    await connection.OpenAsync();
    
    var query = @"
        SELECT 
            ORDER_ID, CUSTOMER_ID, STORE_ID, 
            ORDER_DATE, ORDER_STATUS, ORDER_TOTAL
        FROM CO.ORDERS
        ORDER BY ORDER_DATE DESC";
    
    var orders = await connection.QueryAsync<Order>(query);
    return orders.ToList();
}
```

**Tiempo estimado**: 4 horas

### 2.3 Crear Servicios de Negocio

**Tarea**: Crear servicios con reglas de negocio especializadas

**Archivos a Crear**:
- `src/AdministracionFlotillas.ReglasNegocio/Servicios/Interfaces/IOrdersService.cs`
- `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/OrdersServiceOracle.cs`

**Reglas de Negocio a Implementar**:
- Validar estado de órdenes
- Calcular totales con impuestos
- Validar disponibilidad de inventario
- Aplicar descuentos según reglas
- Validar fechas de envío
- Y más según requerimientos

**Tiempo estimado**: 3 horas

### 2.4 Crear ViewModels y Parseadores

**Tarea**: Crear ViewModels y parseadores para el nuevo módulo

**Archivos a Crear**:
- `src/AdministracionFlotillas.Web/ViewModels/OrderViewModel.cs`
- `src/AdministracionFlotillas.Web/ViewModels/CustomerViewModel.cs`
- `src/AdministracionFlotillas.Web/ViewModels/DashboardViewModel.cs`
- `src/AdministracionFlotillas.Web/Parseador/OrderParseador.cs`

**Tiempo estimado**: 2 horas

### 2.5 Crear Controladores

**Tarea**: Crear controladores con endpoints AJAX

**Archivos a Crear**:
- `src/AdministracionFlotillas.Web/Controllers/OrdersController.cs`

**Endpoints a Implementar**:
- `GET /Orders` - Vista principal
- `POST /Orders/ObtenerOrders` - Obtener lista de órdenes
- `POST /Orders/ObtenerOrderPorId` - Obtener orden específica
- `POST /Orders/ObtenerOrderItems` - Obtener items de una orden
- `POST /Orders/ObtenerCustomers` - Obtener clientes
- `POST /Orders/ObtenerProducts` - Obtener productos
- Y más según necesidades

**Tiempo estimado**: 2 horas

**Total Fase 2**: ~13 horas

## Fase 3: Desarrollo del Frontend con Syncfusion

### 3.1 Configurar Syncfusion en Proyecto

**Tarea**: Instalar y configurar Syncfusion (ver [REGISTRO_LICENCIA_SYNCFUSION.md](REGISTRO_LICENCIA_SYNCFUSION.md))

**Pasos**:
1. Agregar paquete NuGet
2. Registrar licencia en Program.cs
3. Agregar Tag Helper en _ViewImports.cshtml
4. Agregar estilos y scripts en _Layout.cshtml
5. Agregar servicios en Program.cs

**Tiempo estimado**: 30 minutos

### 3.2 Crear Vista Principal con Dashboard

**Archivo**: `src/AdministracionFlotillas.Web/Views/Orders/Index.cshtml`

**Componentes Syncfusion a Usar**:
- **Dashboard Layout**: Para paneles de métricas
- **Grid**: Para tabla de órdenes
- **Charts**: Para gráficos de análisis
- **Cards**: Para métricas resumidas

**Estructura**:
```html
@{
    ViewData["Title"] = "Órdenes de Venta";
}

<div class="container-fluid">
    <!-- Dashboard con métricas -->
    <div class="row mb-4">
        <div class="col-md-3">
            <ejs-card>
                <div class="card-content">
                    <h4>Total Órdenes</h4>
                    <h2>@ViewBag.TotalOrders</h2>
                </div>
            </ejs-card>
        </div>
        <!-- Más métricas -->
    </div>
    
    <!-- Grid de órdenes -->
    <ejs-grid id="ordersGrid" 
              dataSource="@Url.Action("ObtenerOrders", "Orders")"
              allowPaging="true"
              allowFiltering="true"
              allowSorting="true">
        <!-- Columnas -->
    </ejs-grid>
</div>
```

**Tiempo estimado**: 4 horas

### 3.3 Implementar Grid de Órdenes

**Archivo**: `src/AdministracionFlotillas.Web/Views/Orders/_OrdersGrid.cshtml`

**Funcionalidades** (igual que Employees pero con Syncfusion):
- Filtrado avanzado
- Ordenamiento múltiple
- Paginación
- Selección múltiple
- Exportación a Excel/PDF
- Formateo de fechas y moneda
- Estilos condicionales según estado

**Tiempo estimado**: 3 horas

### 3.4 Implementar Vista de Detalle con Tabs

**Archivo**: `src/AdministracionFlotillas.Web/Views/Orders/Details.cshtml`

**Componente**: Syncfusion Tabs

**Pestañas**:
1. **Información General**: Datos de la orden
2. **Items**: Sub-grid con ORDER_ITEMS
3. **Cliente**: Información del cliente
4. **Envío**: Información de SHIPMENTS
5. **Historial**: Timeline de cambios

**Tiempo estimado**: 3 horas

### 3.5 Implementar Calendario de Órdenes

**Archivo**: `src/AdministracionFlotillas.Web/Views/Orders/Calendar.cshtml`

**Componente**: Syncfusion Schedule/Calendar

**Funcionalidades**:
- Vista mensual/semanal de órdenes por fecha
- Filtrado por estado
- Drag & drop para cambiar fechas
- Alertas de órdenes vencidas

**Tiempo estimado**: 2 horas

### 3.6 Implementar Gráficos y Análisis

**Archivo**: `src/AdministracionFlotillas.Web/Views/Orders/Analytics.cshtml`

**Componente**: Syncfusion Charts

**Gráficos a Implementar**:
- Ventas por mes (línea)
- Órdenes por estado (pie)
- Top productos (columna)
- Ventas por tienda (comparativa)
- Tendencias temporales

**Tiempo estimado**: 3 horas

### 3.7 Crear JavaScript con Namespaces

**Archivo**: `src/AdministracionFlotillas.Web/Scripts/Orders/Orders.js`

**Estructura de Namespaces** (similar a Employees):
```javascript
window.Orders = {
    Grid: { /* ... */ },
    Filters: { /* ... */ },
    Selection: { /* ... */ },
    Dashboard: { /* ... */ },
    Calendar: { /* ... */ },
    Charts: { /* ... */ },
    Details: { /* ... */ }
};
```

**Tiempo estimado**: 4 horas

**Total Fase 3**: ~19 horas

## Fase 4: Funcionalidades Avanzadas

### 4.1 Query Builder para Búsquedas Avanzadas

**Componente**: Syncfusion Query Builder

**Funcionalidades**:
- Construcción visual de filtros complejos
- Guardar búsquedas favoritas
- Exportar resultados

**Tiempo estimado**: 2 horas

### 4.2 Tree Grid para Jerarquías

**Componente**: Syncfusion Tree Grid

**Vista**: Orden → Items → Productos relacionados

**Tiempo estimado**: 2 horas

### 4.3 Kanban para Gestión de Estados

**Componente**: Syncfusion Kanban

**Tablero**: Pendiente | En Proceso | Completada | Cancelada

**Tiempo estimado**: 2 horas

### 4.4 Editor Avanzado de Órdenes

**Componente**: Syncfusion Dialog + Form Controls

**Funcionalidades**:
- Validación en tiempo real
- Campos condicionales
- Preview de cambios

**Tiempo estimado**: 2 horas

**Total Fase 4**: ~8 horas

## Fase 5: Validación y Pruebas

### 5.1 Pruebas Funcionales

**Checklist**:
- [ ] Dashboard carga métricas correctamente
- [ ] Grid carga datos de Oracle
- [ ] Filtros funcionan correctamente
- [ ] Vista de detalle muestra información completa
- [ ] Calendario muestra órdenes por fecha
- [ ] Gráficos muestran datos correctos
- [ ] Exportación funciona
- [ ] Responsive funciona en móviles

**Tiempo estimado**: 4 horas

### 5.2 Pruebas de Compatibilidad

**Verificar en**:
- [ ] Windows con .NET 8.0.300
- [ ] Mac con .NET 8.0.417
- [ ] Navegadores: Chrome, Firefox, Safari, Edge

**Tiempo estimado**: 2 horas

**Total Fase 5**: ~6 horas

## Cronograma Estimado

| Fase | Tareas | Tiempo Estimado |
|------|--------|-----------------|
| Fase 1 | Configuración de Base de Datos | 2-3 horas |
| Fase 2 | Desarrollo del Backend | 13 horas |
| Fase 3 | Desarrollo del Frontend Syncfusion | 19 horas |
| Fase 4 | Funcionalidades Avanzadas | 8 horas |
| Fase 5 | Validación y Pruebas | 6 horas |
| **Total** | **Nuevo Módulo Completo** | **~48-50 horas (~6-7 días)** |

## Estructura de Archivos Final

```
src/
├── AdministracionFlotillas.ModelosComunes/
│   ├── Employee.cs (V1 - sin tocar)
│   ├── Order.cs (V2 - NUEVO)
│   ├── OrderItem.cs (V2 - NUEVO)
│   ├── Customer.cs (V2 - NUEVO)
│   └── Product.cs (V2 - NUEVO)
│
├── AdministracionFlotillas.AccesoDatos/
│   └── Repositorios/
│       ├── EmployeesRepository.cs (V1 - sin tocar)
│       ├── OrdersRepository.cs (V2 - NUEVO - Oracle real)
│       └── CustomersRepository.cs (V2 - NUEVO)
│
├── AdministracionFlotillas.ReglasNegocio/
│   └── Servicios/
│       ├── EmployeesServiceOracle.cs (V1 - sin tocar)
│       └── OrdersServiceOracle.cs (V2 - NUEVO)
│
└── AdministracionFlotillas.Web/
    ├── Controllers/
    │   ├── EmployeesController.cs (V1 - sin tocar)
    │   └── OrdersController.cs (V2 - NUEVO)
    ├── ViewModels/
    │   ├── EmployeeViewModel.cs (V1 - sin tocar)
    │   ├── OrderViewModel.cs (V2 - NUEVO)
    │   └── DashboardViewModel.cs (V2 - NUEVO)
    ├── Views/
    │   ├── Employees/ (V1 - sin tocar - DataTables)
    │   └── Orders/ (V2 - NUEVO - Syncfusion)
    │       ├── Index.cshtml (Dashboard)
    │       ├── _OrdersGrid.cshtml (Grid)
    │       ├── Details.cshtml (Detalle con Tabs)
    │       ├── Calendar.cshtml (Calendario)
    │       └── Analytics.cshtml (Gráficos)
    └── Scripts/
        ├── Employees/ (V1 - sin tocar)
        └── Orders/ (V2 - NUEVO)
            └── Orders.js (Namespace Orders.*)
```

## Consideraciones Importantes

### Compatibilidad con Módulo Employees (V1)

**Se mantiene intacto**:
- Todo el código del módulo Employees
- DataTables, Bootstrap, jQuery UI
- JavaScript namespaces existentes
- Bundles actuales
- Funcionalidad al 100%

**No se modifica**:
- Ningún archivo relacionado con Employees
- _Layout.cshtml (se agregan referencias Syncfusion sin quitar las actuales)
- Sistema de bundles (se agregan nuevos bundles para Orders)

### Coexistencia de Ambas Versiones

**Ambas versiones funcionan simultáneamente**:
- Employees (V1) usa DataTables
- Orders (V2) usa Syncfusion
- Ambas comparten el mismo _Layout.cshtml
- Ambas comparten la misma arquitectura de capas
- Solo difieren en la UI y la fuente de datos

### Navegación entre Módulos

**Menú de navegación**:
```html
<ul class="navbar-nav">
    <li class="nav-item">
        <a class="nav-link" asp-controller="Employees" asp-action="Index">
            Empleados (V1 - DataTables)
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" asp-controller="Orders" asp-action="Index">
            Órdenes (V2 - Syncfusion)
        </a>
    </li>
</ul>
```

## Recursos de Referencia

- **Documentación Syncfusion**: https://help.syncfusion.com/aspnet-core
- **Demos interactivos**: https://ej2.syncfusion.com/aspnetcore/Grid/Overview
- **Oracle Sample Schemas**: https://github.com/oracle-samples/db-sample-schemas
- **Oracle Cloud Always Free**: https://www.oracle.com/cloud/free/

---

**Última actualización**: Enero 2026
**Versión**: 2.0 (Estrategia de Módulos Paralelos)
**Schema de Base de Datos**: CO (Customer Orders)
**Base de Datos**: Oracle Cloud Always Free
