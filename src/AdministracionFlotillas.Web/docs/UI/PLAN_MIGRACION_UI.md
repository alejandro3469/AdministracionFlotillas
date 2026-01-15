# Plan de Migración de UI a Syncfusion ASP.NET Core MVC

**ESTADO ACTUAL: EN PAUSA - ESPERANDO APROBACIÓN DE LICENCIA**

Este documento detalla el plan de migración de la implementación actual (DataTables + Bootstrap) a Syncfusion ASP.NET Core MVC, manteniendo la arquitectura basada en módulos y los patrones de trabajo existentes.

## Estado de la Migración

### ⏸️ Migración en Pausa

La migración a Syncfusion está **actualmente en pausa** mientras se espera la aprobación de la Community License.

**Información del Proceso de Licencia**:
- **Ticket de referencia**: #803702
- **Fecha de solicitud**: 14 de enero de 2026
- **Estado**: En validación (48 horas hábiles)
- **Clave de prueba recibida**: Sí (7 días, temporal)
- **Licencia permanente**: Pendiente de aprobación

**Próximos Pasos**:
1. Esperar respuesta de Syncfusion (48 horas hábiles desde la solicitud)
2. Una vez aprobada la Community License, reanudar la migración
3. Reemplazar la clave de prueba temporal con la licencia permanente

**Documentación Relacionada**:
- [PROCESO_SOLICITUD_LICENCIA.md](../PROCESO_SOLICITUD_LICENCIA.md) - Proceso completo de solicitud
- [LICENCIA_SYNCFUSION.md](../LICENCIA_SYNCFUSION.md) - Información sobre la licencia

### Implementación Actual (En Uso)

Mientras se espera la aprobación de la licencia, el proyecto continúa usando la implementación actual:

- **UI Framework**: DataTables + Bootstrap + jQuery UI
- **JavaScript**: Organizado en namespaces por módulo (ver [ESTRUCTURA_ACTUAL_PROYECTO.md](../ESTRUCTURA_ACTUAL_PROYECTO.md))
- **Bundles**: Sistema de bundles configurado y funcionando
- **Módulo Employees**: Completamente implementado y funcional

Ver [ESTRUCTURA_ACTUAL_PROYECTO.md](../ESTRUCTURA_ACTUAL_PROYECTO.md) para detalles completos de la implementación actual.

## Objetivos de la Migración

1. ✅ Mantener la arquitectura basada en módulos
2. ✅ Preservar los namespaces JavaScript existentes
3. ✅ Adaptar a estilos condicionales con HTML templates
4. ✅ Implementar binding directo a controladores
5. ✅ Mantener compatibilidad con .NET 8.0.300+ (Windows) y .NET 8.0.417+ (Mac)
6. ✅ Migrar gradualmente sin romper funcionalidad existente

## Fase 1: Preparación y Configuración

### 1.1 Solicitar Community License

**Tarea**: Registrar organización para obtener licencia gratuita PERMANENTE

**Importante**: La Community License es **gratuita para siempre**, no es una prueba temporal. Ver [LICENCIA_SYNCFUSION.md](../LICENCIA_SYNCFUSION.md) para detalles completos.

**Pasos**:
1. Visitar https://www.syncfusion.com/products/communitylicense
2. Completar formulario con información de la organización
3. Verificar requisitos:
   - Menos de $1M USD en ingresos anuales
   - Menos de 5 desarrolladores
   - Menos de 10 empleados totales
4. Enviar solicitud

**Respuesta Inmediata** (en minutos):
- ✅ Recibirás un email con una **clave de prueba de 7 días** (Trial Key)
- ✅ Ticket de referencia (ej: #803702)
- ⚠️ **IMPORTANTE**: Esta clave de 7 días es TEMPORAL, solo para comenzar a trabajar

**Validación** (48 horas hábiles):
- Syncfusion valida tu solicitud
- Pueden solicitar documentación adicional
- Revisan requisitos de elegibilidad

**Aprobación** (después de validación):
- ✅ Recibirás la **Community License PERMANENTE** por email
- ✅ Esta es la licencia que usarás a largo plazo
- ✅ Reemplaza la clave de prueba de 7 días

**Tiempo estimado**: 
- Clave de prueba: Inmediata (minutos)
- Licencia permanente: 48 horas hábiles (2-3 días)

**Nota**: 
- La clave de 7 días es solo para empezar a trabajar mientras validan
- La Community License permanente es la que usarás a largo plazo
- La licencia permanente no requiere renovación mientras se cumplan los requisitos

### 1.2 Instalar Paquetes NuGet

**Archivo**: `src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj`

**Cambios**:
```xml
<ItemGroup>
  <PackageReference Include="Syncfusion.EJ2.AspNet.Core" Version="32.1.23" />
</ItemGroup>
```

**Comando**:
```bash
cd src/AdministracionFlotillas.Web
dotnet add package Syncfusion.EJ2.AspNet.Core
```

**Nota**: 
- Solo se requiere el paquete `Syncfusion.EJ2.AspNet.Core` para ASP.NET Core MVC
- La versión se actualiza automáticamente a la más reciente compatible con .NET 8.0
- Verificar versión actual en: https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core

**Tiempo estimado**: 5 minutos

### 1.3 Configurar Program.cs

**Archivo**: `src/AdministracionFlotillas.Web/Program.cs`

**Cambios**:
```csharp
using Syncfusion.EJ2;
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Registrar licencia de Syncfusion
SyncfusionLicenseProvider.RegisterLicense("TU_LICENCIA_AQUI");

// Agregar servicios de Syncfusion
builder.Services.AddSyncfusion();

// ... resto del código existente
```

**Tiempo estimado**: 5 minutos

### 1.4 Actualizar _Layout.cshtml

**Archivo**: `src/AdministracionFlotillas.Web/Views/Shared/_Layout.cshtml`

**Cambios en `<head>`**:
```html
<!-- Syncfusion CSS (agregar después de Bootstrap) -->
<link href="https://cdn.syncfusion.com/ej2/32.1.23/material.css" rel="stylesheet" />
```

**Cambios antes de `</body>`**:
```html
<!-- Syncfusion JS (agregar después de jQuery) -->
<script src="https://cdn.syncfusion.com/ej2/32.1.23/dist/ej2.min.js"></script>
```

**Nota**: 
- Usar la versión más reciente de Syncfusion EJ2 (actualmente 32.1.23)
- Verificar versión actual en: https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core
- El tema puede cambiarse (material, bootstrap, fabric, etc.)

**Tiempo estimado**: 5 minutos

### 1.5 Actualizar _ViewImports.cshtml

**Archivo**: `src/AdministracionFlotillas.Web/Views/_ViewImports.cshtml`

**Cambios**:
```csharp
@using Syncfusion.EJ2
@addTagHelper *, Syncfusion.EJ2
```

**Nota**: 
- `@addTagHelper *, Syncfusion.EJ2` habilita los Tag Helpers de Syncfusion
- Permite usar `<ejs-grid>`, `<ejs-button>`, etc. en las vistas
- Ver documentación: https://help.syncfusion.com/aspnet-core/getting-started

**Tiempo estimado**: 2 minutos

**Total Fase 1**: ~20 minutos + tiempo de espera de licencia

## Fase 2: Migración del Módulo Employees (Piloto)

El módulo Employees servirá como piloto para validar el proceso de migración.

### 2.1 Migrar Grid de DataTables a Syncfusion Grid

**Archivo**: `src/AdministracionFlotillas.Web/Views/Employees/_EmployeesGrid.cshtml`

**Antes (DataTables)**:
```html
<table id="employeesTable" class="table table-striped">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

**Después (Syncfusion Grid con Tag Helper - Recomendado)**:
```html
<ejs-grid id="employeesGrid" 
          dataSource="@Url.Action("ObtenerEmployees", "Employees")"
          allowPaging="true"
          allowFiltering="true"
          allowSorting="true"
          allowSelection="true"
          rowSelected="Employees.Grid.OnRowSelected">
    <e-grid-pagesettings pageSize="10"></e-grid-pagesettings>
    <e-grid-selectionsettings type="Multiple"></e-grid-selectionsettings>
    <e-grid-columns>
        <e-grid-column field="idEmpleado" headerText="ID" width="80"></e-grid-column>
        <e-grid-column field="nombreCompleto" headerText="Nombre Completo" width="200"></e-grid-column>
        <e-grid-column field="correoElectronico" headerText="Email" width="200"></e-grid-column>
        <e-grid-column field="numeroTelefono" headerText="Teléfono" width="150"></e-grid-column>
        <e-grid-column field="fechaContratacion" headerText="Fecha Contratación" width="150" format="dd/MM/yyyy"></e-grid-column>
        <e-grid-column field="salario" headerText="Salario" width="120" format="C2"></e-grid-column>
        <e-grid-column field="idDepartamento" headerText="Departamento" width="120"></e-grid-column>
        <e-grid-column headerText="Acciones" width="100" template="#actionTemplate"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script id="actionTemplate" type="text/x-template">
    <button class="btn btn-sm btn-info" onclick="Employees.Details.View(${idEmpleado})">
        <i class="fas fa-eye"></i>
    </button>
</script>
```

**Alternativa con HTML Helper**:
```html
@Html.EJS().Grid("employeesGrid")
    .DataSource(Url.Action("ObtenerEmployees", "Employees"))
    .AllowPaging(true)
    .PageSettings(page => page.PageSize(10))
    .AllowFiltering(true)
    .AllowSorting(true)
    .AllowSelection(true)
    .SelectionSettings(select => select.Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .Columns(col =>
    {
        col.Field("idEmpleado").HeaderText("ID").Width("80").Add();
        col.Field("nombreCompleto").HeaderText("Nombre Completo").Width("200").Add();
        col.Field("correoElectronico").HeaderText("Email").Width("200").Add();
        col.Field("numeroTelefono").HeaderText("Teléfono").Width("150").Add();
        col.Field("fechaContratacion").HeaderText("Fecha Contratación").Width("150").Format("dd/MM/yyyy").Add();
        col.Field("salario").HeaderText("Salario").Width("120").Format("C2").Add();
        col.Field("idDepartamento").HeaderText("Departamento").Width("120").Add();
        col.HeaderText("Acciones").Width("100").Template("#actionTemplate").Add();
    })
    .RowSelected("Employees.Grid.OnRowSelected")
    .Render()
```

**Nota**: 
- Los Tag Helpers (`<ejs-grid>`) son la forma moderna recomendada para ASP.NET Core
- Los HTML Helpers (`@Html.EJS()`) también son compatibles
- Ver documentación oficial: https://help.syncfusion.com/aspnet-core/grid/getting-started

**Tiempo estimado**: 2 horas

### 2.2 Adaptar JavaScript a Syncfusion

**Archivo**: `src/AdministracionFlotillas.Web/Scripts/Employees/Employees.js`

**Cambios en namespace Table**:
```javascript
window.Employees.Table = {
    Initialize: function() {
        // Syncfusion Grid se inicializa automáticamente
        // Solo configurar eventos adicionales si es necesario
        this._configureEvents();
    },
    
    Reload: function() {
        var grid = document.getElementById('employeesGrid').ej2_instances[0];
        if (grid) {
            grid.refresh();
        }
    },
    
    GetInstance: function() {
        return document.getElementById('employeesGrid').ej2_instances[0];
    },
    
    OnRowDataBound: function(args) {
        // Aplicar estilos condicionales
        if (args.data.salario && parseFloat(args.data.salario.replace(/[^0-9.-]+/g, '')) > 5000) {
            args.row.classList.add('salario-alto');
        }
    },
    
    OnRowSelected: function(args) {
        // Manejar selección de filas
        Employees.Selection.HandleSelection(args);
    },
    
    _configureEvents: function() {
        // Eventos adicionales si son necesarios
    }
};
```

**Tiempo estimado**: 3 horas

### 2.3 Migrar Filtros a Componentes Syncfusion

**Archivo**: `src/AdministracionFlotillas.Web/Views/Employees/_EmployeesGrid.cshtml`

**Filtro de Fecha (DatePicker)**:
```html
<div class="col-md-4">
    <label class="form-label">Fecha de Contratación</label>
    <div class="input-group">
        @Html.EJS().DatePicker("filtroFechaInicio")
            .Placeholder("Desde")
            .Change("Employees.Filters.OnFechaInicioChange")
            .Render()
        <span class="input-group-text">-</span>
        @Html.EJS().DatePicker("filtroFechaFin")
            .Placeholder("Hasta")
            .Change("Employees.Filters.OnFechaFinChange")
            .Render()
    </div>
</div>
```

**Filtro de Salario (NumericTextBox)**:
```html
<div class="col-md-4">
    <label class="form-label">Rango de Salario</label>
    <div class="input-group">
        <span class="input-group-text">$</span>
        @Html.EJS().NumericTextBox("filtroSalarioMin")
            .Placeholder("Mínimo")
            .Format("C2")
            .Change("Employees.Filters.OnSalarioChange")
            .Render()
        <span class="input-group-text">-</span>
        @Html.EJS().NumericTextBox("filtroSalarioMax")
            .Placeholder("Máximo")
            .Format("C2")
            .Change("Employees.Filters.OnSalarioChange")
            .Render()
    </div>
</div>
```

**Filtro de Texto (TextBox)**:
```html
<div class="col-md-4">
    <label for="filtroBusqueda" class="form-label">Buscar por Nombre</label>
    @Html.EJS().TextBox("filtroBusqueda")
        .Placeholder("Buscar por nombre...")
        .Change("Employees.Filters.OnBusquedaChange")
        .Render()
</div>
```

**Tiempo estimado**: 2 horas

### 2.4 Adaptar Filtros JavaScript

**Archivo**: `src/AdministracionFlotillas.Web/Scripts/Employees/Employees.js`

**Cambios en namespace Filters**:
```javascript
window.Employees.Filters = {
    Initialize: function() {
        // Los componentes Syncfusion se inicializan automáticamente
        // Solo configurar eventos si es necesario
    },
    
    Apply: function() {
        var grid = Employees.Table.GetInstance();
        if (grid) {
            // Aplicar filtros usando API de Syncfusion Grid
            var filterSettings = this._buildFilterSettings();
            grid.filterSettings = filterSettings;
            grid.refresh();
        }
    },
    
    OnFechaInicioChange: (args) => {
        Employees.Filters.Apply();
    },
    
    OnFechaFinChange: (args) => {
        Employees.Filters.Apply();
    },
    
    OnSalarioChange: (args) => {
        Employees.Filters.Apply();
    },
    
    OnBusquedaChange: (args) => {
        Employees.Filters.Apply();
    },
    
    _buildFilterSettings: function() {
        // Construir configuración de filtros
        var filters = [];
        
        var fechaInicio = document.getElementById('filtroFechaInicio').ej2_instances[0]?.value;
        if (fechaInicio) {
            filters.push({
                field: 'fechaContratacion',
                operator: 'greaterthanorequal',
                value: fechaInicio
            });
        }
        
        // ... más filtros
        
        return { columns: filters };
    }
};
```

**Tiempo estimado**: 3 horas

### 2.5 Migrar Botones a Syncfusion Button

**Archivo**: `src/AdministracionFlotillas.Web/Views/Employees/Index.cshtml`

**Botón Enviar Email**:
```html
@Html.EJS().Button("btnEnviarEmail")
    .Content("Enviar por Email")
    .IconCss("fas fa-envelope")
    .CssClass("e-primary")
    .Click("Employees.Email.OpenModal")
    .Render()
```

**Botón Confirmar Envío (en modal)**:
```html
@Html.EJS().Button("btnConfirmarEnvio")
    .Content("Enviar")
    .IconCss("fas fa-paper-plane")
    .CssClass("e-success")
    .Click("Employees.Email.Send")
    .Render()
```

**Tiempo estimado**: 1 hora

### 2.6 Migrar Modal a Syncfusion Dialog

**Archivo**: `src/AdministracionFlotillas.Web/Views/Employees/Index.cshtml`

**Antes (Bootstrap Modal)**:
```html
<div class="modal fade" id="modalEnviarEmail">
    <!-- contenido -->
</div>
```

**Después (Syncfusion Dialog)**:
```html
@Html.EJS().Dialog("modalEnviarEmail")
    .Header("Enviar Información por Email")
    .ContentTemplate("#emailModalContent")
    .ShowCloseIcon(true)
    .Width("600px")
    .IsModal(true)
    .Visible(false)
    .Render()

<div id="emailModalContent">
    <div class="mb-3">
        <label for="emailReceptor" class="form-label">Email del Receptor</label>
        @Html.EJS().TextBox("emailReceptor")
            .Placeholder("ejemplo@empresa.com")
            .InputType("email")
            .Render()
    </div>
    <!-- tabla resumen -->
</div>
```

**JavaScript para abrir/cerrar**:
```javascript
window.Employees.Email = {
    OpenModal: () => {
        var dialog = document.getElementById('modalEnviarEmail').ej2_instances[0];
        if (dialog) {
            dialog.show();
        }
    },
    
    CloseModal: () => {
        var dialog = document.getElementById('modalEnviarEmail').ej2_instances[0];
        if (dialog) {
            dialog.hide();
        }
    }
};
```

**Tiempo estimado**: 2 horas

### 2.7 Actualizar Controller (si es necesario)

**Archivo**: `src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs`

**Cambios mínimos**: El controlador puede mantenerse igual, ya que Syncfusion Grid puede consumir el mismo endpoint JSON.

**Opcional - Mejorar respuesta para Syncfusion**:
```csharp
[HttpPost]
[IgnoreAntiforgeryToken]
public async Task<IActionResult> ObtenerEmployees([FromBody] DataManagerRequest dm)
{
    try
    {
        var empleados = await _servicio.ObtenerEmployeesAsync();
        var modelosVista = EmployeeParseador.ConvertirListaAVista(empleados);
        
        // Syncfusion puede trabajar con formato simple
        return Json(modelosVista);
        
        // O con formato DataManager si se necesita paginación del servidor
        // return Json(new { result = modelosVista, count = modelosVista.Count });
    }
    catch (Exception excepcion)
    {
        return CrearRespuestaError(excepcion.Message);
    }
}
```

**Tiempo estimado**: 1 hora (opcional)

**Total Fase 2**: ~14 horas

## Fase 3: Validación y Pruebas

### 3.1 Pruebas Funcionales

**Checklist**:
- [ ] Grid carga datos correctamente
- [ ] Filtros funcionan (fecha, salario, texto)
- [ ] Ordenamiento funciona
- [ ] Paginación funciona
- [ ] Selección múltiple funciona
- [ ] Botón ver detalles funciona
- [ ] Modal de email se abre y cierra
- [ ] Validación de email funciona
- [ ] Exportación a Excel funciona
- [ ] Exportación a PDF funciona
- [ ] Diseño responsive funciona

**Tiempo estimado**: 4 horas

### 3.2 Pruebas de Compatibilidad

**Verificar en**:
- [ ] Windows con .NET 8.0.300
- [ ] Mac con .NET 8.0.417
- [ ] Navegadores: Chrome, Firefox, Safari, Edge
- [ ] Dispositivos móviles (responsive)

**Tiempo estimado**: 2 horas

### 3.3 Ajustes y Optimizaciones

**Tareas**:
- Ajustar estilos CSS si es necesario
- Optimizar rendimiento
- Corregir bugs encontrados
- Mejorar templates HTML

**Tiempo estimado**: 4 horas

**Total Fase 3**: ~10 horas

## Fase 4: Documentación y Capacitación

### 4.1 Actualizar Documentación

**Archivos a actualizar**:
- `ESTRUCTURA_ACTUAL_PROYECTO.md` - Agregar información de Syncfusion
- `ESTRUCTURA_VISTAS.md` - Actualizar ejemplos con Syncfusion
- `EJERCICIOS_PRACTICA.md` - Agregar ejercicios con Syncfusion

**Tiempo estimado**: 3 horas

### 4.2 Crear Guía de Uso

**Nuevo archivo**: `GUIA_SYNCFUSION.md`
- Ejemplos de uso de cada componente
- Patrones de implementación
- Mejores prácticas
- Troubleshooting común

**Tiempo estimado**: 4 horas

### 4.3 Capacitación del Equipo

**Contenido**:
- Presentación de componentes Syncfusion
- Demostración de migración realizada
- Ejercicios prácticos
- Q&A

**Tiempo estimado**: 2 horas

**Total Fase 4**: ~9 horas

## Fase 5: Migración de Otros Módulos (Futuro)

Una vez validado el módulo Employees, aplicar el mismo patrón a otros módulos:

1. **Departments** (cuando se implemente)
2. **Flotillas** (cuando se implemente)
3. **Otros módulos** según planificación

**Tiempo estimado por módulo**: ~8-10 horas

## Cronograma Estimado

| Fase | Tareas | Tiempo Estimado |
|------|--------|-----------------|
| Fase 1 | Preparación y configuración | 1-2 días (incluye espera de licencia) |
| Fase 2 | Migración módulo Employees | 2 días |
| Fase 3 | Validación y pruebas | 1.5 días |
| Fase 4 | Documentación y capacitación | 1 día |
| **Total Fase 1-4** | **Migración completa del módulo piloto** | **~5-6 días** |
| Fase 5 | Migración otros módulos | Según planificación |

## Estrategia de Implementación

### Enfoque Gradual

1. **Mantener DataTables funcionando** durante la migración
2. **Crear nueva vista** `IndexSyncfusion.cshtml` para pruebas
3. **Migrar funcionalidad** componente por componente
4. **Validar** cada componente antes de continuar
5. **Reemplazar** vista antigua cuando esté completa

### Rollback Plan

Si surgen problemas críticos:
1. Mantener código DataTables en branch separado
2. Revertir cambios en `_Layout.cshtml`
3. Comentar referencias a Syncfusion en `Program.cs`
4. Restaurar vistas originales

## Consideraciones Importantes

### Compatibilidad con Arquitectura Actual

✅ **Se mantiene**:
- Arquitectura basada en módulos
- Namespaces JavaScript (`Employees.Table`, `Employees.Filters`, etc.)
- Estructura de controladores
- Parseadores y ViewModels
- Sistema de bundles

✅ **Se mejora**:
- Binding directo a controladores (menos código JavaScript)
- Templates HTML condicionales (más flexible)
- Componentes pre-construidos (menos código manual)

### Impacto en Código Existente

**Mínimo impacto**:
- Los controladores pueden mantenerse igual
- Los servicios y repositorios no cambian
- Los ViewModels no cambian
- Solo cambian las vistas y JavaScript relacionado

## Checklist de Migración

### Pre-migración
- [ ] Licencia Syncfusion obtenida
- [ ] Paquetes NuGet instalados
- [ ] Configuración en Program.cs completada
- [ ] Referencias en _Layout.cshtml agregadas

### Durante migración
- [ ] Grid migrado y funcionando
- [ ] Filtros migrados y funcionando
- [ ] Botones migrados y funcionando
- [ ] Modal migrado y funcionando
- [ ] JavaScript adaptado a Syncfusion
- [ ] Estilos condicionales implementados
- [ ] Binding a controladores funcionando
- [ ] Eventos con namespaces funcionando

### Post-migración
- [ ] Pruebas funcionales completadas
- [ ] Pruebas de compatibilidad completadas
- [ ] Documentación actualizada
- [ ] Equipo capacitado
- [ ] Código DataTables removido (opcional)

## Recursos de Referencia

- **Documentación Syncfusion**: https://help.syncfusion.com/aspnet-core
- **Demos interactivos**: https://ej2.syncfusion.com/aspnetcore/Grid/Overview
- **API Reference**: https://help.syncfusion.com/cr/aspnetcore
- **Community Forum**: https://www.syncfusion.com/forums

---

**Última actualización**: Enero 2026
**Versión**: 1.0
