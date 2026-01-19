# Componentes Syncfusion ASP.NET Core MVC - Guía Visual y de Capacidades

Este documento presenta los componentes principales de Syncfusion ASP.NET Core MVC, sus características visuales, capacidades y cómo se adaptan a los requisitos del proyecto.

## Enlaces a Documentación Oficial y Demos

### Documentación Principal
- **Documentación oficial ASP.NET Core**: https://help.syncfusion.com/aspnet-core
- **Demos interactivos**: https://ej2.syncfusion.com/aspnetcore/Grid/Overview
- **API Reference**: https://help.syncfusion.com/cr/aspnetcore
- **Guía de inicio**: https://help.syncfusion.com/aspnet-core/getting-started
- **Getting Started con Grid**: https://help.syncfusion.com/aspnet-core/grid/getting-started
- **NuGet Package**: https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core

**Nota**: 
- Esta documentación es específica para **ASP.NET Core** (no ASP.NET MVC clásico)
- Compatible con .NET 8.0.300+ (Windows) y .NET 8.0.417+ (Mac)
- Soporta Tag Helpers (recomendado) y HTML Helpers

### Demos Visuales por Componente
- **Grid**: https://ej2.syncfusion.com/aspnetcore/Grid/Overview
- **Charts**: https://ej2.syncfusion.com/aspnetcore/Chart/ChartTypes
- **DatePicker**: https://ej2.syncfusion.com/aspnetcore/Calendar/GettingStarted
- **DropDownList**: https://ej2.syncfusion.com/aspnetcore/DropDownList/GettingStarted
- **Button**: https://ej2.syncfusion.com/aspnetcore/Button/DefaultFunctionalities
- **Dialog**: https://ej2.syncfusion.com/aspnetcore/Dialog/DefaultFunctionalities

## Componentes Principales

### 1. Grid (Tabla Avanzada)

**Aspecto Visual**:
- Tabla moderna con diseño limpio
- Filas alternadas con colores
- Headers destacados
- Hover effects en filas
- Scroll horizontal y vertical
- Responsive design

**Características**:
- ✅ Filtrado avanzado (texto, número, fecha, dropdown)
- ✅ Ordenamiento por múltiples columnas
- ✅ Paginación (página, tamaño de página personalizable)
- ✅ Agrupación de datos
- ✅ Selección múltiple (checkbox)
- ✅ Edición inline
- ✅ Exportación a Excel, PDF, CSV
- ✅ Búsqueda global
- ✅ Columnas congeladas
- ✅ Resize de columnas
- ✅ Reordenamiento de columnas (drag & drop)

**Templates HTML Condicionales (Tag Helper - Recomendado)**:
```html
<ejs-grid id="employeesGrid" dataSource="@Model">
    <e-grid-columns>
        <e-grid-column field="nombreCompleto" headerText="Nombre" template="#nombreTemplate"></e-grid-column>
        <e-grid-column field="salario" headerText="Salario" template="#salarioTemplate" format="C2"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script id="nombreTemplate" type="text/x-template">
    <div class="${if(nombreCompleto.length > 20)}nombre-largo${else}nombre-normal${/if}">
        ${nombreCompleto}
    </div>
</script>

<script id="salarioTemplate" type="text/x-template">
    <span class="${if(salario > 5000)}salario-alto${else}salario-normal${/if}">
        ${salario}
    </span>
</script>
```

**Alternativa con HTML Helper**:
```html
@Html.EJS().Grid("employeesGrid")
    .DataSource(Model)
    .Columns(col =>
    {
        col.Field("nombreCompleto").HeaderText("Nombre").Template("#nombreTemplate").Add();
        col.Field("salario").HeaderText("Salario").Template("#salarioTemplate").Format("C2").Add();
    })
    .Render()
```

**Binding a Controlador (Tag Helper - Recomendado)**:
```html
<!-- Opción 1: Binding directo con datos del modelo -->
<ejs-grid id="employeesGrid" dataSource="@Model">
    <e-grid-columns>
        <e-grid-column field="idEmpleado" headerText="ID"></e-grid-column>
        <e-grid-column field="nombreCompleto" headerText="Nombre"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<!-- Opción 2: Binding remoto con DataManager (recomendado para datos dinámicos) -->
<ejs-grid id="employeesGrid">
    <e-data-manager url="/Employees/ObtenerEmployees" adaptor="UrlAdaptor"></e-data-manager>
    <e-grid-columns>
        <e-grid-column field="idEmpleado" headerText="ID"></e-grid-column>
        <e-grid-column field="nombreCompleto" headerText="Nombre"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<!-- Opción 3: Cargar datos con JavaScript después de crear el grid -->
<script>
    function onGridCreated() {
        var grid = document.getElementById('employeesGrid').ej2_instances[0];
        $.ajax({
            url: '/Employees/ObtenerEmployees',
            method: 'POST',
            success: function(response) {
                if (response.exito) {
                    grid.dataSource = response.datos;
                }
            }
        });
    }
</script>
<ejs-grid id="employeesGrid" created="onGridCreated">
    <e-grid-columns>
        <e-grid-column field="idEmpleado" headerText="ID"></e-grid-column>
        <e-grid-column field="nombreCompleto" headerText="Nombre"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

**Referencia oficial**: [Remote Data Binding](https://ej2.syncfusion.com/aspnetcore/documentation/grid/data-binding/remote-data)

**Alternativa con HTML Helper**:
```html
@Html.EJS().Grid("employeesGrid")
    .DataSource(Url.Action("ObtenerEmployees", "Employees"))
    .Columns(col =>
    {
        col.Field("idEmpleado").HeaderText("ID").Add();
        col.Field("nombreCompleto").HeaderText("Nombre").Add();
    })
    .Render()
```

**Nota**: 
- El binding a controladores funciona con endpoints que retornan JSON
- El formato esperado es: `{ "exito": true, "datos": [...] }` o directamente un array
- Ver documentación: https://help.syncfusion.com/aspnet-core/grid/data-binding

**Eventos con Namespaces JavaScript**:
```javascript
window.Employees = {
    Grid: {
        OnRowSelected: (args) => {
            console.log('Fila seleccionada:', args.data);
        },
        OnActionComplete: (args) => {
            if (args.requestType === 'filtering') {
                Employees.Filters.Apply();
            }
        }
    }
};

// En la vista
@Html.EJS().Grid("employeesGrid")
    .RowSelected("Employees.Grid.AlSeleccionarFila")
    .ActionComplete("Employees.Grid.AlCompletarAccion")
    .Render()
```

### 2. DatePicker (Selector de Fechas)

**Aspecto Visual**:
- Input con icono de calendario
- Calendario popup moderno
- Navegación por meses/años
- Selección de rango de fechas
- Temas personalizables

**Características**:
- ✅ Formato de fecha personalizable
- ✅ Rango de fechas mínimo/máximo
- ✅ Validación de fechas
- ✅ Localización (español)
- ✅ Múltiples formatos de entrada

**Ejemplo de Uso**:
```html
@Html.EJS().DatePicker("filtroFechaInicio")
    .Placeholder("Desde")
    .Change("Employees.Filters.OnFechaInicioChange")
    .Render()

<script>
window.Employees.Filters.OnFechaInicioChange = (args) => {
    Employees.Filters.Apply();
};
</script>
```

### 3. DropDownList (Lista Desplegable)

**Aspecto Visual**:
- Dropdown moderno con búsqueda
- Lista desplegable con scroll
- Selección múltiple opcional
- Iconos personalizables

**Características**:
- ✅ Búsqueda/filtrado en la lista
- ✅ Selección múltiple
- ✅ Agrupación de items
- ✅ Templates personalizados
- ✅ Binding a controlador

**Ejemplo de Uso**:
```html
@Html.EJS().DropDownList("filtroDepartamento")
    .DataSource(Url.Action("ObtenerDepartamentos", "Employees"))
    .Placeholder("Seleccionar departamento")
    .Change("Employees.Filters.OnDepartamentoChange")
    .Render()
```

### 4. Button (Botón)

**Aspecto Visual**:
- Botones con diferentes estilos (Primary, Success, Danger, etc.)
- Iconos integrados
- Estados (hover, active, disabled)
- Tamaños personalizables

**Características**:
- ✅ Múltiples variantes (flat, outline, round)
- ✅ Iconos (Font Awesome, Material Icons)
- ✅ Estados disabled/enabled
- ✅ Eventos onclick con namespaces

**Ejemplo de Uso**:
```html
@Html.EJS().Button("btnEnviarEmail")
    .Content("Enviar Email")
    .IconCss("fas fa-envelope")
    .CssClass("e-primary")
    .Click("Employees.Email.Send")
    .Render()

<script>
window.Employees.Email = {
    Send: () => {
        // Llamada AJAX al controlador
        $.ajax({
            url: '@Url.Action("EnviarEmail", "Employees")',
            method: 'POST',
            // ...
        });
    }
};
</script>
```

### 5. Dialog (Modal)

**Aspecto Visual**:
- Modal moderno con overlay
- Header, body y footer
- Animaciones de apertura/cierre
- Responsive design

**Características**:
- ✅ Tamaños personalizables
- ✅ Posición personalizable
- ✅ Drag & drop
- ✅ Resize
- ✅ Templates HTML en el contenido

**Ejemplo de Uso**:
```html
@Html.EJS().Dialog("modalEnviarEmail")
    .Header("Enviar Información por Email")
    .ContentTemplate("#emailModalContent")
    .ShowCloseIcon(true)
    .Width("600px")
    .Render()

<div id="emailModalContent">
    <input type="email" id="emailReceptor" />
    <button onclick="Employees.Email.Confirmar()">Enviar</button>
</div>
```

### 6. Charts (Gráficos)

**Aspecto Visual**:
- Gráficos modernos y profesionales
- Múltiples tipos (línea, barra, pie, área, etc.)
- Interactividad (hover, zoom, tooltip)
- Animaciones suaves

**Características**:
- ✅ Múltiples tipos de gráficos
- ✅ Tooltips interactivos
- ✅ Zoom y pan
- ✅ Exportación a imagen
- ✅ Binding a datos del controlador

**Ejemplo de Uso**:
```html
@Html.EJS().Chart("chartSalarios")
    .DataSource(Url.Action("ObtenerDatosGrafico", "Employees"))
    .PrimaryXAxis(x => x.ValueType(Syncfusion.EJ2.Charts.ValueType.Category))
    .PrimaryYAxis(y => y.ValueType(Syncfusion.EJ2.Charts.ValueType.Logarithmic))
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .XName("nombre")
            .YName("salario")
            .Add();
    })
    .Render()
```

## Características Especiales que Cumplen Requisitos

### 1. Templates HTML Condicionales

Syncfusion soporta templates HTML con lógica condicional usando su motor de templates:

```html
<script id="rowTemplate" type="text/x-template">
    <tr class="${if(activo)}fila-activa${else}fila-inactiva${/if}">
        <td>${nombreCompleto}</td>
        <td class="${if(salario > 5000)}text-success${else}text-muted${/if}">
            ${salario}
        </td>
    </tr>
</script>
```

### 2. Binding Directo a Controladores

```csharp
// En el controlador
public IActionResult ObtenerEmployees()
{
    var datos = _servicio.ObtenerEmployeesAsync().Result;
    return Json(datos);
}

// En la vista
@Html.EJS().Grid("employeesGrid")
    .DataSource(Url.Action("ObtenerEmployees", "Employees"))
    .Columns(col => { /* ... */ })
    .Render()
```

### 3. Eventos con Arrow Functions y Namespaces

```javascript
// Namespace con arrow functions
window.Employees = {
    Table: {
        Reload: () => {
            var grid = document.getElementById('employeesGrid').ej2_instances[0];
            grid.refresh();
        }
    },
    Filters: {
        Apply: () => {
            // Lógica de filtrado
        }
    },
    Email: {
        Send: async () => {
            const response = await fetch('@Url.Action("EnviarEmail", "Employees")', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: document.getElementById('emailReceptor').value })
            });
        }
    }
};

// Uso en la vista
@Html.EJS().Button("btnReload")
    .Content("Actualizar")
    .Click("() => Employees.Table.Reload()")
    .Render()
```

### 4. Estilos Condicionales

```html
@Html.EJS().Grid("employeesGrid")
    .RowDataBound("Employees.Grid.OnRowDataBound")
    .Render()

<script>
window.Employees.Grid.OnRowDataBound = (args) => {
    if (args.data.salario > 5000) {
        args.row.classList.add('salario-alto');
    }
    if (args.data.activo === false) {
        args.row.classList.add('fila-inactiva');
    }
};
</script>
```

## Compatibilidad

### Versiones de .NET
- ✅ .NET 8.0.300 (Windows)
- ✅ .NET 8.0.417 (Mac)
- ✅ .NET 8.0.x (todas las versiones)

### Sistemas Operativos
- ✅ Windows (desarrollo y ejecución)
- ✅ macOS (desarrollo y ejecución)
- ✅ Linux (ejecución del servidor)

### Navegadores
- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ Responsive design para móviles

## Instalación

### Paquetes NuGet Requeridos

```xml
<PackageReference Include="Syncfusion.EJ2.AspNet.Core" Version="32.1.23" />
```

### Configuración en Program.cs

```csharp
using Syncfusion.EJ2;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios de Syncfusion
builder.Services.AddSyncfusion();

var app = builder.Build();
```

### Referencias en _Layout.cshtml

```html
<!-- Syncfusion CSS -->
<link href="https://cdn.syncfusion.com/ej2/32.1.23/material.css" rel="stylesheet" />

<!-- Syncfusion JS -->
<script src="https://cdn.syncfusion.com/ej2/32.1.23/dist/ej2.min.js"></script>
```

## Community License - Gratuita Permanente

### ¿Es Gratuita para Siempre?

**Sí, la Community License es PERMANENTE y GRATUITA** mientras se cumplan los requisitos de elegibilidad. No tiene fecha de expiración.

### Requisitos para Licencia Gratuita Permanente
- ✅ Organización con menos de $1 millón USD en ingresos anuales
- ✅ Menos de 5 desarrolladores
- ✅ Menos de 10 empleados en total
- ✅ La licencia es **gratuita para siempre** mientras se cumplan estos requisitos
- ✅ Acceso continuo a actualizaciones y nuevas versiones
- ✅ Sin límite de tiempo de uso

### Diferencia entre Trial y Community License

**Trial (Versión de Prueba)**:
- ⚠️ Tiene fecha de expiración (ej: 30 días)
- ⚠️ Es temporal para evaluación
- ⚠️ Muestra mensajes de "trial" en la aplicación

**Community License (Licencia Comunitaria)**:
- ✅ **PERMANENTE** - Sin fecha de expiración
- ✅ **Gratuita para siempre** mientras se cumplan requisitos
- ✅ Sin mensajes de "trial" en la aplicación
- ✅ Acceso completo a todas las funcionalidades
- ✅ Actualizaciones gratuitas de por vida

### Registro
1. Visitar: https://www.syncfusion.com/products/communitylicense
2. Completar formulario de registro con información de la organización
3. Validar elegibilidad (ingresos, número de desarrolladores, empleados)
4. Recibir clave de licencia permanente por email
5. Registrar clave en el proyecto (una sola vez)

### ¿Qué Pasa si Superamos los Requisitos?

Si en el futuro la organización supera los requisitos (más de $1M ingresos, más de 5 desarrolladores, o más de 10 empleados), será necesario adquirir una licencia comercial. Sin embargo, mientras se cumplan los requisitos, la licencia es **gratuita y permanente**.

### Registro de Licencia en Código

```csharp
// En Program.cs o Startup.cs
using Syncfusion.Licensing;

SyncfusionLicenseProvider.RegisterLicense("TU_LICENCIA_AQUI");
```

## Comparación con Implementación Actual

### DataTables vs Syncfusion Grid

| Característica | DataTables (Actual) | Syncfusion Grid |
|----------------|---------------------|-----------------|
| Filtrado | ✅ Manual con JavaScript | ✅ Integrado con helpers |
| Templates HTML | ❌ Limitado | ✅ Completo con condicionales |
| Binding a controlador | ⚠️ Manual AJAX | ✅ Directo con Url.Action |
| Eventos | ⚠️ jQuery events | ✅ Namespaces JavaScript |
| Exportación | ✅ Con plugins | ✅ Integrada |
| Estilos condicionales | ⚠️ CSS manual | ✅ Templates HTML |

## Próximos Pasos

1. **Revisar demos visuales**: Visitar https://ej2.syncfusion.com/aspnetcore/Grid/Overview
2. **Solicitar Community License**: Registrarse en el sitio oficial
3. **Instalar paquetes**: Seguir guía de instalación
4. **Plan de migración**: Ver [PLAN_MIGRACION_UI.md](../PLAN_MIGRACION_UI.md)

---

**Última actualización**: Enero 2026
**Fuentes**: Documentación oficial de Syncfusion, demos interactivos, y ejemplos de código
