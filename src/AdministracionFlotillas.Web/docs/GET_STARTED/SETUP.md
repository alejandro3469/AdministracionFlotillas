# Gu�a de Configuración Rápida - Paso a Paso Granular

##  Compatibilidad del Proyecto

 **.NET 10.0.101** - **MULTIPLATAFORMA**
-  Compatible con **Mac** (Rider, DataGrip)
-  Compatible con **Windows** (VS Code, Visual Studio)
-  Mismo código funciona en ambos sistemas
-  Mismos comandos (excepto rutas de archivos)

##  Requisitos Previos

### Para Mac (Desarrollador Principal)
-  .NET SDK 10.0.101 instalado
-  Rider instalado
-  DataGrip instalado
-  Terminal (zsh)

### Para Windows (Equipo)
-  .NET SDK 10.0.101 instalado
-  VS Code instalado
-  Extensión C# para VS Code instalada
-  PowerShell o CMD

** Gu�a completa de instalación**: Ver [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md) para pasos detallados paso a paso.

**Verificar instalación de .NET:**
```bash
# Mac y Windows (mismo comando)
dotnet --version
# Debe mostrar: 10.0.101 o superior
```

**Si NO tienes .NET instalado:**
- **Mac**: Sigue [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md) - Sección "INSTALACI�N EN MAC" - PASO 1
- **Windows**: Sigue [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md) - Sección "INSTALACI�N EN WINDOWS" - PASO 1

##  Pasos Completados

- [x] Crear solución: `AdministracionFlotillas.slnx`
- [x] Crear proyecto AccesoDatos

##  Requisitos del Proyecto

**Ver documentación completa**: [REQUISITOS_PROYECTO.md](./REQUISITOS_PROYECTO.md)

### Resumen de Requisitos:
-  **Nuevo**: Proyecto ModelosComunes para modelos compartidos
-  **Nuevo**: Parser ViewModel � BusinessModel
-  **Nuevo**: Base de datos remota gratuita (Oracle Cloud recomendado)
-  **Nuevo**: DataTables (gratuito) + Bootstrap (últimas versiones)
-  **Nuevo**: CRUD con modales y eliminación lógica
-  **Nuevo**: Dashboards gamificados
-  **Nuevo**: Repositorio GitHub para colaboración

##  Próximos Pasos - Instrucciones Granulares

### PASO 1: Agregar el proyecto AccesoDatos a la solución

#### Para Mac (Rider/Terminal):

**1.1. Abre la Terminal:**
- Presiona `Cmd + Espacio` para Spotlight
- Escribe "Terminal" y presiona Enter
- O ve a: Aplicaciones �� Utilidades �� Terminal

**1.2. Navega a la ra�z del proyecto:**
```bash
cd /Users/wallfacer/Documents/AdministracionFlotillas
```

**1.3. Verifica que estás en el lugar correcto:**
```bash
pwd
# Debe mostrar: /Users/wallfacer/Documents/AdministracionFlotillas
```

**1.4. Verifica que el archivo .csproj existe:**
```bash
ls -la src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj
# Debe mostrar el archivo (no debe dar error)
```

**1.5. Agrega el proyecto a la solución:**
```bash
#  IMPORTANTE: Copia este comando COMPLETO en una sola l�nea
# NO debe haber espacios antes de .csproj
dotnet sln add src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj
```

**1.6. Verifica el resultado:**
```bash
# Deber�as ver:
# Project `src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj` added to the solution.
```

**1.7. Confirma que se agregó:**
```bash
dotnet sln list
# Deber�as ver:
# AdministracionFlotillas.AccesoDatos
```

#### Para Windows (VS Code/PowerShell):

**1.1. Abre PowerShell o CMD:**
- Presiona `Win + X` y selecciona "Windows PowerShell"
- O presiona `Win + R`, escribe `powershell` y presiona Enter

**1.2. Navega a la ra�z del proyecto:**
```powershell
# Ajusta la ruta según donde tengas el proyecto en Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
# O si está en otra ubicación:
cd D:\Proyectos\AdministracionFlotillas
```

**1.3. Verifica que estás en el lugar correcto:**
```powershell
pwd
# En PowerShell muestra la ruta actual
# O usa:
cd
# Debe mostrar la ruta del proyecto
```

**1.4. Verifica que el archivo .csproj existe:**
```powershell
Test-Path src\AdministracionFlotillas.AccesoDatos\AdministracionFlotillas.AccesoDatos.csproj
# Debe mostrar: True
```

**1.5. Agrega el proyecto a la solución:**
```powershell
#  IMPORTANTE: Copia este comando COMPLETO en una sola l�nea
# En Windows usa barras invertidas \ o barras normales /
# NO debe haber espacios antes de .csproj
dotnet sln add src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj
```

**1.6. Verifica el resultado:**
```powershell
# Deber�as ver:
# Project `src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj` added to the solution.
```

**1.7. Confirma que se agregó:**
```powershell
dotnet sln list
# Deber�as ver:
# AdministracionFlotillas.AccesoDatos
```

### PASO 2: Crear proyecto ModelosComunes  NUEVO

#### Para Mac:

**2.1. Asegúrate de estar en la ra�z del proyecto:**
```bash
cd /Users/wallfacer/Documents/AdministracionFlotillas
pwd
# Debe mostrar: /Users/wallfacer/Documents/AdministracionFlotillas
```

**2.2. Crea el proyecto (comando completo en una l�nea):**
```bash
dotnet new classlib -n AdministracionFlotillas.ModelosComunes -o src/AdministracionFlotillas.ModelosComunes
```

**2.3. Verifica que se creó:**
```bash
ls -la src/AdministracionFlotillas.ModelosComunes/
# Deber�as ver el archivo .csproj y Class1.cs
```

**2.4. Agrega el proyecto a la solución:**
```bash
dotnet sln add src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj
```

**2.5. Verifica que se agregó:**
```bash
dotnet sln list
# Deber�as ver:
# AdministracionFlotillas.AccesoDatos
# AdministracionFlotillas.ModelosComunes
```

#### Para Windows:

**2.1. Asegúrate de estar en la ra�z del proyecto:**
```powershell
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
# O la ruta donde tengas el proyecto
pwd
```

**2.2. Crea el proyecto (comando completo en una l�nea):**
```powershell
dotnet new classlib -n AdministracionFlotillas.ModelosComunes -o src/AdministracionFlotillas.ModelosComunes
```

**2.3. Verifica que se creó:**
```powershell
dir src\AdministracionFlotillas.ModelosComunes\
# Deber�as ver el archivo .csproj y Class1.cs
```

**2.4. Agrega el proyecto a la solución:**
```powershell
dotnet sln add src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj
```

**2.5. Verifica que se agregó:**
```powershell
dotnet sln list
# Deber�as ver:
# AdministracionFlotillas.AccesoDatos
# AdministracionFlotillas.ModelosComunes
```

### PASO 3: Crear proyecto ReglasNegocio

#### Para Mac y Windows (mismos comandos):

**3.1. Desde la ra�z del proyecto, crea el proyecto:**
```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Windows (ajusta la ruta)
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas

# Luego ejecuta (igual en ambos):
dotnet new classlib -n AdministracionFlotillas.ReglasNegocio -o src/AdministracionFlotillas.ReglasNegocio
```

**3.2. Agrega a la solución:**
```bash
# Mac y Windows (mismo comando)
dotnet sln add src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj
```

**3.3. Verifica:**
```bash
dotnet sln list
# Deber�as ver 3 proyectos ahora
```

### PASO 4: Crear proyecto Web (MVC)

#### Para Mac y Windows (mismos comandos):

**4.1. Desde la ra�z del proyecto, crea el proyecto MVC:**
```bash
# Asegúrate de estar en la ra�z primero
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas

# Luego ejecuta (igual en ambos):
dotnet new mvc -n AdministracionFlotillas.Web -o src/AdministracionFlotillas.Web
```

**4.2. Agrega a la solución:**
```bash
# Mac y Windows (mismo comando)
dotnet sln add src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj
```

**4.3. Verifica:**
```bash
dotnet sln list
# Deber�as ver 4 proyectos ahora:
# - AdministracionFlotillas.AccesoDatos
# - AdministracionFlotillas.ModelosComunes
# - AdministracionFlotillas.ReglasNegocio
# - AdministracionFlotillas.Web
```

### PASO 5: Agregar Referencias entre Proyectos

** IMPORTANTE**: Ejecuta estos comandos DESDE LA RA�Z del proyecto (donde está el .slnx)

#### Para Mac y Windows (mismos comandos):

**5.1. Asegúrate de estar en la ra�z:**
```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas

# Verifica:
pwd  # Mac
cd   # Windows (PowerShell)
```

**5.2. Agrega referencia: Web �� ReglasNegocio**
```bash
# Mac y Windows (mismo comando)
dotnet add src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj reference src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj
```

**5.3. Agrega referencia: ReglasNegocio �� ModelosComunes**
```bash
dotnet add src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj reference src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj
```

**5.4. Agrega referencia: AccesoDatos �� ModelosComunes**
```bash
dotnet add src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj reference src/AdministracionFlotillas.ModelosComunes/AdministracionFlotillas.ModelosComunes.csproj
```

**5.5. Agrega referencia: ReglasNegocio �� AccesoDatos**
```bash
dotnet add src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj reference src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj
```

**5.6. Verifica las referencias (opcional):**
```bash
# Ver referencias de Web
dotnet list src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj reference

# Ver referencias de ReglasNegocio
dotnet list src/AdministracionFlotillas.ReglasNegocio/AdministracionFlotillas.ReglasNegocio.csproj reference

# Ver referencias de AccesoDatos
dotnet list src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj reference
```

### PASO 6: Agregar Paquetes NuGet

#### Para Mac y Windows (mismos comandos):

**6.1. Agregar paquete Oracle a AccesoDatos:**

```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas/src/AdministracionFlotillas.AccesoDatos

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas\src\AdministracionFlotillas.AccesoDatos

# Luego ejecuta (igual en ambos):
dotnet add package Oracle.ManagedDataAccess.Core
```

**6.2. Verifica que se instaló:**
```bash
dotnet list package
# Deber�as ver Oracle.ManagedDataAccess.Core en la lista
```

**6.3. Regresa a la ra�z:**
```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
```

**6.4. Agregar paquetes a Web:**

```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas/src/AdministracionFlotillas.Web

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas\src\AdministracionFlotillas.Web

# Luego ejecuta cada comando (igual en ambos):
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
# Nota: No se usa AutoMapper, se usa parseador manual estático
```

**6.5. Verifica que se instalaron:**
```bash
dotnet list package
# Deber�as ver los 3 paquetes en la lista
```

**6.6. Regresa a la ra�z:**
```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
```

### PASO 7: Configurar Base de Datos Remota  NUEVO

** Gu�a detallada**: Ver [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md) para pasos completos

**Resumen rápido:**

1. **Oracle Cloud Free Tier** (Recomendado - siempre gratis)
   - URL: https://www.oracle.com/cloud/free/
   - Permite procedimientos almacenados Oracle
   - Accesible desde DataGrip (Mac) y desde cualquier herramienta en Windows

2. **Azure SQL Database Free Tier** (12 meses gratis)
   - URL: https://azure.microsoft.com/free/
   - SQL Server compatible

3. **AWS RDS Free Tier** (12 meses gratis)
   - URL: https://aws.amazon.com/free/
   - PostgreSQL/MySQL

**Pasos básicos para Oracle Cloud:**

1. Crear cuenta en Oracle Cloud (https://www.oracle.com/cloud/free/)
2. Crear Autonomous Database (Always Free)
3. Descargar Wallet de conexión
4. Obtener connection string
5. Configurar en `appsettings.json` (ver paso 7.1 abajo)
6. Configurar conexión en DataGrip (Mac) o herramienta similar (Windows)

**7.1. Configurar appsettings.json:**

**Ubicación del archivo:**
- Mac: `/Users/wallfacer/Documents/AdministracionFlotillas/src/AdministracionFlotillas.Web/appsettings.json`
- Windows: `C:\Users\TU_USUARIO\Documents\AdministracionFlotillas\src\AdministracionFlotillas.Web\appsettings.json`

**Abre el archivo y agrega/modifica:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "OracleConnection": "Data Source=TU_CONNECTION_STRING;User Id=ADMIN;Password=TU_CONTRASEÑA;"
  }
}
```

** IMPORTANTE**: 
- Reemplaza `TU_CONNECTION_STRING` con el connection string de Oracle Cloud
- Reemplaza `TU_CONTRASEÑA` con tu contraseña real
- **NUNCA** subas este archivo con contraseñas reales a GitHub (usa variables de entorno en producción)

### PASO 8: Configurar DataTables y Bootstrap  NUEVO

#### Para Mac (Rider) y Windows (VS Code):

**8.1. Ubica el archivo `_Layout.cshtml`:**

**Ubicación:**
- Mac: `/Users/wallfacer/Documents/AdministracionFlotillas/src/AdministracionFlotillas.Web/Views/Shared/_Layout.cshtml`
- Windows: `C:\Users\TU_USUARIO\Documents\AdministracionFlotillas\src\AdministracionFlotillas.Web\Views\Shared\_Layout.cshtml`

**8.2. Abre el archivo en tu editor:**
- **Mac**: Abre con Rider o cualquier editor
- **Windows**: Abre con VS Code

**8.3. Busca la sección `<head>` (alrededor de la l�nea 5-15):**

Deber�as ver algo como:
```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - AdministracionFlotillas.Web</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" />
</head>
```

**8.4. Reemplaza o agrega las referencias a Bootstrap y DataTables:**

**Reemplaza las l�neas de Bootstrap y CSS con:**
```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - AdministracionFlotillas.Web</title>
    
    <!-- Bootstrap CSS (local) -->
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    
    <!-- DataTables CSS (CDN) -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css">
</head>
```

**8.5. Busca la sección antes de `</body>` (alrededor del final del archivo):**

Deber�as ver algo como:
```html
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js"></script>
</body>
```

**8.6. Reemplaza con:**
```html
    <!-- jQuery (CDN) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- Bootstrap JS (local) -->
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- DataTables JS (CDN) -->
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
    
    <script src="~/js/site.js"></script>
</body>
```

**8.7. Guarda el archivo:**
- **Mac (Rider)**: `Cmd + S`
- **Windows (VS Code)**: `Ctrl + S`

** IMPORTANTE**: 
- Solo usar estilos por defecto de Bootstrap y DataTables
- NO crear archivos CSS personalizados (excepto site.css para padding consistente)
- NO modificar los estilos de Bootstrap o DataTables
- Esto garantiza consistencia en estilos

### PASO 9: Crear Repositorio GitHub  NUEVO

#### Para Mac y Windows (mismos comandos):

**9.1. Navega a la ra�z del proyecto:**
```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
```

**9.2. Verifica si git ya está inicializado:**
```bash
# Mac y Windows (mismo comando)
ls -la .git
# Si muestra "No such file or directory", git NO está inicializado
# Si muestra archivos, git YA está inicializado (salta al paso 9.4)
```

**9.3. Inicializa git (solo si no está inicializado):**
```bash
git init
# Deber�as ver: "Initialized empty Git repository in ..."
```

**9.4. Crea archivo .gitignore:**
```bash
# Mac y Windows (mismo comando)
dotnet new gitignore
# Esto crea un archivo .gitignore apropiado para .NET
```

**9.5. Verifica que .gitignore se creó:**
```bash
# Mac
ls -la .gitignore

# Windows
dir .gitignore
```

**9.6. Agrega todos los archivos al staging:**
```bash
# Mac y Windows (mismo comando)
git add .
```

**9.7. Verifica qué se va a commitear:**
```bash
git status
# Deber�as ver una lista de archivos en verde (staged)
```

**9.8. Haz el commit inicial:**
```bash
git commit -m "Initial commit: Estructura base del proyecto con 4 capas"
# Deber�as ver: "X files changed, Y insertions(+)"
```

**9.9. Crea el repositorio en GitHub (desde el navegador):**
1. Ve a: https://github.com
2. Inicia sesión (o crea cuenta)
3. Haz clic en el botón "+" (arriba derecha) �� "New repository"
4. **Repository name**: `AdministracionFlotillas`
5. **Description**: `Proyecto .NET multiplataforma para administración de flotillas`
6. **Visibility**: Public o Private (tu elección)
7. ** NO marques**: "Add a README file", "Add .gitignore", "Choose a license" (ya los tenemos)
8. Haz clic en "Create repository"

**9.10. Conecta tu repositorio local con GitHub:**

**Copia la URL del repositorio** (desde la página de GitHub que se abrió, deber�a ser algo como: `https://github.com/TU_USUARIO/AdministracionFlotillas.git`)

```bash
# Mac y Windows (mismo comando)
# Reemplaza TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/AdministracionFlotillas.git
```

**9.11. Renombra la rama a main (si es necesario):**
```bash
git branch -M main
```

**9.12. Sube el código a GitHub:**
```bash
git push -u origin main
```

**Si te pide autenticación:**
- Puede pedirte usuario y contraseña
- O puede pedirte un token de acceso personal
- Sigue las instrucciones en pantalla

**9.13. Verifica en GitHub:**
- Ve a tu repositorio en GitHub
- Deber�as ver todos los archivos del proyecto

### PASO 10: Verificar que Todo Funciona

#### Para Mac y Windows (mismos comandos):

**10.1. Navega a la ra�z del proyecto:**
```bash
# Mac
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Windows
cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
```

**10.2. Restaura las dependencias:**
```bash
# Mac y Windows (mismo comando)
dotnet restore
# Esto descarga todos los paquetes NuGet necesarios
# Puede tardar unos minutos la primera vez
# IMPORTANTE: Este comando también es necesario después de clonar el repositorio
```

**10.3. Compila toda la solución:**
```bash
dotnet build
```

**10.4. Verifica el resultado:**

** Si todo está bien, verás:**
```
Build succeeded.
    0 Warning(s)
    0 Error(s)
```

** Si hay errores:**
- Lee los mensajes de error cuidadosamente
- Los errores te dirán qué archivo y qué l�nea tienen el problema
- Revisa los pasos anteriores para asegurarte de que todo se hizo correctamente

**10.5. (Opcional) Ejecuta la aplicación:**
```bash
# Navega al proyecto Web
cd src/AdministracionFlotillas.Web

# Ejecuta la aplicación
dotnet run
```

**Deber�as ver:**
```
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
      Now listening on: http://localhost:5000
```

**10.6. Abre el navegador:**
- Ve a: `https://localhost:5001` o `http://localhost:5000`
- Deber�as ver la página de inicio de ASP.NET Core MVC

**10.7. Detén la aplicación:**
- Presiona `Ctrl + C` en la terminal

##  Problemas Comunes

### Error: "Could not find project or directory"

**Causa:** Espacio extra en el comando antes de `.csproj`

**Solución:** Asegúrate de que NO haya espacios:
```bash
#  INCORRECTO (tiene espacio)
dotnet sln add src/.../Archivo. csproj

#  CORRECTO (sin espacio)
dotnet sln add src/.../Archivo.csproj
```

##  Verificar Directorio Actual

**Siempre verifica dónde estás antes de ejecutar comandos:**

```bash
# Mac
pwd
# Debe mostrar: /Users/wallfacer/Documents/AdministracionFlotillas

# Windows (PowerShell)
pwd
# O
cd
# Debe mostrar: C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
# (o la ruta donde tengas el proyecto)
```

##  Diferencias Mac vs Windows

### Rutas de Archivos:
- **Mac**: Usa barras `/` (ej: `/Users/wallfacer/Documents/...`)
- **Windows**: Usa barras `\` o `/` (ej: `C:\Users\...` o `C:/Users/...`)
- **Comandos dotnet**: Funcionan igual en ambos sistemas

### Editores:
- **Mac**: Rider (recomendado) o VS Code
- **Windows**: VS Code (recomendado) o Visual Studio

### Terminal:
- **Mac**: Terminal (zsh) o iTerm2
- **Windows**: PowerShell (recomendado) o CMD

### Herramientas de Base de Datos:
- **Mac**: DataGrip (recomendado)
- **Windows**: DataGrip, SQL Server Management Studio, o cualquier herramienta compatible

##  Checklist Final

Antes de continuar, verifica que tienes:

- [ ]  Todos los 4 proyectos creados
- [ ]  Todos los proyectos agregados a la solución
- [ ]  Todas las referencias entre proyectos configuradas
- [ ]  Todos los paquetes NuGet instalados
- [ ]  Base de datos remota configurada (o en proceso)
- [ ]  DataTables y Bootstrap agregados a `_Layout.cshtml`
- [ ]  Repositorio GitHub creado y conectado
- [ ]  `dotnet build` ejecuta sin errores

