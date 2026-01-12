# Plan de Implementación del Proyecto

## Objetivo

Este documento describe los pasos para implementar el proyecto AdministracionFlotillas desde cero. Establece los requisitos mínimos y la estructura que debe tener el proyecto para que el equipo pueda agregar vistas similares siguiendo el mismo patrón.

## Base de Datos de Ejemplo: Oracle HR (Human Resources)

**Este proyecto usa la base de datos de ejemplo estándar HR (Human Resources) de Oracle.**

### ¿Qué es Oracle HR?
- Base de datos de ejemplo estándar incluida en Oracle Database
- Contiene tablas de recursos humanos: EMPLOYEES, DEPARTMENTS, JOBS, LOCATIONS, COUNTRIES, REGIONS
- Datos de ejemplo ya incluidos
- Gratuita y fácil de configurar

### Cómo Obtener Oracle HR:

**Opción 1: Oracle Cloud Free Tier (Recomendado - Más Rápido)**
1. Crear cuenta en Oracle Cloud (gratis)
2. Crear Autonomous Database
3. La base de datos HR puede crearse ejecutando el script de ejemplo

**Opción 2: Oracle Database Express Edition (XE)**
1. Descargar Oracle XE (gratis)
2. Instalar localmente
3. Ejecutar script HR para crear las tablas

**Script para crear HR:**
- Disponible en: `$ORACLE_HOME/demo/schema/human_resources/hr_main.sql`
- O descargar desde: Oracle Documentation

### Tablas Principales de HR:
- **EMPLOYEES** - Información de empleados
- **DEPARTMENTS** - Departamentos de la empresa
- **JOBS** - Puestos de trabajo
- **LOCATIONS** - Ubicaciones de oficinas
- **COUNTRIES** - Países
- **REGIONS** - Regiones geográficas

### Conexión desde DataGrip:
```
Host: [tu-host-oracle-cloud].oraclecloud.com
Port: 1521
Service Name: [tu-service-name]
Username: HR
Password: [tu-password]
```

---

## ⚠️ IMPORTANTE: Nomenclatura de Clases y Repositorios

**Este proyecto usa la base de datos HR de Oracle. Todos los nombres deben basarse en las tablas HR:**

### Nomenclatura Basada en HR:

- **EMPLOYEES** → `EmployeesRepository`, `EmployeesService`, `Employee`, `EmployeesController`
- **DEPARTMENTS** → `DepartmentsRepository`, `DepartmentsService`, `Department`, `DepartmentsController`
- **JOBS** → `JobsRepository`, `JobsService`, `Job`, `JobsController`
- **LOCATIONS** → `LocationsRepository`, `LocationsService`, `Location`, `LocationsController`

### Convención de Nombres (Basada en HR):

1. **Repositorios:** `[Entidad]Repository` (ej: `EmployeesRepository`, `DepartmentsRepository`)
2. **Servicios:** `[Entidad]Service` (ej: `EmployeesService`, `DepartmentsService`)
3. **Controladores:** `[Entidad]Controller` (ej: `EmployeesController`, `DepartmentsController`)
4. **Modelos:** `[Entidad]` en singular (ej: `Employee`, `Department`, `Job`)
5. **ViewModels:** `[Entidad]ViewModel` (ej: `EmployeeViewModel`, `DepartmentViewModel`)

### Ejemplo de Adaptación:

### Ejemplo de Nomenclatura para HR:

**Para la tabla EMPLOYEES (ejemplo principal en este documento):**
```csharp
// ✅ Nomenclatura correcta para HR
public class EmployeesRepository : IEmployeesRepository
public class EmployeesService : IEmployeesService
public class Employee { }  // Modelo en singular
public class EmployeeViewModel { }  // ViewModel
public class EmployeesController : Controller { }
```

**Para otras tablas de HR:**
```csharp
// DEPARTMENTS
public class DepartmentsRepository : IDepartmentsRepository
public class Department { }

// JOBS
public class JobsRepository : IJobsRepository
public class Job { }

// LOCATIONS
public class LocationsRepository : ILocationsRepository
public class Location { }
```

**Nota:** Este documento usa **EMPLOYEES** como ejemplo principal. Puedes aplicar el mismo patrón a cualquier tabla de HR (DEPARTMENTS, JOBS, LOCATIONS, etc.).

## ¿Para Quién es Este Documento?

### Si vas a crear el proyecto desde cero:
- Sigue este documento paso a paso
- Incluye creación de repositorio GitHub
- Configuración inicial completa

### Si vas a clonar y colaborar en el repositorio existente:
- **NO uses este documento**
- Sigue: [CLONAR_REPOSITORIO.md](./CLONAR_REPOSITORIO.md)
- El repositorio ya tiene la estructura y dependencias configuradas
- Solo necesitas clonar, restaurar dependencias y comenzar a desarrollar

## Estado del Proyecto (Referencia Histórica)

**Nota:** Esta sección documenta lo que ya se ha implementado en el proyecto. Si estás creando desde cero, estos pasos ya están completados en el repositorio existente.

**Estructura base completada:**

### 1. Estructura de 4 Capas Creada

**Archivos creados:**
- `AdministracionFlotillas.slnx` - Archivo de solución
- `src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj` - Proyecto MVC
- `src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj` - Proyecto de reglas de negocio
- `src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj` - Proyecto de acceso a datos
- `src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj` - Proyecto de modelos comunes

**Comandos ejecutados:**
```bash
# Crear solución
dotnet new sln -n AdministracionFlotillas

# Crear proyectos
dotnet new classlib -n AdministracionFlotillas.AccesoDatos -o src/AdministracionFlotillas.AccesoDatos
dotnet new classlib -n AdministracionFlotillas.ModelosComunes -o src/AdministracionFlotillas.ModelosComunes
dotnet new classlib -n AdministracionFlotillas.ReglasNegocio -o src/AdministracionFlotillas.ReglasNegocio
dotnet new mvc -n AdministracionFlotillas.Web -o src/AdministracionFlotillas.Web

# Agregar proyectos a la solución
dotnet sln add src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj
dotnet sln add src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj
dotnet sln add src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj
dotnet sln add src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj
```

### 2. Referencias entre Proyectos Configuradas

**Archivos modificados:**
- `src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj` - Referencia a ReglasNegocio
- `src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj` - Referencias a ModelosComunes y AccesoDatos
- `src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj` - Referencia a ModelosComunes

**Comandos ejecutados:**
```bash
# Web -> ReglasNegocio
dotnet add src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj reference src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj

# ReglasNegocio -> ModelosComunes
dotnet add src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj reference src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj

# AccesoDatos -> ModelosComunes
dotnet add src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj reference src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj

# ReglasNegocio -> AccesoDatos
dotnet add src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj reference src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj
```

### 3. Proyecto MVC Básico con HomeController

**Archivos creados:**
- `src/AdministracionFlotillas.Web/Controllers/HomeController.cs` - Controlador principal
- `src/AdministracionFlotillas.Web/Program.cs` - Configuración de la aplicación
- `src/AdministracionFlotillas.Web/Properties/launchSettings.json` - Configuración de lanzamiento

**Nota:** Estos archivos se crean automáticamente al ejecutar `dotnet new mvc`.

### 4. Bootstrap Instalado

**Archivos creados:**
- `src/AdministracionFlotillas.Web/wwwroot/lib/bootstrap/` - Librería Bootstrap
- `src/AdministracionFlotillas.Web/Views/Shared/_Layout.cshtml` - Layout que incluye Bootstrap

**Nota:** Bootstrap se instala automáticamente con el template MVC de .NET.

### 5. Vistas Básicas

**Archivos creados:**
- `src/AdministracionFlotillas.Web/Views/Home/Index.cshtml` - Vista principal
- `src/AdministracionFlotillas.Web/Views/Home/Privacy.cshtml` - Vista de privacidad
- `src/AdministracionFlotillas.Web/Views/Shared/Error.cshtml` - Vista de error
- `src/AdministracionFlotillas.Web/Views/_ViewStart.cshtml` - Configuración de vistas
- `src/AdministracionFlotillas.Web/Views/_ViewImports.cshtml` - Imports de vistas

**Nota:** Estas vistas se crean automáticamente con el template MVC.

### 6. AutoMapper Instalado en Web

**Archivo modificado:**
- `src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj` - Agregado PackageReference

**Comandos ejecutados:**
```bash
cd src/AdministracionFlotillas.Web
dotnet add package AutoMapper
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
cd ../..
```

**Versiones instaladas:**
- AutoMapper v16.0.0
- AutoMapper.Extensions.Microsoft.DependencyInjection v12.0.1

**Verificación:**
```bash
# Ver paquetes instalados
dotnet list src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj package
```

### 7. Repositorio GitHub Creado y Conectado

**Archivos creados:**
- `.gitignore` - Configuración de Git para ignorar archivos (ver: `.gitignore` en la raíz)
- `.git/` - Directorio de Git (inicializado)

**Comandos ejecutados:**
```bash
# Inicializar Git
git init

# Crear .gitignore (ya existe en el repositorio)
# Ver: .gitignore en la raíz del proyecto

# Agregar archivos (preparación para commit inicial)
git add .

# Configurar remote
git remote add origin git@github.com:alejandro3469/AdministracionFlotillas.git
# O usar HTTPS: git remote add origin https://github.com/alejandro3469/AdministracionFlotillas.git

# Renombrar rama a main
git branch -M main
```

**Estado actual:** Git inicializado, repositorio remoto configurado, pendiente commit inicial.

**Repositorio GitHub:**
- URL: https://github.com/alejandro3469/AdministracionFlotillas
- SSH: git@github.com:alejandro3469/AdministracionFlotillas.git
- HTTPS: https://github.com/alejandro3469/AdministracionFlotillas.git

**Nota:** El commit inicial y push aún no se han realizado. Se recomienda hacer commit después de cada instalación de paquete NuGet para ver los cambios en el historial.

### 8. .gitignore Configurado

**Archivo creado:**
- `.gitignore` - En la raíz del proyecto

**Contenido:** Configurado para .NET, incluye exclusiones para:
- Archivos compilados (bin/, obj/)
- Archivos de IDE (.vs/, .idea/, .vscode/)
- Paquetes NuGet
- Archivos del sistema operativo (.DS_Store, Thumbs.db)
- Logs

**Ver:** `.gitignore` en la raíz del proyecto para el contenido completo.

**Pendiente para implementación completa:**
- [ ] Hacer commit inicial y push a GitHub (FASE 0.5)
- [ ] Instalar Microsoft.AspNetCore.Mvc.NewtonsoftJson en Web (FASE 1.1)
- [ ] Instalar Oracle.ManagedDataAccess.Core en AccesoDatos (FASE 1.2)
- [ ] Instalar y configurar DataTables (FASE 1.2)
- [ ] Configurar AutoMapper en Program.cs (FASE 2.3)
- [ ] Crear modelo de ejemplo en ModelosComunes (FASE 2.1)
- [ ] Crear ViewModel de ejemplo en Web (FASE 2.2)
- [ ] Crear servicio de ejemplo en ReglasNegocio (FASE 4.1)
- [ ] Crear repositorio de ejemplo en AccesoDatos (FASE 3.1)
- [ ] Crear controlador funcional con endpoints AJAX (FASE 5.1)
- [ ] Crear vista principal con DataTables (FASE 6.1)
- [ ] Crear vista parcial (modal o componente reutilizable) (FASE 6.2)
- [ ] Implementar llamadas AJAX desde UI a controladores (FASE 7.1)
- [ ] Mostrar respuestas del servidor en tiempo real (FASE 7.2)
- [ ] Implementar manejo de mensajes (error/excepciones/success) (FASE 7.2)
- [ ] Crear componentes reutilizables (DataTable y Dropdown) que solo requieran nombre del controlador (FASE 7.3)
- [ ] Configurar Program.cs con inyección de dependencias (FASE 8.1)
- [ ] Documentar estructura para el equipo (FASE 8.3)

---

## Requisitos Mínimos del Proyecto

### 1. Vista Principal Funcional

**Requisitos:**
- Vista que muestre datos usando DataTables
- Llamadas AJAX a controladores
- Actualización en tiempo real de datos
- Estructura clara y documentada

**Ubicación sugerida:**
- `Views/Flotillas/Index.cshtml` (vista principal)
- `Views/Flotillas/_FlotillasGrid.cshtml` (vista parcial del grid)

### 2. Vista Parcial Funcional

**Requisitos:**
- Componente reutilizable (modal, card, o sección)
- Puede ser un modal para CRUD
- O una vista parcial que se renderice en la vista principal

**Ejemplos:**
- Modal para crear/editar flotilla
- Vista parcial de tarjeta de información
- Vista parcial de filtros

### 3. Comunicación UI ↔ Controladores

**Requisitos:**
- Llamadas AJAX desde JavaScript usando DataTables
- Controladores con endpoints que retornen JSON
- Estructura clara de request/response

**Ejemplo de estructura:**
```javascript
// JavaScript en la vista con DataTables
$("#flotillasTable").DataTable({
    ajax: {
        url: '/Flotillas/ObtenerFlotillas',
        type: 'POST',
        dataType: 'json',
        dataSrc: function(json) {
            return json.data;
        }
    },
    columns: [
        { data: 'id' },
        { data: 'nombre' },
        { data: 'descripcion' },
        { data: 'estado' },
        { data: 'fechaCreacion' }
    ]
});
```

### 4. Mostrar Respuestas del Servidor

**Requisitos:**
- Mostrar datos en tiempo real (actualizar grid, cards, etc.)
- Mostrar mensajes de éxito
- Mostrar mensajes de error/excepciones
- Feedback visual claro al usuario

**Implementación sugerida:**
- Toast notifications (Bootstrap)
- Mensajes en la UI
- Actualización automática de componentes

### 5. Parser ViewModel ↔ BusinessModel

**Requisitos:**
- AutoMapper configurado
- Perfiles de mapeo creados
- Conversión bidireccional funcionando
- Usado en controladores

### 6. Componentes Reutilizables (Solo Nombre de Controlador)

**Requisitos:**
- Componente JavaScript de DataTable que solo requiera el nombre del controlador
- Componente JavaScript de Dropdown que solo requiera el nombre del controlador
- Controladores base que sigan el patrón estándar (ObtenerTodos, ObtenerParaDropdown)
- Flujo completo: DataAccess → Business → Controller → ViewModel → Component
- Paginación automática (cliente o servidor)
- Carga automática de datos sin configuración adicional

**Ejemplo de uso:**
```javascript
// Solo especificar el nombre del controlador
initDataTable('Flotillas', '#tablaFlotillas', { columns: [...] });
initDropdown('Flotillas', '#dropdownFlotillas', {});
```

**Ubicación:**
- `wwwroot/js/components/datatable-component.js`
- `wwwroot/js/components/dropdown-component.js`
- `Controllers/BaseApiController.cs` (controlador base)

### 7. Arquitectura Completa Funcionando

**Requisitos:**
- Controlador → Parser → Servicio → Repositorio → Base de Datos
- Flujo completo de datos funcionando
- Componentes reutilizables funcionando con cualquier controlador que siga el patrón
- Estructura clara para que el equipo replique

---

## Plan de Implementación Paso a Paso

### FASE 0: Crear Repositorio GitHub

**Nota:** Si estás creando el proyecto desde cero, es recomendable crear el repositorio GitHub al inicio para poder ver en el historial de commits qué archivos se actualizan con cada instalación de dependencias.

#### Paso 0.1: Inicializar Git

```bash
# Desde la raíz del proyecto
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Inicializar git (si no está inicializado)
git init
```

#### Paso 0.2: Crear .gitignore

**Archivo:** `.gitignore` (en la raíz del proyecto)

```gitignore
# .NET
bin/
obj/
*.user
*.suo
*.cache
*.dll
*.exe
*.pdb
*.cache

# Visual Studio / Rider
.vs/
.idea/
*.sln.docstates
*.userprefs

# NuGet
*.nupkg
*.snupkg
packages/
project.lock.json
project.fragment.lock.json
artifacts/

# Build results
[Dd]ebug/
[Rr]elease/
x64/
x86/
[Aa]rm/
[Aa]rm64/
bld/
[Bb]in/
[Oo]bj/
[Ll]og/

# User-specific files
*.rsuser
*.suo
*.user
*.userosscache
*.sln.docstates

# OS
.DS_Store
Thumbs.db
```

#### Paso 0.3: Commit Inicial (Estructura Base)

```bash
# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Estructura inicial del proyecto

- Solución con 4 proyectos (Web, ReglasNegocio, AccesoDatos, ModelosComunes)
- Referencias entre proyectos configuradas
- Documentación inicial en carpeta docs"
```

#### Paso 0.4: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `AdministracionFlotillas`
3. Descripción: "Proyecto .NET multiplataforma para administración de flotillas"
4. NO inicializar con README, .gitignore o licencia (ya los tenemos)
5. Haz clic en "Create repository"

**Repositorio creado:**
- URL: https://github.com/alejandro3469/AdministracionFlotillas
- SSH: git@github.com:alejandro3469/AdministracionFlotillas.git
- HTTPS: https://github.com/alejandro3469/AdministracionFlotillas.git

#### Paso 0.5: Conectar Repositorio Local con GitHub

```bash
# Agregar remote (usando SSH)
git remote add origin git@github.com:alejandro3469/AdministracionFlotillas.git

# O usar HTTPS si prefieres
# git remote add origin https://github.com/alejandro3469/AdministracionFlotillas.git

# Renombrar rama a main (si es necesario)
git branch -M main

# Subir código inicial
git push -u origin main
```

**Resultado:** Ahora cada vez que instales un paquete NuGet, podrás hacer commit y ver exactamente qué archivos se actualizaron.

---

### FASE 1: Configuración Base

#### Paso 1.1: Instalar Paquetes NuGet Necesarios

**Nota:** Si ya creaste el repositorio GitHub, es recomendable hacer commit después de cada instalación de paquete para ver los cambios en el historial.

```bash
# En Web
cd src/AdministracionFlotillas.Web

# Instalar AutoMapper
dotnet add package AutoMapper
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection

# Instalar NewtonsoftJson
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson

# (Opcional) Si tienes repositorio Git, hacer commit
# cd ../..
# git add .
# git commit -m "Agregar paquete NewtonsoftJson
# 
# - Instalado Microsoft.AspNetCore.Mvc.NewtonsoftJson en Web
# - Para serialización JSON en controladores"

# En AccesoDatos
cd ../AdministracionFlotillas.AccesoDatos
dotnet add package Oracle.ManagedDataAccess.Core

# (Opcional) Si tienes repositorio Git, hacer commit
# cd ../..
# git add .
# git commit -m "Agregar paquete Oracle Managed Data Access
# 
# - Instalado Oracle.ManagedDataAccess.Core en AccesoDatos
# - Para conexión a base de datos Oracle"
```

**Convenciones de Commits:**
- Títulos simples y descriptivos
- Sin emojis
- Descripciones breves
- Un commit por paquete instalado para ver claramente los cambios

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Agregar Paquetes NuGet"

#### Paso 1.2: Instalar DataTables (Alternativa Gratuita a Kendo UI)

**Nota:** Kendo UI requiere licencia comercial. DataTables es completamente gratuito y open source, con funcionalidades similares incluyendo exportación a Excel, PDF, y manejo de archivos.

**DataTables incluye:**
- Tablas interactivas con paginación, búsqueda y ordenamiento
- Extensión Buttons para exportar a Excel, PDF, CSV, copiar
- Extensión Responsive para diseño adaptable
- Soporte para carga de archivos
- Integración con AJAX para datos del servidor

**Instalación via CDN (Recomendado para desarrollo):**

Agregar en `_Layout.cshtml`:

```html
<!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">

<!-- jQuery (requerido por DataTables) -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- DataTables JS -->
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>

<!-- jsZip (requerido para exportar Excel) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

<!-- pdfmake (requerido para exportar PDF) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
```

**Opción B: Via LibMan (Recomendado para producción)**

```bash
# Instalar LibMan si no está instalado
dotnet tool install -g Microsoft.Web.LibraryManager.Cli

# Crear archivo libman.json en wwwroot
libman init

# Instalar DataTables
libman install datatables.net --destination wwwroot/lib/datatables
libman install datatables.net-buttons --destination wwwroot/lib/datatables
libman install datatables.net-responsive --destination wwwroot/lib/datatables
```

**Documento de referencia:** [DataTables Documentation](https://datatables.net/)

#### Paso 1.3: Configurar Program.cs

- Configurar AutoMapper
- Configurar inyección de dependencias
- Configurar NewtonsoftJson para JSON

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Configurar Program.cs"

---

### FASE 2: Modelos y Parser (PRIORITARIO)

#### Paso 2.1: Crear Modelo en ModelosComunes

**Archivo:** `src/AdministracionFlotillas.ModelosComunes/Flotilla.cs`

```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class Flotilla
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public string Estado { get; set; } // Activo, Inactivo
    public DateTime FechaCreacion { get; set; }
}
```

#### Paso 2.2: Crear ViewModel en Web

**Archivo:** `src/AdministracionFlotillas.Web/ViewModels/FlotillaViewModel.cs`

```csharp
namespace AdministracionFlotillas.Web.ViewModels;

public class FlotillaViewModel
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public string Estado { get; set; }
    public string FechaCreacion { get; set; } // String para UI
}
```

#### Paso 2.3: Configurar AutoMapper

**Archivo:** `src/AdministracionFlotillas.Web/Mappings/MappingProfile.cs`

```csharp
using AutoMapper;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Flotilla, FlotillaViewModel>()
            .ForMember(dest => dest.FechaCreacion, opt => opt.MapFrom(src => src.FechaCreacion.ToString("dd/MM/yyyy")));
        
        CreateMap<FlotillaViewModel, Flotilla>();
    }
}
```

**Documento de referencia:** [REQUISITOS_PROYECTO.md](./REQUISITOS_PROYECTO.md) - Sección "Parser ViewModel ↔ BusinessModel"

---

### FASE 3: Capa de Acceso a Datos (PRIORITARIO)

#### Paso 3.1: Crear Repositorio de Ejemplo

**⚠️ IMPORTANTE:** Este ejemplo usa "Flotillas" como nombre. **DEBES adaptar todos los nombres** (clase, interfaz, métodos, propiedades) según el dominio real de tu base de datos.

**Archivo:** `src/AdministracionFlotillas.AccesoDatos/Repositorios/[TuEntidad]Repository.cs`

**Ejemplos de nombres según tu dominio:**
- Si tu tabla es `CLIENTES` → `ClientesRepository.cs`
- Si tu tabla es `PRODUCTOS` → `ProductosRepository.cs`
- Si tu tabla es `VENTAS` → `VentasRepository.cs`
- Si tu tabla es `FLOTILLAS` → `FlotillasRepository.cs` (ejemplo usado aquí)

```csharp
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

public interface IFlotillasRepository
{
    Task<List<Flotilla>> ObtenerFlotillasAsync();
    Task<Flotilla> ObtenerFlotillaPorIdAsync(int id);
}

public class FlotillasRepository : IFlotillasRepository
{
    // Implementación con datos mock realistas o conexión a BD
    public async Task<List<Flotilla>> ObtenerFlotillasAsync()
    {
        // Datos mock realistas que simulan una situación empresarial
        return new List<Flotilla>
        {
            new Flotilla 
            { 
                Id = 1, 
                Nombre = "Flotilla Norte - Logística Regional", 
                Descripcion = "Flotilla principal para distribución en la zona norte del país. Incluye vehículos de carga pesada y liviana.",
                Estado = "Activo", 
                FechaCreacion = DateTime.Now.AddMonths(-24)
            },
            new Flotilla 
            { 
                Id = 2, 
                Nombre = "Flotilla Sur - Servicios Urbanos", 
                Descripcion = "Vehículos destinados a servicios de entrega urbana y mensajería en la zona metropolitana.",
                Estado = "Activo", 
                FechaCreacion = DateTime.Now.AddMonths(-18)
            },
            new Flotilla 
            { 
                Id = 3, 
                Nombre = "Flotilla Este - Transporte Ejecutivo", 
                Descripcion = "Vehículos ejecutivos y de representación para clientes corporativos. Incluye mantenimiento premium.",
                Estado = "Activo", 
                FechaCreacion = DateTime.Now.AddMonths(-12)
            },
            new Flotilla 
            { 
                Id = 4, 
                Nombre = "Flotilla Oeste - Carga Especializada", 
                Descripcion = "Vehículos especializados para transporte de materiales peligrosos y carga refrigerada.",
                Estado = "En Mantenimiento", 
                FechaCreacion = DateTime.Now.AddMonths(-30)
            },
            new Flotilla 
            { 
                Id = 5, 
                Nombre = "Flotilla Centro - Servicios Express", 
                Descripcion = "Flotilla de respuesta rápida para entregas urgentes y servicios de emergencia.",
                Estado = "Activo", 
                FechaCreacion = DateTime.Now.AddMonths(-6)
            },
            new Flotilla 
            { 
                Id = 6, 
                Nombre = "Flotilla Temporal - Proyecto Especial", 
                Descripcion = "Flotilla temporal asignada a proyecto especial de expansión. Programada para desactivación en 3 meses.",
                Estado = "Inactivo", 
                FechaCreacion = DateTime.Now.AddMonths(-3)
            },
            new Flotilla 
            { 
                Id = 7, 
                Nombre = "Flotilla Internacional - Fronteras", 
                Descripcion = "Vehículos certificados para transporte internacional y cruce de fronteras. Cumplimiento aduanero.",
                Estado = "Activo", 
                FechaCreacion = DateTime.Now.AddMonths(-36)
            },
            new Flotilla 
            { 
                Id = 8, 
                Nombre = "Flotilla Respaldo - Emergencias", 
                Descripcion = "Flotilla de respaldo para situaciones de emergencia y picos de demanda estacional.",
                Estado = "En Mantenimiento", 
                FechaCreacion = DateTime.Now.AddMonths(-9)
            }
        };
    }
    
    public async Task<Flotilla> ObtenerFlotillaPorIdAsync(int id)
    {
        // Implementación
        return null;
    }
}
```

**Cómo crear este archivo desde el IDE:**

##### Opción A: Visual Studio

1. **Abrir el proyecto AccesoDatos:**
   - En el **Solution Explorer**, expande `AdministracionFlotillas.AccesoDatos`
   - Haz clic derecho en el proyecto → **Open Folder in File Explorer** (opcional, para ver la estructura)

2. **Crear la carpeta Repositorios:**
   - Haz clic derecho en el proyecto `AdministracionFlotillas.AccesoDatos`
   - Selecciona **Add** → **New Folder**
   - Nombre: `Repositorios`
   - Presiona Enter

3. **Crear el archivo del repositorio:**
   - Haz clic derecho en la carpeta `Repositorios` (recién creada)
   - Selecciona **Add** → **Class...**
   - En el diálogo "Add New Item":
     - **Nombre:** Usa el nombre apropiado según tu dominio de base de datos
       - Ejemplo: Si tu tabla es `CLIENTES` → Nombre: `ClientesRepository`
       - Ejemplo: Si tu tabla es `PRODUCTOS` → Nombre: `ProductosRepository`
       - Ejemplo: Si tu tabla es `FLOTILLAS` → Nombre: `FlotillasRepository` (ejemplo usado en este documento)
     - Asegúrate de que el tipo sea "Class" (C#)
   - Haz clic en **Add**
   
   **⚠️ Importante:** El nombre del archivo debe corresponder al nombre de la tabla/entidad principal de tu base de datos. No uses "FlotillasRepository" a menos que tu tabla se llame `FLOTILLAS`.

4. **Verificar que se agregó al .csproj:**
   - El archivo debería aparecer automáticamente en el Solution Explorer
   - Si no aparece, haz clic derecho en el proyecto → **Unload Project**, luego **Reload Project**

5. **Pegar el código:**
   - Reemplaza todo el contenido del archivo con el código proporcionado arriba
   - **⚠️ IMPORTANTE:** Adapta todos los nombres en el código (clase, interfaz, métodos) según tu dominio
   - Guarda con `Ctrl+S` (Windows) o `Cmd+S` (Mac)

**Resultado esperado:**
- El archivo del repositorio (ej: `ClientesRepository.cs`, `ProductosRepository.cs`, etc.) aparece en `Solution Explorer` bajo `Repositorios/`
- El archivo se guarda en `src/AdministracionFlotillas.AccesoDatos/Repositorios/[TuEntidad]Repository.cs`
- El `.csproj` se actualiza automáticamente con la referencia al archivo
- **Nota:** Reemplaza `[TuEntidad]` con el nombre de tu entidad (ej: `Clientes`, `Productos`, `Ventas`, etc.)

##### Opción B: JetBrains Rider

1. **Abrir el proyecto AccesoDatos:**
   - En el **Solution Explorer** (panel izquierdo), expande `AdministracionFlotillas.AccesoDatos`
   - Verifica que el proyecto esté cargado correctamente

2. **Crear la carpeta Repositorios:**
   - Haz clic derecho en el proyecto `AdministracionFlotillas.AccesoDatos`
   - Selecciona **Add** → **New Folder**
   - Nombre: `Repositorios`
   - Presiona Enter

3. **Crear el archivo del repositorio:**
   - Haz clic derecho en la carpeta `Repositorios` (recién creada)
   - Selecciona **Add** → **Class...**
   - En el diálogo "Add Class":
     - **Nombre:** Usa el nombre apropiado según tu dominio de base de datos
       - Ejemplo: Si tu tabla es `CLIENTES` → Nombre: `ClientesRepository`
       - Ejemplo: Si tu tabla es `PRODUCTOS` → Nombre: `ProductosRepository`
       - Ejemplo: Si tu tabla es `FLOTILLAS` → Nombre: `FlotillasRepository` (ejemplo usado en este documento)
     - Tipo: `Class` (asegúrate de que esté seleccionado)
   - Haz clic en **OK**
   
   **⚠️ Importante:** El nombre del archivo debe corresponder al nombre de la tabla/entidad principal de tu base de datos. No uses "FlotillasRepository" a menos que tu tabla se llame `FLOTILLAS`.

4. **Verificar que se agregó al .csproj:**
   - El archivo debería aparecer automáticamente en el Solution Explorer
   - Si no aparece, haz clic derecho en el proyecto → **Reload Project**

5. **Pegar el código:**
   - Reemplaza todo el contenido del archivo con el código proporcionado arriba
   - **⚠️ IMPORTANTE:** Adapta todos los nombres en el código (clase, interfaz, métodos) según tu dominio
   - Guarda con `Ctrl+S` (Windows/Linux) o `Cmd+S` (Mac)

**Resultado esperado:**
- El archivo del repositorio (ej: `ClientesRepository.cs`, `ProductosRepository.cs`, etc.) aparece en `Solution Explorer` bajo `Repositorios/`
- El archivo se guarda en `src/AdministracionFlotillas.AccesoDatos/Repositorios/[TuEntidad]Repository.cs`
- El `.csproj` se actualiza automáticamente con la referencia al archivo
- **Nota:** Reemplaza `[TuEntidad]` con el nombre de tu entidad (ej: `Clientes`, `Productos`, `Ventas`, etc.)

##### Opción C: Desde Terminal (Alternativa)

Si prefieres crear el archivo desde la terminal:

```bash
# Navegar al directorio del proyecto
cd src/AdministracionFlotillas.AccesoDatos

# Crear la carpeta Repositorios si no existe
mkdir -p Repositorios

# Crear el archivo (puedes usar tu editor preferido)
# Luego pegar el código proporcionado arriba
```

**Nota:** Si creas el archivo desde la terminal, asegúrate de que el IDE recargue el proyecto para que el archivo aparezca en el Solution Explorer.

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Implementar Capa de Acceso a Datos"

---

#### Paso 3.2: Migración de Base de Datos (Oracle)

**Nota:** Esta sección describe cómo crear y migrar la estructura de base de datos a Oracle. Para desarrollo inicial, puedes usar los datos mock del repositorio, pero para producción necesitarás la base de datos.

**Archivo de migración:** `docs/scripts/01_CREATE_TABLE_FLOTILLAS.sql`

**Crear la carpeta scripts si no existe:**
```bash
mkdir -p docs/scripts
```

**Script SQL para crear tabla FLOTILLAS:**

```sql
-- =============================================
-- Script de Migración: Tabla FLOTILLAS
-- Base de Datos: Oracle Database
-- Fecha: 2024
-- Descripción: Crea la tabla principal para almacenar información de flotillas
-- =============================================

-- Eliminar tabla si existe (solo para desarrollo)
-- DROP TABLE FLOTILLAS CASCADE CONSTRAINTS;

-- Crear tabla FLOTILLAS
CREATE TABLE FLOTILLAS (
    ID NUMBER(10) NOT NULL,
    NOMBRE VARCHAR2(200) NOT NULL,
    DESCRIPCION VARCHAR2(1000),
    ESTADO VARCHAR2(50) NOT NULL,
    FECHA_CREACION DATE NOT NULL,
    FECHA_MODIFICACION DATE,
    USUARIO_CREACION VARCHAR2(100),
    USUARIO_MODIFICACION VARCHAR2(100),
    CONSTRAINT PK_FLOTILLAS PRIMARY KEY (ID),
    CONSTRAINT CHK_ESTADO CHECK (ESTADO IN ('Activo', 'Inactivo', 'En Mantenimiento'))
);

-- Crear secuencia para ID autoincremental
CREATE SEQUENCE SEQ_FLOTILLAS
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- Crear trigger para autoincrementar ID
CREATE OR REPLACE TRIGGER TRG_FLOTILLAS_ID
    BEFORE INSERT ON FLOTILLAS
    FOR EACH ROW
BEGIN
    IF :NEW.ID IS NULL THEN
        :NEW.ID := SEQ_FLOTILLAS.NEXTVAL;
    END IF;
    
    IF :NEW.FECHA_CREACION IS NULL THEN
        :NEW.FECHA_CREACION := SYSDATE;
    END IF;
    
    :NEW.FECHA_MODIFICACION := SYSDATE;
END;
/

-- Crear índices para mejorar rendimiento
CREATE INDEX IDX_FLOTILLAS_ESTADO ON FLOTILLAS(ESTADO);
CREATE INDEX IDX_FLOTILLAS_FECHA_CREACION ON FLOTILLAS(FECHA_CREACION);
CREATE INDEX IDX_FLOTILLAS_NOMBRE ON FLOTILLAS(UPPER(NOMBRE));

-- Insertar datos iniciales (opcional, para desarrollo)
INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Norte - Logística Regional', 
 'Flotilla principal para distribución en la zona norte del país. Incluye vehículos de carga pesada y liviana.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -24), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Sur - Servicios Urbanos', 
 'Vehículos destinados a servicios de entrega urbana y mensajería en la zona metropolitana.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -18), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Este - Transporte Ejecutivo', 
 'Vehículos ejecutivos y de representación para clientes corporativos. Incluye mantenimiento premium.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -12), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Oeste - Carga Especializada', 
 'Vehículos especializados para transporte de materiales peligrosos y carga refrigerada.', 
 'En Mantenimiento', 
 ADD_MONTHS(SYSDATE, -30), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Centro - Servicios Express', 
 'Flotilla de respuesta rápida para entregas urgentes y servicios de emergencia.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -6), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Temporal - Proyecto Especial', 
 'Flotilla temporal asignada a proyecto especial de expansión. Programada para desactivación en 3 meses.', 
 'Inactivo', 
 ADD_MONTHS(SYSDATE, -3), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Internacional - Fronteras', 
 'Vehículos certificados para transporte internacional y cruce de fronteras. Cumplimiento aduanero.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -36), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Respaldo - Emergencias', 
 'Flotilla de respaldo para situaciones de emergencia y picos de demanda estacional.', 
 'En Mantenimiento', 
 ADD_MONTHS(SYSDATE, -9), 
 'SISTEMA');

-- Confirmar transacción
COMMIT;

-- Verificar datos insertados
SELECT COUNT(*) AS TOTAL_FLOTILLAS FROM FLOTILLAS;
SELECT * FROM FLOTILLAS ORDER BY ID;
```

**Cómo ejecutar el script:**

##### Opción A: Desde DataGrip (Mac/Windows)

1. **Conectar a la base de datos Oracle:**
   - Abre DataGrip
   - Crea una nueva conexión a Oracle (ver [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md))
   - Conecta a la base de datos

2. **Ejecutar el script:**
   - Abre el archivo `docs/scripts/01_CREATE_TABLE_FLOTILLAS.sql` en DataGrip
   - Selecciona toda la conexión (o la base de datos específica) en el panel de conexiones
   - Haz clic derecho → **Run** o presiona `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
   - Verifica que no haya errores en la consola

3. **Verificar la creación:**
   - En el panel de conexiones, expande tu base de datos → **Tables**
   - Deberías ver la tabla `FLOTILLAS`
   - Haz clic derecho en la tabla → **Select Top 1000 Rows** para ver los datos

##### Opción B: Desde SQL Developer (Windows)

1. **Conectar a la base de datos:**
   - Abre SQL Developer
   - Crea una nueva conexión a Oracle (ver [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md))
   - Conecta a la base de datos

2. **Ejecutar el script:**
   - Abre el archivo `docs/scripts/01_CREATE_TABLE_FLOTILLAS.sql` en SQL Developer
   - Selecciona todo el contenido (`Ctrl+A`)
   - Haz clic en el botón **Run Script** (F5) o presiona `F5`
   - Verifica los resultados en la pestaña "Script Output"

3. **Verificar la creación:**
   - En el panel de conexiones, expande tu conexión → **Tables**
   - Deberías ver la tabla `FLOTILLAS`
   - Haz clic derecho en la tabla → **Open** para ver los datos

##### Opción C: Desde Terminal (sqlplus)

```bash
# Conectar a Oracle usando sqlplus
sqlplus usuario/password@host:port/service_name

# Ejecutar el script
@docs/scripts/01_CREATE_TABLE_FLOTILLAS.sql

# Verificar
SELECT COUNT(*) FROM FLOTILLAS;
```

**Resultado esperado:**
- Tabla `FLOTILLAS` creada con todas las columnas
- Secuencia `SEQ_FLOTILLAS` creada
- Trigger `TRG_FLOTILLAS_ID` creado
- Índices creados
- 8 registros insertados (si ejecutaste la sección de INSERT)
- Sin errores en la ejecución

**Nota:** Para desarrollo, puedes continuar usando los datos mock del repositorio. Cuando estés listo para conectar con la base de datos real, actualiza el `FlotillasRepository` para usar `Oracle.ManagedDataAccess.Core` en lugar de retornar datos mock.

**Documento de referencia:** [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md) - Sección "Configurar Conexión Oracle"

---

### FASE 4: Capa de Reglas de Negocio (PRIORITARIO)

#### Paso 4.0: Estructura de Carpetas para Diferentes Escenarios

**Objetivo:** Organizar las reglas de negocio en carpetas separadas según diferentes escenarios (tipo de BD, entorno, tenant, etc.) para mantener la separación de responsabilidades y facilitar el mantenimiento.

**Estructura de carpetas recomendada:**

```
AdministracionFlotillas.ReglasNegocio/
├── Servicios/
│   ├── Interfaces/
│   │   └── IFlotillasService.cs
│   ├── Escenarios/
│   │   ├── Oracle/
│   │   │   └── FlotillasServiceOracle.cs
│   │   ├── SqlServer/
│   │   │   └── FlotillasServiceSqlServer.cs
│   │   ├── Mock/
│   │   │   └── FlotillasServiceMock.cs
│   │   └── Produccion/
│   │       └── FlotillasServiceProduccion.cs
│   └── Factory/
│       └── FlotillasServiceFactory.cs
├── Estrategias/
│   ├── IFlotillasEstrategia.cs
│   ├── Oracle/
│   │   └── FlotillasEstrategiaOracle.cs
│   ├── SqlServer/
│   │   └── FlotillasEstrategiaSqlServer.cs
│   └── Mock/
│       └── FlotillasEstrategiaMock.cs
└── Configuracion/
    └── EscenarioConfiguracion.cs
```

**Patrón a seguir:** Strategy Pattern + Factory Pattern (según Microsoft .NET Documentation)

**Referencias oficiales:**
- [Microsoft: Design Patterns - Strategy](https://learn.microsoft.com/en-us/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#strategy-pattern)
- [Microsoft: Dependency Injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
- [.NET Architecture Guides](https://dotnet.microsoft.com/en-us/learn/aspnet/architecture)

**Crear la estructura de carpetas:**

```bash
# Desde la raíz del proyecto
cd src/AdministracionFlotillas.ReglasNegocio

# Crear estructura de carpetas
mkdir -p Servicios/Interfaces
mkdir -p Servicios/Escenarios/Oracle
mkdir -p Servicios/Escenarios/SqlServer
mkdir -p Servicios/Escenarios/Mock
mkdir -p Servicios/Escenarios/Produccion
mkdir -p Servicios/Factory
mkdir -p Estrategias/Oracle
mkdir -p Estrategias/SqlServer
mkdir -p Estrategias/Mock
mkdir -p Configuracion
```

**Cómo crear estas carpetas desde el IDE:**

##### Visual Studio:
1. Clic derecho en el proyecto `AdministracionFlotillas.ReglasNegocio`
2. **Add** → **New Folder**
3. Crear cada carpeta según la estructura mostrada arriba

##### Rider:
1. Clic derecho en el proyecto `AdministracionFlotillas.ReglasNegocio`
2. **Add** → **New Folder**
3. Crear cada carpeta según la estructura mostrada arriba

---

#### Paso 4.1: Crear Configuración de Escenarios

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Configuracion/EscenarioConfiguracion.cs`

```csharp
namespace AdministracionFlotillas.ReglasNegocio.Configuracion;

/// <summary>
/// Configuración que determina qué escenario de reglas de negocio usar
/// Basado en parámetros de configuración (appsettings.json, variables de entorno, etc.)
/// </summary>
public class EscenarioConfiguracion
{
    /// <summary>
    /// Tipo de base de datos: Oracle, SqlServer, Mock
    /// </summary>
    public TipoBaseDatos TipoBaseDatos { get; set; } = TipoBaseDatos.Oracle;
    
    /// <summary>
    /// Entorno de ejecución: Desarrollo, Produccion, Testing
    /// </summary>
    public EntornoAplicacion Entorno { get; set; } = EntornoAplicacion.Desarrollo;
    
    /// <summary>
    /// Tenant o cliente específico (para multi-tenant)
    /// </summary>
    public string TenantId { get; set; } = "default";
    
    /// <summary>
    /// Determina el escenario completo basado en la configuración
    /// </summary>
    public string ObtenerEscenario()
    {
        // Prioridad: Entorno > TipoBaseDatos > TenantId
        if (Entorno == EntornoAplicacion.Produccion)
        {
            return "Produccion";
        }
        
        return TipoBaseDatos switch
        {
            TipoBaseDatos.Oracle => "Oracle",
            TipoBaseDatos.SqlServer => "SqlServer",
            TipoBaseDatos.Mock => "Mock",
            _ => "Oracle"
        };
    }
}

public enum TipoBaseDatos
{
    Oracle,
    SqlServer,
    Mock
}

public enum EntornoAplicacion
{
    Desarrollo,
    Produccion,
    Testing
}
```

**Archivo:** `appsettings.json` (en el proyecto Web)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "EscenarioConfiguracion": {
    "TipoBaseDatos": "Oracle",
    "Entorno": "Desarrollo",
    "TenantId": "default"
  },
  "ConnectionStrings": {
    "OracleConnection": "Data Source=...;User Id=...;Password=...;"
  }
}
```

---

#### Paso 4.2: Crear Factory para Servicios según Escenario

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Servicios/Factory/FlotillasServiceFactory.cs`

```csharp
using AdministracionFlotillas.ReglasNegocio.Configuracion;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;
using AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.SqlServer;
using AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Mock;
using AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Produccion;
using AdministracionFlotillas.AccesoDatos.Repositorios;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Factory;

/// <summary>
/// Factory que crea la instancia correcta del servicio según el escenario configurado
/// Patrón Factory según Microsoft .NET Documentation
/// </summary>
public class FlotillasServiceFactory
{
    private readonly EscenarioConfiguracion _configuracion;
    private readonly IFlotillasRepository _repository;
    
    public FlotillasServiceFactory(
        EscenarioConfiguracion configuracion,
        IFlotillasRepository repository)
    {
        _configuracion = configuracion;
        _repository = repository;
    }
    
    /// <summary>
    /// Crea la instancia del servicio según el escenario configurado
    /// </summary>
    public IFlotillasService Crear()
    {
        var escenario = _configuracion.ObtenerEscenario();
        
        return escenario switch
        {
            "Produccion" => new FlotillasServiceProduccion(_repository),
            "Oracle" => new FlotillasServiceOracle(_repository),
            "SqlServer" => new FlotillasServiceSqlServer(_repository),
            "Mock" => new FlotillasServiceMock(),
            _ => new FlotillasServiceOracle(_repository) // Default
        };
    }
}
```

---

#### Paso 4.3: Crear Interfaz Base del Servicio

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Servicios/Interfaces/IFlotillasService.cs`

```csharp
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

/// <summary>
/// Interfaz base para todos los servicios de Flotillas
/// Todas las implementaciones de escenarios deben implementar esta interfaz
/// </summary>
public interface IFlotillasService
{
    Task<List<Flotilla>> ObtenerFlotillasAsync();
    Task<Flotilla> ObtenerFlotillaPorIdAsync(int id);
    Task<Flotilla> CrearFlotillaAsync(Flotilla flotilla);
    Task<Flotilla> ActualizarFlotillaAsync(Flotilla flotilla);
    Task<bool> EliminarFlotillaAsync(int id);
}
```

---

#### Paso 4.4: Crear Implementaciones por Escenario

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/FlotillasServiceOracle.cs`

```csharp
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.AccesoDatos.Repositorios;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Oracle;

/// <summary>
/// Implementación de reglas de negocio para escenario Oracle
/// Aplica validaciones y lógica específica para Oracle Database
/// </summary>
public class FlotillasServiceOracle : IFlotillasService
{
    private readonly IFlotillasRepository _repository;
    
    public FlotillasServiceOracle(IFlotillasRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<List<Flotilla>> ObtenerFlotillasAsync()
    {
        // Reglas de negocio específicas para Oracle
        var flotillas = await _repository.ObtenerFlotillasAsync();
        
        // Validaciones específicas para Oracle
        // Ejemplo: Filtrar flotillas inactivas en producción Oracle
        return flotillas.Where(f => f.Estado != "Inactivo" || 
                                    DateTime.Now.Year - f.FechaCreacion.Year < 2)
                        .ToList();
    }
    
    public async Task<Flotilla> ObtenerFlotillaPorIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        return await _repository.ObtenerFlotillaPorIdAsync(id);
    }
    
    public async Task<Flotilla> CrearFlotillaAsync(Flotilla flotilla)
    {
        // Validaciones específicas para Oracle
        if (string.IsNullOrWhiteSpace(flotilla.Nombre))
            throw new ArgumentException("El nombre es obligatorio", nameof(flotilla));
            
        // Lógica específica para Oracle
        flotilla.FechaCreacion = DateTime.Now;
        flotilla.Estado = flotilla.Estado ?? "Activo";
        
        // Aquí se llamaría al repositorio para crear
        // Por ahora retornamos el objeto
        return flotilla;
    }
    
    public async Task<Flotilla> ActualizarFlotillaAsync(Flotilla flotilla)
    {
        // Validaciones y lógica específica para Oracle
        if (flotilla.Id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(flotilla));
            
        return flotilla;
    }
    
    public async Task<bool> EliminarFlotillaAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        // Lógica específica para Oracle (eliminación lógica)
        return true;
    }
}
```

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/SqlServer/FlotillasServiceSqlServer.cs`

```csharp
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.AccesoDatos.Repositorios;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.SqlServer;

/// <summary>
/// Implementación de reglas de negocio para escenario SQL Server
/// Aplica validaciones y lógica específica para SQL Server
/// </summary>
public class FlotillasServiceSqlServer : IFlotillasService
{
    private readonly IFlotillasRepository _repository;
    
    public FlotillasServiceSqlServer(IFlotillasRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<List<Flotilla>> ObtenerFlotillasAsync()
    {
        // Reglas de negocio específicas para SQL Server
        var flotillas = await _repository.ObtenerFlotillasAsync();
        
        // Validaciones específicas para SQL Server
        // Ejemplo: Lógica diferente para SQL Server
        return flotillas;
    }
    
    public async Task<Flotilla> ObtenerFlotillaPorIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        return await _repository.ObtenerFlotillaPorIdAsync(id);
    }
    
    public async Task<Flotilla> CrearFlotillaAsync(Flotilla flotilla)
    {
        // Validaciones específicas para SQL Server
        if (string.IsNullOrWhiteSpace(flotilla.Nombre))
            throw new ArgumentException("El nombre es obligatorio", nameof(flotilla));
            
        flotilla.FechaCreacion = DateTime.Now;
        return flotilla;
    }
    
    public async Task<Flotilla> ActualizarFlotillaAsync(Flotilla flotilla)
    {
        if (flotilla.Id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(flotilla));
            
        return flotilla;
    }
    
    public async Task<bool> EliminarFlotillaAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        return true;
    }
}
```

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Mock/FlotillasServiceMock.cs`

```csharp
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Mock;

/// <summary>
/// Implementación de reglas de negocio para escenario Mock (desarrollo/testing)
/// No requiere repositorio, retorna datos mock
/// </summary>
public class FlotillasServiceMock : IFlotillasService
{
    public async Task<List<Flotilla>> ObtenerFlotillasAsync()
    {
        // Retornar datos mock para desarrollo/testing
        return new List<Flotilla>
        {
            new Flotilla { Id = 1, Nombre = "Flotilla Mock 1", Estado = "Activo", FechaCreacion = DateTime.Now },
            new Flotilla { Id = 2, Nombre = "Flotilla Mock 2", Estado = "Activo", FechaCreacion = DateTime.Now }
        };
    }
    
    public async Task<Flotilla> ObtenerFlotillaPorIdAsync(int id)
    {
        var flotillas = await ObtenerFlotillasAsync();
        return flotillas.FirstOrDefault(f => f.Id == id);
    }
    
    public async Task<Flotilla> CrearFlotillaAsync(Flotilla flotilla)
    {
        flotilla.Id = new Random().Next(100, 999);
        flotilla.FechaCreacion = DateTime.Now;
        return flotilla;
    }
    
    public async Task<Flotilla> ActualizarFlotillaAsync(Flotilla flotilla)
    {
        return flotilla;
    }
    
    public async Task<bool> EliminarFlotillaAsync(int id)
    {
        return true;
    }
}
```

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Produccion/FlotillasServiceProduccion.cs`

```csharp
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.AccesoDatos.Repositorios;

namespace AdministracionFlotillas.ReglasNegocio.Servicios.Escenarios.Produccion;

/// <summary>
/// Implementación de reglas de negocio para escenario Producción
/// Aplica las reglas más estrictas y validaciones completas
/// </summary>
public class FlotillasServiceProduccion : IFlotillasService
{
    private readonly IFlotillasRepository _repository;
    
    public FlotillasServiceProduccion(IFlotillasRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<List<Flotilla>> ObtenerFlotillasAsync()
    {
        // Reglas de negocio estrictas para producción
        var flotillas = await _repository.ObtenerFlotillasAsync();
        
        // Validaciones adicionales para producción
        // Ejemplo: Solo flotillas activas y con menos de 5 años
        var fechaLimite = DateTime.Now.AddYears(-5);
        return flotillas.Where(f => f.Estado == "Activo" && 
                                    f.FechaCreacion >= fechaLimite)
                        .ToList();
    }
    
    public async Task<Flotilla> ObtenerFlotillaPorIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        var flotilla = await _repository.ObtenerFlotillaPorIdAsync(id);
        
        if (flotilla == null)
            throw new KeyNotFoundException($"Flotilla con ID {id} no encontrada");
            
        return flotilla;
    }
    
    public async Task<Flotilla> CrearFlotillaAsync(Flotilla flotilla)
    {
        // Validaciones estrictas para producción
        if (string.IsNullOrWhiteSpace(flotilla.Nombre))
            throw new ArgumentException("El nombre es obligatorio", nameof(flotilla));
            
        if (flotilla.Nombre.Length < 3)
            throw new ArgumentException("El nombre debe tener al menos 3 caracteres", nameof(flotilla));
            
        if (string.IsNullOrWhiteSpace(flotilla.Estado))
            throw new ArgumentException("El estado es obligatorio", nameof(flotilla));
            
        flotilla.FechaCreacion = DateTime.Now;
        flotilla.Estado = flotilla.Estado ?? "Activo";
        
        return flotilla;
    }
    
    public async Task<Flotilla> ActualizarFlotillaAsync(Flotilla flotilla)
    {
        if (flotilla.Id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(flotilla));
            
        // Validaciones adicionales para producción
        var existe = await ObtenerFlotillaPorIdAsync(flotilla.Id);
        if (existe == null)
            throw new KeyNotFoundException($"Flotilla con ID {flotilla.Id} no encontrada");
            
        return flotilla;
    }
    
    public async Task<bool> EliminarFlotillaAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("El ID debe ser mayor que cero", nameof(id));
            
        // En producción, solo eliminación lógica
        var flotilla = await ObtenerFlotillaPorIdAsync(id);
        if (flotilla == null)
            return false;
            
        // Lógica de eliminación lógica
        return true;
    }
}
```

---

#### Paso 4.5: Configurar Factory en Program.cs

**Archivo:** `src/AdministracionFlotillas.Web/Program.cs`

```csharp
using AdministracionFlotillas.ReglasNegocio.Configuracion;
using AdministracionFlotillas.ReglasNegocio.Servicios.Factory;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.AccesoDatos.Repositorios;

var builder = WebApplication.CreateBuilder(args);

// Configurar servicios
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson();

// Leer configuración de escenario
var escenarioConfig = builder.Configuration.GetSection("EscenarioConfiguracion")
    .Get<EscenarioConfiguracion>() ?? new EscenarioConfiguracion();

builder.Services.AddSingleton(escenarioConfig);

// Registrar repositorio
builder.Services.AddScoped<IFlotillasRepository, FlotillasRepository>();

// Registrar factory
builder.Services.AddScoped<FlotillasServiceFactory>();

// Registrar servicio usando factory
builder.Services.AddScoped<IFlotillasService>(serviceProvider =>
{
    var factory = serviceProvider.GetRequiredService<FlotillasServiceFactory>();
    return factory.Crear();
});

var app = builder.Build();
// ... resto de configuración
```

**Ventajas de esta estructura:**
1. **Separación clara:** Cada escenario tiene su propia carpeta e implementación
2. **Mantenibilidad:** Fácil agregar nuevos escenarios sin modificar existentes
3. **Testabilidad:** Fácil crear mocks y escenarios de prueba
4. **Escalabilidad:** Fácil agregar nuevos tipos de BD o entornos
5. **Sigue convenciones .NET:** Usa patrones recomendados por Microsoft
6. **Configuración centralizada:** Todo se controla desde `appsettings.json`

**Cómo cambiar de escenario:**
Solo modifica `appsettings.json`:
```json
{
  "EscenarioConfiguracion": {
    "TipoBaseDatos": "Mock",  // Cambiar a Mock, Oracle, o SqlServer
    "Entorno": "Desarrollo"   // Cambiar a Desarrollo, Produccion, o Testing
  }
}
```

---

#### Paso 4.6: Nota sobre Implementación Base

**Nota:** La interfaz `IFlotillasService` ya está definida en `Servicios/Interfaces/IFlotillasService.cs` (Paso 4.3).

Las implementaciones específicas por escenario están en:
- `Servicios/Escenarios/Oracle/FlotillasServiceOracle.cs`
- `Servicios/Escenarios/SqlServer/FlotillasServiceSqlServer.cs`
- `Servicios/Escenarios/Mock/FlotillasServiceMock.cs`
- `Servicios/Escenarios/Produccion/FlotillasServiceProduccion.cs`

El Factory (`FlotillasServiceFactory`) se encarga de crear la instancia correcta según la configuración.

**Ejemplo de uso en un controlador:**

```csharp
public class FlotillasController : Controller
{
    private readonly IFlotillasService _service; // Se inyecta automáticamente según configuración
    
    public FlotillasController(IFlotillasService service)
    {
        _service = service; // La instancia correcta según appsettings.json
    }
    
    public async Task<IActionResult> Index()
    {
        var flotillas = await _service.ObtenerFlotillasAsync();
        // El servicio ya tiene las reglas de negocio correctas según el escenario
        return View(flotillas);
    }
}
```

**Cómo cambiar de escenario sin cambiar código:**

Solo modifica `appsettings.json`:
```json
{
  "EscenarioConfiguracion": {
    "TipoBaseDatos": "Mock",     // Para desarrollo/testing
    "Entorno": "Desarrollo"       // Para producción usar "Produccion"
  }
}
```

El sistema automáticamente usará las reglas de negocio correctas.

**Documento de referencia:** 
- [Microsoft: Dependency Injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
- [Microsoft: Configuration in .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration)

---

**Nota histórica:** La implementación anterior (Paso 4.1 original) se ha reemplazado por esta estructura más robusta que permite diferentes escenarios.

public class FlotillasService : IFlotillasService
{
    private readonly IFlotillasRepository _repository;
    
    public FlotillasService(IFlotillasRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<List<Flotilla>> ObtenerFlotillasAsync()
    {
        return await _repository.ObtenerFlotillasAsync();
    }
    
    public async Task<Flotilla> ObtenerFlotillaPorIdAsync(int id)
    {
        return await _repository.ObtenerFlotillaPorIdAsync(id);
    }
}
```

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Implementar Capa de Reglas de Negocio"

---

### FASE 5: Controladores y Endpoints AJAX (PRIORITARIO)

#### Paso 5.1: Crear FlotillasController

**Archivo:** `src/AdministracionFlotillas.Web/Controllers/FlotillasController.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using AdministracionFlotillas.ReglasNegocio.Servicios;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Controllers;

public class FlotillasController : Controller
{
    private readonly IFlotillasService _service;
    private readonly IMapper _mapper;
    
    public FlotillasController(IFlotillasService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }
    
    // Vista principal
    public IActionResult Index()
    {
        return View();
    }
    
    // Endpoint AJAX para obtener flotillas
    [HttpPost]
    public async Task<IActionResult> ObtenerFlotillas()
    {
        try
        {
            var flotillas = await _service.ObtenerFlotillasAsync();
            var viewModels = _mapper.Map<List<FlotillaViewModel>>(flotillas);
            
            return Json(new { success = true, data = viewModels });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = ex.Message });
        }
    }
}
```

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Crear Controladores"

---

### FASE 6: Vistas con DataTables (PRIORITARIO)

#### Paso 6.1: Crear Vista Principal Completa

**Archivo:** `src/AdministracionFlotillas.Web/Views/Flotillas/Index.cshtml`

```razor
@{
    ViewData["Title"] = "Administración de Flotillas";
}

<div class="container-fluid mt-4">
    <div class="row mb-4">
        <div class="col-md-8">
            <h2 class="mb-0">
                <i class="bi bi-truck"></i> Administración de Flotillas
            </h2>
            <p class="text-muted">Gestión integral de flotillas vehiculares de la empresa</p>
        </div>
        <div class="col-md-4 text-end">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalFlotilla">
                <i class="bi bi-plus-circle"></i> Nueva Flotilla
            </button>
            <button type="button" class="btn btn-secondary" id="btnRefrescar">
                <i class="bi bi-arrow-clockwise"></i> Actualizar
            </button>
        </div>
    </div>

    <!-- Filtros de búsqueda -->
    <div class="card mb-3">
        <div class="card-body">
            <div class="row g-3">
                <div class="col-md-3">
                    <label class="form-label">Buscar por nombre:</label>
                    <input type="text" class="form-control" id="filtroNombre" placeholder="Nombre de flotilla">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Estado:</label>
                    <select class="form-select" id="filtroEstado">
                        <option value="">Todos</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="En Mantenimiento">En Mantenimiento</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Fecha desde:</label>
                    <input type="date" class="form-control" id="filtroFechaDesde">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Fecha hasta:</label>
                    <input type="date" class="form-control" id="filtroFechaHasta">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <button type="button" class="btn btn-outline-secondary" id="btnLimpiarFiltros">
                        <i class="bi bi-x-circle"></i> Limpiar Filtros
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Vista parcial del grid -->
    @await Html.PartialAsync("_FlotillasGrid")

    <!-- Estadísticas rápidas -->
    <div class="row mt-4">
        <div class="col-md-3">
            <div class="card text-white bg-success">
                <div class="card-body">
                    <h5 class="card-title">Flotillas Activas</h5>
                    <h2 class="mb-0" id="statActivas">0</h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-white bg-warning">
                <div class="card-body">
                    <h5 class="card-title">En Mantenimiento</h5>
                    <h2 class="mb-0" id="statMantenimiento">0</h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-white bg-secondary">
                <div class="card-body">
                    <h5 class="card-title">Inactivas</h5>
                    <h2 class="mb-0" id="statInactivas">0</h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-white bg-info">
                <div class="card-body">
                    <h5 class="card-title">Total Flotillas</h5>
                    <h2 class="mb-0" id="statTotal">0</h2>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal para crear/editar flotilla (vista parcial) -->
@await Html.PartialAsync("_ModalFlotilla")

@section Scripts {
    <script src="~/js/flotillas.js"></script>
}
```

#### Paso 6.2: Crear Vista Parcial (Grid con DataTables)

**Archivo:** `src/AdministracionFlotillas.Web/Views/Flotillas/_FlotillasGrid.cshtml`

```razor
<div class="card">
    <div class="card-body">
        <div class="table-responsive">
            <table id="flotillasTable" class="table table-striped table-hover table-bordered" style="width:100%">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th>Antigüedad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Los datos se cargan vía AJAX -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        var table = $('#flotillasTable').DataTable({
            processing: true,
            serverSide: false, // Cambiar a true cuando se implemente paginación del servidor
            ajax: {
                url: '/Flotillas/ObtenerFlotillas',
                type: 'POST',
                dataType: 'json',
                dataSrc: function(json) {
                    if (json.success) {
                        return json.data;
                    } else {
                        mostrarMensaje('error', json.message || 'Error al cargar datos');
                        return [];
                    }
                },
                error: function(xhr, error, thrown) {
                    mostrarMensaje('error', 'Error al cargar las flotillas: ' + thrown);
                }
            },
            columns: [
                { data: 'id', name: 'Id', width: '5%' },
                { data: 'nombre', name: 'Nombre', width: '20%' },
                { 
                    data: 'descripcion', 
                    name: 'Descripcion', 
                    width: '30%',
                    render: function(data, type, row) {
                        if (data && data.length > 100) {
                            return '<span title="' + data + '">' + data.substring(0, 100) + '...</span>';
                        }
                        return data || '-';
                    }
                },
                { 
                    data: 'estado', 
                    name: 'Estado', 
                    width: '12%',
                    render: function(data, type, row) {
                        var badgeClass = 'bg-secondary';
                        if (data === 'Activo') badgeClass = 'bg-success';
                        else if (data === 'En Mantenimiento') badgeClass = 'bg-warning';
                        else if (data === 'Inactivo') badgeClass = 'bg-danger';
                        
                        return '<span class="badge ' + badgeClass + '">' + data + '</span>';
                    }
                },
                { data: 'fechaCreacion', name: 'FechaCreacion', width: '12%' },
                {
                    data: null,
                    name: 'Antiguedad',
                    width: '10%',
                    render: function(data, type, row) {
                        // Calcular antigüedad basada en fechaCreacion
                        var fecha = new Date(row.fechaCreacion);
                        var hoy = new Date();
                        var meses = Math.floor((hoy - fecha) / (1000 * 60 * 60 * 24 * 30));
                        if (meses < 12) {
                            return meses + ' mes' + (meses !== 1 ? 'es' : '');
                        } else {
                            var años = Math.floor(meses / 12);
                            var mesesRestantes = meses % 12;
                            return años + ' año' + (años !== 1 ? 's' : '') + 
                                   (mesesRestantes > 0 ? ' ' + mesesRestantes + ' mes' + (mesesRestantes !== 1 ? 'es' : '') : '');
                        }
                    },
                    orderable: false
                },
                {
                    data: null,
                    name: 'Acciones',
                    width: '11%',
                    orderable: false,
                    searchable: false,
                    render: function(data, type, row) {
                        return '<div class="btn-group btn-group-sm" role="group">' +
                               '<button type="button" class="btn btn-outline-primary btn-editar" data-id="' + row.id + '" title="Editar">' +
                               '<i class="bi bi-pencil"></i></button>' +
                               '<button type="button" class="btn btn-outline-info btn-ver" data-id="' + row.id + '" title="Ver Detalles">' +
                               '<i class="bi bi-eye"></i></button>' +
                               '<button type="button" class="btn btn-outline-danger btn-eliminar" data-id="' + row.id + '" title="Eliminar">' +
                               '<i class="bi bi-trash"></i></button>' +
                               '</div>';
                    }
                }
            ],
            order: [[0, 'asc']],
            pageLength: 10,
            lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
            },
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    text: '<i class="bi bi-file-excel"></i> Exportar Excel',
                    className: 'btn btn-success btn-sm',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'pdf',
                    text: '<i class="bi bi-file-pdf"></i> Exportar PDF',
                    className: 'btn btn-danger btn-sm',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="bi bi-printer"></i> Imprimir',
                    className: 'btn btn-secondary btn-sm'
                },
                {
                    extend: 'copy',
                    text: '<i class="bi bi-clipboard"></i> Copiar',
                    className: 'btn btn-info btn-sm'
                }
            ],
            responsive: true,
            drawCallback: function() {
                // Actualizar estadísticas después de cada dibujado
                actualizarEstadisticas();
            }
        });

        // Guardar referencia global de la tabla
        window.flotillasTable = table;

        // Event listeners para filtros
        $('#filtroNombre').on('keyup', function() {
            table.column(1).search(this.value).draw();
        });

        $('#filtroEstado').on('change', function() {
            table.column(3).search(this.value).draw();
        });

        $('#btnLimpiarFiltros').on('click', function() {
            $('#filtroNombre').val('');
            $('#filtroEstado').val('');
            $('#filtroFechaDesde').val('');
            $('#filtroFechaHasta').val('');
            table.search('').columns().search('').draw();
        });

        // Event listeners para botones de acción
        $('#flotillasTable tbody').on('click', '.btn-editar', function() {
            var id = $(this).data('id');
            editarFlotilla(id);
        });

        $('#flotillasTable tbody').on('click', '.btn-ver', function() {
            var id = $(this).data('id');
            verDetallesFlotilla(id);
        });

        $('#flotillasTable tbody').on('click', '.btn-eliminar', function() {
            var id = $(this).data('id');
            eliminarFlotilla(id);
        });

        $('#btnRefrescar').on('click', function() {
            table.ajax.reload();
        });
    });

    function actualizarEstadisticas() {
        var data = window.flotillasTable.rows({ search: 'applied' }).data();
        var activas = 0, mantenimiento = 0, inactivas = 0;
        
        data.each(function(row) {
            if (row.estado === 'Activo') activas++;
            else if (row.estado === 'En Mantenimiento') mantenimiento++;
            else if (row.estado === 'Inactivo') inactivas++;
        });
        
        $('#statActivas').text(activas);
        $('#statMantenimiento').text(mantenimiento);
        $('#statInactivas').text(inactivas);
        $('#statTotal').text(data.length);
    }
</script>
```

**Documento de referencia:** [DataTables Documentation](https://datatables.net/)

---

#### Paso 6.3: Crear Vista Parcial (Modal para Crear/Editar)

**Archivo:** `src/AdministracionFlotillas.Web/Views/Flotillas/_ModalFlotilla.cshtml`

```razor
<div class="modal fade" id="modalFlotilla" tabindex="-1" aria-labelledby="modalFlotillaLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalFlotillaLabel">
                    <i class="bi bi-truck"></i> <span id="modalTitulo">Nueva Flotilla</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="formFlotilla">
                <div class="modal-body">
                    <input type="hidden" id="flotillaId" name="Id" value="0">
                    
                    <div class="mb-3">
                        <label for="flotillaNombre" class="form-label">Nombre de la Flotilla <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="flotillaNombre" name="Nombre" required 
                               placeholder="Ej: Flotilla Norte - Logística Regional">
                        <div class="form-text">Ingrese un nombre descriptivo para la flotilla</div>
                    </div>

                    <div class="mb-3">
                        <label for="flotillaDescripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="flotillaDescripcion" name="Descripcion" rows="3" 
                                  placeholder="Descripción detallada de la flotilla, propósito, vehículos incluidos, etc."></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="flotillaEstado" class="form-label">Estado <span class="text-danger">*</span></label>
                            <select class="form-select" id="flotillaEstado" name="Estado" required>
                                <option value="">Seleccione un estado</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="En Mantenimiento">En Mantenimiento</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="flotillaFechaCreacion" class="form-label">Fecha de Creación</label>
                            <input type="date" class="form-control" id="flotillaFechaCreacion" name="FechaCreacion">
                            <div class="form-text">Si se deja vacío, se usará la fecha actual</div>
                        </div>
                    </div>

                    <div class="alert alert-info" role="alert">
                        <i class="bi bi-info-circle"></i> <strong>Nota:</strong> Los campos marcados con <span class="text-danger">*</span> son obligatorios.
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-circle"></i> Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-check-circle"></i> Guardar Flotilla
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
```

---

### FASE 7: JavaScript y Manejo de Respuestas (PRIORITARIO)

#### Paso 7.1: Crear JavaScript para Manejo de Respuestas

**Archivo:** `src/AdministracionFlotillas.Web/wwwroot/js/flotillas.js`

```javascript
// Función para mostrar mensajes usando Bootstrap Toast
function mostrarMensaje(tipo, mensaje, titulo) {
    titulo = titulo || (tipo === 'success' ? 'Éxito' : tipo === 'error' ? 'Error' : 'Información');
    
    // Crear toast dinámicamente
    var toastId = 'toast-' + Date.now();
    var bgClass = tipo === 'success' ? 'bg-success' : tipo === 'error' ? 'bg-danger' : 'bg-info';
    var icon = tipo === 'success' ? 'bi-check-circle' : tipo === 'error' ? 'bi-exclamation-triangle' : 'bi-info-circle';
    
    var toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi ${icon} me-2"></i>
                    <strong>${titulo}:</strong> ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Agregar contenedor de toasts si no existe
    if ($('#toastContainer').length === 0) {
        $('body').append('<div id="toastContainer" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11"></div>');
    }
    
    $('#toastContainer').append(toastHtml);
    var toastElement = document.getElementById(toastId);
    var toast = new bootstrap.Toast(toastElement, { delay: 5000 });
    toast.show();
    
    // Remover el toast del DOM después de que se oculte
    $(toastElement).on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

// Función para actualizar tabla DataTables
function actualizarTabla() {
    if (window.flotillasTable) {
        window.flotillasTable.ajax.reload(null, false); // false = mantener página actual
    }
}

// Función para editar flotilla
function editarFlotilla(id) {
    // Hacer petición AJAX para obtener datos de la flotilla
    $.ajax({
        url: '/Flotillas/ObtenerFlotillaPorId',
        type: 'POST',
        data: { id: id },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                var flotilla = response.data;
                $('#flotillaId').val(flotilla.id);
                $('#flotillaNombre').val(flotilla.nombre);
                $('#flotillaDescripcion').val(flotilla.descripcion);
                $('#flotillaEstado').val(flotilla.estado);
                $('#flotillaFechaCreacion').val(flotilla.fechaCreacion ? flotilla.fechaCreacion.split('T')[0] : '');
                $('#modalTitulo').text('Editar Flotilla');
                $('#modalFlotilla').modal('show');
            } else {
                mostrarMensaje('error', response.message || 'Error al cargar la flotilla');
            }
        },
        error: function(xhr, status, error) {
            mostrarMensaje('error', 'Error al cargar la flotilla: ' + error);
        }
    });
}

// Función para ver detalles de flotilla
function verDetallesFlotilla(id) {
    // Similar a editar pero en modo solo lectura
    editarFlotilla(id);
    $('#formFlotilla input, #formFlotilla textarea, #formFlotilla select').prop('disabled', true);
    $('#modalTitulo').text('Detalles de Flotilla');
    $('#modalFlotilla .modal-footer').hide();
    
    $('#modalFlotilla').on('hidden.bs.modal', function() {
        $('#formFlotilla input, #formFlotilla textarea, #formFlotilla select').prop('disabled', false);
        $('#modalFlotilla .modal-footer').show();
    });
}

// Función para eliminar flotilla
function eliminarFlotilla(id) {
    if (!confirm('¿Está seguro de que desea eliminar esta flotilla?')) {
        return;
    }
    
    $.ajax({
        url: '/Flotillas/EliminarFlotilla',
        type: 'POST',
        data: { id: id },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                mostrarMensaje('success', 'Flotilla eliminada correctamente');
                actualizarTabla();
            } else {
                mostrarMensaje('error', response.message || 'Error al eliminar la flotilla');
            }
        },
        error: function(xhr, status, error) {
            mostrarMensaje('error', 'Error al eliminar la flotilla: ' + error);
        }
    });
}

// Manejo del formulario de flotilla
$(document).ready(function() {
    $('#formFlotilla').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            Id: $('#flotillaId').val(),
            Nombre: $('#flotillaNombre').val(),
            Descripcion: $('#flotillaDescripcion').val(),
            Estado: $('#flotillaEstado').val(),
            FechaCreacion: $('#flotillaFechaCreacion').val() || new Date().toISOString().split('T')[0]
        };
        
        var url = formData.Id > 0 ? '/Flotillas/ActualizarFlotilla' : '/Flotillas/CrearFlotilla';
        var method = 'POST';
        
        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    mostrarMensaje('success', formData.Id > 0 ? 'Flotilla actualizada correctamente' : 'Flotilla creada correctamente');
                    $('#modalFlotilla').modal('hide');
                    $('#formFlotilla')[0].reset();
                    $('#flotillaId').val('0');
                    actualizarTabla();
                } else {
                    mostrarMensaje('error', response.message || 'Error al guardar la flotilla');
                }
            },
            error: function(xhr, status, error) {
                var errorMessage = 'Error al guardar la flotilla';
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage += ': ' + xhr.responseJSON.message;
                } else {
                    errorMessage += ': ' + error;
                }
                mostrarMensaje('error', errorMessage);
            }
        });
    });
    
    // Limpiar formulario al cerrar modal
    $('#modalFlotilla').on('hidden.bs.modal', function() {
        $('#formFlotilla')[0].reset();
        $('#flotillaId').val('0');
        $('#modalTitulo').text('Nueva Flotilla');
    });
    
    // Abrir modal para nueva flotilla
    $('[data-bs-target="#modalFlotilla"]').on('click', function() {
        $('#formFlotilla')[0].reset();
        $('#flotillaId').val('0');
        $('#flotillaFechaCreacion').val(new Date().toISOString().split('T')[0]);
        $('#modalTitulo').text('Nueva Flotilla');
    });
});

// Manejo de errores global AJAX
$(document).ajaxError(function(event, xhr, settings, error) {
    if (xhr.status === 0) {
        mostrarMensaje('error', 'No se pudo conectar con el servidor. Verifique su conexión.');
    } else if (xhr.status === 500) {
        mostrarMensaje('error', 'Error interno del servidor. Por favor, contacte al administrador.');
    } else if (xhr.status === 404) {
        mostrarMensaje('error', 'Recurso no encontrado.');
    } else {
        mostrarMensaje('error', 'Error al procesar la solicitud: ' + error);
    }
});
```

#### Paso 7.2: Configurar Contenedor de Notificaciones en _Layout.cshtml

Agregar contenedor para toasts de Bootstrap (ya se crea dinámicamente en JavaScript, pero se puede agregar estático también):

```html
<!-- Contenedor para notificaciones toast (opcional, se crea dinámicamente) -->
<div id="toastContainer" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11"></div>
```

**Documento de referencia:** [Bootstrap Toasts](https://getbootstrap.com/docs/5.3/components/toasts/)

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Manejo de Respuestas"

---

### FASE 7.3: Componentes Reutilizables (Solo Nombre de Controlador)

**Objetivo:** Crear componentes JavaScript reutilizables que solo requieran especificar el nombre del controlador. Los componentes manejarán automáticamente la carga de datos, paginación, y la comunicación con el servidor siguiendo el flujo: **DataAccess → Business → Controller → ViewModel → Component**.

#### Flujo de Datos Completo

```
┌─────────────────┐
│   Componente    │  (JavaScript - DataTables/Dropdown)
│   JavaScript    │  Solo necesita: nombre del controlador
└────────┬────────┘
         │ AJAX Request
         ▼
┌─────────────────┐
│   Controller    │  (ASP.NET Core MVC)
│   Flotillas     │  Recibe request, llama al servicio
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Service      │  (ReglasNegocio)
│  Flotillas      │  Aplica lógica de negocio
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Repository     │  (AccesoDatos)
│  Flotillas      │  Obtiene datos de BD o Mock
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Business Model  │  (ModelosComunes)
│    Flotilla     │  Modelo de dominio
└────────┬────────┘
         │
         │ AutoMapper
         ▼
┌─────────────────┐
│  ViewModel      │  (Web/ViewModels)
│ FlotillaViewModel│  Modelo para la vista
└────────┬────────┘
         │
         │ JSON Response
         ▼
┌─────────────────┐
│   Componente    │  Renderiza datos en tabla/dropdown
│   JavaScript    │  Con paginación automática
└─────────────────┘
```

#### Paso 7.3.1: Crear Controlador Base Genérico

**Archivo:** `src/AdministracionFlotillas.Web/Controllers/BaseApiController.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace AdministracionFlotillas.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    protected readonly IMapper _mapper;
    
    protected BaseApiController(IMapper mapper)
    {
        _mapper = mapper;
    }
    
    // Método helper para respuestas estándar
    protected IActionResult SuccessResponse<T>(T data, string message = null)
    {
        return Ok(new { success = true, data = data, message = message });
    }
    
    protected IActionResult ErrorResponse(string message, int statusCode = 400)
    {
        return StatusCode(statusCode, new { success = false, message = message });
    }
}
```

#### Paso 7.3.2: Actualizar FlotillasController para Usar BaseApiController

**Archivo:** `src/AdministracionFlotillas.Web/Controllers/FlotillasController.cs`

```csharp
using AdministracionFlotillas.ReglasNegocio.Servicios;
using AdministracionFlotillas.Web.Controllers;
using AdministracionFlotillas.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AdministracionFlotillas.Web.Controllers;

[Route("api/[controller]")]
public class FlotillasController : BaseApiController
{
    private readonly IFlotillasService _service;
    
    public FlotillasController(IFlotillasService service, IMapper mapper) 
        : base(mapper)
    {
        _service = service;
    }
    
    // Endpoint estándar para componentes reutilizables
    [HttpPost("ObtenerTodos")]
    public async Task<IActionResult> ObtenerTodos([FromBody] DataTableRequest request = null)
    {
        try
        {
            var flotillas = await _service.ObtenerFlotillasAsync();
            var viewModels = _mapper.Map<List<FlotillaViewModel>>(flotillas);
            
            // Si hay request de DataTables, aplicar paginación del servidor
            if (request != null && request.ServerSide)
            {
                var totalRecords = viewModels.Count;
                var filteredData = ApplyFilters(viewModels, request);
                var pagedData = ApplyPagination(filteredData, request);
                
                return SuccessResponse(new
                {
                    draw = request.Draw,
                    recordsTotal = totalRecords,
                    recordsFiltered = filteredData.Count,
                    data = pagedData
                });
            }
            
            return SuccessResponse(viewModels);
        }
        catch (Exception ex)
        {
            return ErrorResponse($"Error al obtener flotillas: {ex.Message}", 500);
        }
    }
    
    // Endpoint para dropdowns (solo ID y Nombre)
    [HttpPost("ObtenerParaDropdown")]
    public async Task<IActionResult> ObtenerParaDropdown()
    {
        try
        {
            var flotillas = await _service.ObtenerFlotillasAsync();
            var dropdownData = flotillas.Select(f => new
            {
                value = f.Id,
                text = f.Nombre
            }).ToList();
            
            return SuccessResponse(dropdownData);
        }
        catch (Exception ex)
        {
            return ErrorResponse($"Error al obtener flotillas para dropdown: {ex.Message}", 500);
        }
    }
    
    private List<FlotillaViewModel> ApplyFilters(List<FlotillaViewModel> data, DataTableRequest request)
    {
        if (string.IsNullOrEmpty(request.Search?.Value))
            return data;
            
        var searchValue = request.Search.Value.ToLower();
        return data.Where(f => 
            f.Nombre.ToLower().Contains(searchValue) ||
            (f.Descripcion != null && f.Descripcion.ToLower().Contains(searchValue)) ||
            f.Estado.ToLower().Contains(searchValue)
        ).ToList();
    }
    
    private List<FlotillaViewModel> ApplyPagination(List<FlotillaViewModel> data, DataTableRequest request)
    {
        if (request.Start >= data.Count)
            return new List<FlotillaViewModel>();
            
        return data.Skip(request.Start).Take(request.Length).ToList();
    }
}

// Clase para request de DataTables
public class DataTableRequest
{
    public int Draw { get; set; }
    public int Start { get; set; }
    public int Length { get; set; }
    public bool ServerSide { get; set; } = false;
    public SearchRequest Search { get; set; }
}

public class SearchRequest
{
    public string Value { get; set; }
    public bool Regex { get; set; }
}
```

#### Paso 7.3.3: Crear Componente Reutilizable de DataTable

**Archivo:** `src/AdministracionFlotillas.Web/wwwroot/js/components/datatable-component.js`

```javascript
/**
 * Componente reutilizable de DataTable
 * Solo requiere especificar el nombre del controlador
 * 
 * Uso:
 *   initDataTable('Flotillas', '#miTabla', {
 *     columns: [...],
 *     serverSide: true
 *   });
 */
function initDataTable(controllerName, tableSelector, options) {
    var defaults = {
        serverSide: false,
        pageLength: 10,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: '<i class="bi bi-file-excel"></i> Exportar Excel',
                className: 'btn btn-success btn-sm'
            },
            {
                extend: 'pdf',
                text: '<i class="bi bi-file-pdf"></i> Exportar PDF',
                className: 'btn btn-danger btn-sm'
            },
            {
                extend: 'print',
                text: '<i class="bi bi-printer"></i> Imprimir',
                className: 'btn btn-secondary btn-sm'
            }
        ],
        responsive: true,
        processing: true
    };
    
    var config = $.extend(true, {}, defaults, options);
    
    // Construir URL del endpoint
    var endpoint = config.endpoint || `/api/${controllerName}/ObtenerTodos`;
    
    // Configurar AJAX
    config.ajax = {
        url: endpoint,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: function(d) {
            if (config.serverSide) {
                return JSON.stringify({
                    draw: d.draw,
                    start: d.start,
                    length: d.length,
                    serverSide: true,
                    search: {
                        value: d.search.value,
                        regex: d.search.regex
                    }
                });
            }
            return JSON.stringify({});
        },
        dataSrc: function(json) {
            if (!json.success) {
                mostrarMensaje('error', json.message || 'Error al cargar datos');
                return [];
            }
            
            if (config.serverSide) {
                json.recordsTotal = json.data.recordsTotal;
                json.recordsFiltered = json.data.recordsFiltered;
                return json.data.data;
            }
            
            return json.data;
        },
        error: function(xhr, error, thrown) {
            mostrarMensaje('error', 'Error al cargar datos: ' + thrown);
        }
    };
    
    // Inicializar DataTable
    var table = $(tableSelector).DataTable(config);
    
    // Guardar referencia global
    window[controllerName + 'Table'] = table;
    
    return table;
}

/**
 * Función helper para refrescar una tabla por nombre de controlador
 */
function refreshDataTable(controllerName) {
    var table = window[controllerName + 'Table'];
    if (table) {
        table.ajax.reload(null, false);
    }
}
```

#### Paso 7.3.4: Crear Componente Reutilizable de Dropdown

**Archivo:** `src/AdministracionFlotillas.Web/wwwroot/js/components/dropdown-component.js`

```javascript
/**
 * Componente reutilizable de Dropdown
 * Solo requiere especificar el nombre del controlador
 * 
 * Uso:
 *   initDropdown('Flotillas', '#miDropdown', {
 *     placeholder: 'Seleccione una flotilla',
 *     allowClear: true
 *   });
 */
function initDropdown(controllerName, dropdownSelector, options) {
    var defaults = {
        placeholder: 'Seleccione una opción',
        allowClear: true,
        valueField: 'value',
        textField: 'text'
    };
    
    var config = $.extend(true, {}, defaults, options);
    
    // Construir URL del endpoint
    var endpoint = config.endpoint || `/api/${controllerName}/ObtenerParaDropdown`;
    
    // Limpiar dropdown primero
    $(dropdownSelector).empty();
    
    // Agregar opción placeholder si está habilitado
    if (config.placeholder) {
        $(dropdownSelector).append(
            $('<option></option>')
                .attr('value', '')
                .text(config.placeholder)
        );
    }
    
    // Cargar datos desde el controlador
    $.ajax({
        url: endpoint,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function(response) {
            if (response.success && response.data) {
                $.each(response.data, function(index, item) {
                    var value = item[config.valueField];
                    var text = item[config.textField];
                    
                    $(dropdownSelector).append(
                        $('<option></option>')
                            .attr('value', value)
                            .text(text)
                    );
                });
                
                // Trigger evento personalizado cuando se carga
                $(dropdownSelector).trigger('dropdown:loaded');
            } else {
                mostrarMensaje('error', response.message || 'Error al cargar opciones');
            }
        },
        error: function(xhr, status, error) {
            mostrarMensaje('error', 'Error al cargar opciones del dropdown: ' + error);
        }
    });
    
    return $(dropdownSelector);
}

/**
 * Función helper para refrescar un dropdown por nombre de controlador
 */
function refreshDropdown(controllerName, dropdownSelector) {
    initDropdown(controllerName, dropdownSelector, {});
}
```

#### Paso 7.3.5: Ejemplo de Uso - Vista con Componentes Reutilizables

**Archivo:** `src/AdministracionFlotillas.Web/Views/Flotillas/IndexReutilizable.cshtml`

```razor
@{
    ViewData["Title"] = "Flotillas - Componentes Reutilizables";
}

<div class="container-fluid mt-4">
    <h2>Administración de Flotillas</h2>
    
    <!-- Dropdown reutilizable -->
    <div class="row mb-3">
        <div class="col-md-4">
            <label class="form-label">Filtrar por Flotilla:</label>
            <select id="dropdownFlotillas" class="form-select">
                <!-- Se llena automáticamente -->
            </select>
        </div>
    </div>
    
    <!-- Tabla reutilizable -->
    <div class="card">
        <div class="card-body">
            <table id="tablaFlotillas" class="table table-striped table-bordered" style="width:100%">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Se llena automáticamente -->
                </tbody>
            </table>
        </div>
    </div>
</div>

@section Scripts {
    <script src="~/js/components/datatable-component.js"></script>
    <script src="~/js/components/dropdown-component.js"></script>
    <script>
        $(document).ready(function() {
            // Inicializar dropdown - Solo necesita el nombre del controlador
            initDropdown('Flotillas', '#dropdownFlotillas', {
                placeholder: 'Seleccione una flotilla',
                allowClear: true
            });
            
            // Inicializar tabla - Solo necesita el nombre del controlador
            initDataTable('Flotillas', '#tablaFlotillas', {
                columns: [
                    { data: 'id', name: 'Id', width: '5%' },
                    { data: 'nombre', name: 'Nombre', width: '20%' },
                    { 
                        data: 'descripcion', 
                        name: 'Descripcion', 
                        width: '30%',
                        render: function(data, type, row) {
                            return data && data.length > 100 
                                ? '<span title="' + data + '">' + data.substring(0, 100) + '...</span>'
                                : data || '-';
                        }
                    },
                    { 
                        data: 'estado', 
                        name: 'Estado', 
                        width: '12%',
                        render: function(data, type, row) {
                            var badgeClass = 'bg-secondary';
                            if (data === 'Activo') badgeClass = 'bg-success';
                            else if (data === 'En Mantenimiento') badgeClass = 'bg-warning';
                            else if (data === 'Inactivo') badgeClass = 'bg-danger';
                            return '<span class="badge ' + badgeClass + '">' + data + '</span>';
                        }
                    },
                    { data: 'fechaCreacion', name: 'FechaCreacion', width: '12%' },
                    {
                        data: null,
                        name: 'Acciones',
                        width: '11%',
                        orderable: false,
                        searchable: false,
                        render: function(data, type, row) {
                            return '<div class="btn-group btn-group-sm">' +
                                   '<button class="btn btn-outline-primary btn-editar" data-id="' + row.id + '">' +
                                   '<i class="bi bi-pencil"></i></button>' +
                                   '</div>';
                        }
                    }
                ],
                serverSide: false, // Cambiar a true para paginación del servidor
                pageLength: 10
            });
            
            // Event listener para cuando se carga el dropdown
            $('#dropdownFlotillas').on('dropdown:loaded', function() {
                console.log('Dropdown cargado correctamente');
            });
            
            // Event listener para cambio de selección en dropdown
            $('#dropdownFlotillas').on('change', function() {
                var selectedId = $(this).val();
                if (selectedId) {
                    // Filtrar tabla si es necesario
                    console.log('Flotilla seleccionada:', selectedId);
                }
            });
        });
    </script>
}
```

#### Paso 7.3.6: Patrón para Crear Nuevos Controladores

**Template para nuevos controladores que sigan el mismo patrón:**

```csharp
[Route("api/[controller]")]
public class MiNuevoController : BaseApiController
{
    private readonly IMiNuevoService _service;
    
    public MiNuevoController(IMiNuevoService service, IMapper mapper) 
        : base(mapper)
    {
        _service = service;
    }
    
    [HttpPost("ObtenerTodos")]
    public async Task<IActionResult> ObtenerTodos([FromBody] DataTableRequest request = null)
    {
        try
        {
            var datos = await _service.ObtenerTodosAsync();
            var viewModels = _mapper.Map<List<MiNuevoViewModel>>(datos);
            
            // Aplicar paginación del servidor si es necesario
            if (request != null && request.ServerSide)
            {
                // ... lógica de paginación
            }
            
            return SuccessResponse(viewModels);
        }
        catch (Exception ex)
        {
            return ErrorResponse($"Error: {ex.Message}", 500);
        }
    }
    
    [HttpPost("ObtenerParaDropdown")]
    public async Task<IActionResult> ObtenerParaDropdown()
    {
        try
        {
            var datos = await _service.ObtenerTodosAsync();
            var dropdownData = datos.Select(d => new
            {
                value = d.Id,
                text = d.Nombre
            }).ToList();
            
            return SuccessResponse(dropdownData);
        }
        catch (Exception ex)
        {
            return ErrorResponse($"Error: {ex.Message}", 500);
        }
    }
}
```

**Uso en JavaScript:**
```javascript
// Solo cambiar el nombre del controlador
initDataTable('MiNuevo', '#tablaMiNuevo', { columns: [...] });
initDropdown('MiNuevo', '#dropdownMiNuevo', {});
```

**Ventajas de este enfoque:**
1. **Reutilización:** Un solo componente JavaScript para todas las tablas/dropdowns
2. **Consistencia:** Todos los controladores siguen el mismo patrón
3. **Mantenibilidad:** Cambios en el componente afectan a todas las implementaciones
4. **Simplicidad:** Solo necesitas especificar el nombre del controlador
5. **Flujo claro:** DataAccess → Business → Controller → ViewModel → Component

**Documento de referencia:** Este patrón debe seguirse para todos los nuevos módulos del proyecto.

---

### FASE 8: Configuración Final

#### Paso 8.1: Registrar Servicios en Program.cs

```csharp
using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ReglasNegocio.Configuracion;
using AdministracionFlotillas.ReglasNegocio.Servicios.Factory;
using AdministracionFlotillas.ReglasNegocio.Servicios.Interfaces;
using AdministracionFlotillas.Web.Mappings;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Configuración de escenario (desde appsettings.json)
var escenarioConfig = builder.Configuration.GetSection("EscenarioConfiguracion")
    .Get<EscenarioConfiguracion>() ?? new EscenarioConfiguracion();

builder.Services.AddSingleton(escenarioConfig);

// Repositorios
builder.Services.AddScoped<IFlotillasRepository, FlotillasRepository>();

// Factory para servicios según escenario
builder.Services.AddScoped<FlotillasServiceFactory>();

// Servicios - Se crean automáticamente según la configuración
builder.Services.AddScoped<IFlotillasService>(serviceProvider =>
{
    var factory = serviceProvider.GetRequiredService<FlotillasServiceFactory>();
    return factory.Crear(); // Crea la instancia correcta según appsettings.json
});

var app = builder.Build();
// ... resto de configuración
```

**Nota:** Con esta configuración, el sistema automáticamente usará:
- `FlotillasServiceOracle` si `TipoBaseDatos = "Oracle"`
- `FlotillasServiceSqlServer` si `TipoBaseDatos = "SqlServer"`
- `FlotillasServiceMock` si `TipoBaseDatos = "Mock"`
- `FlotillasServiceProduccion` si `Entorno = "Produccion"`

Todo se controla desde `appsettings.json` sin cambiar código.

#### Paso 8.2: Verificar que Todo Funciona

```bash
# Compilar
dotnet build

# Ejecutar
cd src/AdministracionFlotillas.Web
dotnet run

# Verificar en navegador
# http://localhost:5000/Flotillas
```

#### Paso 8.3: Crear Documentación para el Equipo

**Archivo:** `docs/GUIA_ESTRUCTURA_VISTAS.md` (crear)

Documentar:
- Cómo crear una nueva vista principal
- Cómo crear una vista parcial
- Cómo crear un controlador con endpoints AJAX
- Cómo usar el parser
- Estructura de JavaScript
- Patrones a seguir

---

## Checklist de Completitud

- [ ] Repositorio GitHub creado y conectado (FASE 0 - opcional)
- [ ] Todos los commits realizados con nombres simples y descripciones breves (si se usa Git)
- [ ] DataTables instalado y funcionando
- [ ] AutoMapper configurado y funcionando
- [ ] Modelo en ModelosComunes creado
- [ ] ViewModel en Web creado
- [ ] Repositorio de ejemplo creado
- [ ] Servicio de ejemplo creado
- [ ] Controlador con endpoints AJAX funcionando
- [ ] Vista principal con DataTables funcionando
- [ ] Vista parcial funcionando
- [ ] JavaScript manejando respuestas (success/error)
- [ ] Program.cs configurado con DI
- [ ] Aplicación compila y ejecuta sin errores
- [ ] Documentación para el equipo creada
- [ ] Código subido a GitHub con historial completo de commits (si se usa Git)

## Convenciones de Commits

**Formato:**
```
Título simple y descriptivo

Descripción breve de los cambios realizados
- Lista de cambios específicos si es necesario
```

**Ejemplos:**
```
Agregar paquete AutoMapper

- Instalado AutoMapper v16.0.0 en proyecto Web
- Para conversión ViewModel a BusinessModel
```

```
Crear modelo Flotilla

- Agregado modelo Flotilla en ModelosComunes
- Propiedades: Id, Nombre, Descripcion, Estado, FechaCreacion
```

```
Configurar AutoMapper en Program.cs

- Agregado AddAutoMapper con MappingProfile
- Configurado para inyección de dependencias
```

**Reglas:**
- Sin emojis en títulos ni descripciones
- Títulos en español, claros y concisos
- Un commit por cambio lógico
- Describir qué archivos se modificaron

---

## Orden de Implementación

**Si estás creando desde cero, sigue este orden:**
1. FASE 0: Crear repositorio GitHub (opcional pero recomendado)
2. FASE 1: Configuración Base - Instalar paquetes NuGet
3. FASE 2: Modelos y Parser
4. FASE 3: Capa de Acceso a Datos
5. FASE 4: Capa de Reglas de Negocio
6. FASE 5: Controladores y Endpoints AJAX
7. FASE 6: Vistas con DataTables
8. FASE 7: JavaScript y Manejo de Respuestas
9. FASE 7.3: Componentes Reutilizables (Solo Nombre de Controlador) - **RECOMENDADO**
10. FASE 8: Configuración Final

**Si el proyecto ya existe y solo necesitas continuar:**
- Verifica qué fases ya están completadas
- Continúa desde la siguiente fase pendiente
- Consulta [SEGUIMIENTO_PROGRESO.md](./SEGUIMIENTO_PROGRESO.md) para el estado actual

**Orden de trabajo:**
1. FASE 0: Crear repositorio GitHub (opcional pero recomendado)
2. Completar FASE 1 (Configuración Base) - Instalar paquetes NuGet
3. Completar FASE 2 (Modelos y Parser)
4. Completar FASE 3 (Acceso a Datos)
5. Completar FASE 4 (Reglas de Negocio)
6. Completar FASE 5 (Controladores)
7. Completar FASE 6 (Vistas)
8. Completar FASE 7 (JavaScript)
9. Completar FASE 7.3 (Componentes Reutilizables) - **RECOMENDADO para reutilización**
10. Completar FASE 8 (Configuración Final)

---

## Criterios de Completitud

**El proyecto está completo cuando:**
1. Todas las fases 0-8 están completadas (FASE 7.3 recomendada)
2. Hay al menos una vista principal funcional
3. Hay al menos una vista parcial funcional
4. La UI llama a controladores vía AJAX
5. Se muestran respuestas del servidor en tiempo real
6. Componentes reutilizables funcionando (DataTable y Dropdown que solo requieren nombre del controlador)
7. Flujo completo funcionando: DataAccess → Business → Controller → ViewModel → Component
6. Se manejan mensajes de error/success
7. El flujo completo funciona: UI → Controller → Parser → Service → Repository
8. La documentación para el equipo está lista
9. El código está en GitHub (si se usa control de versiones)

---

**Última actualización:** Enero 2025

