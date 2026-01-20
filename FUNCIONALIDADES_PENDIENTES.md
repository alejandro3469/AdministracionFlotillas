# Funcionalidades Pendientes - AdministracionFlotillas

**Fecha de revisión**: 2026-01-19  
**Basado en**: Documentación oficial del proyecto

---

## 🎯 Resumen Ejecutivo

### ✅ Completado
- ✅ Módulos base implementados (9 módulos)
- ✅ Grids con filtrado, ordenamiento, paginación
- ✅ Exportación Excel/PDF/CSV
- ✅ Modales de visualización
- ✅ Filtros con debouncing
- ✅ Optimizaciones de rendimiento
- ✅ Inicialización robusta de modales

### ⏳ Pendiente - Alta Prioridad

#### 1. Modo Edición Completo en Modales
**Estado**: ⏳ Solo Orders tiene implementación parcial, resto tiene placeholder

**Módulos afectados**:
- ⏳ Products - `CambiarAModoEdicion()` muestra mensaje placeholder
- ⏳ Customers - `CambiarAModoEdicion()` muestra mensaje placeholder
- ⏳ Chains - `CambiarAModoEdicion()` muestra mensaje placeholder
- ⏳ Addendums - `CambiarAModoEdicion()` muestra mensaje placeholder
- ⏳ OrderChannels - `CambiarAModoEdicion()` muestra mensaje placeholder
- ⏳ Invoicing - `CambiarAModoEdicion()` muestra mensaje placeholder
- ⏳ Routes - `CambiarAModoEdicion()` muestra mensaje placeholder
- ⏳ Salespersons - `CambiarAModoEdicion()` muestra mensaje placeholder
- ✅ Orders - Implementación parcial (necesita completarse)

**Referencia**: 
- `wwwroot/js/*/CambiarAModoEdicion()` en cada módulo
- Documentación: `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 6

---

#### 2. Edición Inline en Grid
**Estado**: ⏳ **PENDIENTE**

**Reglas de Negocio**:
- **RN-GRID-021**: Edición inline permitida solo en campos específicos:
  - Órdenes: Estado (con validación de transiciones)
  - Productos: Precio, Stock (con validación de valores)
  - Inventario: Cantidad (con validación de stock)
- **RN-GRID-022**: Validaciones obligatorias antes de guardar
- **RN-GRID-023**: Confirmación antes de guardar cambios críticos

**Implementación requerida**:
- Configurar `editSettings` en grids
- Agregar validaciones de negocio
- Implementar handlers de guardado

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 6

---

#### 3. Agrupación y Agregaciones en Grid
**Estado**: ⏳ **PENDIENTE**

**Reglas de Negocio**:
- **RN-GRID-045**: Agrupación disponible en columnas clave:
  - Órdenes: Por Estado, Por Tienda, Por Cliente, Por Fecha (mes)
  - Productos: Por Categoría, Por Estado
  - Clientes: Por Estado, Por Ciudad
- **RN-GRID-046**: Agrupación múltiple permitida (drag & drop)
- **RN-GRID-047**: Expandir/colapsar grupos
- **RN-GRID-048**: Agregaciones automáticas por grupo (suma, promedio, conteo)

**Implementación requerida**:
- Configurar `allowGrouping="true"` en grids
- Agregar `groupSettings` con columnas agrupables
- Configurar `aggregates` para cálculos automáticos

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 11 y 12

---

#### 4. Columnas Configurables (Column Chooser)
**Estado**: ⏳ **PENDIENTE**

**Reglas de Negocio**:
- **RN-GRID-035**: Usuario puede ocultar/mostrar columnas
- **RN-GRID-036**: Columnas obligatorias siempre visibles
- **RN-GRID-037**: Preferencias guardadas por usuario en base de datos
- **RN-GRID-038**: Restaurar configuración predeterminada disponible

**Implementación requerida**:
- Agregar `showColumnChooser="true"` en toolbar
- Implementar guardado de preferencias (localStorage o backend)
- Definir columnas obligatorias por módulo

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 9

---

#### 5. Encabezado en Exportaciones
**Estado**: ⏳ **PENDIENTE**

**Reglas de Negocio**:
- **RN-GRID-043**: Encabezado en archivos con fecha, usuario, filtros aplicados

**Implementación requerida**:
- Modificar handlers de exportación en `Orders.js`, `Products.js`, etc.
- Agregar encabezado personalizado con:
  - Fecha de exportación
  - Usuario que exportó
  - Filtros aplicados al momento de exportar

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 10

---

### ⏳ Pendiente - Media Prioridad

#### 6. Selección Múltiple con Acciones Batch
**Estado**: ⏳ **PENDIENTE** (parcial - solo selección simple implementada)

**Reglas de Negocio**:
- **RN-GRID-027**: Selección múltiple con checkbox para acciones batch
- **RN-GRID-028**: Acciones batch disponibles:
  - Órdenes: Cambiar estado, Exportar seleccionadas, Cancelar múltiples
  - Productos: Activar/Desactivar, Cambiar categoría, Exportar
  - Clientes: Activar/Desactivar, Exportar

**Implementación requerida**:
- Cambiar `SelectionType.Single` a `SelectionType.Multiple`
- Agregar checkboxes en columnas
- Implementar acciones batch en toolbar

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 7

---

#### 7. Formato Condicional de Filas
**Estado**: ⏳ **PENDIENTE**

**Reglas de Negocio**:
- **RN-GRID-068**: Formato condicional según reglas:
  - Órdenes: Pendiente (amarillo), Cancelada (rojo), Completada (verde)
  - Productos: Stock bajo (rojo si < REORDER_LEVEL)
  - Inventario: Stock crítico (rojo si < REORDER_LEVEL * 0.5)
- **RN-GRID-069**: Tooltip explicativo en celdas con formato condicional

**Implementación requerida**:
- Configurar `rowDataBound` event en grids
- Agregar clases CSS condicionales
- Implementar tooltips explicativos

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 16

---

#### 8. Guardar Filtros como Favoritos
**Estado**: ⏳ **PENDIENTE**

**Reglas de Negocio**:
- **RN-GRID-015**: Guardar filtros como favoritos por usuario
- **RN-GRID-016**: Aplicar filtros guardados con un clic

**Implementación requerida**:
- Agregar botón "Guardar filtro" en toolbar
- Implementar guardado en base de datos (tabla USER_FILTERS)
- Agregar dropdown de filtros guardados

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 4

---

### ⏳ Pendiente - Baja Prioridad

#### 9. Scroll Virtual
**Estado**: ⏳ **PENDIENTE** (solo si necesario - para grids con > 5000 filas)

**Reglas de Negocio**:
- **RN-GRID-077**: Scroll virtual solo para grids con > 5000 registros
- **RN-GRID-078**: Mejora rendimiento en datasets grandes

**Implementación requerida**:
- Configurar `enableVirtualization="true"` cuando sea necesario
- Evaluar rendimiento antes de implementar

**Referencia**: 
- `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md` sección 20

---

### 🔌 Pendiente - Integración

#### 10. Conexión Oracle Real
**Estado**: ⏳ **PENDIENTE** (actualmente usando datos mock)

**Implementación requerida**:
- Configurar connection string en `appsettings.json`
- Conectar repositorios con Oracle real
- Migrar de datos mock a datos reales
- Probar todos los endpoints con datos reales

**Referencia**: 
- `docs/BASE_DATOS/GUIA_BASE_DATOS.md`
- `docs/BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md`

---

#### 11. Stored Procedures Pendientes
**Estado**: ⏳ **PENDIENTE** (algunos implementados, otros pendientes)

**Pendientes según documentación**:
- `SP_CREAR_ORDER` - Crear nueva orden
- `SP_ACTUALIZAR_ESTADO` - Actualizar estado de orden
- `SP_OBTENER_VENTAS_POR_MES` - Ventas agrupadas por mes
- Otros según necesidades de negocio

**Referencia**: 
- `docs/BASE_DATOS/DOCUMENTACION_STORED_PROCEDURES.md`

---

## 📊 Priorización Recomendada

### Fase 1: Funcionalidades Críticas (1-2 semanas)
1. ✅ Modo Edición Completo en Modales (alta prioridad)
2. ✅ Edición Inline en Grid (alta prioridad)
3. ✅ Agrupación y Agregaciones (alta prioridad)

### Fase 2: Mejoras de UX (1 semana)
4. ✅ Columnas Configurables (media prioridad)
5. ✅ Selección Múltiple con Acciones Batch (media prioridad)
6. ✅ Encabezado en Exportaciones (alta prioridad)

### Fase 3: Integración (2-3 semanas)
7. ✅ Conexión Oracle Real
8. ✅ Stored Procedures Pendientes

### Fase 4: Optimizaciones (1 semana)
9. ✅ Formato Condicional de Filas (media prioridad)
10. ✅ Guardar Filtros como Favoritos (media prioridad)
11. ✅ Scroll Virtual (baja prioridad - solo si necesario)

---

## 📝 Notas

- **Modo Edición**: La mayoría de módulos tienen el botón "Editar" pero solo muestran un mensaje placeholder. Orders tiene implementación parcial que puede usarse como referencia.

- **Datos Mock**: Todos los módulos funcionan con datos mock. Para producción, conectar con Oracle real.

- **Documentación**: Todas las funcionalidades están documentadas con ejemplos de código en:
  - `docs/UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md`
  - `docs/UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md`
  - `docs/UI/GUIA_CREACION_MODULO_SYNCFUSION.md`

---

**Última actualización**: 2026-01-19
