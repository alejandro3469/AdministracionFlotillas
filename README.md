# AdministracionFlotillas

Aplicación web multiplataforma para administración de flotillas desarrollada con .NET 8.0 y arquitectura en capas.

## Descripción

Este proyecto implementa una aplicación web para la administración de flotillas utilizando ASP.NET Core MVC con una arquitectura en tres capas: aplicación web, reglas de negocio y acceso a datos.

## Estructura del Proyecto

```
AdministracionFlotillas/
├── src/
│   ├── AdministracionFlotillas.Web/              # Capa de aplicación (MVC)
│   ├── AdministracionFlotillas.ReglasNegocio/     # Capa de reglas de negocio
│   ├── AdministracionFlotillas.AccesoDatos/       # Capa de acceso a datos
│   └── AdministracionFlotillas.ModelosComunes/   # Modelos compartidos
├── docs/                                          # Documentación del proyecto
└── global.json                                    # Configuración del SDK de .NET
```

## Requisitos

- .NET SDK 8.0.300 o superior
- Git
- IDE: Visual Studio (Windows), Rider (Mac), o VS Code (cualquier plataforma)
- Base de datos: Oracle Database (local o remota)

## Inicio Rápido

### Primera vez

1. Instalar herramientas necesarias: [docs/INSTALACION_HERRAMIENTAS.md](docs/INSTALACION_HERRAMIENTAS.md)
2. Clonar el repositorio: [docs/CLONAR_REPOSITORIO.md](docs/CLONAR_REPOSITORIO.md)
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

Seguir la guía específica: [docs/INICIO_RAPIDO_WINDOWS.md](docs/INICIO_RAPIDO_WINDOWS.md)

## Documentación

Toda la documentación está en la carpeta [docs/](docs/). El archivo [docs/README.md](docs/README.md) contiene un índice completo de todos los documentos disponibles.

### Documentos Principales

- [docs/README.md](docs/README.md) - Índice de documentación
- [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) - Arquitectura del proyecto, diagramas y flujos
- [docs/REQUISITOS_PROYECTO.md](docs/REQUISITOS_PROYECTO.md) - Requisitos completos del proyecto
- [docs/ESTADO_PROYECTO.md](docs/ESTADO_PROYECTO.md) - Estado actual del proyecto
- [docs/ESTRUCTURA_VISTAS.md](docs/ESTRUCTURA_VISTAS.md) - Estructura y componentes de las vistas

### Guías de Inicio

- [docs/CLONAR_REPOSITORIO.md](docs/CLONAR_REPOSITORIO.md) - Guía para clonar y configurar el repositorio
- [docs/INSTALACION_HERRAMIENTAS.md](docs/INSTALACION_HERRAMIENTAS.md) - Instalación de herramientas necesarias
- [docs/INICIO_RAPIDO_WINDOWS.md](docs/INICIO_RAPIDO_WINDOWS.md) - Guía específica para Windows con Visual Studio
- [docs/QUICK_START_CROSS_PLATFORM.md](docs/QUICK_START_CROSS_PLATFORM.md) - Inicio rápido multiplataforma
- [docs/SETUP.md](docs/SETUP.md) - Configuración inicial del proyecto

### Compatibilidad y Configuración

- [docs/COMPATIBILIDAD_CROSS_PLATFORM.md](docs/COMPATIBILIDAD_CROSS_PLATFORM.md) - Compatibilidad entre Windows y Mac
- [docs/DIAGNOSTICO_SDK.md](docs/DIAGNOSTICO_SDK.md) - Diagnóstico de problemas con el SDK
- [docs/SOLUCION_COMPATIBILIDAD_SDK.md](docs/SOLUCION_COMPATIBILIDAD_SDK.md) - Soluciones a problemas de compatibilidad
- [docs/INSTALAR_RUNTIME_NET8.md](docs/INSTALAR_RUNTIME_NET8.md) - Instalación del runtime de .NET 8

### Base de Datos

- [docs/GUIA_BASE_DATOS.md](docs/GUIA_BASE_DATOS.md) - Configuración de base de datos Oracle
- [docs/ORACLE_XE_LOCAL.md](docs/ORACLE_XE_LOCAL.md) - Instalación de Oracle XE local
- [docs/scripts/](docs/scripts/) - Scripts SQL para la base de datos

### Desarrollo

- [docs/COMO_CONTINUAR.md](docs/COMO_CONTINUAR.md) - Guía para continuar el desarrollo
- [docs/EJERCICIOS_PRACTICA.md](docs/EJERCICIOS_PRACTICA.md) - Ejercicios de práctica progresivos
- [docs/COMANDOS_UTILES.md](docs/COMANDOS_UTILES.md) - Comandos útiles para desarrollo

### Referencia

- [docs/SEGUIMIENTO_PROGRESO.md](docs/SEGUIMIENTO_PROGRESO.md) - Seguimiento del progreso del proyecto
- [docs/NOTAS.md](docs/NOTAS.md) - Notas y recordatorios
- [docs/PLAN_ANTES_COMPARTIR_REPO.md](docs/PLAN_ANTES_COMPARTIR_REPO.md) - Plan de implementación del proyecto

## Tecnologías

- .NET 8.0 - Framework multiplataforma
- ASP.NET Core MVC - Patrón Model-View-Controller
- C# - Lenguaje de programación
- Oracle Database - Base de datos
- DataTables - Framework de tablas JavaScript
- Bootstrap 5 - Framework CSS
- Font Awesome 5 - Librería de iconos
- SweetAlert2 - Alertas personalizadas
- jQuery UI - Componentes de interfaz
- Inputmask - Formato de inputs

## Compatibilidad Multiplataforma

El proyecto está configurado para funcionar en Windows y Mac simultáneamente. La configuración permite que ambos sistemas trabajen con el mismo código sin problemas de compatibilidad.

Para más información sobre compatibilidad, ver [docs/COMPATIBILIDAD_CROSS_PLATFORM.md](docs/COMPATIBILIDAD_CROSS_PLATFORM.md).

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

## Estructura de Capas

El proyecto sigue una arquitectura en capas:

1. **Capa de Aplicación (Web)**: Controladores MVC, vistas, ViewModels
2. **Capa de Reglas de Negocio**: Servicios y lógica de negocio
3. **Capa de Acceso a Datos**: Repositorios e interfaces de acceso a datos
4. **Modelos Comunes**: Modelos compartidos entre capas

Para más detalles sobre la arquitectura, ver [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).
