# Guía para Clonar el Repositorio

Esta guía explica cómo clonar el repositorio del proyecto y configurarlo en Windows o Mac.

## Requisitos Previos

Antes de clonar el repositorio, se requiere tener instalado:

### Windows
- .NET SDK 8.0.300 o superior
- Git
- Visual Studio o VS Code
- Extensión C# para VS Code (si se usa VS Code)

### Mac
- .NET SDK 8.0.417 o superior
- Git
- Rider o VS Code
- DataGrip (opcional, para base de datos)

Si no se tienen estas herramientas instaladas, seguir la guía [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md).

## Paso 1: Verificar que Git está Instalado

### Windows

Abrir PowerShell o CMD:
- Presionar `Win + X` y seleccionar "Windows PowerShell"
- O presionar `Win + R`, escribir `powershell` y presionar Enter

Verificar Git:
```powershell
git --version
```

Si muestra una versión (ejemplo: `git version 2.42.0`):
- Git está instalado, continuar al Paso 2

Si muestra error:
- Git no está instalado
- Descargar desde: https://git-scm.com/download/win
- Instalar Git y reiniciar PowerShell
- Verificar nuevamente con `git --version`

### Mac

Abrir la Terminal:
- Presionar `Cmd + Espacio` para Spotlight
- Escribir "Terminal" y presionar Enter

Verificar Git:
```bash
git --version
```

Si muestra una versión:
- Git está instalado, continuar al Paso 2

Si muestra error:
- Instalar Git desde: https://git-scm.com/download/mac
- O instalar Xcode Command Line Tools: `xcode-select --install`

## Paso 2: Verificar que .NET SDK está Instalado

### Windows y Mac

Abrir PowerShell (Windows) o Terminal (Mac).

Verificar .NET:
```bash
dotnet --version
```

Si muestra `8.0.300` o superior (Windows) o `8.0.417` o superior (Mac):
- .NET está instalado, continuar al Paso 3

Si muestra error o versión diferente:
- .NET no está instalado o es versión incorrecta
- Seguir la guía: [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md)
- Instalar .NET SDK 8.0.300 o superior
- Verificar nuevamente con `dotnet --version`

## Archivos de Solución

El repositorio contiene dos archivos de solución:
- `AdministracionFlotillas.slnx` - Formato nuevo de Visual Studio 2022 (versión 17.10 Preview 3 o superior)
- `AdministracionFlotillas.sln` - Formato tradicional (compatible con todas las versiones)

Compatibilidad:
- VS Code: Usa `AdministracionFlotillas.sln` (formato tradicional)
- Visual Studio 2022 (versión 17.10 Preview 3 o superior): Puede usar ambos formatos
- Visual Studio 2022 (versiones anteriores a 17.10): Usa `AdministracionFlotillas.sln`
- Visual Studio (versiones anteriores a 2022): Usa `AdministracionFlotillas.sln`

Recomendación: Usar `AdministracionFlotillas.sln` para máxima compatibilidad.

## Paso 3: Clonar el Repositorio

### Windows

Abrir PowerShell.

Navegar a donde se quiere clonar el proyecto:
```powershell
# Ejemplo: clonar en Documentos
cd C:\Users\[TU_USUARIO]\Documents

# O clonar en otra ubicación
cd D:\Proyectos
```

Clonar el repositorio:
```powershell
git clone https://github.com/alejandro3469/AdministracionFlotillas.git
```

Navegar al proyecto clonado:
```powershell
cd AdministracionFlotillas
```

Verificar que se clonó correctamente:
```powershell
dir
```

Debe mostrar:
- AdministracionFlotillas.sln
- AdministracionFlotillas.slnx
- src/
- docs/
- README.md

### Mac

Abrir la Terminal.

Navegar a donde se quiere clonar el proyecto:
```bash
# Ejemplo: clonar en Documentos
cd ~/Documents

# O clonar en otra ubicación
cd ~/Proyectos
```

Clonar el repositorio:
```bash
# Usando HTTPS
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# O usando SSH (si está configurado)
# git clone git@github.com:alejandro3469/AdministracionFlotillas.git
```

Navegar al proyecto clonado:
```bash
cd AdministracionFlotillas
```

Verificar que se clonó correctamente:
```bash
ls -la
```

Debe mostrar:
- AdministracionFlotillas.sln
- AdministracionFlotillas.slnx
- src/
- docs/
- README.md

## Paso 4: Restaurar Dependencias

Después de clonar, se deben restaurar los paquetes NuGet que el proyecto usa.

### Windows y Mac

Asegurarse de estar en la raíz del proyecto:
```bash
# Windows
cd [RUTA_DONDE_CLONASTE]\AdministracionFlotillas

# Mac
cd ~/Documents/AdministracionFlotillas

# Verificar que se está en el lugar correcto
pwd
```

Restaurar las dependencias:
```bash
dotnet restore
```

Este comando:
- Lee los archivos `.csproj` de todos los proyectos
- Descarga los paquetes NuGet necesarios
- Puede tardar 1-3 minutos la primera vez

Verificar que funcionó:
- Debe mostrar mensajes como:
```
Restoring packages for /ruta/al/proyecto.csproj...
Restore succeeded.
```

Si hay errores:
- Verificar que .NET SDK 8.0.300 o superior está instalado: `dotnet --version`
- Verificar conexión a internet
- Intentar nuevamente: `dotnet restore`

## Paso 5: Compilar el Proyecto

Después de restaurar, compilar para verificar que todo está correcto.

### Windows y Mac

Asegurarse de estar en la raíz del proyecto:
```bash
pwd
```

Compilar toda la solución:
```bash
dotnet build
```

Si todo está bien, se verá:
```
Build succeeded.
    0 Warning(s)
    0 Error(s)
```

Si hay errores:
- Leer los mensajes de error cuidadosamente
- Los errores indican qué archivo y qué línea tienen el problema
- Errores comunes:
  - Paquetes NuGet faltantes: Ejecutar `dotnet restore` nuevamente
  - Versión de .NET incorrecta: Verificar con `dotnet --version`
  - Referencias entre proyectos rotas: Verificar que todos los proyectos están en la solución

## Paso 6: Configurar Base de Datos (Opcional)

Si solo se quiere compilar y ejecutar la aplicación sin base de datos, se puede saltar este paso.

Si se necesita configurar la base de datos:
- Seguir la guía: [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md)
- Configurar la cadena de conexión en `src/AdministracionFlotillas.Web/appsettings.json`

## Paso 7: Ejecutar la Aplicación

### Windows y Mac

Navegar al proyecto Web:
```bash
cd src/AdministracionFlotillas.Web
```

Ejecutar la aplicación:
```bash
dotnet run
```

Verificar que se ejecutó:
- Debe mostrar mensajes como:
```
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
      Now listening on: http://localhost:5000
```

Abrir el navegador:
- Ir a: `https://localhost:5001` o `http://localhost:5000`
- Debe mostrar la página de inicio de ASP.NET Core MVC

Detener la aplicación:
- Presionar `Ctrl + C` en la terminal
- Esto detiene el servidor web

## Paso 8: Abrir el Proyecto en el IDE

### Windows (VS Code)

Abrir VS Code:
- Buscar "Visual Studio Code" en el menú Inicio
- O presionar `Win + R`, escribir `code` y presionar Enter

Abrir el proyecto:
- Opción A: Abrir la carpeta
  - Ir a: File → Open Folder...
  - Navegar a la carpeta del proyecto clonado
  - Seleccionar "Select Folder"
  - VS Code detectará automáticamente los proyectos .NET
- Opción B: Abrir el archivo de solución
  - Ir a: File → Open File...
  - Navegar a la carpeta del proyecto clonado
  - Seleccionar `AdministracionFlotillas.sln`
  - VS Code abrirá la solución con todos los proyectos

Verificar que VS Code detecta .NET:
- Abrir la Terminal integrada: `Ctrl + ` (backtick)
- Ejecutar: `dotnet --version`
- Debe mostrar la versión instalada de .NET SDK

Instalar extensiones recomendadas:
- VS Code puede sugerir instalar extensiones
- Asegurarse de tener la extensión "C#" de Microsoft instalada
- Si VS Code no detecta los proyectos, instalar la extensión "C# Dev Kit" de Microsoft

### Windows (Visual Studio)

Abrir Visual Studio:
- Buscar "Visual Studio" en el menú Inicio

Abrir el proyecto:
- Ir a: File → Open → Project/Solution...
- Navegar a la carpeta del proyecto clonado
- Seleccionar `AdministracionFlotillas.sln`
- Hacer clic en "Open"

Verificar que Visual Studio detecta .NET:
- Visual Studio debería detectar automáticamente .NET SDK 8.0.300 o superior
- Si no, ir a: Tools → Options → Projects and Solutions → .NET Core
- Verificar que .NET SDK 8.0.300 o superior está listado

### Mac (Rider)

Abrir Rider:
- Ir a Aplicaciones → Rider
- O buscar "Rider" en Spotlight

Abrir el proyecto:
- Ir a: File → Open
- Navegar a la carpeta del proyecto clonado
- Seleccionar el archivo `AdministracionFlotillas.slnx` o `AdministracionFlotillas.sln`
- Hacer clic en "Open"

Verificar que Rider detecta .NET:
- Rider debería detectar automáticamente .NET 8.0.417 o superior
- Si no, ir a: Rider → Preferences → Toolchains
- Verificar que .NET SDK 8.0.417 o superior está listado

## Checklist de Verificación

Después de clonar y configurar, verificar que todo está bien:

- Git está instalado y funciona
- .NET SDK 8.0.300 o superior está instalado
- Repositorio clonado correctamente
- `dotnet restore` ejecutado sin errores
- `dotnet build` ejecutado sin errores
- Proyecto abierto en IDE (VS Code, Visual Studio o Rider)
- IDE detecta .NET correctamente
- (Opcional) Base de datos configurada
- (Opcional) Aplicación ejecuta correctamente

## Solución de Problemas Comunes

### Error: "git: command not found" o "git no se reconoce"

Solución:
- Git no está instalado
- Windows: Descargar e instalar desde https://git-scm.com/download/win
- Mac: Ejecutar `xcode-select --install` en Terminal
- Reiniciar la terminal después de instalar

### Error: "dotnet: command not found" o "dotnet no se reconoce"

Solución:
- .NET SDK no está instalado
- Seguir: [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md)
- Instalar .NET SDK 8.0.300 o superior
- Reiniciar la terminal después de instalar

### Error: "Could not find a part of the path" al clonar

Solución:
- La ruta donde se intenta clonar no existe
- Crear la carpeta primero o clonar en una ubicación que exista
- Windows: `mkdir C:\Proyectos` y luego clonar ahí
- Mac: `mkdir ~/Proyectos` y luego clonar ahí

### Error: "Restore failed" o "Unable to restore packages"

Solución:
1. Verificar conexión a internet
2. Verificar que .NET está instalado: `dotnet --version`
3. Intentar limpiar y restaurar:
```bash
dotnet clean
dotnet restore
```

### Error: "Build failed" después de clonar

Solución:
1. Asegurarse de haber ejecutado `dotnet restore` primero
2. Verificar que todos los proyectos están en la solución:
```bash
dotnet sln list
```
3. Debe mostrar 4 proyectos listados
4. Si faltan proyectos, verificar que se clonó el repositorio completo

### Error: "The project file could not be loaded"

Solución:
- El archivo .csproj puede estar corrupto
- Verificar que se clonó el repositorio completo
- Intentar clonar nuevamente en una carpeta diferente

### Error: "El archivo seleccionado no es un archivo de solución válido"

Solución:
- Este error ocurre cuando se intenta abrir un archivo `.slnx` en un IDE que no lo soporta
- VS Code: Usar `AdministracionFlotillas.sln` (formato tradicional)
- Visual Studio 2022 (versiones anteriores a 17.10 Preview 3): Usar `AdministracionFlotillas.sln`
- Visual Studio 2022 (versión 17.10 Preview 3 o superior): Puede usar ambos formatos
- Visual Studio (versiones anteriores a 2022): Usar `AdministracionFlotillas.sln`

Pasos para corregir:
1. Abrir el IDE (VS Code o Visual Studio)
2. Ir a: File → Open File... (o Open Project/Solution...)
3. Seleccionar `AdministracionFlotillas.sln` (NO `.slnx`)
4. O simplemente abrir la carpeta del proyecto:
   - VS Code: File → Open Folder...
   - El IDE detectará automáticamente los proyectos

### La aplicación no se ejecuta (error de puerto)

Solución:
- El puerto 5000 o 5001 puede estar en uso
- Cerrar otras aplicaciones que usen esos puertos
- O cambiar el puerto en `Properties/launchSettings.json`

## Comandos Rápidos de Referencia

```bash
# Clonar repositorio
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# Navegar al proyecto
cd AdministracionFlotillas

# Restaurar dependencias (DESPUÉS de clonar)
dotnet restore

# Compilar proyecto
dotnet build

# Ejecutar aplicación
cd src/AdministracionFlotillas.Web
dotnet run

# Ver proyectos en solución
dotnet sln list

# Ver referencias de un proyecto
dotnet list src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj reference
```

## Próximos Pasos

Después de clonar y configurar el proyecto:

1. Leer la documentación:
   - [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Próximos pasos de desarrollo
   - [ARQUITECTURA.md](./ARQUITECTURA.md) - Entender la arquitectura del proyecto
   - [REQUISITOS_PROYECTO.md](./REQUISITOS_PROYECTO.md) - Requisitos completos

2. Configurar el entorno:
   - Configurar base de datos (si es necesario): [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md)

3. Comenzar a desarrollar:
   - Seguir [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) para los siguientes pasos

## Documentación Relacionada

- [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md) - Instalar herramientas antes de clonar
- [SETUP.md](./SETUP.md) - Configuración completa del proyecto
- [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Qué hacer después de clonar
- [COMANDOS_UTILES.md](./COMANDOS_UTILES.md) - Comandos útiles para desarrollo
