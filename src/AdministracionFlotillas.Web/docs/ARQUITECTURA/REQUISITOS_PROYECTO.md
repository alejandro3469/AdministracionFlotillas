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
   - **Alternativa**: Base de datos remota gratuita accesible vía URL
   - **Restricción**: NO usar Supabase (ya en uso en otro proyecto)
   - **Propósito**: Practicar conexión Oracle con procedimientos almacenados

2. **Acceso desde DataGrip**:
   - Debe ser accesible desde DataGrip para visualización en tiempo real
   - Debe permitir copiar y rastrear datos fácilmente
   - Conexión vía URL/connection string

3. **Recomendaciones de Base de Datos Remota Gratuita**:
   - **Oracle Cloud Free Tier**: Base de datos Oracle gratuita (siempre disponible)
   - **Azure SQL Database Free Tier**: SQL Server gratuito (12 meses)
   - **AWS RDS Free Tier**: PostgreSQL/MySQL gratuito (12 meses)
   - **ElephantSQL**: PostgreSQL gratuito (20 MB)
   - **PlanetScale**: MySQL gratuito (5 GB)

### Configuración de Base de Datos

- **Tipo**: Oracle (para procedimientos almacenados)
- **Acceso**: Remoto vía connection string
- **Herramienta de Visualización**: DataGrip
- **Propósito Educativo**: Practicar procedimientos almacenados Oracle

##  Arquitectura del Proyecto

### Estructura de Capas

```
AdministracionFlotillas/
 src/
    AdministracionFlotillas.Web/              # Capa de Aplicación (MVC)
    AdministracionFlotillas.ReglasNegocio/     # Capa de Reglas de Negocio
    AdministracionFlotillas.AccesoDatos/        # Capa de Acceso a Datos
    AdministracionFlotillas.ModelosComunes/    #  NUEVO: Modelos compartidos
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
- `AccesoDatos` → referencia a `ModelosComunes`
- `ReglasNegocio` → referencia a `ModelosComunes`
- `Web` → referencia a `ReglasNegocio` (no directamente a ModelosComunes)

### Parseador ViewModel ↔ BusinessModel

**Ubicación**: Capa de Aplicación (Web) - Carpeta `Parseador/`

**Propósito**: Convertir entre:
- **ViewModels** (Modelos de la capa de aplicación con propiedades en español)
- **BusinessModels** (Modelos de la capa de reglas de negocio)

**Implementación**:
- Parseador manual (sin AutoMapper) - Métodos estáticos en español
- Métodos de conversión bidireccional
- Validaciones durante la conversión
- Todas las propiedades de ViewModels en español

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

##  Frontend y UI

### Tecnologías de Frontend

1. **DataTables**:
   - Framework gratuito para tablas interactivas
   - Controles para tablas, filtros, exportación (Excel, PDF, Print)
   - Integración con Bootstrap

2. **Bootstrap**:
   - Última versión
   - Solo clases por defecto de Bootstrap
   - Sin estilos personalizados

3. **Restricciones de Estilos**:
   - Solo Bootstrap por defecto
   - Solo DataTables por defecto
   - NO estilos personalizados/CSS custom
   - **Objetivo**: Garantizar consistencia en estilos

### Funcionalidades CRUD

1. **Operaciones CRUD**:
   - **Crear**: Insertar datos en base de datos
   - **Leer**: Visualizar información
   - **Actualizar**: Modificar datos existentes
   - **Eliminar**: Eliminación lógica (por status, NO física)

2. **Interfaz con Modales**:
   - Crear/Editar mediante modales
   - Formularios dentro de modales
   - Validación en tiempo real

3. **Visualización de Datos**:
   - Tablas con DataTables
   - Filtros avanzados
   - Visualizaciones en diferentes formatos:
     - Tablas interactivas
     - Exportación a Excel/PDF
     - Tarjetas informativas

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

##  Dependencias y Paquetes NuGet

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
Usuario (Vista DataTables)
    ↓
JavaScript/AJAX
    ↓
Controller (Capa Web)
    ↓
Parseador Manual (Convierte ViewModel ↔ BusinessModel, métodos en español)
    ↓
Servicio (Capa ReglasNegocio)
    ↓
Repositorio (Capa AccesoDatos)
    ↓
Procedimiento Almacenado Oracle
    ↓
Base de Datos
```

### Conversión de Modelos

```
ViewModel (Web Layer - propiedades en español)
    ↓ [Parseador Manual]
BusinessModel (ModelosComunes)
    ↓
DTO/Entidad (AccesoDatos)
    ↓
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
    EmployeeViewModel.cs (propiedades en español)
 Parseador/
    EmployeeParseador.cs (métodos estáticos en español)
 Controllers/
     EmployeesController.cs

ModelosComunes/
 Employee.cs

ReglasNegocio/
 Servicios/
     EmployeesServiceOracle.cs

AccesoDatos/
 Repositorios/
     EmployeesRepository.cs
```

##  Objetivos del Proyecto

1. **Educativo**: Practicar arquitectura en capas con .NET
2. **Práctica Oracle**: Aprender procedimientos almacenados Oracle
3. **Frontend Moderno**: Dominar DataTables y Bootstrap
4. **Colaboración**: Trabajar con Git/GitHub
5. **Mejores Prácticas**: Separación de responsabilidades, clean code

##  Documentación Relacionada

- [SETUP.md](./SETUP.md) - Configuración inicial
- [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Guía paso a paso
- [SEGUIMIENTO_PROGRESO.md](./SEGUIMIENTO_PROGRESO.md) - Estado del proyecto

---

**Última actualización**: Enero 2026
