# Tests de Endpoints - AdministracionFlotillas

## Endpoints a Probar

### OrdersController

#### 1. GET /Orders/Index
- **Método**: GET
- **Descripción**: Vista principal de órdenes
- **Esperado**: Retorna vista HTML con grid de órdenes
- **Test**: Verificar que la vista se carga correctamente

#### 2. GET /Orders/Details/{id}
- **Método**: GET
- **Parámetros**: `id` (int?)
- **Descripción**: Vista de detalles de orden (ahora obsoleto, usar modal)
- **Esperado**: Retorna vista HTML con detalles de la orden
- **Test**: Verificar que retorna 404 si id es null o no existe

#### 3. POST /Orders/ObtenerOrders
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener todas las órdenes
- **Esperado**: JSON con `{ exito: true, datos: [...] }`
- **Test**: 
  - Verificar estructura de respuesta
  - Verificar que todos los registros tengan EstadoOrden válido (no undefined)

#### 4. POST /Orders/ObtenerOrderPorId
- **Método**: POST
- **Body**: `int idOrden`
- **Descripción**: Obtener orden por ID
- **Esperado**: JSON con `{ exito: true, datos: {...} }`
- **Test**:
  - Verificar que retorna orden correcta
  - Verificar que retorna error si no existe
  - Verificar que EstadoOrden no sea null/undefined

#### 5. POST /Orders/BuscarOrders
- **Método**: POST
- **Body**: `SolicitudBuscarOrdenes { IdCliente?, IdTienda?, Estado?, FechaInicio?, FechaFin? }`
- **Descripción**: Buscar órdenes con filtros
- **Esperado**: JSON con órdenes filtradas
- **Test**:
  - Probar con cada filtro individualmente
  - Probar con múltiples filtros
  - Probar con filtros vacíos (debe retornar todas)

#### 6. POST /Orders/ObtenerOrdersPorRangoFechas
- **Método**: POST
- **Body**: `SolicitudRangoFechas { FechaInicio, FechaFin }`
- **Descripción**: Obtener órdenes por rango de fechas
- **Esperado**: JSON con órdenes en el rango
- **Test**: Verificar que solo retorna órdenes en el rango

#### 7. POST /Orders/ObtenerMetricas
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener métricas de órdenes
- **Esperado**: JSON con `{ totalOrders, completedOrders, cancelledOrders, refundedOrders }`
- **Test**: Verificar que los contadores sean correctos

#### 8. POST /Orders/ObtenerItemsFactura
- **Método**: POST
- **Body**: `int idOrden`
- **Descripción**: Obtener items de factura de una orden
- **Esperado**: JSON con lista de items
- **Test**: Verificar estructura de items

#### 9. POST /Orders/CambiarEstadoBatch
- **Método**: POST
- **Body**: `SolicitudCambiarEstadoBatch { IdsOrdenes: List<int>, NuevoEstado: string }`
- **Descripción**: Cambiar estado de múltiples órdenes
- **Esperado**: JSON con confirmación
- **Test**:
  - Verificar validación de estados válidos
  - Verificar que retorna error si lista vacía

### ProductsController

#### 1. GET /Products/Index
- **Método**: GET
- **Descripción**: Vista principal de productos
- **Esperado**: Retorna vista HTML

#### 2. POST /Products/ObtenerProducts
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener todos los productos
- **Esperado**: JSON con lista de productos
- **Test**: Verificar estructura de datos

#### 3. POST /Products/BuscarProducts
- **Método**: POST
- **Body**: `SolicitudBuscarProductos { Categoria?, Estado?, PrecioMinimo?, PrecioMaximo? }`
- **Descripción**: Buscar productos con filtros
- **Esperado**: JSON con productos filtrados
- **Test**: Probar cada filtro

#### 4. POST /Products/ObtenerProductPorId
- **Método**: POST
- **Body**: `int idProducto`
- **Descripción**: Obtener producto por ID
- **Esperado**: JSON con producto
- **Test**: Verificar que retorna producto correcto

#### 5. POST /Products/ObtenerMetricas
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener métricas de productos
- **Esperado**: JSON con métricas
- **Test**: Verificar estructura

### CustomersController

#### 1. GET /Customers/Index
- **Método**: GET
- **Descripción**: Vista principal de clientes
- **Esperado**: Retorna vista HTML

#### 2. POST /Customers/ObtenerCustomers
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener todos los clientes
- **Esperado**: JSON con lista de clientes
- **Test**: Verificar estructura de datos

#### 3. POST /Customers/BuscarCustomers
- **Método**: POST
- **Body**: `SolicitudBuscarClientes { Nombre?, Estado? }`
- **Descripción**: Buscar clientes con filtros
- **Esperado**: JSON con clientes filtrados
- **Test**: Probar cada filtro

#### 4. POST /Customers/ObtenerCustomerPorId
- **Método**: POST
- **Body**: `int idCliente`
- **Descripción**: Obtener cliente por ID
- **Esperado**: JSON con cliente
- **Test**: Verificar que retorna cliente correcto

#### 5. POST /Customers/ObtenerMetricas
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener métricas de clientes
- **Esperado**: JSON con métricas
- **Test**: Verificar estructura

### EmployeesController

#### 1. GET /Employees/Index
- **Método**: GET
- **Descripción**: Vista principal de empleados
- **Esperado**: Retorna vista HTML

#### 2. POST /Employees/ObtenerEmployees
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener todos los empleados
- **Esperado**: JSON con lista de empleados
- **Test**: Verificar estructura de datos

#### 3. POST /Employees/ObtenerEmployeePorId
- **Método**: POST
- **Body**: `int id`
- **Descripción**: Obtener empleado por ID
- **Esperado**: JSON con empleado
- **Test**: Verificar que retorna empleado correcto

### HomeController

#### 1. GET /Home/Index
- **Método**: GET
- **Descripción**: Dashboard principal
- **Esperado**: Retorna vista HTML

#### 2. POST /Home/ObtenerMetricas
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener métricas del dashboard
- **Esperado**: JSON con métricas
- **Test**: Verificar estructura

#### 3. POST /Home/ObtenerVentasMensuales
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener ventas mensuales
- **Esperado**: JSON con datos de ventas
- **Test**: Verificar estructura

#### 4. POST /Home/ObtenerEstadoOrdenes
- **Método**: POST
- **Body**: Ninguno
- **Descripción**: Obtener distribución de estados
- **Esperado**: JSON con distribución
- **Test**: Verificar estructura

## Script de Pruebas

Para probar todos los endpoints, ejecutar:

```bash
# Desde el directorio del proyecto
dotnet test
```

O usar Postman/Insomnia para pruebas manuales.

## Checklist de Pruebas

- [ ] Todos los endpoints POST retornan JSON válido
- [ ] Todos los endpoints manejan errores correctamente
- [ ] Los filtros funcionan correctamente
- [ ] Los modals se abren correctamente
- [ ] Los datos se cargan correctamente en los modals
- [ ] No hay valores undefined en las respuestas
- [ ] Los estados NULL se manejan correctamente
