# Plan de Expansión: Funcionalidades Completas de Syncfusion

## Propósito

Este documento define el plan de expansión para implementar funcionalidades avanzadas de Syncfusion en AdministracionFlotillas, adaptado a nuestra arquitectura en capas, base de datos Oracle Sample Schema CO, y convenciones de nomenclatura en español.

**Nota**: Este es un documento atemporal para enseñanza y desarrollo. Todas las funcionalidades están adaptadas a nuestro stack tecnológico y estructura de base de datos.

## Base de Datos: Oracle Sample Schema CO

### Estructura de Datos Disponible

**Schema**: `CO` (Customer Orders)  
**Usuario de Aplicación**: `FLOTILLAS_APP`  
**Tablas Principales**:

- **ORDERS**: Órdenes de venta (ORDER_ID, ORDER_TMS, CUSTOMER_ID, ORDER_STATUS, STORE_ID)
- **ORDER_ITEMS**: Items de órdenes (ORDER_ITEM_ID, ORDER_ID, PRODUCT_ID, QUANTITY, UNIT_PRICE, DISCOUNT, SUBTOTAL, TAX, TOTAL)
- **CUSTOMERS**: Clientes (CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, STATUS, CREDIT_LIMIT)
- **PRODUCTS**: Productos (PRODUCT_ID, PRODUCT_NAME, DESCRIPTION, CATEGORY, UNIT_PRICE, STOCK_QUANTITY, STATUS)
- **STORES**: Tiendas (STORE_ID, STORE_NAME, ADDRESS, CITY, STATE, STATUS)
- **EMPLOYEES**: Empleados (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, HIRE_DATE, SALARY, STORE_ID)
- **INVENTORY**: Inventario (INVENTORY_ID, STORE_ID, PRODUCT_ID, QUANTITY_ON_HAND, REORDER_LEVEL)
- **SHIPMENTS**: Envíos (SHIPMENT_ID, ORDER_ID, SHIPMENT_DATE, SHIPMENT_STATUS, TRACKING_NUMBER)

## Componentes Syncfusion a Implementar/Expandir

### 1. Grid (DataGrid) - Funcionalidades Avanzadas

#### Funcionalidades Actuales
- ✅ Filtrado básico
- ✅ Ordenamiento
- ✅ Paginación
- ✅ Exportación Excel/PDF
- ✅ Resize de columnas
- ✅ Responsive

#### Funcionalidades a Agregar
- [ ] **Agrupación de datos** (`allowGrouping="true"`)
  - Agrupar órdenes por estado, cliente, tienda, fecha
  - Agrupar productos por categoría
  - Agrupar clientes por estado, región
  
- [ ] **Agregaciones** (suma, promedio, conteo)
  - Total de ventas por grupo
  - Promedio de órdenes por cliente
  - Conteo de productos por categoría
  
- [ ] **Edición inline** (`allowEditing="true"`, `editSettings`)
  - Editar estado de órdenes directamente en el grid
  - Editar precios de productos
  - Editar información de clientes
  
- [ ] **Batch editing** (múltiples cambios antes de guardar)
  - Seleccionar múltiples órdenes y cambiar estado
  - Actualizar precios de múltiples productos
  - Aplicar descuentos masivos
  
- [ ] **Selección múltiple con checkbox** (`selectionSettings`)
  - Seleccionar múltiples órdenes para operaciones batch
  - Seleccionar productos para actualización masiva
  
- [ ] **Columnas congeladas** (`frozenColumns`, `frozenRows`)
  - Congelar columna de ID en grid de órdenes
  - Congelar columna de nombre en grid de clientes
  
- [ ] **Reordenamiento de columnas** (`allowReordering="true"`)
  - Permitir reorganizar columnas según preferencia del usuario
  
- [ ] **Búsqueda avanzada** (Query Builder integrado)
  - Filtros complejos con múltiples condiciones
  - Guardar y cargar filtros predefinidos
  
- [ ] **Templates condicionales** mejorados
  - Colores según estado de orden
  - Iconos según tipo de producto
  - Badges según estado de cliente
  
- [ ] **Row drag and drop** (`allowRowDragAndDrop="true"`)
  - Reordenar items de orden
  - Organizar productos por prioridad
  
- [ ] **Column chooser** (selector de columnas visibles)
  - Permitir mostrar/ocultar columnas según necesidad
  
- [ ] **Print** (`allowPrinting="true"`)
  - Imprimir grid con formato profesional

### 2. Charts - Funcionalidades Avanzadas

#### Funcionalidades Actuales
- ✅ Column Chart básico (Ventas por Mes)
- ✅ Pie Chart básico (Estado de Órdenes)

#### Funcionalidades a Agregar
- [ ] **Múltiples tipos de gráficos**:
  - Line Chart (tendencias de ventas)
  - Area Chart (ventas acumuladas)
  - Bar Chart horizontal (comparación por tienda)
  - Spline Chart (curvas suaves de tendencias)
  - Scatter Chart (correlación precio vs cantidad)
  - Bubble Chart (3 variables: ventas, clientes, productos)
  
- [ ] **Drill-down** (navegación a detalle)
  - Click en mes → ver órdenes del mes
  - Click en estado → ver órdenes con ese estado
  - Click en tienda → ver detalles de la tienda
  
- [ ] **Zoom y Pan** interactivo
  - Zoom en períodos específicos
  - Pan para navegar en el tiempo
  
- [ ] **Exportación a imagen** (PNG, JPEG, SVG)
  - Exportar gráficos para reportes
  - Compartir análisis visuales
  
- [ ] **Múltiples ejes** (Y1, Y2)
  - Eje Y1: Cantidad de órdenes
  - Eje Y2: Monto total de ventas
  
- [ ] **Tooltips personalizados**
  - Mostrar información detallada al pasar el mouse
  - Incluir cálculos y porcentajes
  
- [ ] **Legends interactivas**
  - Click en leyenda para mostrar/ocultar serie
  - Filtros dinámicos
  
- [ ] **Data labels** configurables
  - Mostrar valores en las barras
  - Mostrar porcentajes en pie charts
  
- [ ] **Animation** personalizada
  - Animaciones suaves al cargar datos
  - Transiciones entre vistas

### 3. Dialog (Modal) - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Dialog para crear/editar órdenes**
  - Formulario completo con validación
  - Selección de cliente y tienda
  - Grid de items con edición inline
  - Cálculo automático de totales
  
- [ ] **Dialog para confirmaciones** (eliminar, cancelar)
  - Confirmar cancelación de orden
  - Confirmar eliminación de producto
  - Confirmar cambios masivos
  
- [ ] **Dialog con formularios** (Syncfusion Form components)
  - Formulario de creación de cliente
  - Formulario de creación de producto
  - Formulario de actualización de inventario
  
- [ ] **Dialog con tabs** (información múltiple)
  - Tab 1: Información general de orden
  - Tab 2: Items de la orden
  - Tab 3: Totales y facturación
  
- [ ] **Drag and drop** del dialog
  - Permitir mover el dialog por la pantalla
  
- [ ] **Resize** del dialog
  - Permitir redimensionar según necesidad
  
- [ ] **Animations** personalizadas
  - Animación de apertura/cierre
  - Transiciones suaves

### 4. Toast (Notificaciones) - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Notificaciones de éxito** (crear, actualizar, eliminar)
  - "Orden creada correctamente"
  - "Producto actualizado"
  - "Cliente eliminado"
  
- [ ] **Notificaciones de error** (validaciones, errores de servidor)
  - "Error al crear la orden"
  - "Cliente no encontrado"
  - "Stock insuficiente"
  
- [ ] **Notificaciones de advertencia** (acciones importantes)
  - "Se cancelará la última orden"
  - "Se actualizarán múltiples registros"
  
- [ ] **Notificaciones de información** (estado de procesos)
  - "Exportando datos..."
  - "Cargando información..."
  
- [ ] **Posiciones** (top-right, top-left, bottom-right, bottom-left)
  - Configurable según preferencia
  
- [ ] **Auto-close** configurable
  - Tiempo de visualización ajustable
  
- [ ] **Progress bar** en notificaciones largas
  - Mostrar progreso de exportación
  - Mostrar progreso de carga

### 5. ProgressBar - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Progress bar para exportaciones** (Excel, PDF)
  - Mostrar progreso durante exportación
  - Actualizar en tiempo real
  
- [ ] **Progress bar para carga de datos**
  - Mostrar progreso al cargar grid
  - Indicar cantidad de registros cargados
  
- [ ] **Progress bar para operaciones batch**
  - Actualización masiva de productos
  - Cambio de estado de múltiples órdenes
  
- [ ] **Indeterminate progress** (operaciones sin tiempo definido)
  - Spinner para operaciones asíncronas
  
- [ ] **Circular progress** (spinner alternativo)
  - Indicador circular para carga

### 6. Tooltip - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Tooltips en columnas del grid** (información adicional)
  - Mostrar descripción completa al pasar el mouse
  - Mostrar información de validación
  
- [ ] **Tooltips en botones** (descripción de acciones)
  - Explicar qué hace cada botón
  - Mostrar atajos de teclado
  
- [ ] **Tooltips en métricas** (explicación de cálculos)
  - Explicar cómo se calcula el total
  - Mostrar fórmula de cálculo
  
- [ ] **Tooltips personalizados** con HTML
  - Incluir imágenes
  - Incluir enlaces
  - Formato rico

### 7. Query Builder - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Query Builder para filtros avanzados**
  - Construir filtros complejos visualmente
  - Múltiples condiciones (AND, OR)
  
- [ ] **Múltiples condiciones** (AND, OR)
  - Combinar filtros de manera lógica
  
- [ ] **Operadores** (equals, contains, greater than, etc.)
  - Operadores para números, fechas, texto
  
- [ ] **Guardar queries** (filtros guardados)
  - Guardar filtros frecuentes
  - Compartir filtros entre usuarios
  
- [ ] **Cargar queries** (filtros predefinidos)
  - Cargar filtros guardados
  - Aplicar filtros rápidamente

### 8. Scheduler/Calendar - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Vista de calendario** para órdenes por fecha
  - Ver órdenes en calendario mensual
  - Navegación temporal
  
- [ ] **Vista de agenda** (lista de eventos)
  - Lista de órdenes por fecha
  - Filtros por estado
  
- [ ] **Vista de mes** (calendario mensual)
  - Calendario completo con órdenes marcadas
  
- [ ] **Vista de semana** (calendario semanal)
  - Vista semanal detallada
  
- [ ] **Vista de día** (calendario diario)
  - Vista diaria con todas las órdenes
  
- [ ] **Crear eventos** (nuevas órdenes)
  - Crear orden desde calendario
  
- [ ] **Editar eventos** (modificar órdenes)
  - Editar orden desde calendario
  
- [ ] **Drag and drop** de eventos
  - Cambiar fecha de orden arrastrando

### 9. Rich Text Editor - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Editor para descripciones** de productos
  - Formato rico para descripciones
  - Incluir imágenes
  
- [ ] **Editor para notas** de órdenes
  - Notas con formato
  - Listas y tablas
  
- [ ] **Editor para comentarios** de clientes
  - Comentarios formateados
  - Historial de comunicación
  
- [ ] **Formato de texto** (negrita, cursiva, subrayado)
  - Formato básico de texto
  
- [ ] **Listas** (ordenadas, no ordenadas)
  - Listas con viñetas o numeradas
  
- [ ] **Enlaces** e imágenes
  - Incluir enlaces externos
  - Insertar imágenes
  
- [ ] **Tablas** en el editor
  - Crear tablas dentro del editor

### 10. Tree Grid - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Vista jerárquica** de categorías de productos
  - Categorías y subcategorías
  - Productos anidados
  
- [ ] **Vista jerárquica** de estructura organizacional (empleados)
  - Gerentes y empleados
  - Departamentos y subdepartamentos
  
- [ ] **Expandir/colapsar** nodos
  - Navegación jerárquica
  
- [ ] **Agregaciones** por nivel
  - Totales por categoría
  - Totales por departamento

### 11. Kanban - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Vista Kanban** para estados de órdenes
  - Columnas por estado (COMPLETE, CANCELLED, REFUNDED)
  - Tarjetas con información de orden
  
- [ ] **Columnas** por estado
  - Configuración flexible de columnas
  
- [ ] **Drag and drop** entre columnas
  - Cambiar estado arrastrando tarjeta
  
- [ ] **Filtros** en Kanban
  - Filtrar por cliente, tienda, fecha
  
- [ ] **Agregaciones** por columna
  - Total de órdenes por estado
  - Monto total por estado

### 12. Pivot Table - Nuevo Componente

#### Funcionalidades a Implementar
- [ ] **Análisis de ventas** por producto, cliente, fecha
  - Análisis multidimensional
  - Agrupaciones dinámicas
  
- [ ] **Agregaciones** (suma, promedio, conteo)
  - Múltiples tipos de agregación
  
- [ ] **Filtros** dinámicos
  - Filtrar por cualquier dimensión
  
- [ ] **Exportación** a Excel
  - Exportar análisis completo

## Implementación por Capas

### Capa Web (Controllers, Views, ViewModels)

#### Controllers
- [ ] Agregar endpoints para operaciones CRUD completas
  - `CrearOrderAsync` - Crear nueva orden
  - `ActualizarOrderAsync` - Actualizar orden existente
  - `EliminarOrderAsync` - Eliminar orden (soft delete)
  - `CancelarOrderAsync` - Cancelar última orden
  
- [ ] Agregar endpoints para agregaciones y agrupaciones
  - `ObtenerVentasPorMesAsync` - Ventas agrupadas por mes
  - `ObtenerEstadoOrdenesAsync` - Conteo por estado
  - `ObtenerTendenciasAsync` - Tendencias temporales
  
- [ ] Agregar endpoints para Query Builder
  - `AplicarFiltrosAvanzadosAsync` - Aplicar filtros complejos
  - `GuardarFiltroAsync` - Guardar filtro predefinido
  - `CargarFiltrosGuardadosAsync` - Cargar filtros guardados
  
- [ ] Agregar endpoints para Scheduler
  - `ObtenerOrdenesPorRangoFechasAsync` - Órdenes para calendario
  - `CrearOrdenDesdeCalendarioAsync` - Crear desde calendario
  
- [ ] Agregar endpoints para exportaciones avanzadas
  - `ExportarAnalisisAsync` - Exportar análisis completo
  - `ExportarGraficoAsync` - Exportar gráfico como imagen

#### Views
- [ ] Expandir `_OrdersGrid.cshtml` con funcionalidades avanzadas
  - Agrupación y agregaciones
  - Edición inline
  - Selección múltiple
  
- [ ] Expandir `_ProductsGrid.cshtml` con edición inline
  - Editar precios directamente
  - Actualizar stock
  
- [ ] Expandir `_CustomersGrid.cshtml` con batch operations
  - Seleccionar múltiples clientes
  - Cambiar estado masivamente
  
- [ ] Crear vistas para Query Builder
  - `QueryBuilder.cshtml` - Vista principal
  - `_FiltrosGuardados.cshtml` - Lista de filtros guardados
  
- [ ] Crear vistas para Scheduler
  - `Calendar.cshtml` - Vista de calendario
  - `_EventoOrden.cshtml` - Template de evento
  
- [ ] Crear vistas para Kanban
  - `Kanban.cshtml` - Vista Kanban
  - `_TarjetaOrden.cshtml` - Template de tarjeta
  
- [ ] Agregar Dialogs para crear/editar
  - `_DialogCrearOrden.cshtml` - Dialog de creación
  - `_DialogEditarOrden.cshtml` - Dialog de edición
  
- [ ] Agregar Toast notifications
  - `_ToastContainer.cshtml` - Contenedor global

#### ViewModels
- [ ] Agregar ViewModels para operaciones de edición
  - `OrderEdicionViewModel.cs` - Para edición inline
  - `SolicitudCrearOrden.cs` - Para creación
  
- [ ] Agregar ViewModels para Query Builder
  - `FiltroAvanzadoViewModel.cs` - Filtros complejos
  - `FiltroGuardadoViewModel.cs` - Filtros guardados
  
- [ ] Agregar ViewModels para Scheduler
  - `EventoOrdenViewModel.cs` - Eventos del calendario
  
- [ ] Agregar ViewModels para agregaciones
  - `VentasPorMesViewModel.cs` - Ventas agrupadas
  - `EstadoOrdenesViewModel.cs` - Conteo por estado

### Capa ReglasNegocio (Services)

#### Services
- [ ] Implementar lógica de validación para edición
  - Validar reglas de negocio antes de actualizar
  - Validar stock disponible
  - Validar cliente activo
  
- [ ] Implementar lógica de batch operations
  - Validar múltiples registros
  - Procesar en lote eficientemente
  
- [ ] Implementar lógica de agregaciones
  - Calcular totales por grupo
  - Calcular promedios
  - Calcular conteos
  
- [ ] Implementar lógica de Query Builder
  - Convertir reglas a SQL
  - Validar condiciones
  - Optimizar consultas
  
- [ ] Implementar lógica de Scheduler
  - Convertir órdenes a eventos
  - Validar fechas
  - Manejar conflictos

### Capa AccesoDatos (Repositories)

#### Repositories
- [ ] Agregar métodos para operaciones CRUD completas
  - `CrearOrderAsync` - Insertar nueva orden
  - `ActualizarOrderAsync` - Actualizar orden
  - `EliminarOrderAsync` - Soft delete
  - `CancelarOrderAsync` - Cancelar orden
  
- [ ] Agregar métodos para agregaciones
  - `ObtenerVentasPorMesAsync` - Agregación por mes
  - `ObtenerEstadoOrdenesAsync` - Conteo por estado
  - `ObtenerTendenciasAsync` - Tendencias temporales
  
- [ ] Agregar métodos para Query Builder
  - `AplicarFiltrosAvanzadosAsync` - Filtros complejos
  - `GuardarFiltroAsync` - Guardar en base de datos
  
- [ ] Agregar métodos para Scheduler
  - `ObtenerOrdenesPorRangoFechasAsync` - Rango de fechas

### Capa ModelosComunes (Models)

#### Models
- [ ] Agregar modelos para operaciones de edición
  - `SolicitudCrearOrden.cs` - Solicitud de creación
  - `SolicitudActualizarOrden.cs` - Solicitud de actualización
  - `SolicitudCancelarOrden.cs` - Solicitud de cancelación
  
- [ ] Agregar modelos para Query Builder
  - `ReglaFiltro.cs` - Regla individual
  - `FiltroCompleto.cs` - Filtro completo
  
- [ ] Agregar modelos para Scheduler
  - `EventoOrden.cs` - Evento del calendario
  
- [ ] Agregar modelos para agregaciones
  - `VentasPorMes.cs` - Ventas agrupadas
  - `EstadoOrdenes.cs` - Conteo por estado

## Nomenclatura en Español

### Convenciones

- **Métodos C#**: Verbo en infinitivo + sustantivo, PascalCase
  - `ObtenerOrdersAgrupadosAsync`
  - `CrearOrderAsync`
  - `ActualizarOrderAsync`
  - `EliminarOrderAsync`
  - `AplicarFiltrosAvanzadosAsync`
  - `ValidarClienteActivoAsync`
  - `ValidarStockDisponibleAsync`

- **Variables C#**: Sustantivo descriptivo en camelCase
  - `listaOrdenesAgrupadas`
  - `filtrosAvanzados`
  - `configuracionAgregaciones`
  - `solicitudCrearOrden`
  - `nuevoEstado`

- **Funciones JavaScript**: Verbo en infinitivo, PascalCase
  - `CargarDatosAgrupados`
  - `AplicarFiltrosAvanzados`
  - `MostrarDialogCrear`
  - `OcultarDialogCrear`
  - `MostrarToastExito`
  - `ActualizarTotales`

- **Namespaces JavaScript**: Sustantivo en plural, PascalCase
  - `Orders.Grid.Agrupacion`
  - `Orders.Dialog`
  - `Orders.Toast`
  - `Orders.QueryBuilder`
  - `Orders.Kanban`
  - `Orders.Calendar`
  - `Orders.Analytics`

## Orden de Implementación

### Fase 1: Grid Avanzado (Prioridad Alta)
1. Agrupación y agregaciones
2. Edición inline
3. Batch operations
4. Selección múltiple

**Tiempo estimado**: 2 semanas

### Fase 2: Componentes de UI (Prioridad Alta)
1. Dialog para crear/editar
2. Toast notifications
3. ProgressBar para operaciones
4. Tooltip en elementos

**Tiempo estimado**: 1 semana

### Fase 3: Componentes de Análisis (Prioridad Media)
1. Charts avanzados
2. Query Builder
3. Pivot Table

**Tiempo estimado**: 2 semanas

### Fase 4: Componentes Especializados (Prioridad Baja)
1. Scheduler/Calendar
2. Kanban
3. Tree Grid
4. Rich Text Editor

**Tiempo estimado**: 2 semanas

## Reglas de Negocio a Implementar

### Órdenes
- Solo se puede cancelar la última orden de un cliente
- Al cancelar, los productos vuelven al inventario
- El cliente debe estar activo para crear orden
- Debe haber stock disponible para todos los productos

### Productos
- El precio unitario no puede ser menor al precio base
- El precio unitario puede ser mayor (permite ajustes)
- No se pueden vender productos sin stock
- Alerta cuando el stock está bajo el nivel de reorden

### Clientes
- Clientes inactivos no pueden realizar compras
- Las órdenes de crédito no pueden exceder el límite
- Se mantiene historial completo de compras

## Documentación a Actualizar

- [x] `GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md` - Guía completa creada
- [ ] `GUIA_CREACION_MODULO_SYNCFUSION.md` - Actualizar con ejemplos avanzados
- [ ] `COMPONENTES_SYNCFUSION.md` - Agregar nuevas funcionalidades
- [ ] `ESTADO_IMPLEMENTACION_ACTUAL.md` - Actualizar estado

## Referencias a Documentación Oficial

- [Syncfusion Grid Documentation](https://help.syncfusion.com/aspnet-core/grid/getting-started)
- [Syncfusion Charts Documentation](https://help.syncfusion.com/aspnet-core/chart/getting-started)
- [Syncfusion Dialog Documentation](https://help.syncfusion.com/aspnet-core/dialog/getting-started)
- [Syncfusion Toast Documentation](https://help.syncfusion.com/aspnet-core/toast/getting-started)
- [Syncfusion Query Builder Documentation](https://help.syncfusion.com/aspnet-core/query-builder/getting-started)
- [Syncfusion Scheduler Documentation](https://help.syncfusion.com/aspnet-core/scheduler/getting-started)
- [Syncfusion Kanban Documentation](https://help.syncfusion.com/aspnet-core/kanban/getting-started)
- [Syncfusion ProgressBar Documentation](https://help.syncfusion.com/aspnet-core/progressbar/getting-started)

---

**Última actualización**: 2026-01-18  
**Versión**: 2.0  
**Propósito**: Enseñanza y desarrollo  
**Base de Datos**: Oracle Sample Schema CO