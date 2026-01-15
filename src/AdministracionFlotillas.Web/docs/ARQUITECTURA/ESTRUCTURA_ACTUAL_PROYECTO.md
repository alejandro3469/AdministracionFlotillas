# Estructura Actual del Proyecto

Este documento describe la estructura actual del proyecto, los componentes implementados y en uso, y explica los conceptos fundamentales de la arquitectura basada en módulos.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas con separación de responsabilidades, organizada por módulos funcionales.

### Arquitectura Basada en Módulos

La aplicación está organizada en módulos funcionales. Cada módulo agrupa funcionalidad relacionada y mantiene una estructura consistente a través de todas las capas.

**Principio de Organización por Módulos:**
- Cada módulo tiene archivos con el mismo nombre base en todas las capas
- Ejemplo: El módulo `Employees` tiene:
  - `Employee.cs` (Modelo Común)
  - `IEmployeesRepository.cs` y `EmployeesRepository.cs` (Acceso a Datos)
  - `IEmployeesService.cs` y `EmployeesServiceOracle.cs` (Reglas de Negocio)
  - `EmployeesController.cs` (Web - Controlador)
  - `EmployeeViewModel.cs` (Web - ViewModel)
  - `EmployeeParseador.cs` (Web - Parseador)
  - `Employees/` (Web - Vistas y Scripts)

Esta organización facilita:
- Localizar archivos relacionados rápidamente
- Mantener consistencia en el código
- Escalar la aplicación agregando nuevos módulos siguiendo el mismo patrón

### Capas de la Arquitectura

#### Capa de Aplicación (Web)
- **Ubicación**: `src/AdministracionFlotillas.Web`
- **Responsabilidad**: Controladores MVC, vistas, ViewModels, parseadores y scripts JavaScript
- **Tecnología**: ASP.NET Core MVC 8.0
- **Estructura por Módulo**:
  - `Controllers/[Modulo]Controller.cs` - Controladores MVC
  - `Views/[Modulo]/` - Vistas Razor
  - `ViewModels/[Modulo]ViewModel.cs` - Modelos para vistas
  - `Parseador/[Modulo]Parseador.cs` - Conversión entre modelos
  - `Scripts/[Modulo]/[Modulo].js` - JavaScript organizado por módulo

#### Capa de Reglas de Negocio
- **Ubicación**: `src/AdministracionFlotillas.ReglasNegocio`
- **Responsabilidad**: Lógica de negocio, validaciones y reglas de dominio
- **Tecnología**: .NET 8.0
- **Estructura por Módulo**:
  - `Servicios/Interfaces/I[Modulo]Service.cs` - Interfaces de servicios
  - `Servicios/Escenarios/Oracle/[Modulo]ServiceOracle.cs` - Implementaciones

#### Capa de Acceso a Datos
- **Ubicación**: `src/AdministracionFlotillas.AccesoDatos`
- **Responsabilidad**: Repositorios e interfaces para acceso a datos
- **Tecnología**: .NET 8.0
- **Estructura por Módulo**:
  - `Repositorios/I[Modulo]Repository.cs` - Interfaces de repositorios
  - `Repositorios/[Modulo]Repository.cs` - Implementaciones

#### Modelos Comunes
- **Ubicación**: `src/AdministracionFlotillas.ModelosComunes`
- **Responsabilidad**: Modelos compartidos entre capas
- **Tecnología**: .NET 8.0
- **Estructura por Módulo**:
  - `[Modulo].cs` - Modelos de negocio (singular)

## Módulo Employees - Implementación Completa

El módulo Employees está completamente implementado y funcional. Sirve como referencia para implementar futuros módulos.

### Estructura de Archivos del Módulo Employees

#### 1. Modelo Común
**`src/AdministracionFlotillas.ModelosComunes/Employee.cs`**
- Modelo de negocio que representa un empleado
- Propiedades: `EmployeeId`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `HireDate`, `JobId`, `Salary`, `CommissionPct`, `ManagerId`, `DepartmentId`
- Usado en todas las capas como modelo base

#### 2. Capa de Acceso a Datos
**`src/AdministracionFlotillas.AccesoDatos/Repositorios/IEmployeesRepository.cs`**
- Interfaz que define el contrato para acceso a datos de empleados
- Métodos: `ObtenerEmployeesAsync()`, `ObtenerEmployeePorIdAsync(int id)`

**`src/AdministracionFlotillas.AccesoDatos/Repositorios/EmployeesRepository.cs`**
- Implementación del repositorio
- Actualmente retorna datos mock (56 empleados de ejemplo)
- Cuando se conecte a Oracle, aquí se ejecutarán las consultas SQL

#### 3. Capa de Reglas de Negocio
**`src/AdministracionFlotillas.ReglasNegocio/Servicios/Interfaces/IEmployeesService.cs`**
- Interfaz que define el contrato para servicios de negocio
- Métodos: `ObtenerEmployeesAsync()`, `ObtenerEmployeePorIdAsync(int id)`

**`src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/EmployeesServiceOracle.cs`**
- Implementación del servicio para escenario Oracle
- Aplica reglas de negocio y validaciones
- Usa el repositorio para obtener datos

#### 4. Capa de Aplicación (Web)

**Controlador**
- `src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs`
  - `Index()`: Retorna la vista principal
  - `ObtenerEmployees()`: Endpoint AJAX POST que retorna todos los empleados
  - `ObtenerEmployeePorId(int id)`: Endpoint AJAX POST que retorna un empleado por ID

**ViewModels**
- `src/AdministracionFlotillas.Web/ViewModels/EmployeeViewModel.cs`
  - Modelo para la vista con propiedades formateadas en español
  - Propiedades: `IdEmpleado`, `PrimerNombre`, `Apellido`, `CorreoElectronico`, `NumeroTelefono`, `FechaContratacion`, `Salario`, etc.

**Parseador**
- `src/AdministracionFlotillas.Web/Parseador/EmployeeParseador.cs`
  - Conversión manual entre `Employee` (modelo de negocio) y `EmployeeViewModel` (modelo de vista)
  - Métodos: `ConvertirAVista()`, `ConvertirListaAVista()`, `ConvertirAModelo()`
  - Realiza formateo de fechas, monedas y porcentajes

**Vistas**
- `src/AdministracionFlotillas.Web/Views/Employees/Index.cshtml`
  - Vista principal con modal de envío por email
  - Referencia al bundle de JavaScript: `~/js/bundles/employees.min.js`
  
- `src/AdministracionFlotillas.Web/Views/Employees/_EmployeesGrid.cshtml`
  - Vista parcial con filtros y tabla DataTables
  - Contiene todos los controles de filtrado

**JavaScript**
- `src/AdministracionFlotillas.Web/Scripts/Common/Utils.js`
  - Utilidades comunes (namespace `Common.Utils`)
  - Funciones: `ShowMessage()`, `WaitForJQuery()`, `RegisterAjaxErrorHandler()`

- `src/AdministracionFlotillas.Web/Scripts/Employees/Employees.js`
  - Todo el código JavaScript del módulo Employees (namespace `Employees`)
  - Organizado en sub-namespaces:
    - `Employees.Table` - Gestión de DataTables
    - `Employees.Filters` - Filtros
    - `Employees.Selection` - Selección de empleados
    - `Employees.Email` - Funcionalidad de email
    - `Employees.Details` - Detalles de empleados
    - `Employees.Events` - Manejo de eventos

### Flujo de Datos del Módulo Employees

1. **Usuario accede a la vista**: Navega a `/Employees/Index`
2. **Controlador retorna vista**: `EmployeesController.Index()` retorna `Index.cshtml`
3. **Vista carga JavaScript**: Se carga el bundle `employees.min.js` que contiene todo el código del módulo
4. **DataTables inicia**: El namespace `Employees.Table.Initialize()` se ejecuta automáticamente
5. **Petición AJAX**: DataTables hace POST a `/Employees/ObtenerEmployees`
6. **Controlador procesa**: `EmployeesController.ObtenerEmployees()` recibe la petición
7. **Servicio aplica reglas**: Llama a `IEmployeesService.ObtenerEmployeesAsync()`
8. **Repositorio obtiene datos**: El servicio llama a `IEmployeesRepository.ObtenerEmployeesAsync()`
9. **Conversión a ViewModel**: El controlador usa `EmployeeParseador.ConvertirListaAVista()` para convertir `Employee` a `EmployeeViewModel`
10. **Respuesta JSON**: El controlador retorna `{ exito: true, datos: [...] }`
11. **DataTables muestra datos**: La tabla se llena con los datos recibidos

### Funcionalidades Implementadas

#### Tabla de Empleados
- Carga de datos mediante AJAX
- Paginación, ordenamiento y búsqueda
- Exportación a Excel, PDF e impresión
- Botón de actualización
- Diseño responsive

#### Filtros Avanzados
- Búsqueda por nombre (columna específica)
- Filtro por rango de fecha de contratación (jQuery UI Datepicker)
- Filtro por rango de salario (Inputmask para formato de moneda)
- Filtro por departamento
- Filtro por email
- Filtro por teléfono

#### Selección de Empleados
- Checkboxes para selección múltiple
- Validación: solo se pueden seleccionar empleados con la misma fecha de contratación
- Almacenamiento de empleados seleccionados

#### Modal de Envío por Email
- Modal Bootstrap con formulario de email
- Tabla resumen de empleados seleccionados
- Validación de email (formato básico)
- Mensaje de confirmación con SweetAlert2

#### Botón Ver Detalles
- Petición AJAX a `/Employees/ObtenerEmployeePorId`
- Muestra detalles del empleado

## Sistema de Bundles de JavaScript

### ¿Qué son los Bundles?

Los bundles (paquetes) son archivos JavaScript combinados y minificados que agrupan múltiples archivos fuente en un solo archivo optimizado para producción.

**Ventajas de usar bundles:**
- **Menos peticiones HTTP**: En lugar de cargar múltiples archivos, se carga uno solo
- **Mejor rendimiento**: Archivos minificados son más pequeños
- **Caché eficiente**: El navegador cachea un solo archivo en lugar de varios
- **Organización**: Facilita la gestión de dependencias entre archivos

**Desventajas en desarrollo:**
- Más difícil depurar código minificado
- Cambios requieren recompilación del bundle

### Configuración de Bundles

El proyecto usa **BuildBundlerMinifier** para generar bundles automáticamente durante la compilación.

**Archivo de configuración**: `src/AdministracionFlotillas.Web/bundleconfig.json`

```json
[
  {
    "outputFileName": "wwwroot/js/bundles/common.min.js",
    "inputFiles": [
      "Scripts/Common/Utils.js"
    ],
    "minify": {
      "enabled": true,
      "renameLocals": true
    }
  },
  {
    "outputFileName": "wwwroot/js/bundles/employees.min.js",
    "inputFiles": [
      "Scripts/Common/Utils.js",
      "Scripts/Employees/Employees.js"
    ],
    "minify": {
      "enabled": true,
      "renameLocals": true
    }
  }
]
```

**Explicación de la configuración:**
- `outputFileName`: Ruta donde se genera el bundle minificado
- `inputFiles`: Lista de archivos fuente que se combinan (en orden)
- `minify.enabled`: Activa la minificación (elimina espacios, renombra variables)
- `minify.renameLocals`: Renombra variables locales para reducir tamaño

### Uso de Bundles en las Vistas

**En producción (recomendado):**
```html
<script src="~/js/bundles/employees.min.js" asp-append-version="true"></script>
```

**En desarrollo (para debugging):**
```html
<!-- Descomentar para usar archivos individuales -->
<script src="~/Scripts/Common/Utils.js"></script>
<script src="~/Scripts/Employees/Employees.js"></script>
```

**`asp-append-version="true"`**: Agrega un hash al nombre del archivo para invalidar caché cuando cambia el contenido.

### Generación de Bundles

Los bundles se generan automáticamente durante la compilación del proyecto:
```bash
dotnet build
```

Los archivos generados se encuentran en:
- `wwwroot/js/bundles/common.min.js`
- `wwwroot/js/bundles/employees.min.js`

## Organización de JavaScript por Namespaces

### ¿Qué son los Namespaces en JavaScript?

Los namespaces son objetos que agrupan funcionalidad relacionada, evitando conflictos de nombres y organizando el código de manera jerárquica.

**Ejemplo de estructura de namespace:**
```javascript
window.Employees = {
    Table: {
        Initialize: function() { ... },
        Reload: function() { ... }
    },
    Filters: {
        Apply: function() { ... }
    }
};
```

**Acceso a métodos:**
```javascript
// Desde cualquier parte del código
Employees.Table.Reload();
Employees.Filters.Apply();
```

### Namespaces Implementados

#### Common.Utils
- `Common.Utils.WaitForJQuery()` - Espera a que jQuery esté cargado
- `Common.Utils.ShowMessage(type, message, title)` - Muestra mensajes con Bootstrap Toast
- `Common.Utils.RegisterAjaxErrorHandler()` - Registra manejador global de errores AJAX

#### Employees
- `Employees.Table.Initialize()` - Inicializa DataTables
- `Employees.Table.Reload()` - Recarga datos de la tabla
- `Employees.Filters.Apply()` - Aplica todos los filtros
- `Employees.Selection.GetSelected()` - Obtiene empleados seleccionados
- `Employees.Selection.Clear()` - Limpia la selección
- `Employees.Email.OpenModal()` - Abre modal de envío por email
- `Employees.Email.Send()` - Envía email (validación)
- `Employees.Details.View(id)` - Muestra detalles de un empleado

## Registro de Dependencias en Program.cs

El archivo `Program.cs` registra todas las dependencias usando inyección de dependencias:

```csharp
// Repositorios
builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>();

// Servicios
builder.Services.AddScoped<IEmployeesService, EmployeesServiceOracle>();
```

**Explicación:**
- `AddScoped`: Crea una instancia por petición HTTP
- Las interfaces se registran con sus implementaciones
- El controlador recibe las dependencias mediante constructor

## Tecnologías y Librerías Utilizadas

### Backend
- **.NET 8.0 SDK** - Framework multiplataforma
- **ASP.NET Core MVC 8.0** - Patrón Model-View-Controller
- **C#** - Lenguaje de programación
- **Microsoft.AspNetCore.Mvc.NewtonsoftJson 8.0.11** - Serialización JSON para AJAX
- **BuildBundlerMinifier 3.2.449** - Generación de bundles JavaScript

### Frontend
- **Bootstrap 5** - Framework CSS y componentes JavaScript
- **jQuery 3.7.1** - Biblioteca JavaScript
- **jQuery UI 1.13.2** - Componentes de interfaz (Datepicker)
- **DataTables 1.13.7** - Framework de tablas JavaScript
- **DataTables Buttons 2.4.2** - Exportación (Excel, PDF, Print)
- **DataTables Responsive 2.5.0** - Diseño responsive
- **Font Awesome 5.15.4** - Librería de iconos
- **SweetAlert2 11** - Alertas personalizadas
- **Inputmask 5.0.8** - Formato de inputs (moneda)

## Convenciones de Nomenclatura

### Archivos por Módulo
- **Modelo Común**: `[Modulo].cs` (singular, ej: `Employee.cs`)
- **Interfaz Repositorio**: `I[Modulo]Repository.cs` (plural, ej: `IEmployeesRepository.cs`)
- **Repositorio**: `[Modulo]Repository.cs` (plural, ej: `EmployeesRepository.cs`)
- **Interfaz Servicio**: `I[Modulo]Service.cs` (plural, ej: `IEmployeesService.cs`)
- **Servicio**: `[Modulo]ServiceOracle.cs` (plural, ej: `EmployeesServiceOracle.cs`)
- **Controlador**: `[Modulo]Controller.cs` (plural, ej: `EmployeesController.cs`)
- **ViewModel**: `[Modulo]ViewModel.cs` (singular, ej: `EmployeeViewModel.cs`)
- **Parseador**: `[Modulo]Parseador.cs` (singular, ej: `EmployeeParseador.cs`)
- **JavaScript**: `Scripts/[Modulo]/[Modulo].js` (plural, ej: `Scripts/Employees/Employees.js`)

### Namespaces C#
- `AdministracionFlotillas.ModelosComunes`
- `AdministracionFlotillas.AccesoDatos.Repositorios`
- `AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces`
- `AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle`
- `AdministracionFlotillas.Web.Controllers`
- `AdministracionFlotillas.Web.ViewModels`
- `AdministracionFlotillas.Web.Parseador`

### Namespaces JavaScript
- `window.Common.Utils` - Utilidades comunes
- `window.Employees` - Módulo Employees completo
- `window.Employees.Table` - Gestión de tabla
- `window.Employees.Filters` - Gestión de filtros
- `window.Employees.Selection` - Gestión de selección
- `window.Employees.Email` - Gestión de email
- `window.Employees.Details` - Gestión de detalles
- `window.Employees.Events` - Gestión de eventos

## Referencias a Documentación Oficial

Esta arquitectura sigue las mejores prácticas de:
- [ASP.NET Core MVC Documentation](https://learn.microsoft.com/aspnet/core/mvc/)
- [Dependency Injection in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection)
- [ASP.NET Core Bundling and Minification](https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification)
- [.NET Architecture Guides](https://learn.microsoft.com/dotnet/architecture/)
