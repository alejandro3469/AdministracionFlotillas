# Plan de Refactorización UI y Homologación

## Objetivos

1. ✅ Probar todos los endpoints
2. ✅ Homologar todas las pantallas al formato de Orders
3. ✅ Convertir Details a modal Syncfusion Dialog
4. ✅ Crear modal unificado Ver/Editar
5. ✅ Agregar navegación con indicadores (breadcrumbs mejorados)
6. ✅ Separar pantallas complejas en vistas parciales
7. ✅ Crear modals especializados basados en reglas de negocio
8. ✅ Actualizar referencias obsoletas
9. ✅ Aplicar tests

## Endpoints Identificados

### OrdersController
- `GET /Orders/Index` - Vista principal
- `GET /Orders/Details/{id}` - Vista de detalles (convertir a modal)
- `POST /Orders/ObtenerOrders` - Obtener todas las órdenes
- `POST /Orders/ObtenerOrderPorId` - Obtener orden por ID
- `POST /Orders/BuscarOrders` - Buscar órdenes con filtros
- `POST /Orders/ObtenerItemsFactura` - Obtener items de factura
- `POST /Orders/CambiarEstadoBatch` - Cambiar estado de múltiples órdenes

### ProductsController
- `GET /Products/Index` - Vista principal
- `POST /Products/ObtenerProducts` - Obtener todos los productos
- `POST /Products/BuscarProducts` - Buscar productos con filtros

### CustomersController
- `GET /Customers/Index` - Vista principal
- `POST /Customers/ObtenerCustomers` - Obtener todos los clientes
- `POST /Customers/BuscarCustomers` - Buscar clientes con filtros

### EmployeesController
- `GET /Employees/Index` - Vista principal
- `POST /Employees/ObtenerEmployees` - Obtener todos los empleados
- `POST /Employees/ObtenerEmployeePorId` - Obtener empleado por ID

### HomeController
- `GET /Home/Index` - Dashboard principal
- `POST /Home/ObtenerMetricas` - Obtener métricas del dashboard
- `POST /Home/ObtenerVentasMensuales` - Obtener ventas mensuales
- `POST /Home/ObtenerEstadoOrdenes` - Obtener distribución de estados

## Estructura de Homologación

### Formato Estándar (basado en Orders/Index.cshtml)

```html
1. Breadcrumb Navigation (con indicadores)
2. Título y descripción
3. Indicadores Compactos (métricas clickables)
4. Grid Syncfusion con Shimmer
5. Modals para acciones (Ver/Editar)
```

## Modals a Crear

### 1. Modal Ver/Editar Orden
- **Componente**: Syncfusion Dialog con Tabs
- **Tabs**: Información General, Items de Factura, Totales
- **Modo**: Ver (readonly) / Editar (formulario)
- **Acciones**: Guardar, Cancelar, Imprimir

### 2. Modal Ver/Editar Producto
- **Componente**: Syncfusion Dialog
- **Campos**: Nombre, Descripción, Categoría, Precio, Stock, Estado
- **Modo**: Ver / Editar

### 3. Modal Ver/Editar Cliente
- **Componente**: Syncfusion Dialog con Tabs
- **Tabs**: Información General, Historial de Órdenes, Estado de Cuenta
- **Modo**: Ver / Editar

### 4. Modal Ver/Editar Empleado
- **Componente**: Syncfusion Dialog
- **Campos**: Información personal, Asignaciones, Permisos

## Navegación con Indicadores

### Breadcrumbs Mejorados
- Agregar indicadores de progreso
- Mostrar ruta completa
- Agregar contadores de registros

## Separación de Pantallas Complejas

### Dashboard (Home/Index)
- Separar en vistas parciales:
  - `_DashboardMetricas.cshtml` - Métricas principales
  - `_DashboardGraficas.cshtml` - Gráficas y visualizaciones
  - `_DashboardOrdenes.cshtml` - Grid de órdenes recientes

### Orders/Index
- Ya está bien estructurado
- Agregar modals

### Products/Index
- Homologar al formato de Orders
- Agregar modals

### Customers/Index
- Homologar al formato de Orders
- Agregar modals

## Tests a Implementar

### Tests de Endpoints
1. OrdersController - Todos los endpoints
2. ProductsController - Todos los endpoints
3. CustomersController - Todos los endpoints
4. EmployeesController - Todos los endpoints
5. HomeController - Todos los endpoints

### Tests de UI
1. Modals se abren correctamente
2. Formularios validan correctamente
3. Grids cargan datos correctamente
4. Breadcrumbs navegan correctamente

## Orden de Implementación

1. ✅ Crear modal Ver/Editar para Orders
2. ✅ Homologar Products/Index al formato de Orders
3. ✅ Homologar Customers/Index al formato de Orders
4. ✅ Agregar breadcrumbs mejorados con indicadores
5. ✅ Crear modals para Products y Customers
6. ✅ Separar Dashboard en vistas parciales
7. ✅ Crear tests de endpoints
8. ✅ Actualizar referencias obsoletas
