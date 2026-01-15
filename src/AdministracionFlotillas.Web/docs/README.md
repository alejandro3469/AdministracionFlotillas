# Índice de Documentación

Este documento es un índice de toda la documentación disponible del proyecto AdministracionFlotillas. Toda la documentación está en español.

## Documentos Principales

- [ESTRUCTURA_ACTUAL_PROYECTO.md](../ESTRUCTURA_ACTUAL_PROYECTO.md) - **LEER PRIMERO** - Estructura actual del proyecto, arquitectura basada en módulos, sistema de bundles, componentes implementados y explicación de conceptos fundamentales
- [ESTADO_IMPLEMENTACION_ACTUAL.md](../ESTADO_IMPLEMENTACION_ACTUAL.md) - **ESTADO ACTUAL** - Todo lo que está implementado, funcionando y en uso actualmente, con referencias a archivos y rutas específicas
- [ARQUITECTURA.md](../ARQUITECTURA.md) - Arquitectura del proyecto, diagramas, flujos de datos y estructura en capas
- [REQUISITOS_PROYECTO.md](../REQUISITOS_PROYECTO.md) - Requisitos completos del proyecto, tecnologías y estructura

## Guías de Inicio

- [CLONAR_REPOSITORIO.md](../CLONAR_REPOSITORIO.md) - Guía paso a paso para clonar el repositorio y configurarlo
- [INSTALACION_HERRAMIENTAS.md](../INSTALACION_HERRAMIENTAS.md) - Guía de instalación de herramientas necesarias
- [INICIO_RAPIDO_WINDOWS.md](../INICIO_RAPIDO_WINDOWS.md) - Guía específica para Windows con Visual Studio
- [QUICK_START_CROSS_PLATFORM.md](../QUICK_START_CROSS_PLATFORM.md) - Inicio rápido multiplataforma

## Compatibilidad y Configuración

- [COMPATIBILIDAD_CROSS_PLATFORM.md](../COMPATIBILIDAD_CROSS_PLATFORM.md) - Compatibilidad entre Windows y Mac, configuración de versiones
- [DIAGNOSTICO_SDK.md](../DIAGNOSTICO_SDK.md) - Comandos de diagnóstico para problemas con el SDK
- [SOLUCION_COMPATIBILIDAD_SDK.md](../SOLUCION_COMPATIBILIDAD_SDK.md) - Soluciones a problemas de compatibilidad del SDK
- [INSTALAR_RUNTIME_NET8.md](../INSTALAR_RUNTIME_NET8.md) - Instalación del runtime de .NET 8

## Base de Datos

- [GUIA_BASE_DATOS.md](../GUIA_BASE_DATOS.md) - Guía de configuración de base de datos Oracle
- [ORACLE_XE_LOCAL.md](../ORACLE_XE_LOCAL.md) - Guía para instalar Oracle XE localmente
- [../scripts/](../scripts/) - Scripts SQL para migración y configuración de base de datos

## Desarrollo

- [COMANDOS_UTILES.md](../COMANDOS_UTILES.md) - Comandos útiles para desarrollo diario
- [GUIA_GIT.md](../GUIA_GIT.md) - Guía de Git con conceptos básicos, buenas prácticas y flujo de trabajo recomendado
- [EJERCICIOS_PRACTICA.md](../EJERCICIOS_PRACTICA.md) - Ejercicios de práctica progresivos con diferentes niveles de dificultad

## Migración UI (En Pausa)

- [SELECCION_UI_LIBRARY.md](../SELECCION_UI_LIBRARY.md) - Selección de biblioteca UI basada en requisitos específicos del proyecto
- [COMPONENTES_SYNCFUSION.md](../COMPONENTES_SYNCFUSION.md) - Componentes Syncfusion: guía visual, capacidades y ejemplos de uso
- [LICENCIA_SYNCFUSION.md](../LICENCIA_SYNCFUSION.md) - Información detallada sobre la Community License: gratuita permanente, requisitos y preguntas frecuentes
- [PROCESO_SOLICITUD_LICENCIA.md](../PROCESO_SOLICITUD_LICENCIA.md) - Guía paso a paso del proceso real de solicitud de Community License (incluye clave de 7 días y validación)
- [PLAN_MIGRACION_UI.md](../PLAN_MIGRACION_UI.md) - Plan detallado de migración de UI actual a Syncfusion ASP.NET Core MVC (**EN PAUSA - Esperando aprobación de licencia**)
- [GUIA_PREPARACION_MIGRACION.md](../GUIA_PREPARACION_MIGRACION.md) - **PREPARACIÓN ACTIVA** - Guía de tareas que se pueden adelantar mientras se espera la aprobación de la licencia
- [VERIFICACION_DOCUMENTACION.md](../VERIFICACION_DOCUMENTACION.md) - Verificación de que toda la documentación está actualizada, correctamente referenciada y alineada con la documentación oficial

## Flujo Recomendado de Lectura

### Para nuevos miembros del equipo

1. [INSTALACION_HERRAMIENTAS.md](../INSTALACION_HERRAMIENTAS.md) - Instalar herramientas necesarias
2. [CLONAR_REPOSITORIO.md](../CLONAR_REPOSITORIO.md) - Clonar y configurar el repositorio
3. [ESTRUCTURA_ACTUAL_PROYECTO.md](../ESTRUCTURA_ACTUAL_PROYECTO.md) - **IMPORTANTE** - Entender la estructura actual, arquitectura basada en módulos y sistema de bundles
4. [ESTADO_IMPLEMENTACION_ACTUAL.md](../ESTADO_IMPLEMENTACION_ACTUAL.md) - **ESTADO ACTUAL** - Ver qué está implementado, funcionando y en uso actualmente
5. [ARQUITECTURA.md](../ARQUITECTURA.md) - Entender la arquitectura completa del proyecto
6. [EJERCICIOS_PRACTICA.md](../EJERCICIOS_PRACTICA.md) - Practicar con ejercicios progresivos

### Para desarrolladores

1. [ESTRUCTURA_ACTUAL_PROYECTO.md](../ESTRUCTURA_ACTUAL_PROYECTO.md) - Entender la estructura de módulos y cómo organizar código
2. [ESTADO_IMPLEMENTACION_ACTUAL.md](../ESTADO_IMPLEMENTACION_ACTUAL.md) - Ver qué está implementado y funcionando
3. [GUIA_GIT.md](../GUIA_GIT.md) - Aprender conceptos básicos de Git y buenas prácticas para commits
4. [COMANDOS_UTILES.md](../COMANDOS_UTILES.md) - Comandos útiles para desarrollo diario

## Conceptos Clave Explicados en la Documentación

### Arquitectura Basada en Módulos
La aplicación está organizada en módulos funcionales. Cada módulo agrupa funcionalidad relacionada y mantiene una estructura consistente a través de todas las capas. Los archivos de cada módulo comparten el mismo nombre base para facilitar la organización.

**Ejemplo**: El módulo `Employees` tiene archivos con el mismo nombre base en todas las capas:
- `Employee.cs` (Modelo)
- `EmployeesRepository.cs` (Repositorio)
- `EmployeesServiceOracle.cs` (Servicio)
- `EmployeesController.cs` (Controlador)
- `EmployeeViewModel.cs` (ViewModel)
- `EmployeeParseador.cs` (Parseador)
- `Scripts/Employees/Employees.js` (JavaScript)

### Sistema de Bundles
Los bundles son archivos JavaScript combinados y minificados que agrupan múltiples archivos fuente en uno solo optimizado para producción. Se generan automáticamente durante la compilación y mejoran el rendimiento al reducir el número de peticiones HTTP.

**Configuración**: `bundleconfig.json`
**Herramienta**: BuildBundlerMinifier (3.2.449)
**Bundles actuales**:
- `wwwroot/js/bundles/common.min.js` - Utilidades comunes
- `wwwroot/js/bundles/employees.min.js` - Funcionalidad del módulo Employees

### Namespaces en JavaScript
Los namespaces son objetos que agrupan funcionalidad relacionada, evitando conflictos de nombres y organizando el código de manera jerárquica. Ejemplo: `Employees.Table.Reload()`, `Employees.Filters.Apply()`.

### Inyección de Dependencias
El proyecto usa inyección de dependencias de ASP.NET Core para registrar y resolver servicios, repositorios y otros componentes. Esto facilita el testing y mantiene el código desacoplado.

### Control de Versiones con Git
Git permite rastrear cambios en el proyecto. Los mensajes de commit deben ser breves (menos de 10 palabras) y descriptivos para facilitar la identificación de cambios en el historial. Ver [GUIA_GIT.md](../GUIA_GIT.md) para más detalles.

## Notas Importantes

- Toda la documentación está en español
- La documentación refleja solo lo que está actualmente implementado y en uso
- El módulo Employees es el único completamente implementado y sirve como referencia
- Los bundles se generan automáticamente durante `dotnet build`
- Los archivos JavaScript están organizados por módulo en `Scripts/[Modulo]/`
- La migración a Syncfusion está en pausa esperando aprobación de licencia (Ticket #803702)

---

**Última actualización**: Enero 2026
