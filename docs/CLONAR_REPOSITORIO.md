# Guía para Clonar el Repositorio - Paso a Paso

## Objetivo

Esta guía te ayudará a clonar el repositorio del proyecto y configurarlo en tu máquina (Mac o Windows) para comenzar a trabajar.

## Requisitos Previos

**ANTES de clonar el repositorio, necesitas tener instalado:**

### Para Windows:
- [ ] .NET SDK 10.0.101 instalado
- [ ] Git instalado
- [ ] VS Code instalado (o Visual Studio)
- [ ] Extensión C# para VS Code instalada

### Para Mac:
- [ ] .NET SDK 10.0.101 instalado
- [ ] Git instalado
- [ ] Rider instalado (o VS Code)
- [ ] DataGrip instalado (opcional, para base de datos)

**Si NO tienes estas herramientas instaladas:**
- Sigue la guía: [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md)

---

## PASO 1: Verificar que Git está Instalado

### Para Windows:

**1.1. Abre PowerShell o CMD:**
- Presiona `Win + X` y selecciona "Windows PowerShell"
- O presiona `Win + R`, escribe `powershell` y presiona Enter

**1.2. Verifica Git:**
```powershell
git --version
```

**Si muestra una versión (ej: `git version 2.42.0`):**
- Git está instalado, continúa al PASO 2

**Si muestra error:**
- Git NO está instalado
- Descarga desde: https://git-scm.com/download/win
- Instala Git y reinicia PowerShell
- Vuelve a verificar con `git --version`

### Para Mac:

**1.1. Abre la Terminal:**
- Presiona `Cmd + Espacio` para Spotlight
- Escribe "Terminal" y presiona Enter

**1.2. Verifica Git:**
```bash
git --version
```

**Si muestra una versión:**
- Git está instalado (viene preinstalado en Mac)
- Continúa al PASO 2

**Si muestra error:**
- Instala Git desde: https://git-scm.com/download/mac
- O instala Xcode Command Line Tools: `xcode-select --install`

---

## PASO 2: Verificar que .NET SDK está Instalado

### Para Windows y Mac (mismo comando):

**2.1. Abre PowerShell (Windows) o Terminal (Mac)**

**2.2. Verifica .NET:**
```bash
dotnet --version
```

**Si muestra `10.0.101` o superior:**
- .NET está instalado, continúa al PASO 3

**Si muestra error o versión diferente:**
- .NET NO está instalado o es versión incorrecta
- Sigue la guía: [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md)
- Instala .NET SDK 10.0.101
- Vuelve a verificar con `dotnet --version`

---

## Archivos de Solución (.sln vs .slnx)

El repositorio contiene dos archivos de solución:
- **`AdministracionFlotillas.slnx`** - Formato nuevo de Visual Studio 2022
- **`AdministracionFlotillas.sln`** - Formato tradicional

**Compatibilidad:**
- **VS Code**: Usa `AdministracionFlotillas.sln` (formato tradicional)
- **Visual Studio 2022**: Puede usar ambos formatos
- **Visual Studio (versiones anteriores a 2022)**: Usa `AdministracionFlotillas.sln` (no reconoce `.slnx`)

---

## PASO 3: Clonar el Repositorio

### Para Windows:

**3.1. Abre PowerShell:**
- Presiona `Win + X` → "Windows PowerShell"

**3.2. Navega a donde quieres clonar el proyecto:**
```powershell
# Ejemplo: clonar en Documentos
cd C:\Users\[TU_USUARIO]\Documents

# O clonar en otra ubicación
cd D:\Proyectos
```

**3.3. Clona el repositorio:**
```powershell
git clone https://github.com/alejandro3469/AdministracionFlotillas.git
```

**3.4. Navega al proyecto clonado:**
```powershell
cd AdministracionFlotillas
```

**3.5. Verifica que se clonó correctamente:**
```powershell
# Deberías ver los archivos del proyecto
dir

# Deberías ver:
# - AdministracionFlotillas.sln
# - AdministracionFlotillas.slnx
# - src/
# - docs/
# - README.md
```

### Para Mac:

**3.1. Abre la Terminal**

**3.2. Navega a donde quieres clonar el proyecto:**
```bash
# Ejemplo: clonar en Documentos
cd ~/Documents

# O clonar en otra ubicación
cd ~/Proyectos
```

**3.3. Clona el repositorio:**
```bash
# Usando HTTPS
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# O usando SSH (si tienes configurado)
# git clone git@github.com:alejandro3469/AdministracionFlotillas.git
```

**3.4. Navega al proyecto clonado:**
```bash
cd AdministracionFlotillas
```

**3.5. Verifica que se clonó correctamente:**
```bash
# Deberías ver los archivos del proyecto
ls -la

# Deberías ver:
# - AdministracionFlotillas.sln
# - AdministracionFlotillas.slnx
# - src/
# - docs/
# - README.md
```

---

## PASO 4: Restaurar Dependencias (Paquetes NuGet)

**IMPORTANTE**: Después de clonar, necesitas restaurar los paquetes NuGet que el proyecto usa.

### Para Windows y Mac (mismos comandos):

**4.1. Asegúrate de estar en la raíz del proyecto:**
```bash
# Windows
cd [RUTA_DONDE_CLONASTE]\AdministracionFlotillas

# Mac
cd ~/Documents/AdministracionFlotillas

# Verifica que estás en el lugar correcto
pwd
# Debe mostrar la ruta del proyecto
```

**4.2. Restaura las dependencias:**
```bash
# Mac y Windows (mismo comando)
dotnet restore
```

**4.3. Qué hace este comando:**
- Lee los archivos `.csproj` de todos los proyectos
- Descarga los paquetes NuGet necesarios (Oracle.ManagedDataAccess.Core, etc.)
- Puede tardar 1-3 minutos la primera vez
- Descarga los paquetes a una carpeta local

**4.4. Verifica que funcionó:**
- Deberías ver mensajes como:
```
Restoring packages for /ruta/al/proyecto.csproj...
Restore succeeded.
```

**Si ves errores:**
- Verifica que .NET SDK 10.0.101 está instalado: `dotnet --version`
- Verifica tu conexión a internet
- Intenta nuevamente: `dotnet restore`

---

## PASO 5: Compilar el Proyecto

**IMPORTANTE**: Después de restaurar, compila para verificar que todo está correcto.

### Para Windows y Mac (mismos comandos):

**5.1. Asegúrate de estar en la raíz del proyecto:**
```bash
# Verifica que estás en la raíz (donde están los archivos de solución)
pwd
```

**5.2. Compila toda la solución:**
```bash
# Mac y Windows (mismo comando)
dotnet build
```

**5.3. Verifica el resultado:**

**Si todo está bien, verás:**
```
Build succeeded.
    0 Warning(s)
    0 Error(s)
```

**Si hay errores:**
- Lee los mensajes de error cuidadosamente
- Los errores te dirán qué archivo y qué línea tienen el problema
- Errores comunes:
  - Paquetes NuGet faltantes → Ejecuta `dotnet restore` nuevamente
  - Versión de .NET incorrecta → Verifica con `dotnet --version`
  - Referencias entre proyectos rotas → Verifica que todos los proyectos están en la solución

---

## PASO 6: Configurar Base de Datos (Opcional - Para Desarrollo)

**NOTA**: Si solo quieres compilar y ejecutar la aplicación sin base de datos, puedes saltar este paso por ahora.

**Si necesitas configurar la base de datos:**
- Sigue la guía: [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md)
- Configura la cadena de conexión en `src/AdministracionFlotillas.Web/appsettings.json`

---

## PASO 7: Ejecutar la Aplicación

### Para Windows y Mac (mismos comandos):

**7.1. Navega al proyecto Web:**
```bash
# Mac y Windows (mismo comando)
cd src/AdministracionFlotillas.Web
```

**7.2. Ejecuta la aplicación:**
```bash
dotnet run
```

**7.3. Verifica que se ejecutó:**
- Deberías ver mensajes como:
```
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
      Now listening on: http://localhost:5000
```

**7.4. Abre el navegador:**
- Ve a: `https://localhost:5001` o `http://localhost:5000`
- Deberías ver la página de inicio de ASP.NET Core MVC

**7.5. Detén la aplicación:**
- Presiona `Ctrl + C` en la terminal
- Esto detiene el servidor web

---

## PASO 8: Abrir el Proyecto en tu IDE

### Para Windows (VS Code):

**8.1. Abre VS Code:**
- Busca "Visual Studio Code" en el menú Inicio
- O presiona `Win + R`, escribe `code` y presiona Enter

**8.2. Abre el proyecto:**
Tienes dos opciones:

**Opción A: Abrir la carpeta (Recomendado)**
- Ve a: **File** → **Open Folder...**
- Navega a la carpeta del proyecto clonado
- Haz clic en "Select Folder"
- VS Code detectará automáticamente los proyectos .NET

**Opción B: Abrir el archivo de solución**
- Ve a: **File** → **Open File...**
- Navega a la carpeta del proyecto clonado
- Selecciona `AdministracionFlotillas.sln` (formato tradicional)
- VS Code abrirá la solución con todos los proyectos

**8.3. Verifica que VS Code detecta .NET:**
- Abre la Terminal integrada: `Ctrl + `` (backtick)
- Ejecuta: `dotnet --version`
- Debe mostrar la versión instalada de .NET SDK

**8.4. Instalar extensiones recomendadas:**
- VS Code puede sugerirte instalar extensiones
- Asegúrate de tener la extensión "C#" de Microsoft instalada
- Si VS Code no detecta los proyectos, instala la extensión "C# Dev Kit" de Microsoft

### Para Windows (Visual Studio):

**8.1. Abre Visual Studio:**
- Busca "Visual Studio" en el menú Inicio

**8.2. Abre el proyecto:**
- Ve a: **File** → **Open** → **Project/Solution...**
- Navega a la carpeta del proyecto clonado
- **Visual Studio 2022**: Puede abrir `AdministracionFlotillas.slnx` o `AdministracionFlotillas.sln`
- **Visual Studio (versiones anteriores)**: Abre `AdministracionFlotillas.sln` (no reconoce `.slnx`)
- Haz clic en "Open"

**8.3. Verifica que Visual Studio detecta .NET:**
- Visual Studio debería detectar automáticamente .NET SDK 10.0.101
- Si no, ve a: **Tools** → **Options** → **Projects and Solutions** → **.NET Core**
- Verifica que .NET SDK 10.0.101 está listado

### Para Mac (Rider):

**8.1. Abre Rider:**
- Ve a Aplicaciones → Rider
- O busca "Rider" en Spotlight

**8.2. Abre el proyecto:**
- Ve a: **File** → **Open**
- Navega a la carpeta del proyecto clonado
- Selecciona el archivo `AdministracionFlotillas.slnx` o `AdministracionFlotillas.sln`
- Haz clic en "Open"

**8.3. Verifica que Rider detecta .NET:**
- Rider debería detectar automáticamente .NET 10.0.101
- Si no, ve a: **Rider** → **Preferences** → **Toolchains**
- Verifica que .NET SDK 10.0.101 está listado

---

## Checklist de Verificación

Después de clonar y configurar, verifica que todo está bien:

- [ ] Git está instalado y funciona
- [ ] .NET SDK 10.0.101 está instalado
- [ ] Repositorio clonado correctamente
- [ ] `dotnet restore` ejecutado sin errores
- [ ] `dotnet build` ejecutado sin errores
- [ ] Proyecto abierto en IDE (VS Code, Visual Studio o Rider)
- [ ] IDE detecta .NET correctamente
- [ ] (Opcional) Base de datos configurada
- [ ] (Opcional) Aplicación ejecuta correctamente

---

## Solución de Problemas Comunes

### Error: "git: command not found" o "git no se reconoce"

**Solución:**
- Git no está instalado
- **Windows**: Descarga e instala desde https://git-scm.com/download/win
- **Mac**: Ejecuta `xcode-select --install` en Terminal
- Reinicia tu terminal después de instalar

### Error: "dotnet: command not found" o "dotnet no se reconoce"

**Solución:**
- .NET SDK no está instalado
- Sigue: [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md)
- Instala .NET SDK 10.0.101
- Reinicia tu terminal después de instalar

### Error: "Could not find a part of the path" al clonar

**Solución:**
- La ruta donde intentas clonar no existe
- Crea la carpeta primero o clona en una ubicación que exista
- **Windows**: `mkdir C:\Proyectos` y luego clona ahí
- **Mac**: `mkdir ~/Proyectos` y luego clona ahí

### Error: "Restore failed" o "Unable to restore packages"

**Solución:**
1. Verifica tu conexión a internet
2. Verifica que .NET está instalado: `dotnet --version`
3. Intenta limpiar y restaurar:
```bash
dotnet clean
dotnet restore
```

### Error: "Build failed" después de clonar

**Solución:**
1. Asegúrate de haber ejecutado `dotnet restore` primero
2. Verifica que todos los proyectos están en la solución:
```bash
dotnet sln list
```
3. Deberías ver 4 proyectos listados
4. Si faltan proyectos, verifica que clonaste el repositorio completo

### Error: "The project file could not be loaded"

**Solución:**
- El archivo .csproj puede estar corrupto
- Verifica que clonaste el repositorio completo
- Intenta clonar nuevamente en una carpeta diferente

### Error: "El archivo seleccionado no es un archivo de solución válido"

**Solución:**
- Este error ocurre cuando se intenta abrir un archivo `.slnx` en un IDE que no lo soporta
- **VS Code**: Usa `AdministracionFlotillas.sln` (formato tradicional)
- **Visual Studio (versiones anteriores a 2022)**: Usa `AdministracionFlotillas.sln` (no reconoce `.slnx`)
- **Visual Studio 2022**: Puede usar ambos formatos

**Pasos para corregir:**
1. Abre el IDE (VS Code o Visual Studio)
2. Ve a: **File** → **Open File...** (o **Open Project/Solution...**)
3. Selecciona `AdministracionFlotillas.sln` (NO `.slnx`)
4. O simplemente abre la carpeta del proyecto:
   - **VS Code**: **File** → **Open Folder...**
   - El IDE detectará automáticamente los proyectos

### La aplicación no se ejecuta (error de puerto)

**Solución:**
- El puerto 5000 o 5001 puede estar en uso
- Cierra otras aplicaciones que usen esos puertos
- O cambia el puerto en `Properties/launchSettings.json`

---

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

---

## Próximos Pasos

Después de clonar y configurar el proyecto:

1. **Lee la documentación:**
   - [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Próximos pasos de desarrollo
   - [ARQUITECTURA.md](./ARQUITECTURA.md) - Entiende la arquitectura del proyecto
   - [REQUISITOS_PROYECTO.md](./REQUISITOS_PROYECTO.md) - Requisitos completos

2. **Configura tu entorno:**
   - Configura base de datos (si es necesario): [GUIA_BASE_DATOS.md](./GUIA_BASE_DATOS.md)
   - Configura Kendo UI y Bootstrap (ver SETUP.md)

3. **Comienza a desarrollar:**
   - Sigue [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) para los siguientes pasos

---

## Documentación Relacionada

- [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md) - Instalar herramientas antes de clonar
- [SETUP.md](./SETUP.md) - Configuración completa del proyecto
- [COMO_CONTINUAR.md](./COMO_CONTINUAR.md) - Qué hacer después de clonar
- [COMANDOS_UTILES.md](./COMANDOS_UTILES.md) - Comandos útiles para desarrollo

---


