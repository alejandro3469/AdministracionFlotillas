# Selección de Biblioteca UI para el Proyecto

Este documento presenta la recomendación de biblioteca UI basada en los requisitos específicos del proyecto y las características de trabajo actuales.

## Requisitos Específicos del Proyecto

### Compatibilidad
- ✅ Compatible con diferentes versiones de .NET 8 (8.0.300+ en Windows, 8.0.417+ en Mac)
- ✅ Compatible con Windows y macOS (desarrollo multiplataforma)
- ✅ Compatible con ASP.NET Core MVC 8.0

### Características Requeridas (Similar a Kendo UI)
1. **Estilos condicionales mediante HTML templates**
   - Capacidad de definir estilos condicionales usando templates HTML
   - Personalización visual basada en datos o condiciones

2. **Llenar controles y ligar botones especificando controlador y método**
   - Binding directo a métodos del controlador
   - Sintaxis simple: especificar nombre del controlador y método
   - Ejemplo: `asp-controller="Employees" asp-action="ObtenerEmployees"`

3. **Eventos onclick con referencias a namespaces JavaScript**
   - Soporte para arrow functions: `() => {}`
   - Referencias a funciones dentro de objetos: `Employees.Table.Reload()`
   - Namespaces JavaScript: `window.Employees.Filters.Apply()`

4. **Adaptabilidad**
   - La biblioteca debe poder adaptarse al patrón actual de trabajo
   - Compatible con la arquitectura basada en módulos existente

## Análisis de Opciones

### Opción 1: Syncfusion ASP.NET Core MVC (RECOMENDADA)

**Licencia**: Community License (Gratuita PERMANENTE para proyectos pequeños)

**Características que cumplen los requisitos**:

✅ **Estilos condicionales con templates HTML**:
```html
<!-- Tag Helper (Recomendado) -->
<ejs-grid id="employeesGrid">
    <e-grid-columns>
        <e-grid-column field="nombreCompleto" headerText="Nombre" template="#nombreTemplate"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<!-- Alternativa con HTML Helper -->
@Html.EJS().Grid("employeesGrid")
    .Columns(col =>
    {
        col.Field("nombreCompleto").HeaderText("Nombre").Template("#nombreTemplate").Add();
    })
    .Render()
```

✅ **Binding a controladores**:
```html
<!-- Tag Helper (Recomendado) -->
<ejs-button id="btnObtener" content="Obtener Datos" click="Employees.Controller.Obtener"></ejs-button>

<!-- Alternativa con HTML Helper -->
@Html.EJS().Button("btnObtener")
    .Content("Obtener Datos")
    .OnClick("Employees.Controller.Obtener")
    .Render()
```

✅ **Soporte para namespaces JavaScript**:
```javascript
window.Employees = {
    Controller: {
        Obtener: () => {
            // Llamada AJAX al controlador
            $.ajax({
                url: '@Url.Action("ObtenerEmployees", "Employees")',
                // ...
            });
        }
    }
};
```

✅ **Compatibilidad**:
- Compatible con .NET 8.0.300+ y .NET 8.0.417+
- Compatible con Windows y macOS
- Compatible con ASP.NET Core MVC 8.0
- No requiere cambios en la arquitectura actual

**Documentación oficial**:
- **Documentación ASP.NET Core**: https://help.syncfusion.com/aspnet-core
- **Getting Started**: https://help.syncfusion.com/aspnet-core/getting-started
- **Grid Getting Started**: https://help.syncfusion.com/aspnet-core/grid/getting-started
- **Demos interactivos**: https://ej2.syncfusion.com/aspnetcore/Grid/Overview
- **API Reference**: https://help.syncfusion.com/cr/aspnetcore
- **NuGet Package**: https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core

**Nota**: 
- Esta documentación es específica para **ASP.NET Core** (no ASP.NET MVC clásico)
- Compatible con .NET 8.0.300+ (Windows) y .NET 8.0.417+ (Mac)
- Soporta Tag Helpers (recomendado) y HTML Helpers

**Requisitos de Community License** (PERMANENTE, sin fecha de expiración):
- Organización con menos de $1 millón USD en ingresos anuales
- Menos de 5 desarrolladores
- Menos de 10 empleados en total
- La licencia es **gratuita para siempre** mientras se cumplan estos requisitos
- Acceso continuo a actualizaciones y nuevas versiones
- Sin límite de tiempo de uso

### Opción 2: Telerik UI for ASP.NET Core MVC

**Licencia**: Comercial (prueba gratuita de 30 días)

**Características**:
- Muy similar a Kendo UI (mismo fabricante)
- Templates HTML condicionales
- Binding a controladores
- Soporte completo para JavaScript namespaces

**Desventaja**: Requiere licencia comercial después del período de prueba.

### Opción 3: Mantener Stack Actual (DataTables + Bootstrap)

**Ventajas**:
- Ya está implementado y funcionando
- Totalmente gratuito
- Control total sobre la implementación

**Desventajas**:
- No tiene helpers de Razor para binding directo
- Requiere más código JavaScript manual
- No tiene componentes pre-construidos tipo Kendo

## Recomendación Final

### Syncfusion ASP.NET Core MVC con Community License

**Razones**:
1. ✅ **Gratuita PERMANENTE** bajo Community License (sin fecha de expiración)
2. ✅ **Compatible** con todas las versiones de .NET 8 y sistemas operativos del equipo
3. ✅ **Similar a Kendo UI** en funcionalidad y sintaxis
4. ✅ **Templates HTML condicionales** soportados
5. ✅ **Binding a controladores** mediante helpers de Razor
6. ✅ **Soporte para namespaces JavaScript** completo
7. ✅ **No requiere cambios** en la arquitectura actual
8. ✅ **Componentes empresariales** listos para usar (Grid, Charts, Scheduler, etc.)

## Componentes Disponibles en Syncfusion

### Componentes Principales
- **Grid**: Tabla avanzada con filtrado, ordenamiento, paginación, exportación
- **Charts**: Gráficos interactivos (línea, barra, pie, etc.)
- **Scheduler**: Calendario y programación de eventos
- **DatePicker**: Selector de fechas
- **DropDownList**: Listas desplegables
- **Button**: Botones con eventos
- **Dialog**: Modales y diálogos
- **Tooltip**: Información contextual
- **ProgressBar**: Barras de progreso
- **Toast**: Notificaciones

### Características Avanzadas
- Exportación a Excel, PDF, CSV
- Filtrado avanzado
- Agrupación de datos
- Edición inline
- Selección múltiple
- Responsive design
- Temas personalizables

## Próximos Pasos

1. **Revisar documentación visual**: Ver [COMPONENTES_SYNCFUSION.md](../COMPONENTES_SYNCFUSION.md)
2. **Solicitar Community License**: Registrarse en https://www.syncfusion.com/products/communitylicense
3. **Instalar paquetes NuGet**: Seguir guía de instalación
4. **Plan de migración**: Ver [PLAN_MIGRACION_UI.md](../PLAN_MIGRACION_UI.md)

---

**Última actualización**: Enero 2026
