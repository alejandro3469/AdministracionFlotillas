# AdministracionFlotillas

Aplicación web multiplataforma desarrollada con .NET 8.0 y arquitectura en capas, implementando módulos de administración con diferentes tecnologías UI para comparación y aprendizaje.

## Descripción

Este proyecto implementa una aplicación web utilizando ASP.NET Core MVC con una arquitectura en capas: aplicación web, reglas de negocio y acceso a datos. El proyecto utiliza una estrategia de módulos paralelos:

- **Módulo Employees (V1)**: Implementado con DataTables + Bootstrap, completamente funcional, sirve como referencia
- **Módulo Orders/Ventas (V2)**: En desarrollo con Syncfusion UI y Oracle Sample Schema CO (Customer Orders) para datos reales de ventas y facturación

La base de datos utilizada es Oracle Cloud Always Free con el Sample Schema CO que contiene datos realistas de órdenes, clientes, productos, inventario y envíos.

## Estado Actual

**Última actualización**: Enero 2026

- ✅ **Módulo Employees**: Completamente implementado y funcionando
- ✅ **Arquitectura basada en módulos**: Implementada y documentada
- ✅ **Sistema de bundles**: Configurado y funcionando
- ✅ **JavaScript organizado en namespaces**: Implementado
- ⏸️ **Migración a Syncfusion**: En pausa - Esperando aprobación de Community License (Ticket #803702)

Ver [src/AdministracionFlotillas.Web/docs/ESTADO_IMPLEMENTACION_ACTUAL.md](src/AdministracionFlotillas.Web/docs/ESTADO_IMPLEMENTACION_ACTUAL.md) para detalles completos de lo que está implementado y funcionando.

## Estructura del Proyecto

```
AdministracionFlotillas/
├── src/
│   ├── AdministracionFlotillas.Web/              # Capa de aplicación (MVC)
│   │   ├── Controllers/                          # Controladores por módulo
│   │   ├── Views/                                # Vistas por módulo
│   │   ├── ViewModels/                           # ViewModels por módulo
│   │   ├── Parseador/                            # Parseadores por módulo
│   │   ├── Scripts/                              # JavaScript organizado por módulo
│   │   │   ├── Common/                           # Utilidades comunes
│   │   │   └── Employees/                        # Módulo Employees
│   │   ├── docs/                                 # Documentación del proyecto
│   │   └── scripts/                              # Scripts SQL
│   ├── AdministracionFlotillas.ReglasNegocio/     # Capa de reglas de negocio
│   ├── AdministracionFlotillas.AccesoDatos/       # Capa de acceso a datos
│   └── AdministracionFlotillas.ModelosComunes/   # Modelos compartidos
└── global.json                                    # Configuración del SDK de .NET
```

### Arquitectura Basada en Módulos

La aplicación está organizada en módulos funcionales. Cada módulo agrupa funcionalidad relacionada y mantiene una estructura consistente a través de todas las capas. Los archivos de cada módulo comparten el mismo nombre base para facilitar la organización y localización.

**Ejemplo del módulo Employees:**
- Modelo: `Employee.cs`
- Repositorio: `IEmployeesRepository.cs`, `EmployeesRepository.cs`
- Servicio: `IEmployeesService.cs`, `EmployeesServiceOracle.cs`
- Controlador: `EmployeesController.cs`
- ViewModel: `EmployeeViewModel.cs`
- Parseador: `EmployeeParseador.cs`
- Vistas: `Views/Employees/`
- JavaScript: `Scripts/Employees/Employees.js`

## Requisitos

- .NET SDK 8.0.300 o superior (Windows) / 8.0.417 o superior (Mac)
- Git
- IDE: Visual Studio (Windows), Rider (Mac), o VS Code (cualquier plataforma)
- Base de datos: Oracle Database (local o remota)

## Inicio Rápido

### Primera vez

1. Instalar herramientas necesarias: [src/AdministracionFlotillas.Web/docs/GET_STARTED/INSTALACION_HERRAMIENTAS.md](src/AdministracionFlotillas.Web/docs/GET_STARTED/INSTALACION_HERRAMIENTAS.md)
2. Clonar el repositorio: [src/AdministracionFlotillas.Web/docs/GET_STARTED/CLONAR_REPOSITORIO.md](src/AdministracionFlotillas.Web/docs/GET_STARTED/CLONAR_REPOSITORIO.md)
3. Restaurar dependencias y compilar:
   ```bash
   dotnet restore
   dotnet build
   ```
4. Ejecutar la aplicación:
   ```bash
   cd src/AdministracionFlotillas.Web
   dotnet run
   ```

### Windows con Visual Studio

Seguir la guía específica: [src/AdministracionFlotillas.Web/docs/GET_STARTED/INICIO_RAPIDO_WINDOWS.md](src/AdministracionFlotillas.Web/docs/GET_STARTED/INICIO_RAPIDO_WINDOWS.md)

## Documentación

Toda la documentación está en la carpeta [src/AdministracionFlotillas.Web/docs/](src/AdministracionFlotillas.Web/docs/). El archivo [src/AdministracionFlotillas.Web/docs/README.md](src/AdministracionFlotillas.Web/docs/README.md) contiene un índice completo de todos los documentos disponibles.

### Documentos Principales

- [src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ESTADO_IMPLEMENTACION_ACTUAL.md](src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ESTADO_IMPLEMENTACION_ACTUAL.md) - **ESTADO ACTUAL** - Todo lo implementado, funcionando y en uso, con referencias a archivos específicos
- [src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md](src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md) - Estructura actual del proyecto, arquitectura basada en módulos, sistema de bundles y componentes implementados
- [src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ARQUITECTURA.md](src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ARQUITECTURA.md) - Arquitectura del proyecto, diagramas y flujos
- [src/AdministracionFlotillas.Web/docs/UI/PLAN_MIGRACION_UI.md](src/AdministracionFlotillas.Web/docs/UI/PLAN_MIGRACION_UI.md) - Plan de migración a Syncfusion (**EN PAUSA - Esperando aprobación de licencia**)

### Guías de Inicio

- [src/AdministracionFlotillas.Web/docs/GET_STARTED/CLONAR_REPOSITORIO.md](src/AdministracionFlotillas.Web/docs/GET_STARTED/CLONAR_REPOSITORIO.md) - Guía para clonar y configurar el repositorio
- [src/AdministracionFlotillas.Web/docs/GET_STARTED/INSTALACION_HERRAMIENTAS.md](src/AdministracionFlotillas.Web/docs/GET_STARTED/INSTALACION_HERRAMIENTAS.md) - Instalación de herramientas necesarias
- [src/AdministracionFlotillas.Web/docs/GET_STARTED/INICIO_RAPIDO_WINDOWS.md](src/AdministracionFlotillas.Web/docs/GET_STARTED/INICIO_RAPIDO_WINDOWS.md) - Guía específica para Windows con Visual Studio
- [src/AdministracionFlotillas.Web/docs/GET_STARTED/QUICK_START_CROSS_PLATFORM.md](src/AdministracionFlotillas.Web/docs/GET_STARTED/QUICK_START_CROSS_PLATFORM.md) - Inicio rápido multiplataforma

### Compatibilidad y Configuración

- [src/AdministracionFlotillas.Web/docs/CONFIGURACION/COMPATIBILIDAD_CROSS_PLATFORM.md](src/AdministracionFlotillas.Web/docs/CONFIGURACION/COMPATIBILIDAD_CROSS_PLATFORM.md) - Compatibilidad entre Windows y Mac
- [src/AdministracionFlotillas.Web/docs/CONFIGURACION/DIAGNOSTICO_SDK.md](src/AdministracionFlotillas.Web/docs/CONFIGURACION/DIAGNOSTICO_SDK.md) - Diagnóstico de problemas con el SDK
- [src/AdministracionFlotillas.Web/docs/CONFIGURACION/SOLUCION_COMPATIBILIDAD_SDK.md](src/AdministracionFlotillas.Web/docs/CONFIGURACION/SOLUCION_COMPATIBILIDAD_SDK.md) - Soluciones a problemas de compatibilidad
- [src/AdministracionFlotillas.Web/docs/CONFIGURACION/INSTALAR_RUNTIME_NET8.md](src/AdministracionFlotillas.Web/docs/CONFIGURACION/INSTALAR_RUNTIME_NET8.md) - Instalación del runtime de .NET 8

### Base de Datos

- [src/AdministracionFlotillas.Web/docs/BASE_DATOS/GUIA_BASE_DATOS.md](src/AdministracionFlotillas.Web/docs/BASE_DATOS/GUIA_BASE_DATOS.md) - Configuración de base de datos Oracle
- [src/AdministracionFlotillas.Web/docs/BASE_DATOS/ORACLE_XE_LOCAL.md](src/AdministracionFlotillas.Web/docs/BASE_DATOS/ORACLE_XE_LOCAL.md) - Instalación de Oracle XE local
- [src/AdministracionFlotillas.Web/scripts/](src/AdministracionFlotillas.Web/scripts/) - Scripts SQL para la base de datos

### Desarrollo

- [src/AdministracionFlotillas.Web/docs/DESARROLLO/COMANDOS_UTILES.md](src/AdministracionFlotillas.Web/docs/DESARROLLO/COMANDOS_UTILES.md) - Comandos útiles para desarrollo
- [src/AdministracionFlotillas.Web/docs/DESARROLLO/GUIA_GIT.md](src/AdministracionFlotillas.Web/docs/DESARROLLO/GUIA_GIT.md) - Guía de Git con conceptos básicos y buenas prácticas
- [src/AdministracionFlotillas.Web/docs/DESARROLLO/EJERCICIOS_PRACTICA.md](src/AdministracionFlotillas.Web/docs/DESARROLLO/EJERCICIOS_PRACTICA.md) - Ejercicios de práctica progresivos

## Tecnologías

### Backend
- .NET 8.0 SDK - Framework multiplataforma
- ASP.NET Core MVC 8.0 - Patrón Model-View-Controller
- C# - Lenguaje de programación
- Microsoft.AspNetCore.Mvc.NewtonsoftJson 8.0.11 - Serialización JSON para AJAX
- BuildBundlerMinifier 3.2.449 - Generación de bundles JavaScript

### Frontend
- Bootstrap 5 - Framework CSS y componentes JavaScript
- jQuery 3.7.1 - Biblioteca JavaScript
- jQuery UI 1.13.2 - Componentes de interfaz (Datepicker)
- DataTables 1.13.7 - Framework de tablas JavaScript con paginación, ordenamiento y búsqueda
- DataTables Buttons 2.4.2 - Extensión para exportación (Excel, PDF, Print)
- DataTables Responsive 2.5.0 - Extensión para diseño responsive
- Font Awesome 5.15.4 - Librería de iconos
- SweetAlert2 11 - Alertas personalizadas
- Inputmask 5.0.8 - Formato de inputs (moneda)
- jsZip 3.10.1 - Requerido por DataTables Buttons para exportación Excel
- pdfmake 0.1.53 - Requerido por DataTables Buttons para exportación PDF

## Compatibilidad Multiplataforma

El proyecto está configurado para funcionar en Windows y Mac simultáneamente. La configuración permite que ambos sistemas trabajen con el mismo código sin problemas de compatibilidad.

Para más información sobre compatibilidad, ver [src/AdministracionFlotillas.Web/docs/CONFIGURACION/COMPATIBILIDAD_CROSS_PLATFORM.md](src/AdministracionFlotillas.Web/docs/CONFIGURACION/COMPATIBILIDAD_CROSS_PLATFORM.md).

## Comandos Básicos

```bash
# Restaurar dependencias
dotnet restore

# Compilar el proyecto
dotnet build

# Ejecutar la aplicación
dotnet run --project src/AdministracionFlotillas.Web

# Limpiar compilaciones anteriores
dotnet clean
```

## Estructura de Capas y Módulos

El proyecto sigue una arquitectura en capas organizada por módulos funcionales:

1. **Capa de Aplicación (Web)**: Controladores MVC, vistas, ViewModels, parseadores y scripts JavaScript organizados por módulo
2. **Capa de Reglas de Negocio**: Servicios y lógica de negocio por módulo
3. **Capa de Acceso a Datos**: Repositorios e interfaces de acceso a datos por módulo
4. **Modelos Comunes**: Modelos compartidos entre capas (uno por módulo)

### Sistema de Bundles

El proyecto utiliza bundles JavaScript para optimizar el rendimiento:
- Los bundles combinan y minifican múltiples archivos JavaScript en uno solo
- Se generan automáticamente durante la compilación
- Configuración en `bundleconfig.json`
- Los bundles se encuentran en `wwwroot/js/bundles/`

Para más detalles sobre la arquitectura, módulos y bundles, ver [src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md](src/AdministracionFlotillas.Web/docs/ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md).

---

**Última actualización**: Enero 2026
