# Guía de Preparación para Nuevo Módulo con Syncfusion

Este documento detalla todas las tareas que se pueden adelantar mientras se espera la aprobación de la Community License de Syncfusion. Estas tareas preparatorias permitirán que el desarrollo del nuevo módulo sea más rápido y eficiente una vez que se apruebe la licencia.

**Estado**: Licencia aprobada - Ver [INSTALACION_POST_APROBACION.md](INSTALACION_POST_APROBACION.md) para instalación (Ticket #803702)

**Estrategia**: Crear nuevo módulo basado en Oracle Sample Schema CO (Customer Orders) con Syncfusion, manteniendo el módulo Employees intacto como referencia.

## Objetivo

Preparar el proyecto para el desarrollo del nuevo módulo de Órdenes/Ventas con Syncfusion. La licencia ya está aprobada, ver [INSTALACION_POST_APROBACION.md](INSTALACION_POST_APROBACION.md) para instalación.

## Tareas Preparatorias (Sin Licencia)

### 1. Configuración de Base de Datos

#### 1.1 Configurar Oracle Cloud Always Free

**Tarea**: Crear cuenta y provisionar Autonomous Database Always Free

**Pasos**:
1. Crear cuenta en Oracle Cloud (https://www.oracle.com/cloud/free/)
2. Provisionar Autonomous Database Always Free
3. Descargar Wallet de conexión
4. Configurar conexión en DataGrip

**Checklist**:
- [ ] Cuenta Oracle Cloud creada
- [ ] Autonomous Database Always Free provisionada
- [ ] Wallet descargado y extraído
- [ ] Conexión probada en DataGrip
- [ ] Connection string guardado de forma segura

**Tiempo estimado**: 1-2 horas

**Documentación**: [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)

#### 1.2 Instalar Sample Schema CO

**Tarea**: Instalar el schema CO (Customer Orders) en la base de datos

**Pasos**:
1. Conectarse a Database Actions como ADMIN
2. Descargar scripts del schema CO desde GitHub de Oracle
3. Ejecutar script `co_main.sql`
4. Verificar instalación y datos

**Checklist**:
- [ ] Scripts del schema CO descargados
- [ ] Schema CO instalado correctamente
- [ ] Tablas principales verificadas (ORDERS, CUSTOMERS, PRODUCTS, etc.)
- [ ] Datos de ejemplo verificados (miles de registros)
- [ ] Usuario CO configurado con permisos

**Tiempo estimado**: 30 minutos

**Documentación**: [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)

#### 1.3 Explorar Estructura del Schema CO

**Tarea**: Familiarizarse con las tablas y relaciones del schema CO

**Tablas a Explorar**:
- ORDERS (órdenes principales)
- ORDER_ITEMS (items de órdenes)
- CUSTOMERS (clientes)
- PRODUCTS (productos)
- STORES (tiendas)
- SHIPMENTS (envíos)
- INVENTORY (inventario)
- EMPLOYEES (empleados de tiendas)

**Consultas de Exploración**:
```sql
-- Ver estructura de tablas
SELECT table_name, num_rows 
FROM all_tables 
WHERE owner = 'CO' 
ORDER BY table_name;

-- Ver relaciones (foreign keys)
SELECT 
    a.table_name, 
    a.column_name, 
    c.table_name AS referenced_table,
    c.column_name AS referenced_column
FROM all_cons_columns a
JOIN all_constraints b ON a.constraint_name = b.constraint_name
JOIN all_cons_columns c ON b.r_constraint_name = c.constraint_name
WHERE b.constraint_type = 'R' 
AND a.owner = 'CO'
ORDER BY a.table_name;

-- Ver datos de ejemplo
SELECT * FROM co.orders WHERE ROWNUM <= 10;
SELECT * FROM co.order_items WHERE ROWNUM <= 10;
SELECT * FROM co.customers WHERE ROWNUM <= 10;
```

**Checklist**:
- [ ] Estructura de tablas documentada
- [ ] Relaciones entre tablas entendidas
- [ ] Datos de ejemplo revisados
- [ ] Consultas de ejemplo preparadas

**Tiempo estimado**: 1 hora

### 2. Análisis y Diseño

#### 2.1 Mapear Funcionalidades del Módulo Employees

**Tarea**: Documentar todas las funcionalidades de Employees que se replicarán en el nuevo módulo

**Archivos a Revisar**:
- `src/AdministracionFlotillas.Web/Views/Employees/Index.cshtml`
- `src/AdministracionFlotillas.Web/Views/Employees/_EmployeesGrid.cshtml`
- `src/AdministracionFlotillas.Web/Scripts/Employees/Employees.js`
- `src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs`

**Funcionalidades a Documentar**:
- [ ] Tabla con datos (Grid)
- [ ] Filtrado por múltiples campos
- [ ] Ordenamiento por columnas
- [ ] Selección múltiple
- [ ] Paginación
- [ ] Exportación (Excel, PDF, CSV)
- [ ] Búsqueda global
- [ ] Formateo de fechas y moneda
- [ ] Vista de detalles
- [ ] Modal de acciones

**Resultado**: Documento con lista completa de funcionalidades y su implementación actual

**Tiempo estimado**: 2 horas

#### 2.2 Diseñar Funcionalidades Especializadas

**Tarea**: Diseñar funcionalidades adicionales específicas para el módulo de Órdenes

**Funcionalidades Especializadas a Diseñar**:
- [ ] Dashboard con métricas de ventas
- [ ] Calendario de órdenes por fecha
- [ ] Gráficos de análisis (ventas, productos, tiendas)
- [ ] Vista de detalle con tabs (orden, items, cliente, envío)
- [ ] Query Builder para búsquedas avanzadas
- [ ] Tree Grid para jerarquía orden → items → productos
- [ ] Kanban para gestión de estados
- [ ] Editor avanzado de órdenes

**Resultado**: Especificación de funcionalidades con mockups o descripciones detalladas

**Tiempo estimado**: 3 horas

#### 2.3 Diseñar Estructura de Modelos

**Tarea**: Diseñar modelos basados en las tablas del schema CO

**Modelos a Diseñar**:
- Order (basado en ORDERS)
- OrderItem (basado en ORDER_ITEMS)
- Customer (basado en CUSTOMERS)
- Product (basado en PRODUCTS)
- Store (basado en STORES)
- Shipment (basado en SHIPMENTS)
- Inventory (basado en INVENTORY)

**Estructura de Ejemplo**:
```csharp
public class Order
{
    public int OrderId { get; set; }
    public int CustomerId { get; set; }
    public int StoreId { get; set; }
    public int? SalesRepId { get; set; }
    public DateTime OrderDate { get; set; }
    public string OrderStatus { get; set; }
    public decimal OrderTotal { get; set; }
    // Relaciones
    public Customer Customer { get; set; }
    public Store Store { get; set; }
    public List<OrderItem> OrderItems { get; set; }
}
```

**Checklist**:
- [ ] Modelos diseñados para todas las tablas principales
- [ ] Relaciones entre modelos definidas
- [ ] Propiedades documentadas
- [ ] Validaciones identificadas

**Tiempo estimado**: 2 horas

#### 2.4 Diseñar Reglas de Negocio

**Tarea**: Identificar y documentar reglas de negocio para el módulo de Órdenes

**Reglas de Negocio a Identificar**:
- [ ] Validación de estados de órdenes
- [ ] Cálculo de totales con impuestos
- [ ] Validación de disponibilidad de inventario
- [ ] Aplicación de descuentos
- [ ] Validación de fechas de envío
- [ ] Cálculo de comisiones
- [ ] Validación de límites de crédito
- [ ] Reglas de cancelación

**Resultado**: Documento con reglas de negocio detalladas

**Tiempo estimado**: 2 horas

### 3. Preparación de Estructura de Archivos

#### 3.1 Crear Estructura de Carpetas

**Tarea**: Crear carpetas para el nuevo módulo Orders

**Estructura a Crear**:
```
src/AdministracionFlotillas.Web/
├── Views/Orders/ (NUEVO)
│   ├── Index.cshtml
│   ├── _OrdersGrid.cshtml
│   ├── Details.cshtml
│   ├── Calendar.cshtml
│   └── Analytics.cshtml
└── Scripts/Orders/ (NUEVO)
    └── Orders.js
```

**Checklist**:
- [ ] Carpetas creadas
- [ ] Archivos placeholder creados (opcional)

**Tiempo estimado**: 15 minutos

#### 3.2 Preparar Templates HTML

**Tarea**: Crear templates HTML base para componentes Syncfusion (sin funcionalidad aún)

**Templates a Preparar**:
- Template para Grid de órdenes
- Template para Dashboard
- Template para Calendario
- Template para Gráficos
- Template para Vista de detalle

**Nota**: Estos templates pueden crearse como comentarios o archivos separados para referencia

**Tiempo estimado**: 1 hora

### 4. Investigación y Aprendizaje

#### 4.1 Estudiar Documentación de Syncfusion

**Tarea**: Revisar documentación oficial de Syncfusion para componentes que se usarán

**Componentes a Estudiar**:
- [ ] Grid (https://help.syncfusion.com/aspnet-core/grid/getting-started)
- [ ] Charts (https://help.syncfusion.com/aspnet-core/chart/getting-started)
- [ ] Schedule/Calendar (https://help.syncfusion.com/aspnet-core/schedule/getting-started)
- [ ] Dashboard Layout (https://help.syncfusion.com/aspnet-core/dashboard-layout/getting-started)
- [ ] Tabs (https://help.syncfusion.com/aspnet-core/tabs/getting-started)
- [ ] Query Builder (https://help.syncfusion.com/aspnet-core/query-builder/getting-started)
- [ ] Tree Grid (https://help.syncfusion.com/aspnet-core/treegrid/getting-started)
- [ ] Kanban (https://help.syncfusion.com/aspnet-core/kanban/getting-started)

**Checklist**:
- [ ] Documentación de cada componente revisada
- [ ] Ejemplos de código guardados
- [ ] Notas tomadas sobre características importantes

**Tiempo estimado**: 4 horas

#### 4.2 Revisar Demos Interactivos

**Tarea**: Explorar demos interactivos de Syncfusion

**URL**: https://ej2.syncfusion.com/aspnetcore/demos/

**Demos a Revisar**:
- [ ] Grid con todas las características
- [ ] Charts con diferentes tipos
- [ ] Schedule/Calendar
- [ ] Dashboard Layout
- [ ] Query Builder
- [ ] Tree Grid
- [ ] Kanban

**Checklist**:
- [ ] Demos explorados
- [ ] Funcionalidades interesantes identificadas
- [ ] Screenshots o notas guardadas

**Tiempo estimado**: 2 horas

#### 4.3 Estudiar Oracle Sample Schema CO

**Tarea**: Estudiar en profundidad el schema CO y sus datos

**Recursos**:
- GitHub: https://github.com/oracle-samples/db-sample-schemas
- Documentación oficial de Oracle

**Tareas**:
- [ ] Leer documentación del schema CO
- [ ] Entender relaciones entre tablas
- [ ] Analizar tipos de datos
- [ ] Revisar procedimientos almacenados de ejemplo (si existen)
- [ ] Crear consultas de ejemplo complejas

**Tiempo estimado**: 2 horas

### 5. Preparación de Código Base

#### 5.1 Crear Modelos Comunes (Sin Implementación Completa)

**Tarea**: Crear clases de modelos con estructura básica

**Archivos a Crear**:
- `src/AdministracionFlotillas.ModelosComunes/Order.cs`
- `src/AdministracionFlotillas.ModelosComunes/OrderItem.cs`
- `src/AdministracionFlotillas.ModelosComunes/Customer.cs`
- `src/AdministracionFlotillas.ModelosComunes/Product.cs`
- `src/AdministracionFlotillas.ModelosComunes/Store.cs`
- `src/AdministracionFlotillas.ModelosComunes/Shipment.cs`
- `src/AdministracionFlotillas.ModelosComunes/Inventory.cs`

**Nota**: Crear solo la estructura básica, sin implementación completa aún

**Tiempo estimado**: 1 hora

#### 5.2 Crear Interfaces de Repositorios

**Tarea**: Crear interfaces de repositorios sin implementación

**Archivos a Crear**:
- `src/AdministracionFlotillas.AccesoDatos/Repositorios/IOrdersRepository.cs`
- `src/AdministracionFlotillas.AccesoDatos/Repositorios/ICustomersRepository.cs`
- `src/AdministracionFlotillas.AccesoDatos/Repositorios/IProductsRepository.cs`

**Estructura de Ejemplo**:
```csharp
public interface IOrdersRepository
{
    Task<List<Order>> ObtenerOrdersAsync();
    Task<Order> ObtenerOrderPorIdAsync(int orderId);
    Task<List<OrderItem>> ObtenerOrderItemsAsync(int orderId);
    // Más métodos según necesidades
}
```

**Tiempo estimado**: 1 hora

#### 5.3 Crear Interfaces de Servicios

**Tarea**: Crear interfaces de servicios sin implementación

**Archivos a Crear**:
- `src/AdministracionFlotillas.ReglasNegocio/Servicios/Interfaces/IOrdersService.cs`

**Tiempo estimado**: 30 minutos

### 6. Documentación

#### 6.1 Actualizar Documentación de Base de Datos

**Tarea**: Actualizar documentos de base de datos para reflejar el uso del schema CO

**Archivos a Actualizar**:
- [BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](../BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md) (ya creado)
- README.md (actualizar referencias)

**Tiempo estimado**: 30 minutos

#### 6.2 Crear Documentación de Diseño del Nuevo Módulo

**Tarea**: Crear documento con diseño detallado del nuevo módulo

**Contenido**:
- Estructura de archivos
- Funcionalidades planificadas
- Componentes Syncfusion a usar
- Reglas de negocio
- Flujos de usuario

**Archivo a Crear**: `src/AdministracionFlotillas.Web/docs/DESARROLLO/DISENO_MODULO_ORDERS.md`

**Tiempo estimado**: 2 horas

## Checklist General de Preparación

### Base de Datos
- [ ] Oracle Cloud Always Free configurada
- [ ] Schema CO instalado y verificado
- [ ] Conexión probada desde DataGrip
- [ ] Connection string configurado en appsettings.json
- [ ] Estructura del schema CO documentada

### Análisis y Diseño
- [ ] Funcionalidades de Employees documentadas
- [ ] Funcionalidades especializadas diseñadas
- [ ] Modelos diseñados
- [ ] Reglas de negocio identificadas
- [ ] Estructura de archivos planificada

### Investigación
- [ ] Documentación de Syncfusion revisada
- [ ] Demos interactivos explorados
- [ ] Schema CO estudiado en profundidad
- [ ] Ejemplos de código guardados

### Código Base
- [ ] Modelos comunes creados (estructura básica)
- [ ] Interfaces de repositorios creadas
- [ ] Interfaces de servicios creadas
- [ ] Estructura de carpetas creada

### Documentación
- [ ] Documentación de base de datos actualizada
- [ ] Documentación de diseño del módulo creada
- [ ] README.md actualizado

## Tiempo Total Estimado

| Categoría | Tiempo Estimado |
|-----------|-----------------|
| Configuración de Base de Datos | 2-3 horas |
| Análisis y Diseño | 9 horas |
| Investigación | 8 horas |
| Preparación de Código Base | 2.5 horas |
| Documentación | 2.5 horas |
| **Total** | **~24 horas (~3 días)** |

## Próximos Pasos Después de Aprobación de Licencia

Una vez aprobada la Community License:

1. **Registrar licencia** en Program.cs (ver [REGISTRO_LICENCIA_SYNCFUSION.md](REGISTRO_LICENCIA_SYNCFUSION.md))
2. **Instalar paquetes NuGet** de Syncfusion
3. **Configurar Syncfusion** en _Layout.cshtml y _ViewImports.cshtml
4. **Implementar repositorios** con conexión Oracle real
5. **Implementar servicios** con reglas de negocio
6. **Desarrollar vistas** con componentes Syncfusion
7. **Crear JavaScript** con namespaces
8. **Probar y validar** funcionalidad completa

## Recursos de Referencia

- **Oracle Sample Schemas**: https://github.com/oracle-samples/db-sample-schemas
- **Oracle Cloud Always Free**: https://www.oracle.com/cloud/free/
- **Syncfusion Documentation**: https://help.syncfusion.com/aspnet-core
- **Syncfusion Demos**: https://ej2.syncfusion.com/aspnetcore/demos/

---

**Última actualización**: Enero 2026
**Versión**: 2.0 (Estrategia de Módulos Paralelos)
**Schema de Base de Datos**: CO (Customer Orders)
