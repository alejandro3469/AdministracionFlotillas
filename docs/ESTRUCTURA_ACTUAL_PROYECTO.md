# Estructura Actual del Proyecto

Este documento describe la estructura actual del proyecto y los componentes que están implementados y en uso.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas con separación de responsabilidades:

### Capa de Aplicación (Web)
- **Ubicación**: `src/AdministracionFlotillas.Web`
- **Responsabilidad**: Controladores MVC, vistas, ViewModels y parseadores
- **Tecnología**: ASP.NET Core MVC 8.0

### Capa de Reglas de Negocio
- **Ubicación**: `src/AdministracionFlotillas.ReglasNegocio`
- **Responsabilidad**: Lógica de negocio, validaciones y reglas de dominio
- **Tecnología**: .NET 8.0

### Capa de Acceso a Datos
- **Ubicación**: `src/AdministracionFlotillas.AccesoDatos`
- **Responsabilidad**: Repositorios e interfaces para acceso a datos
- **Tecnología**: .NET 8.0

### Modelos Comunes
- **Ubicación**: `src/AdministracionFlotillas.ModelosComunes`
- **Responsabilidad**: Modelos compartidos entre capas
- **Tecnología**: .NET 8.0

## Componentes Implementados

### Vista Employees

La vista Employees está completamente implementada y funcional.

#### Archivos de la Vista

**Controlador**
- `src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs`
  - Acción `Index()`: Retorna la vista principal
  - Acción `ObtenerEmployees()`: Endpoint AJAX POST que retorna todos los empleados
  - Acción `ObtenerEmployeePorId(int id)`: Endpoint AJAX POST que retorna un empleado por ID

**Vistas**
- `src/AdministracionFlotillas.Web/Views/Employees/Index.cshtml`: Vista principal con modal y configuración de DataTables
- `src/AdministracionFlotillas.Web/Views/Employees/_EmployeesGrid.cshtml`: Vista parcial con filtros y tabla

**JavaScript**
- `src/AdministracionFlotillas.Web/wwwroot/js/employees.js`: Funciones auxiliares para mensajes
- Script inline en `Index.cshtml`: Configuración de DataTables, filtros y funcionalidad de selección

**ViewModels**
- `src/AdministracionFlotillas.Web/ViewModels/EmployeeViewModel.cs`: Modelo para la vista con propiedades formateadas

**Parseador**
- `src/AdministracionFlotillas.Web/Parseador/EmployeeParseador.cs`: Conversión manual entre `Employee` (modelo de negocio) y `EmployeeViewModel` (modelo de vista)

#### Flujo de Datos

1. El usuario accede a `/Employees/Index`
2. El controlador retorna la vista `Index.cshtml`
3. La vista carga DataTables que hace una petición AJAX POST a `/Employees/ObtenerEmployees`
4. El controlador llama al servicio `IEmployeesService.ObtenerEmployeesAsync()`
5. El servicio aplica reglas de negocio y llama al repositorio `IEmployeesRepository.ObtenerEmployeesAsync()`
6. El repositorio retorna una lista de `Employee` (modelo de negocio)
7. El servicio retorna la lista al controlador
8. El controlador usa `EmployeeParseador.ConvertirListaAVista()` para convertir a `EmployeeViewModel`
9. El controlador retorna JSON con formato `{ exito: true, datos: [...] }`
10. DataTables recibe los datos y los muestra en la tabla

#### Funcionalidades Implementadas

**Tabla de Empleados**
- Carga de datos mediante AJAX
- Paginación, ordenamiento y búsqueda
- Exportación a Excel, PDF e impresión
- Botón de actualización
- Responsive design

**Filtros**
- Búsqueda por nombre (columna específica)
- Filtro por rango de fecha de contratación (jQuery UI Datepicker)
- Filtro por rango de salario (Inputmask para formato de moneda)
- Filtro por departamento
- Filtro por email
- Filtro por teléfono

**Selección de Empleados**
- Checkboxes para selección múltiple
- Validación: solo se pueden seleccionar empleados con la misma fecha de contratación
- Almacenamiento de empleados seleccionados en variable JavaScript

**Modal de Envío por Email**
- Modal Bootstrap con formulario de email
- Tabla resumen de empleados seleccionados
- Validación de email (formato básico)
- Mensaje de confirmación con SweetAlert2

**Botón Ver Detalles**
- Petición AJAX a `/Employees/ObtenerEmployeePorId`
- Muestra detalles del empleado en un alert

### Modelo de Negocio

**Employee** (`src/AdministracionFlotillas.ModelosComunes/Employee.cs`)
- Propiedades: EmployeeId, FirstName, LastName, Email, PhoneNumber, HireDate, JobId, Salary, CommissionPct, ManagerId, DepartmentId
- Propiedades calculadas: Antiguedad, NombreDepartamento

### Repositorio

**EmployeesRepository** (`src/AdministracionFlotillas.AccesoDatos/Repositorios/EmployeesRepository.cs`)
- Implementa `IEmployeesRepository`
- Método `ObtenerEmployeesAsync()`: Retorna 56 empleados mock basados en la estructura de Oracle HR
- Método `ObtenerEmployeePorIdAsync(int id)`: Retorna un empleado por ID

### Servicio de Negocio

**EmployeesServiceOracle** (`src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/EmployeesServiceOracle.cs`)
- Implementa `IEmployeesService`
- Reglas de negocio implementadas:
  - Validación de salario mínimo ($1,000)
  - Validación de salario para alto nivel (mayor a $10,000)
  - Ordenamiento por antigüedad (más antiguos primero)
  - Cálculo de antigüedad en años
  - Validación de elegibilidad para bonificación
  - Cálculo de salario anual estimado

### Configuración de Dependency Injection

**Program.cs** (`src/AdministracionFlotillas.Web/Program.cs`)
- Registra `IEmployeesRepository` → `EmployeesRepository` (Scoped)
- Registra `IEmployeesService` → `EmployeesServiceOracle` (Scoped)
- Configura `AddControllersWithViews().AddNewtonsoftJson()` para soporte de JSON en AJAX

## Tecnologías Utilizadas

### Backend
- .NET 8.0 SDK
- ASP.NET Core MVC 8.0
- Microsoft.AspNetCore.Mvc.NewtonsoftJson 8.0.11 (para serialización JSON en AJAX)

### Frontend (CDN)
- Bootstrap 5 (CSS y JS desde `wwwroot/lib/bootstrap`)
- jQuery 3.7.1 (desde CDN)
- jQuery UI 1.13.2 (desde CDN, para Datepicker)
- DataTables 1.13.7 (desde CDN)
- DataTables Buttons 2.4.2 (desde CDN, para exportación)
- DataTables Responsive 2.5.0 (desde CDN)
- jsZip 3.10.1 (desde CDN, requerido por DataTables Buttons para Excel)
- pdfmake 0.1.53 (desde CDN, requerido por DataTables Buttons para PDF)
- Inputmask 5.0.8 (desde CDN, para formato de inputs)
- SweetAlert2 11 (desde CDN, para alertas personalizadas)
- Font Awesome 5.15.4 (desde CDN, para iconos)

### Frontend (Local)
- Bootstrap 5 (desde `wwwroot/lib/bootstrap`)
- jQuery (desde `wwwroot/lib/jquery`, aunque se usa principalmente desde CDN)
- CSS personalizado (`wwwroot/css/site.css`)
- JavaScript personalizado (`wwwroot/js/site.js`, `wwwroot/js/employees.js`)

## Estructura de Archivos

```
src/
├── AdministracionFlotillas.Web/
│   ├── Controllers/
│   │   ├── EmployeesController.cs
│   │   └── HomeController.cs
│   ├── Views/
│   │   ├── Employees/
│   │   │   ├── Index.cshtml
│   │   │   └── _EmployeesGrid.cshtml
│   │   ├── Home/
│   │   │   └── Index.cshtml
│   │   ├── Shared/
│   │   │   ├── _Layout.cshtml
│   │   │   └── _ViewImports.cshtml
│   │   └── _ViewStart.cshtml
│   ├── ViewModels/
│   │   └── EmployeeViewModel.cs
│   ├── Parseador/
│   │   └── EmployeeParseador.cs
│   ├── Models/
│   │   └── ErrorViewModel.cs
│   ├── wwwroot/
│   │   ├── css/
│   │   │   └── site.css
│   │   ├── js/
│   │   │   ├── site.js
│   │   │   └── employees.js
│   │   └── lib/
│   │       ├── bootstrap/
│   │       ├── jquery/
│   │       ├── jquery-validation/
│   │       └── jquery-validation-unobtrusive/
│   └── Program.cs
├── AdministracionFlotillas.ReglasNegocio/
│   └── Servicios/
│       ├── Interfaces/
│       │   └── IEmployeesService.cs
│       └── Escenarios/
│           └── Oracle/
│               └── EmployeesServiceOracle.cs
├── AdministracionFlotillas.AccesoDatos/
│   └── Repositorios/
│       ├── IEmployeesRepository.cs
│       └── EmployeesRepository.cs
└── AdministracionFlotillas.ModelosComunes/
    └── Employee.cs
```

## Componentes No Implementados

Los siguientes componentes están definidos pero no están en uso:

- Flotilla (modelo, repositorio, servicio, vista): No implementado
- AutoMapper: Paquete removido, se usa parseador manual

## Configuración del Proyecto

### global.json
```json
{
  "sdk": {
    "version": "8.0.300",
    "rollForward": "latestPatch",
    "allowPrerelease": false
  }
}
```

### Target Framework
Todos los proyectos usan `.NET 8.0` (`<TargetFramework>net8.0</TargetFramework>`).

### Paquetes NuGet Instalados

**AdministracionFlotillas.Web**
- Microsoft.AspNetCore.Mvc.NewtonsoftJson 8.0.11

**AdministracionFlotillas.AccesoDatos**
- Ningún paquete externo (preparado para Oracle.ManagedDataAccess.Core cuando se conecte a base de datos)

**AdministracionFlotillas.ReglasNegocio**
- Ningún paquete externo

**AdministracionFlotillas.ModelosComunes**
- Ningún paquete externo

## Referencias entre Proyectos

- **Web** → **ReglasNegocio**
- **ReglasNegocio** → **AccesoDatos**
- **ReglasNegocio** → **ModelosComunes**
- **AccesoDatos** → **ModelosComunes**
- **Web** → **ModelosComunes** (indirectamente a través de ViewModels)

## Convenciones de Código

### Nombres de Archivos
- Controladores: `[Nombre]Controller.cs`
- Vistas: `[Accion].cshtml`
- Vistas parciales: `_[Nombre].cshtml`
- ViewModels: `[Nombre]ViewModel.cs`
- Repositorios: `[Nombre]Repository.cs`
- Servicios: `[Nombre]Service[Escenario].cs`

### Nombres de Métodos
- Métodos asíncronos: terminan en `Async`
- Métodos de repositorio: `Obtener[Nombre]Async()`
- Métodos de servicio: `Obtener[Nombre]Async()`
- Métodos de parseador: `ConvertirAVista()`, `ConvertirAModelo()`

### Respuestas AJAX
- Formato estándar: `{ exito: true/false, datos: {...}, mensaje: "..." }`
- Éxito: `{ exito: true, datos: [...] }`
- Error: `{ exito: false, mensaje: "..." }`

## Documentación Oficial de Referencia

Este proyecto sigue las prácticas recomendadas de:
- [ASP.NET Core MVC Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/overview)
- [.NET 8.0 Documentation](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8)
- [DataTables Documentation](https://datatables.net/manual/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
