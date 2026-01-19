# Índice de Documentación - AdministracionFlotillas

## Propósito

Este documento sirve como índice centralizado de toda la documentación del proyecto AdministracionFlotillas, organizada por categorías para facilitar la navegación y el acceso rápido a la información necesaria.

**Última actualización**: 2026-01-18

## Estructura de Documentación

```
docs/
├── ARQUITECTURA/          # Arquitectura y estructura del proyecto
├── BASE_DATOS/            # Documentación de base de datos Oracle
├── CONFIGURACION/         # Configuración y setup
├── DESARROLLO/            # Guías de desarrollo
├── GET_STARTED/           # Guías de inicio rápido
└── UI/                    # Documentación de componentes Syncfusion
```

## Documentación por Categoría

### 🏗️ Arquitectura y Estructura

**Ubicación**: `docs/ARQUITECTURA/`

- **[ARQUITECTURA.md](ARQUITECTURA/ARQUITECTURA.md)**
  - Arquitectura general del proyecto
  - Capas y responsabilidades
  - Patrones de diseño utilizados

- **[ESTADO_IMPLEMENTACION_ACTUAL.md](ARQUITECTURA/ESTADO_IMPLEMENTACION_ACTUAL.md)**
  - Estado actual de implementación
  - Funcionalidades completadas
  - Funcionalidades pendientes

- **[ESTRUCTURA_ACTUAL_PROYECTO.md](ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md)**
  - Estructura de carpetas y archivos
  - Organización del código
  - Convenciones de nomenclatura

- **[REQUISITOS_PROYECTO.md](ARQUITECTURA/REQUISITOS_PROYECTO.md)**
  - Requisitos del proyecto
  - Alcance y objetivos

### 🗄️ Base de Datos

**Ubicación**: `docs/BASE_DATOS/`

- **[GUIA_BASE_DATOS.md](BASE_DATOS/GUIA_BASE_DATOS.md)**
  - Guía general de base de datos
  - Configuración y conexión

- **[ORACLE_CLOUD_SAMPLE_SCHEMAS.md](BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)**
  - Configuración de Oracle Cloud Always Free
  - Instalación del Sample Schema CO
  - Configuración de conexión

- **[ORACLE_XE_LOCAL.md](BASE_DATOS/ORACLE_XE_LOCAL.md)**
  - Configuración de Oracle XE local
  - Alternativa a Oracle Cloud

- **[REGLAS_NEGOCIO_SCHEMA_CO.md](BASE_DATOS/REGLAS_NEGOCIO_SCHEMA_CO.md)** ⭐ **NUEVO**
  - Reglas de negocio completas basadas en schema CO
  - Validaciones por entidad
  - Ejemplos de implementación en todas las capas
  - Stored procedures con validaciones

### ⚙️ Configuración

**Ubicación**: `docs/CONFIGURACION/`

- **[COMPATIBILIDAD_CROSS_PLATFORM.md](CONFIGURACION/COMPATIBILIDAD_CROSS_PLATFORM.md)**
  - Compatibilidad entre plataformas
  - Configuración para Mac/Windows

- **[DIAGNOSTICO_SDK.md](CONFIGURACION/DIAGNOSTICO_SDK.md)**
  - Diagnóstico de problemas con SDK
  - Solución de errores comunes

- **[INSTALAR_RUNTIME_NET8.md](CONFIGURACION/INSTALAR_RUNTIME_NET8.md)**
  - Instalación de .NET 8 Runtime
  - Verificación de instalación

- **[SOLUCION_COMPATIBILIDAD_SDK.md](CONFIGURACION/SOLUCION_COMPATIBILIDAD_SDK.md)**
  - Soluciones a problemas de compatibilidad
  - Configuración de SDK

### 💻 Desarrollo

**Ubicación**: `docs/DESARROLLO/`

- **[COMANDOS_UTILES.md](DESARROLLO/COMANDOS_UTILES.md)**
  - Comandos útiles para desarrollo
  - Scripts y herramientas

- **[COMO_CONTINUAR.md](DESARROLLO/COMO_CONTINUAR.md)**
  - Guía de continuación del desarrollo
  - Próximos pasos

- **[EJERCICIOS_PRACTICA.md](DESARROLLO/EJERCICIOS_PRACTICA.md)**
  - Ejercicios prácticos
  - Casos de estudio

- **[ESTRUCTURA_VISTAS.md](DESARROLLO/ESTRUCTURA_VISTAS.md)**
  - Estructura de vistas
  - Organización de archivos

- **[GUIA_GIT.md](DESARROLLO/GUIA_GIT.md)**
  - Guía de uso de Git
  - Flujo de trabajo

### 🚀 Inicio Rápido

**Ubicación**: `docs/GET_STARTED/`

- **[CLONAR_REPOSITORIO.md](GET_STARTED/CLONAR_REPOSITORIO.md)**
  - Cómo clonar el repositorio
  - Configuración inicial

- **[INICIO_RAPIDO_WINDOWS.md](GET_STARTED/INICIO_RAPIDO_WINDOWS.md)**
  - Inicio rápido para Windows
  - Pasos de configuración

- **[INSTALACION_HERRAMIENTAS.md](GET_STARTED/INSTALACION_HERRAMIENTAS.md)**
  - Instalación de herramientas necesarias
  - Requisitos del sistema

- **[QUICK_START.md](GET_STARTED/QUICK_START.md)**
  - Inicio rápido general
  - Pasos básicos

- **[QUICK_START_CROSS_PLATFORM.md](GET_STARTED/QUICK_START_CROSS_PLATFORM.md)**
  - Inicio rápido multiplataforma
  - Mac y Windows

- **[SETUP.md](GET_STARTED/SETUP.md)**
  - Configuración inicial completa
  - Setup del proyecto

### 🎨 Componentes UI - Syncfusion

**Ubicación**: `docs/UI/`

- **[COMPONENTES_SYNCFUSION.md](UI/COMPONENTES_SYNCFUSION.md)**
  - Componentes Syncfusion disponibles
  - Uso básico de componentes

- **[GUIA_CREACION_MODULO_SYNCFUSION.md](UI/GUIA_CREACION_MODULO_SYNCFUSION.md)**
  - Guía paso a paso para crear módulos
  - Estructura completa de módulo
  - Ejemplos prácticos

- **[FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md](UI/FUNCIONALIDADES_GRID_SYNCFUSION_REGLAS_NEGOCIO.md)** ⭐ **NUEVO - COMPLETO**
  - Documento completo de todas las funcionalidades del Grid Syncfusion
  - Decisiones basadas en reglas de negocio para cada funcionalidad
  - Estado de implementación (✅ Implementado, ⏳ Pendiente, ❌ No aplicable)
  - Plan de implementación por fases
  - Referencias a reglas de negocio específicas (RN-GRID-XXX)
  - Aplicabilidad por módulo (Órdenes, Productos, Clientes, etc.)

- **[GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md](UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md)** ⭐ **NUEVO - COMPLETO**
  - Guía completa de funcionalidades avanzadas
  - Grid avanzado (agrupación, agregaciones, edición)
  - Dialog, Toast, ProgressBar
  - Charts avanzados
  - Query Builder, Kanban, Scheduler
  - Ejemplos de código completos en todas las capas
  - Reglas de negocio integradas
  - Stored procedures con ejemplos

- **[GUIA_NUEVAS_FUNCIONALIDADES_VISTAS.md](UI/GUIA_NUEVAS_FUNCIONALIDADES_VISTAS.md)** ⭐ **NUEVO**
  - 6 nuevas vistas documentadas:
    - Análisis de Ventas por Tienda
    - Gestión de Inventario
    - Reporte de Ventas por Cliente
    - Análisis de Productos
    - Dashboard de Envíos
    - Reporte de Empleados
  - Ejemplos completos de implementación
  - Stored procedures necesarios

- **[GUIA_PREPARACION_MIGRACION.md](UI/GUIA_PREPARACION_MIGRACION.md)**
  - Preparación para migración de UI
  - Checklist de migración

- **[INSTALACION_POST_APROBACION.md](UI/INSTALACION_POST_APROBACION.md)**
  - Instalación después de aprobación
  - Configuración de licencia

- **[LICENCIA_SYNCFUSION.md](UI/LICENCIA_SYNCFUSION.md)**
  - Información sobre licencia Syncfusion
  - Cómo obtener licencia

- **[PLAN_MIGRACION_UI.md](UI/PLAN_MIGRACION_UI.md)**
  - Plan de migración de UI
  - Estrategia de migración

- **[PROCESO_SOLICITUD_LICENCIA.md](UI/PROCESO_SOLICITUD_LICENCIA.md)**
  - Proceso para solicitar licencia
  - Pasos a seguir

- **[RECOMENDACIONES_UI_LIBRARIES.md](UI/RECOMENDACIONES_UI_LIBRARIES.md)**
  - Recomendaciones de librerías UI
  - Comparación de opciones

- **[SELECCION_UI_LIBRARY.md](UI/SELECCION_UI_LIBRARY.md)**
  - Selección de librería UI
  - Criterios de selección

- **[VERIFICACION_DOCUMENTACION.md](UI/VERIFICACION_DOCUMENTACION.md)**
  - Verificación de documentación
  - Checklist de verificación

## Documentación en Raíz del Proyecto

**Ubicación**: `/` (raíz del proyecto)

- **[DOCUMENTACION_MAESTRA.md](../../../DOCUMENTACION_MAESTRA.md)** ⭐ **LEER PRIMERO**
  - Estado completo del proyecto
  - Módulos implementados
  - Tecnologías utilizadas
  - Mejoras recientes
  - Guías de inicio rápido

- **[MEJORAS_NAVEGACION_UI_UX.md](../../../MEJORAS_NAVEGACION_UI_UX.md)** ⭐ **NUEVO**
  - Mejoras de navegación implementadas
  - Navbar mejorado
  - Breadcrumbs con indicadores
  - CSS y JavaScript de navegación
  - Responsive y accesibilidad

- **[IMPLEMENTACION_COMPLETA.md](../../../IMPLEMENTACION_COMPLETA.md)**
  - Resumen de implementación completa
  - Módulos creados
  - Estadísticas del proyecto

## Guías Principales Recomendadas

### Para Empezar
1. **[GET_STARTED/QUICK_START.md](GET_STARTED/QUICK_START.md)** - Inicio rápido
2. **[BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)** - Configurar base de datos
3. **[UI/GUIA_CREACION_MODULO_SYNCFUSION.md](UI/GUIA_CREACION_MODULO_SYNCFUSION.md)** - Crear primer módulo

### Para Desarrollo Avanzado
1. **[UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md](UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md)** - Funcionalidades avanzadas
2. **[BASE_DATOS/REGLAS_NEGOCIO_SCHEMA_CO.md](BASE_DATOS/REGLAS_NEGOCIO_SCHEMA_CO.md)** - Reglas de negocio
3. **[UI/GUIA_NUEVAS_FUNCIONALIDADES_VISTAS.md](UI/GUIA_NUEVAS_FUNCIONALIDADES_VISTAS.md)** - Nuevas vistas

### Para Referencia
1. **[PLAN_EXPANSION_SYNCFUSION.md](../../../PLAN_EXPANSION_SYNCFUSION.md)** - Plan completo
2. **[ARQUITECTURA/ARQUITECTURA.md](ARQUITECTURA/ARQUITECTURA.md)** - Arquitectura del proyecto
3. **[ARQUITECTURA/ESTADO_IMPLEMENTACION_ACTUAL.md](ARQUITECTURA/ESTADO_IMPLEMENTACION_ACTUAL.md)** - Estado actual

## Convenciones de Nomenclatura

Toda la documentación sigue estas convenciones:

- **Español**: Todos los nombres, métodos, variables en español
- **PascalCase**: Clases, métodos, propiedades
- **camelCase**: Variables, parámetros
- **Nombres descriptivos**: Nombres que explican su propósito

Ver **[ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md](ARQUITECTURA/ESTRUCTURA_ACTUAL_PROYECTO.md)** para más detalles.

## Base de Datos

**Schema**: `CO` (Customer Orders)  
**Usuario de Aplicación**: `FLOTILLAS_APP`  
**Ubicación**: Oracle Cloud Always Free o Oracle XE Local

Ver **[BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md](BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md)** para configuración completa.

## Stack Tecnológico

- **Framework**: ASP.NET Core MVC 8.0
- **UI Library**: Syncfusion EJ2
- **Base de Datos**: Oracle Database (Sample Schema CO)
- **ORM**: Oracle Managed Data Access
- **Arquitectura**: Capas (Web, ReglasNegocio, AccesoDatos, ModelosComunes)

## Próximos Pasos Recomendados

1. **Implementar funcionalidades avanzadas del Grid**
   - Agrupación y agregaciones
   - Edición inline
   - Ver: [GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md](UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md)

2. **Implementar componentes de UI**
   - Dialog para crear/editar
   - Toast notifications
   - ProgressBar
   - Ver: [GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md](UI/GUIA_FUNCIONALIDADES_AVANZADAS_SYNCFUSION.md)

3. **Crear nuevas vistas de análisis**
   - Análisis de Ventas por Tienda
   - Gestión de Inventario
   - Ver: [GUIA_NUEVAS_FUNCIONALIDADES_VISTAS.md](UI/GUIA_NUEVAS_FUNCIONALIDADES_VISTAS.md)

4. **Implementar reglas de negocio**
   - Validaciones en stored procedures
   - Validaciones en servicios
   - Ver: [REGLAS_NEGOCIO_SCHEMA_CO.md](BASE_DATOS/REGLAS_NEGOCIO_SCHEMA_CO.md)

## Contribuir a la Documentación

Al agregar nueva documentación:

1. Coloca el archivo en la categoría apropiada
2. Actualiza este índice
3. Sigue las convenciones de nomenclatura
4. Incluye ejemplos de código cuando sea posible
5. Mantén el estilo atemporal (sin fechas específicas)

## Referencias Externas

- [Syncfusion Documentation](https://help.syncfusion.com/aspnet-core)
- [Oracle Sample Schemas](https://github.com/oracle-samples/db-sample-schemas)
- [ASP.NET Core Documentation](https://learn.microsoft.com/aspnet/core)

---

**Última actualización**: Enero 2026  
**Versión**: 2.0  
**Propósito**: Enseñanza y desarrollo
