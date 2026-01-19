# Instalación de Syncfusion Post-Aprobación de Licencia

Esta guía detalla los pasos para instalar y configurar Syncfusion ASP.NET Core EJ2 después de recibir la aprobación de la Community License permanente.

## Estado Actual

✅ **Licencia Aprobada**: Community License permanente recibida  
✅ **Próximo Paso**: Instalación y configuración en el proyecto

## Opción 1: Instalación mediante NuGet (Recomendado)

Esta es la forma más rápida y recomendada para proyectos ASP.NET Core.

### Paso 1: Instalar Paquete NuGet

**En el proyecto `AdministracionFlotillas.Web`:**

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

O desde Visual Studio/Rider:
1. Click derecho en el proyecto `AdministracionFlotillas.Web`
2. Seleccionar "Manage NuGet Packages"
3. Buscar "Syncfusion.EJ2.AspNet.Core"
4. Instalar la última versión

**Versión actual**: 32.1.19 o superior (verificar última versión en [NuGet](https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core))

### Paso 2: Registrar Licencia en Program.cs

**Ubicación**: `src/AdministracionFlotillas.Web/Program.cs`

**Según la [documentación oficial](https://ej2.syncfusion.com/aspnetcore/documentation/licensing/how-to-register-in-an-application), para aplicaciones .NET 8.0/.NET 9.0:**

**Agregar DESPUÉS de `var app = builder.Build();`**:

```csharp
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson();

// ... resto de servicios ...

var app = builder.Build();

// Registrar licencia permanente de Syncfusion (DESPUÉS de builder.Build())
SyncfusionLicenseProvider.RegisterLicense("TU_LICENCIA_PERMANENTE_AQUI");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

**Importante**: 
- La licencia debe registrarse **antes** de que cualquier control Syncfusion se inicialice
- Para .NET 6.0, registrar en el método `Configure` de `Startup.cs`
- Para .NET 8.0/.NET 9.0, registrar después de `builder.Build()` en `Program.cs`

**Importante**: 
- Reemplazar `"TU_LICENCIA_PERMANENTE_AQUI"` con la clave de licencia permanente recibida por email
- Esta clave es diferente a la clave de prueba de 7 días
- La clave permanente no expira

### Paso 3: Agregar Servicios de Syncfusion

**Nota**: Según la [documentación oficial](https://ej2.syncfusion.com/aspnetcore/documentation/grid/getting-started-core), no es necesario agregar servicios adicionales. El paquete NuGet `Syncfusion.EJ2.AspNet.Core` incluye todo lo necesario. Solo se requiere:

1. Instalar el paquete NuGet
2. Registrar el Tag Helper
3. Agregar CSS y JavaScript
4. Registrar el Script Manager

### Paso 4: Agregar Referencias en _ViewImports.cshtml

**Ubicación**: `src/AdministracionFlotillas.Web/Views/_ViewImports.cshtml`

**Agregar**:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

### Paso 5: Agregar CSS y JavaScript en _Layout.cshtml

**Ubicación**: `src/AdministracionFlotillas.Web/Views/Shared/_Layout.cshtml`

**En la sección `<head>` (después de Bootstrap):**

```html
<!-- Syncfusion ASP.NET Core controls styles -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/32.1.19/fluent.css" />
```

**Antes del cierre de `</body>` (después de jQuery):**

```html
<!-- Syncfusion ASP.NET Core controls scripts -->
<script src="https://cdn.syncfusion.com/ej2/32.1.19/dist/ej2.min.js"></script>
<!-- Syncfusion ASP.NET Core Script Manager -->
<ejs-scripts></ejs-scripts>
```

**Notas importantes**:
- Reemplazar `32.1.19` con la versión instalada del paquete NuGet (verificar en [NuGet](https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core))
- El `<ejs-scripts></ejs-scripts>` es **obligatorio** según la [documentación oficial](https://ej2.syncfusion.com/aspnetcore/documentation/grid/getting-started-core)
- Puedes cambiar el tema: `fluent.css`, `material.css`, `bootstrap5.css`, `bootstrap.css`, `tailwind.css`, `fabric.css`

### Paso 6: Verificar Instalación

1. Compilar el proyecto:
   ```bash
   dotnet build
   ```

2. Ejecutar el proyecto:
   ```bash
   dotnet run
   ```

3. Verificar que no aparecen mensajes de "Trial" o "License expired"

## Opción 2: Instalación mediante Mac Installer

Si prefieres usar el instalador de Mac para obtener ejemplos y documentación local.

### Paso 1: Descargar Mac Installer

1. Iniciar sesión en tu cuenta Syncfusion: https://www.syncfusion.com/account/login
2. Ir a **License & Downloads** (o **Trials & Downloads** si aún estás en periodo de prueba)
3. Buscar **Essential Studio ASP.NET Core - EJ2**
4. Click en **Download** para descargar el instalador DMG

### Paso 2: Instalar en Mac

**Según la [documentación oficial](https://ej2.syncfusion.com/aspnetcore/documentation/installation/mac-installer/how-to-install):**

1. **Abrir el archivo DMG descargado**
   - Si aparece alerta de seguridad en Catalina o posterior:
     - Click derecho en el DMG
     - Seleccionar "Open With" → "DiskImageMounter (Default)"
     - Click "Open"

2. **Copiar el instalador**
   - Copiar el archivo montado
   - Pegar en la carpeta "Applications"

3. **Abrir el instalador**
   - Navegar a Applications
   - Abrir la carpeta de Syncfusion Essential Studio

**Nota**: El Unlock key NO es requerido para instalar. El instalador puede usarse para desarrollo sin registrar el Unlock key.

### Paso 3: Registrar Licencia en Proyecto

Aunque uses el instalador, **debes registrar la licencia en tu proyecto**:

**En `Program.cs`:**

```csharp
using Syncfusion.Licensing;

SyncfusionLicenseProvider.RegisterLicense("TU_LICENCIA_PERMANENTE_AQUI");
```

### Paso 4: Instalar Paquete NuGet

Aún necesitas instalar el paquete NuGet en tu proyecto:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

## Verificación de Licencia

### ¿Cómo Saber si la Licencia Está Correctamente Registrada?

**Signos de licencia válida**:
- ✅ La aplicación compila sin errores
- ✅ No aparecen mensajes de "Trial" o "License expired"
- ✅ Los componentes Syncfusion se renderizan correctamente
- ✅ No hay watermarks en los componentes

**Signos de licencia inválida o expirada**:
- ⚠️ Mensajes en consola: "Syncfusion Essential Studio - Trial License Expired"
- ⚠️ Watermarks en componentes
- ⚠️ Funcionalidad limitada

### Probar con un Componente Simple

**Crear una vista de prueba** (`Views/Home/TestSyncfusion.cshtml`):

```html
@{
    ViewData["Title"] = "Test Syncfusion";
}

<h2>Test Syncfusion</h2>

<ejs-button id="testButton" content="Click Me"></ejs-button>

<script>
    document.getElementById('testButton').addEventListener('click', function() {
        alert('Syncfusion está funcionando correctamente!');
    });
</script>
```

Si el botón se renderiza correctamente sin mensajes de error, la licencia está funcionando.

## Solución de Problemas

### Error: "Trial License Expired"

**Causa**: La licencia no está registrada o se está usando la clave de prueba de 7 días.

**Solución**:
1. Verificar que estás usando la **clave permanente** (no la de 7 días)
2. Verificar que el código en `Program.cs` está correcto
3. Verificar que la clave no tiene espacios extra
4. Reiniciar la aplicación

### Error: "SyncfusionLicenseProvider not found"

**Causa**: El paquete NuGet no está instalado o no se importó el namespace.

**Solución**:
1. Verificar que `Syncfusion.EJ2.AspNet.Core` está instalado
2. Agregar `using Syncfusion.Licensing;` en `Program.cs`
3. Recompilar el proyecto

### Componentes No se Renderizan

**Causa**: Falta el Tag Helper o los scripts CSS/JS.

**Solución**:
1. Verificar `@addTagHelper *, Syncfusion.EJ2` en `_ViewImports.cshtml`
2. Verificar que CSS y JS están en `_Layout.cshtml`
3. Verificar que la versión de CDN coincide con el paquete NuGet

## Próximos Pasos

Una vez instalado y configurado Syncfusion:

1. **Revisar la guía de creación de módulo**: [GUIA_CREACION_MODULO_SYNCFUSION.md](GUIA_CREACION_MODULO_SYNCFUSION.md)
2. **Explorar componentes disponibles**: [COMPONENTES_SYNCFUSION.md](COMPONENTES_SYNCFUSION.md)
3. **Ver demos interactivos**: https://ej2.syncfusion.com/aspnetcore/Grid/Overview
4. **Comenzar a crear el nuevo módulo** con Syncfusion

## Referencias

- **Documentación oficial**: https://ej2.syncfusion.com/aspnetcore/documentation/introduction
- **Instalación Mac**: https://ej2.syncfusion.com/aspnetcore/documentation/installation/mac-installer/how-to-install
- **NuGet Package**: https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core
- **Community License**: https://www.syncfusion.com/products/communitylicense

---

**Última actualización**: Enero 2026
**Versión Syncfusion**: 32.1.19 o superior (verificar última versión en [NuGet](https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core))
**Estado Licencia**: Aprobada - Community License Permanente
**Referencias Oficiales**:
- [Getting Started Grid](https://ej2.syncfusion.com/aspnetcore/documentation/grid/getting-started-core)
- [Register License](https://ej2.syncfusion.com/aspnetcore/documentation/licensing/how-to-register-in-an-application)
