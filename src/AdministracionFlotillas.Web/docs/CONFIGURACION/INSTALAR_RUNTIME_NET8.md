# Instalar Runtime de .NET 8.0 en macOS

## Problema

La aplicación requiere el runtime de .NET 8.0 para ejecutarse, pero solo tienes instalado el runtime de .NET 10.0.1.

## Solución: Instalar Runtime de .NET 8.0

### Opción 1: Usando el Script de Instalación (Recomendado)

Ejecuta este comando en tu terminal (te pedirá tu contraseña):

```bash
curl -sSL https://dot.net/v1/dotnet-install.sh | sudo bash /dev/stdin --runtime aspnetcore --version 8.0.0 --install-dir /usr/local/share/dotnet
```

**Nota**: Este comando instala solo el runtime de ASP.NET Core 8.0.0, que incluye el runtime de .NET Core necesario.

### Opción 2: Descargar e Instalar Manualmente

1. Ve a: https://dotnet.microsoft.com/download/dotnet/8.0
2. Busca la sección "ASP.NET Core Runtime 8.0.x"
3. Descarga el instalador para **macOS ARM64** (si tienes Mac con chip Apple Silicon) o **macOS x64** (si tienes Mac Intel)
4. Ejecuta el archivo `.pkg` descargado
5. Sigue las instrucciones del instalador

### Opción 3: Instalar SDK 8.0 (Incluye Runtime)

Si prefieres instalar el SDK completo de .NET 8.0 (que incluye el runtime):

1. Ve a: https://dotnet.microsoft.com/download/dotnet/8.0
2. Descarga el **.NET SDK 8.0.x** para macOS ARM64 o x64
3. Ejecuta el instalador `.pkg`

## Verificar Instalación

Después de instalar, verifica que el runtime esté disponible:

```bash
dotnet --list-runtimes
```

Deberías ver algo como:

```
Microsoft.AspNetCore.App 8.0.x [/usr/local/share/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.AspNetCore.App 10.0.1 [/usr/local/share/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.NETCore.App 8.0.x [/usr/local/share/dotnet/shared/Microsoft.NETCore.App]
Microsoft.NETCore.App 10.0.1 [/usr/local/share/dotnet/shared/Microsoft.NETCore.App]
```

## Ejecutar la Aplicación

Una vez instalado el runtime, puedes ejecutar la aplicación:

```bash
cd /Users/wallfacer/Documents/AdministracionFlotillas
dotnet run --project src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj
```

## Nota Importante

- Puedes tener múltiples versiones de .NET instaladas simultáneamente
- El proyecto está configurado para .NET 8.0, pero puedes compilar con SDK 10.0
- Solo necesitas el **runtime** de .NET 8.0 para ejecutar la aplicación compilada
