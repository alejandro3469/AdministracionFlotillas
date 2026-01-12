# Plan de Implementación del Proyecto

## Objetivo

Este documento describe los pasos para implementar el proyecto AdministracionFlotillas desde cero. Establece los requisitos mínimos y la estructura que debe tener el proyecto para que el equipo pueda agregar vistas similares siguiendo el mismo patrón.

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
- [ ] Instalar y configurar Kendo UI (FASE 1.3)
- [ ] Configurar AutoMapper en Program.cs (FASE 2.3)
- [ ] Crear modelo de ejemplo en ModelosComunes (FASE 2.1)
- [ ] Crear ViewModel de ejemplo en Web (FASE 2.2)
- [ ] Crear servicio de ejemplo en ReglasNegocio (FASE 4.1)
- [ ] Crear repositorio de ejemplo en AccesoDatos (FASE 3.1)
- [ ] Crear controlador funcional con endpoints AJAX (FASE 5.1)
- [ ] Crear vista principal con Kendo Grid (FASE 6.1)
- [ ] Crear vista parcial (modal o componente reutilizable) (FASE 6.2)
- [ ] Implementar llamadas AJAX/Kendo desde UI a controladores (FASE 7.1)
- [ ] Mostrar respuestas del servidor en tiempo real (FASE 7.2)
- [ ] Implementar manejo de mensajes (error/excepciones/success) (FASE 7.2)
- [ ] Configurar Program.cs con inyección de dependencias (FASE 8.1)
- [ ] Documentar estructura para el equipo (FASE 8.3)

---

## Requisitos Mínimos del Proyecto

### 1. Vista Principal Funcional

**Requisitos:**
- Vista que muestre datos usando Kendo Grid
- Llamadas AJAX/Kendo a controladores
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
- Llamadas AJAX o Kendo DataSource desde JavaScript
- Controladores con endpoints que retornen JSON
- Estructura clara de request/response

**Ejemplo de estructura:**
```javascript
// JavaScript en la vista
$("#grid").kendoGrid({
    dataSource: {
        transport: {
            read: {
                url: "/Flotillas/ObtenerFlotillas",
                type: "POST",
                dataType: "json"
            }
        }
    }
});
```

### 4. Mostrar Respuestas del Servidor

**Requisitos:**
- Mostrar datos en tiempo real (actualizar grid, cards, etc.)
- Mostrar mensajes de éxito
- Mostrar mensajes de error/excepciones
- Feedback visual claro al usuario

**Implementación sugerida:**
- Toast notifications (Kendo o Bootstrap)
- Mensajes en la UI
- Actualización automática de componentes

### 5. Parser ViewModel ↔ BusinessModel

**Requisitos:**
- AutoMapper configurado
- Perfiles de mapeo creados
- Conversión bidireccional funcionando
- Usado en controladores

### 6. Arquitectura Completa Funcionando

**Requisitos:**
- Controlador → Parser → Servicio → Repositorio → Base de Datos
- Flujo completo de datos funcionando
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

#### Paso 1.2: Instalar Kendo UI

**Opción A: Via CDN (Rápido para desarrollo)**
- Agregar referencias en `_Layout.cshtml`

**Opción B: Via NPM/LibMan (Recomendado)**
- Usar LibMan para instalar Kendo UI
- Agregar a `wwwroot/lib/kendo-ui/`

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Configurar Kendo UI"

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

**Archivo:** `src/AdministracionFlotillas.AccesoDatos/Repositorios/FlotillasRepository.cs`

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
    // Implementación con datos mock o conexión a BD
    public async Task<List<Flotilla>> ObtenerFlotillasAsync()
    {
        // Por ahora retornar datos mock
        return new List<Flotilla>
        {
            new Flotilla { Id = 1, Nombre = "Flotilla 1", Estado = "Activo", FechaCreacion = DateTime.Now },
            new Flotilla { Id = 2, Nombre = "Flotilla 2", Estado = "Activo", FechaCreacion = DateTime.Now }
        };
    }
    
    public async Task<Flotilla> ObtenerFlotillaPorIdAsync(int id)
    {
        // Implementación
        return null;
    }
}
```

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Implementar Capa de Acceso a Datos"

---

### FASE 4: Capa de Reglas de Negocio (PRIORITARIO)

#### Paso 4.1: Crear Servicio de Ejemplo

**Archivo:** `src/AdministracionFlotillas.ReglasNegocio/Servicios/FlotillasService.cs`

```csharp
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.AccesoDatos.Repositorios;

namespace AdministracionFlotillas.ReglasNegocio.Servicios;

public interface IFlotillasService
{
    Task<List<Flotilla>> ObtenerFlotillasAsync();
    Task<Flotilla> ObtenerFlotillaPorIdAsync(int id);
}

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

### FASE 6: Vistas con Kendo UI (PRIORITARIO)

#### Paso 6.1: Crear Vista Principal

**Archivo:** `src/AdministracionFlotillas.Web/Views/Flotillas/Index.cshtml`

```razor
@{
    ViewData["Title"] = "Flotillas";
}

<div class="container-fluid">
    <h2>Administración de Flotillas</h2>
    
    @* Vista parcial del grid *@
    @await Html.PartialAsync("_FlotillasGrid")
</div>

@section Scripts {
    <script src="~/js/flotillas.js"></script>
}
```

#### Paso 6.2: Crear Vista Parcial (Grid)

**Archivo:** `src/AdministracionFlotillas.Web/Views/Flotillas/_FlotillasGrid.cshtml`

```razor
<div id="flotillasGrid"></div>

<script>
    $(document).ready(function() {
        $("#flotillasGrid").kendoGrid({
            dataSource: {
                transport: {
                    read: {
                        url: "/Flotillas/ObtenerFlotillas",
                        type: "POST",
                        dataType: "json"
                    }
                },
                schema: {
                    data: "data",
                    total: "total"
                }
            },
            columns: [
                { field: "Id", title: "ID" },
                { field: "Nombre", title: "Nombre" },
                { field: "Descripcion", title: "Descripción" },
                { field: "Estado", title: "Estado" },
                { field: "FechaCreacion", title: "Fecha Creación" }
            ],
            pageable: true,
            sortable: true
        });
    });
</script>
```

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Crear Vistas con Kendo UI"

---

### FASE 7: JavaScript y Manejo de Respuestas (PRIORITARIO)

#### Paso 7.1: Crear JavaScript para Manejo de Respuestas

**Archivo:** `src/AdministracionFlotillas.Web/wwwroot/js/flotillas.js`

```javascript
// Función para mostrar mensajes
function mostrarMensaje(tipo, mensaje) {
    // Usar Kendo Notification o Bootstrap Toast
    var notification = $("#notification").data("kendoNotification");
    if (notification) {
        notification.show(mensaje, tipo); // success, error, info
    }
}

// Función para actualizar grid
function actualizarGrid() {
    var grid = $("#flotillasGrid").data("kendoGrid");
    if (grid) {
        grid.dataSource.read();
    }
}

// Manejo de errores global
$(document).ajaxError(function(event, xhr, settings, error) {
    mostrarMensaje("error", "Error al procesar la solicitud: " + error);
});
```

#### Paso 7.2: Configurar Kendo Notification en _Layout.cshtml

Agregar contenedor para notificaciones:

```html
<div id="notification"></div>
```

Y configurar en JavaScript:

```javascript
$(document).ready(function() {
    $("#notification").kendoNotification({
        position: {
            pinned: true,
            top: 50,
            right: 50
        }
    });
});
```

**Documento de referencia:** [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Sección "Manejo de Respuestas"

---

### FASE 8: Configuración Final

#### Paso 8.1: Registrar Servicios en Program.cs

```csharp
using AdministracionFlotillas.AccesoDatos.Repositorios;
using AdministracionFlotillas.ReglasNegocio.Servicios;
using AdministracionFlotillas.Web.Mappings;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Repositorios
builder.Services.AddScoped<IFlotillasRepository, FlotillasRepository>();

// Servicios
builder.Services.AddScoped<IFlotillasService, FlotillasService>();

var app = builder.Build();
// ... resto de configuración
```

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
- [ ] Kendo UI instalado y funcionando
- [ ] AutoMapper configurado y funcionando
- [ ] Modelo en ModelosComunes creado
- [ ] ViewModel en Web creado
- [ ] Repositorio de ejemplo creado
- [ ] Servicio de ejemplo creado
- [ ] Controlador con endpoints AJAX funcionando
- [ ] Vista principal con Kendo Grid funcionando
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
7. FASE 6: Vistas con Kendo UI
8. FASE 7: JavaScript y Manejo de Respuestas
9. FASE 8: Configuración Final

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
9. Completar FASE 8 (Configuración Final)

---

## Criterios de Completitud

**El proyecto está completo cuando:**
1. Todas las fases 0-8 están completadas
2. Hay al menos una vista principal funcional
3. Hay al menos una vista parcial funcional
4. La UI llama a controladores vía AJAX/Kendo
5. Se muestran respuestas del servidor en tiempo real
6. Se manejan mensajes de error/success
7. El flujo completo funciona: UI → Controller → Parser → Service → Repository
8. La documentación para el equipo está lista
9. El código está en GitHub (si se usa control de versiones)

---

**Última actualización:** Enero 2025

