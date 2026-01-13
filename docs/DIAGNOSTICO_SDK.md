# Comandos de Diagnóstico para Error NETSDK1045

## Ejecutar estos comandos en el directorio del repositorio

### 1. Verificar SDKs instalados en el sistema
```bash
dotnet --list-sdks
```
**Resultado esperado**: Debe mostrar `10.0.101` o superior en la lista

### 2. Verificar versión de .NET que detecta dotnet
```bash
dotnet --version
```
**Resultado esperado**: Debe mostrar `10.0.101` o superior

### 3. Verificar si existe global.json que fuerza una versión
```powershell
# En Windows PowerShell
Get-Content global.json -ErrorAction SilentlyContinue

# O en CMD
type global.json 2>nul
```
**Resultado esperado**: Si existe, debe mostrar la versión del SDK. Si no existe, no mostrará nada.

### 4. Verificar TargetFramework de cada proyecto
```powershell
# Verificar todos los proyectos
Get-ChildItem -Path src -Recurse -Filter *.csproj | ForEach-Object { Write-Host $_.FullName; Get-Content $_.FullName | Select-String "TargetFramework" }

# O verificar proyecto por proyecto
Get-Content src\AdministracionFlotillas.Web\AdministracionFlotillas.Web.csproj | Select-String "TargetFramework"
Get-Content src\AdministracionFlotillas.ModelosComunes\AdministracionFlotillas.ModelosComunes.csproj | Select-String "TargetFramework"
Get-Content src\AdministracionFlotillas.AccesoDatos\AdministracionFlotillas.AccesoDatos.csproj | Select-String "TargetFramework"
Get-Content src\AdministracionFlotillas.ReglasNegocio\AdministracionFlotillas.ReglasNegocio.csproj | Select-String "TargetFramework"
```
**Resultado esperado**: Todos deben mostrar `<TargetFramework>net10.0</TargetFramework>`

### 5. Intentar compilar desde línea de comandos
```bash
# Limpiar compilaciones anteriores
dotnet clean

# Restaurar paquetes
dotnet restore

# Compilar la solución
dotnet build AdministracionFlotillas.sln
```
**Resultado esperado**: Debe compilar sin errores. Si compila aquí pero no en Visual Studio, el problema es de Visual Studio.

### 6. Verificar qué SDK está usando dotnet para compilar
```bash
dotnet build AdministracionFlotillas.sln -v detailed | findstr "Using SDK"
```
**Resultado esperado**: Debe mostrar que está usando SDK 10.0.101

### 7. Verificar variables de entorno
```powershell
# En PowerShell
$env:DOTNET_ROOT
$env:DOTNET_MULTILEVEL_LOOKUP

# En CMD
echo %DOTNET_ROOT%
echo %DOTNET_MULTILEVEL_LOOKUP%
```
**Resultado esperado**: `DOTNET_ROOT` puede estar vacío o apuntar a la ubicación del SDK. `DOTNET_MULTILEVEL_LOOKUP` puede estar vacío o ser `1`.

### 8. Verificar ubicación del SDK
```powershell
# En PowerShell
where.exe dotnet

# Verificar si hay múltiples instalaciones
Get-ChildItem "C:\Program Files\dotnet\sdk" | Select-Object Name
```
**Resultado esperado**: Debe mostrar la ruta del SDK y listar las versiones instaladas incluyendo 10.0.101

### 9. Verificar si Visual Studio está usando un SDK diferente
```powershell
# Verificar qué SDK está en la ruta de Visual Studio
Get-ChildItem "C:\Program Files\dotnet\sdk" | Select-Object Name
```
**Resultado esperado**: Debe listar todas las versiones instaladas

### 10. Crear/Verificar global.json para forzar SDK 10.0
```bash
# Si no existe global.json, crearlo
dotnet new globaljson --sdk-version 10.0.101

# Verificar que se creó correctamente
Get-Content global.json
```
**Resultado esperado**: Debe crear un archivo `global.json` con la versión 10.0.101

### 11. Compilar después de crear global.json
```bash
dotnet clean
dotnet restore
dotnet build AdministracionFlotillas.sln
```
**Resultado esperado**: Debe compilar correctamente

---

## Soluciones según el diagnóstico

### Si `dotnet --list-sdks` NO muestra 10.0.101:
- El SDK no está instalado correctamente
- Reinstalar .NET SDK 10.0 desde https://dotnet.microsoft.com/download/dotnet/10.0

### Si `dotnet build` funciona pero Visual Studio no:
- Visual Studio no está detectando el SDK
- Reiniciar computadora
- Actualizar Visual Studio 2022 a la versión más reciente
- Verificar en Visual Studio: Herramientas → Opciones → Proyectos y soluciones → .NET Core

### Si `global.json` existe con versión incorrecta:
- Editar `global.json` y cambiar la versión a `10.0.101`
- O eliminar `global.json` si no es necesario

### Si hay múltiples instalaciones de .NET:
- Verificar que Visual Studio esté usando la ruta correcta
- Puede ser necesario desinstalar versiones antiguas
