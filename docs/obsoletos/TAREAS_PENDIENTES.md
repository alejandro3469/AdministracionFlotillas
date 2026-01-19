# Tareas Pendientes - AdministracionFlotillas

**Fecha**: 2026-01-18  
**Última actualización**: Después de implementar tooltips en modals

---

## 🔴 ALTA PRIORIDAD

### 1. Eliminar Vista Details Obsoleta
**Estado**: Pendiente  
**Archivo**: `Views/Orders/Details.cshtml`  
**Acción**: Eliminar o marcar como obsoleta  
**Razón**: Ya se usa el modal `_ModalOrden.cshtml` en su lugar

### 2. Eliminar Método Details del Controller
**Estado**: Pendiente  
**Archivo**: `Controllers/OrdersController.cs`  
**Método**: `Details(int? id)`  
**Acción**: Eliminar o marcar como `[Obsolete]`  
**Razón**: Ya no se usa, se reemplazó por modal

### 3. Implementar Breadcrumbs Mejorados con Indicadores
**Estado**: Pendiente  
**Archivo**: `Views/Shared/_BreadcrumbConIndicadores.cshtml` (existe pero no se usa)  
**Acción**: 
- Reemplazar breadcrumbs estáticos en todas las vistas
- Agregar contadores dinámicos (total de registros)
- Usar el ViewModel `BreadcrumbViewModel` existente

**Vistas a actualizar**:
- ✅ `Views/Orders/Index.cshtml` - Tiene breadcrumb estático
- ✅ `Views/Products/Index.cshtml` - Tiene breadcrumb estático
- ✅ `Views/Customers/Index.cshtml` - Tiene breadcrumb estático
- ✅ `Views/Home/Index.cshtml` - Tiene breadcrumb estático
- ⏳ `Views/Employees/Index.cshtml` - Tiene breadcrumb estático

---

## 🟡 MEDIA PRIORIDAD

### 4. Migrar Employees a Syncfusion Grid
**Estado**: Pendiente  
**Archivo**: `Views/Employees/Index.cshtml`  
**Problema**: Actualmente usa DataTables (tecnología antigua)  
**Acción**: 
- Reemplazar DataTables con Syncfusion Grid
- Homologar al formato de Orders/Products/Customers
- Agregar Shimmer loading
- Agregar modals Ver/Editar
- Agregar indicadores compactos

### 5. Implementar Modo Edición en Modals
**Estado**: Pendiente (parcial)  
**Archivos**: 
- `Views/Orders/_ModalOrden.cshtml`
- `Views/Products/_ModalProducto.cshtml`
- `Views/Customers/_ModalCliente.cshtml`

**Acción**: 
- Implementar formularios de edición en modo "editar"
- Validación de campos
- Guardar cambios vía AJAX
- Actualizar grid después de guardar

### 6. Crear Tests de Endpoints
**Estado**: Pendiente  
**Archivo**: `TESTS_ENDPOINTS.md` (documentación existe)  
**Acción**: 
- Crear proyecto de tests unitarios
- Tests para OrdersController
- Tests para ProductsController
- Tests para CustomersController
- Tests para EmployeesController
- Tests para HomeController

---

## 🟢 BAJA PRIORIDAD

### 7. Actualizar Referencias Obsoletas
**Estado**: Pendiente  
**Acción**: 
- Buscar y eliminar código comentado
- Eliminar imports no usados
- Actualizar comentarios obsoletos
- Limpiar JavaScript no usado

### 8. Documentación Adicional
**Estado**: Pendiente  
**Acción**: 
- Documentar stored procedures y parámetros
- Guía de troubleshooting
- Guía de despliegue
- Documentar flujos de negocio

### 9. Optimizaciones
**Estado**: Pendiente  
**Acción**: 
- Lazy loading de modals
- Caché de datos frecuentes
- Optimización de queries
- Minificación de assets

---

## 📋 RESUMEN POR MÓDULO

### Orders ✅
- ✅ Modal Ver/Editar implementado
- ✅ Tooltips agregados
- ⏳ Eliminar Details.cshtml obsoleta
- ⏳ Eliminar método Details del controller
- ⏳ Breadcrumbs mejorados

### Products ✅
- ✅ Modal Ver/Editar implementado
- ✅ Tooltips agregados
- ⏳ Breadcrumbs mejorados
- ⏳ Modo edición completo

### Customers ✅
- ✅ Modal Ver/Editar implementado
- ✅ Tooltips agregados
- ⏳ Breadcrumbs mejorados
- ⏳ Modo edición completo

### Employees ⏳
- ⏳ Migrar a Syncfusion Grid
- ⏳ Crear modal Ver/Editar
- ⏳ Agregar tooltips
- ⏳ Breadcrumbs mejorados

### Home/Dashboard ✅
- ✅ Vistas parciales creadas
- ✅ Shimmer loading
- ⏳ Breadcrumbs mejorados

---

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

### Paso 1: Limpieza (30 min)
1. Eliminar `Views/Orders/Details.cshtml`
2. Eliminar o marcar como obsoleto `OrdersController.Details()`
3. Limpiar referencias obsoletas

### Paso 2: Breadcrumbs Mejorados (1-2 horas)
1. Actualizar todas las vistas para usar `_BreadcrumbConIndicadores.cshtml`
2. Agregar contadores dinámicos desde JavaScript
3. Probar navegación

### Paso 3: Migrar Employees (2-3 horas)
1. Crear `_EmployeesGrid.cshtml` con Syncfusion
2. Crear `_ModalEmpleado.cshtml`
3. Actualizar `Employees.js`
4. Homologar formato

### Paso 4: Modo Edición en Modals (3-4 horas)
1. Implementar formularios de edición
2. Validación
3. Guardar cambios
4. Actualizar grid

### Paso 5: Tests (4-6 horas)
1. Crear proyecto de tests
2. Tests de endpoints
3. Tests de UI básicos

---

## 📊 ESTADO GENERAL

**Completado**: ~75%  
**Pendiente Alta Prioridad**: 3 tareas  
**Pendiente Media Prioridad**: 3 tareas  
**Pendiente Baja Prioridad**: 3 tareas

**Tiempo estimado total**: 12-16 horas

---

## ✅ COMPLETADO RECIENTEMENTE

1. ✅ Tooltips informativos en todos los modals
2. ✅ Modals Ver/Editar para Orders, Products, Customers
3. ✅ Shimmer loading en todos los grids
4. ✅ Separación de Dashboard en vistas parciales
5. ✅ Event delegation para botones de acciones
6. ✅ Manejo de NULL en EstadoOrden
