# Inicio Rápido: Windows con Visual Studio

Esta guía explica cómo ejecutar el proyecto en Windows usando Visual Studio y verlo en el navegador.

## Paso 1: Verificar que se tiene .NET SDK 8.0.300 o superior

Abrir PowerShell o CMD:
- Presionar `Windows + R`
- Escribir `powershell` y presionar Enter
- O buscar "PowerShell" en el menú inicio

Ejecutar:
```powershell
dotnet --version
```

Resultado esperado:
- Debe mostrar `8.0.300` o superior (ejemplo: `8.0.300`, `8.0.400`, `8.0.500`)
- Si muestra error o versión menor, seguir el Paso 1.1

Si ya se tiene la versión correcta, continuar al Paso 2.

## Paso 1.1: Si no se tiene .NET SDK 8.0.300

### Opción A: Descargar e Instalar Manualmente

1. Abrir el navegador
2. Ir a: https://dotnet.microsoft.com/download/dotnet/8.0
3. Buscar la sección ".NET 8.0"
4. Hacer clic en "Download .NET SDK" (NO Runtime)
5. Seleccionar "Windows x64"
6. Descargar el instalador (ejemplo: `dotnet-sdk-8.0.300-win-x64.exe`)
7. Ejecutar el instalador
8. Seguir las instrucciones del instalador
9. Verificar: Abrir PowerShell y ejecutar `dotnet --version`

### Opción B: Instalar desde Visual Studio

1. Abrir Visual Studio
2. Ir a: Herramientas → Obtener herramientas y características
3. Buscar ".NET 8.0 SDK" en la lista
4. Marcarlo y hacer clic en Modificar
5. Esperar a que termine la instalación
6. Verificar: Abrir PowerShell y ejecutar `dotnet --version`

## Paso 2: Clonar o Actualizar el Repositorio

### Si es la primera vez (no se ha clonado el repositorio)

Abrir PowerShell:
- Presionar `Windows + R`
- Escribir `powershell` y presionar Enter

Ejecutar estos comandos en orden:
```powershell
# Ir a la carpeta donde se quiere guardar el proyecto (ejemplo: Documentos)
cd $HOME\Documents

# Clonar el repositorio
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# Entrar a la carpeta del proyecto
cd AdministracionFlotillas
```

### Si ya se tiene el repositorio clonado

Abrir PowerShell en la carpeta del proyecto:
```powershell
# Ir a la carpeta del proyecto (ajustar la ruta según donde esté)
cd $HOME\Documents\AdministracionFlotillas

# Actualizar desde el repositorio
git pull origin main
```

## Paso 3: Verificar la Configuración

Ejecutar estos comandos en PowerShell (en la carpeta del proyecto):

```powershell
# Verificar versión de .NET
dotnet --version

# Verificar que global.json existe y está correcto
Get-Content global.json

# Restaurar paquetes NuGet
dotnet restore
```

Resultado esperado:
- `dotnet --version` debe mostrar `8.0.300` o superior
- `global.json` debe mostrar `"version": "8.0.300"` y `"rollForward": "latestPatch"`
- `dotnet restore` debe completarse sin errores

## Paso 4: Compilar el Proyecto

Ejecutar en PowerShell:
```powershell
dotnet build
```

Resultado esperado:
- Debe mostrar `Build succeeded`
- Debe mostrar `0 Warning(s)` y `0 Error(s)`

Si hay errores:
- Verificar que se tiene .NET SDK 8.0.300 o superior
- Ejecutar: `dotnet clean` y luego `dotnet restore` y `dotnet build` de nuevo

## Paso 5: Abrir el Proyecto en Visual Studio

### Opción A: Desde PowerShell
```powershell
# Abrir la solución en Visual Studio
start AdministracionFlotillas.sln
```

### Opción B: Desde el Explorador de Archivos
1. Abrir el Explorador de Archivos
2. Navegar a la carpeta del proyecto
3. Buscar el archivo `AdministracionFlotillas.sln`
4. Hacer doble clic en `AdministracionFlotillas.sln`
5. Se abrirá en Visual Studio

### Opción C: Desde Visual Studio
1. Abrir Visual Studio
2. Archivo → Abrir → Proyecto o solución
3. Navegar a la carpeta del proyecto
4. Seleccionar `AdministracionFlotillas.sln`
5. Hacer clic en Abrir

## Paso 6: Configurar Visual Studio (Primera Vez)

Si Visual Studio muestra errores o no detecta el SDK:

1. Cerrar Visual Studio completamente

2. Eliminar carpetas bin y obj (desde PowerShell):
   ```powershell
   # Desde la carpeta del proyecto
   Get-ChildItem -Path . -Recurse -Directory -Filter bin | Remove-Item -Recurse -Force
   Get-ChildItem -Path . -Recurse -Directory -Filter obj | Remove-Item -Recurse -Force
   ```

3. Abrir Visual Studio de nuevo

4. Verificar SDK en Visual Studio:
   - Herramientas → Opciones
   - Proyectos y soluciones → .NET Core
   - Verificar que aparezca SDK 8.0.300 o superior en la lista

5. Limpiar y Recompilar:
   - Compilar → Limpiar solución
   - Compilar → Recompilar solución

## Paso 7: Configurar el Proyecto de Inicio

En Visual Studio:

1. En el Explorador de soluciones (panel izquierdo)
2. Buscar el proyecto `AdministracionFlotillas.Web`
3. Hacer clic derecho en `AdministracionFlotillas.Web`
4. Seleccionar Establecer como proyecto de inicio

O desde la barra de herramientas:
- En la barra superior, buscar el menú desplegable de proyectos
- Seleccionar `AdministracionFlotillas.Web`

## Paso 8: Ejecutar el Proyecto

### Opción A: Desde Visual Studio (Recomendado)

1. Presionar F5 (o hacer clic en el botón verde de ejecutar)
2. O ir a: Depurar → Iniciar depuración

### Opción B: Desde PowerShell

```powershell
# Ejecutar el proyecto web
dotnet run --project src\AdministracionFlotillas.Web\AdministracionFlotillas.Web.csproj
```

## Paso 9: Ver el Proyecto en el Navegador

Después de ejecutar el proyecto:

1. Se abrirá automáticamente el navegador predeterminado
2. La URL será algo como: `https://localhost:5001` o `http://localhost:5000`
3. Si no se abre automáticamente:
   - Mirar la consola de Visual Studio o PowerShell
   - Buscar una línea que diga: `Now listening on: https://localhost:XXXX`
   - Copiar esa URL y abrirla en el navegador

Si aparece un error de certificado SSL:
- Hacer clic en Avanzado o Advanced
- Hacer clic en Continuar de todas formas o Proceed anyway

## Solución de Problemas Comunes

### Problema: "No se puede encontrar SDK 8.0.300"

Solución:
```powershell
# Verificar SDKs instalados
dotnet --list-sdks

# Si no aparece 8.0.300 o superior, instalarlo (ver Paso 1.1)
```

### Problema: "El proyecto no compila en Visual Studio"

Solución:
```powershell
# Desde PowerShell en la carpeta del proyecto
dotnet clean
dotnet restore
dotnet build

# Luego en Visual Studio:
# Compilar → Limpiar solución
# Compilar → Recompilar solución
```

### Problema: "Visual Studio muestra errores pero dotnet build funciona"

Solución:
1. Cerrar Visual Studio
2. Eliminar carpetas `bin` y `obj` (ver Paso 6)
3. Abrir Visual Studio de nuevo
4. Archivo → Invalidar caché y reiniciar (si está disponible)
5. O: Compilar → Limpiar solución → Recompilar solución

### Problema: "El navegador no se abre o muestra error"

Solución:
1. Verificar que el proyecto se ejecutó correctamente
2. Buscar en la consola la URL (ejemplo: `https://localhost:5001`)
3. Abrirla manualmente en el navegador
4. Si el puerto está ocupado, cerrar otras aplicaciones que puedan estar usándolo

## Verificación Final

Si todo funciona correctamente, se debe ver:
- El proyecto compila sin errores
- Visual Studio muestra el proyecto sin errores
- El navegador se abre automáticamente
- Se puede ver la aplicación web funcionando

## Comandos de Referencia Rápida

Para usar cada vez que se trabaje en el proyecto:

```powershell
# 1. Actualizar desde el repositorio
git pull origin main

# 2. Restaurar paquetes
dotnet restore

# 3. Compilar
dotnet build

# 4. Ejecutar (opcional, si no se usa Visual Studio)
dotnet run --project src\AdministracionFlotillas.Web\AdministracionFlotillas.Web.csproj
```

## Detener el Servidor

Para detener el servidor:
- En Visual Studio: Presionar Shift + F5 o hacer clic en el botón de detener
- En PowerShell: Presionar Ctrl + C

## Documentación Relacionada

- [QUICK_START_CROSS_PLATFORM.md](./QUICK_START_CROSS_PLATFORM.md) - Guía rápida
- [COMPATIBILIDAD_CROSS_PLATFORM.md](./COMPATIBILIDAD_CROSS_PLATFORM.md) - Guía completa de compatibilidad
- [CLONAR_REPOSITORIO.md](./CLONAR_REPOSITORIO.md) - Guía para clonar el repositorio
