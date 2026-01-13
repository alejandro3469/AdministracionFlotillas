# Requisitos del Proyecto AdministracionFlotillas

## Compatibilidad Multiplataforma

**.NET 10.0.101** - **MULTIPLATAFORMA**
- **Mac**: Rider, DataGrip (Desarrollador principal)
- **Windows**: VS Code, Visual Studio (Equipo de desarrollo)
- **Linux**: VS Code (también compatible)
- Mismo código funciona en todos los sistemas
- Mismos comandos dotnet (solo cambian rutas de archivos)
- Misma base de datos remota accesible desde todos los sistemas

**Confirmación de compatibilidad:**
- Los usuarios de Windows pueden clonar el repositorio sin problemas
- Los mismos comandos `dotnet restore`, `dotnet build`, `dotnet run` funcionan en Windows
- No se requiere .NET Framework, solo .NET (Core) 10.0.101
- El proyecto compila y ejecuta correctamente en Windows

## Diagrama de Arquitectura

Para ver diagramas detallados de la arquitectura, flujos de datos y estructura del proyecto, consulta: [ARQUITECTURA.md](./ARQUITECTURA.md)

##  Resumen de Requisitos

Este documento especifica todos los requisitos técnicos, arquitectónicos y de diseño del proyecto.

##  Base de Datos

### Requisitos de Base de Datos

1. **Base de Datos Principal**:
   - **Preferencia**: AdventureWorks (local) si es posible
   - **Alternativa**: Base de datos remota gratuita accesible v�a URL
   - **Restricción**: NO usar Supabase (ya en uso en otro proyecto)
   - **Propósito**: Practicar conexión Oracle con procedimientos almacenados

2. **Acceso desde DataGrip**:
   - Debe ser accesible desde DataGrip para visualización en tiempo real
   - Debe permitir copiar y rastrear datos fácilmente
   - Conexión v�a URL/connection string

3. **Recomendaciones de Base de Datos Remota Gratuita**:
   - **Oracle Cloud Free Tier**: Base de datos Oracle gratuita (siempre disponible)
   - **Azure SQL Database Free Tier**: SQL Server gratuito (12 meses)
   - **AWS RDS Free Tier**: PostgreSQL/MySQL gratuito (12 meses)
   - **ElephantSQL**: PostgreSQL gratuito (20 MB)
   - **PlanetScale**: MySQL gratuito (5 GB)

### Configuración de Base de Datos

- **Tipo**: Oracle (para procedimientos almacenados)
- **Acceso**: Remoto v�a connection string
- **Herramienta de Visualización**: DataGrip
- **Propósito Educativo**: Practicar procedimientos almacenados Oracle

##  Arquitectura del Proyecto

### Estructura de Capas

```
AdministracionFlotillas/
 src/
�    AdministracionFlotillas.Web/              # Capa de Aplicación (MVC)
�    AdministracionFlotillas.ReglasNegocio/     # Capa de Reglas de Negocio
�    AdministracionFlotillas.AccesoDatos/        # Capa de Acceso a Datos
�    AdministracionFlotillas.ModelosComunes/    #  NUEVO: Modelos compartidos
```

### Capa de Modelos Comunes (NUEVA)

**Propósito**: Separar y organizar los modelos de la capa de reglas de negocio para que sean accesibles como comunes entre:
- Capa de Reglas de Negocio
- Capa de Acceso a Datos

**Contenido**:
- Modelos de negocio (Business Models)
- DTOs compartidos
- Entidades de dominio

**Referencias**:
- `AccesoDatos` �� referencia a `ModelosComunes`
- `ReglasNegocio` �� referencia a `ModelosComunes`
- `Web` �� referencia a `ReglasNegocio` (no directamente a ModelosComunes)

### Parser ViewModel � BusinessModel

**Ubicación**: Capa de Aplicación (Web)

**Propósito**: Convertir entre:
- **ViewModels** (Modelos de la capa de aplicación)
- **BusinessModels** (Modelos de la capa de reglas de negocio)

**Implementación**:
- Parseador manual (sin AutoMapper) - Métodos estáticos en español
- Métodos de conversión bidireccional
- Validaciones durante la conversión

**Ejemplo de Estructura**:
```csharp
// En AdministracionFlotillas.Web/Parseador/
public static class EmployeeParseador
{
    public static EmployeeViewModel ConvertirAVista(Employee empleado) { }
    public static List<EmployeeViewModel> ConvertirListaAVista(List<Employee> empleados) { }
    public static Employee ConvertirAModelo(EmployeeViewModel modeloVista) { }
}
```

## � Frontend y UI

### Tecnolog�as de Frontend

1. **Kendo UI**:
   - �ltima versión disponible
   - Controles para tablas, filtros, visualizaciones
   - Integración con Bootstrap

2. **Bootstrap**:
   - �ltima versión
   - Solo clases por defecto de Bootstrap
   - Sin estilos personalizados (excepto Kendo)

3. **Restricciones de Estilos**:
   -  Solo Bootstrap por defecto
   -  Solo Kendo UI por defecto
   -  NO estilos personalizados/CSS custom
   - **Objetivo**: Garantizar consistencia en estilos

### Funcionalidades CRUD

1. **Operaciones CRUD**:
   -  **Crear**: Insertar datos en base de datos
   -  **Leer**: Visualizar información
   -  **Actualizar**: Modificar datos existentes
   -  **Eliminar**: Eliminación lógica (por status, NO f�sica)

2. **Interfaz con Modales**:
   - Crear/Editar mediante modales
   - Formularios dentro de modales
   - Validación en tiempo real

3. **Visualización de Datos**:
   - Tablas con Kendo Grid
   - Filtros avanzados con controles Kendo
   - Visualizaciones en diferentes formatos:
     - Gráficos (Kendo Charts)
     - Dashboards gamificados
     - Tablas interactivas
     - Tarjetas informativas

### Dashboards Gamificados

**Requisitos**:
- Visualización creativa de información
- Uso de controles Kendo para:
  - Gráficos interactivos
  - Métricas visuales
  - Indicadores de progreso
  - Elementos gamificados (badges, niveles, etc.)

**Tecnolog�as Permitidas**:
- Kendo UI (última versión)
- Bootstrap (última versión)
- JavaScript vanilla o jQuery (si Kendo lo requiere)

##  Colaboración y Control de Versiones

### Repositorio GitHub

**Requisitos**:
- Crear repositorio GitHub para colaboración
- Configurar acceso para estudiantes
- Documentar proceso de colaboración
- Branching strategy (main/develop/feature)

**Estructura de Branches**:
- `main`: Código estable/producción
- `develop`: Desarrollo activo
- `feature/*`: Nuevas funcionalidades
- `fix/*`: Correcciones de bugs

## � Dependencias y Paquetes NuGet

### Paquetes Requeridos

**Capa AccesoDatos**:
- `Oracle.ManagedDataAccess.Core` - Conexión a Oracle

**Capa ReglasNegocio**:
- Referencias a `ModelosComunes`

**Capa Web**:
- `Microsoft.AspNetCore.Mvc.NewtonsoftJson` - Para JSON/AJAX
- **Parseador Manual** - Sin dependencias externas, métodos estáticos en español
- DataTables (via CDN, gratuito)

##  Flujo de Datos

### Flujo Completo

```
Usuario (Vista Kendo)
    �
JavaScript/AJAX
    �
Controller (Capa Web)
    �
ViewModelParser (Convierte ViewModel �� BusinessModel)
    �
Servicio (Capa ReglasNegocio)
    �
Repositorio (Capa AccesoDatos)
    �
Procedimiento Almacenado Oracle
    �
Base de Datos
```

### Conversión de Modelos

```
ViewModel (Web Layer)
    � [Parser]
BusinessModel (ModelosComunes)
    �
DTO/Entidad (AccesoDatos)
    �
Procedimiento Almacenado
```

##  Convenciones de Código

### Nomenclatura

- **ViewModels**: `*ViewModel` (ej: `EmployeeViewModel`) - Propiedades en español
- **BusinessModels**: `*` (ej: `Employee`) en `ModelosComunes`
- **DTOs**: `*Dto` (ej: `EmployeeDto`)
- **Parseadores**: `*Parseador` (ej: `EmployeeParseador`) - Métodos estáticos en español, ubicación: `Parseador/`

### Estructura de Archivos

```
Web/
 ViewModels/
�    FlotillaViewModel.cs
 Helpers/
�    ViewModelParser.cs
 Controllers/
     FlotillasController.cs

ModelosComunes/
 Flotilla.cs

ReglasNegocio/
 Servicios/
     ServicioFlotillas.cs

AccesoDatos/
 Repositorios/
     RepositorioFlotillas.cs
```

##  Objetivos del Proyecto

1. **Educativo**: Practicar arquitectura en capas con .NET
2. **Práctica Oracle**: Aprender procedimientos almacenados Oracle
3. **Frontend Moderno**: Dominar Kendo UI y Bootstrap
4. **Colaboración**: Trabajar con Git/GitHub
5. **Mejores Prácticas**: Separación de responsabilidades, clean code

##  Documentación Relacionada

- [SETUP.md](./SETUP.md) - Configuración inicial
- [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Gu�a paso a paso
- [SEGUIMIENTO_PROGRESO.md](./SEGUIMIENTO_PROGRESO.md) - Estado del proyecto

---

**�ltima actualización**: Enero 2025


