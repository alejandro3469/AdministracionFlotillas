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
```cmd
REM En CMD
type global.json 2>nul
```
```powershell
# En PowerShell
Get-Content global.json -ErrorAction SilentlyContinue
```
**Resultado esperado**: Si existe, debe mostrar la versión del SDK. Si no existe, no mostrará nada.

### 4. Verificar TargetFramework de cada proyecto
```cmd
REM En CMD - Verificar proyecto por proyecto
findstr "TargetFramework" src\AdministracionFlotillas.Web\AdministracionFlotillas.Web.csproj
findstr "TargetFramework" src\AdministracionFlotillas.ModelosComunes\AdministracionFlotillas.ModelosComunes.csproj
findstr "TargetFramework" src\AdministracionFlotillas.AccesoDatos\AdministracionFlotillas.AccesoDatos.csproj
findstr "TargetFramework" src\AdministracionFlotillas.ReglasNegocio\AdministracionFlotillas.ReglasNegocio.csproj
```
```powershell
# En PowerShell - Verificar todos los proyectos
Get-ChildItem -Path src -Recurse -Filter *.csproj | ForEach-Object { Write-Host $_.FullName; Get-Content $_.FullName | Select-String "TargetFramework" }
```
**Resultado esperado**: Todos deben mostrar `<TargetFramework>net10.0</TargetFramework>`

### 5. Intentar compilar desde línea de comandos
```bash
REM Limpiar compilaciones anteriores
dotnet clean AdministracionFlotillas.sln

REM Restaurar paquetes
dotnet restore AdministracionFlotillas.sln

REM Compilar la solución
dotnet build AdministracionFlotillas.sln
```
**Resultado esperado**: Debe compilar sin errores. Si compila aquí pero no en Visual Studio, el problema es de Visual Studio.

### 6. Verificar qué SDK está usando dotnet para compilar
```cmd
REM En CMD
dotnet build AdministracionFlotillas.sln -v detailed | findstr "Using SDK"
```
```powershell
# En PowerShell
dotnet build AdministracionFlotillas.sln -v detailed | Select-String "Using SDK"
```
**Resultado esperado**: Debe mostrar que está usando SDK 10.0.101

### 7. Verificar variables de entorno
```cmd
REM En CMD
echo %DOTNET_ROOT%
echo %DOTNET_MULTILEVEL_LOOKUP%
```
```powershell
# En PowerShell
$env:DOTNET_ROOT
$env:DOTNET_MULTILEVEL_LOOKUP
```
**Resultado esperado**: `DOTNET_ROOT` puede estar vacío o apuntar a la ubicación del SDK. `DOTNET_MULTILEVEL_LOOKUP` puede estar vacío o ser `1`.

### 8. Verificar ubicación del SDK
```cmd
REM En CMD
where dotnet
dir "C:\Program Files\dotnet\sdk" /b
```
```powershell
# En PowerShell
where.exe dotnet
Get-ChildItem "C:\Program Files\dotnet\sdk" | Select-Object Name
```
**Resultado esperado**: Debe mostrar la ruta del SDK y listar las versiones instaladas incluyendo 10.0.101

### 9. Verificar si Visual Studio está usando un SDK diferente
```cmd
REM En CMD
dir "C:\Program Files\dotnet\sdk" /b
```
```powershell
# En PowerShell
Get-ChildItem "C:\Program Files\dotnet\sdk" | Select-Object Name
```
**Resultado esperado**: Debe listar todas las versiones instaladas

### 10. Crear/Verificar global.json para forzar SDK 10.0
```bash
REM Si no existe global.json, crearlo
dotnet new globaljson --sdk-version 10.0.101

REM Verificar que se creó correctamente
type global.json
```
```powershell
# En PowerShell - Verificar
Get-Content global.json
```
**Resultado esperado**: Debe crear un archivo `global.json` con la versión 10.0.101

### 11. Compilar después de crear global.json
```bash
dotnet clean AdministracionFlotillas.sln
dotnet restore AdministracionFlotillas.sln
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
