# Inicio Rápido: Windows con Visual Studio

## 🎯 Objetivo

Correr el proyecto en Windows usando Visual Studio y verlo en el navegador.

---

## 📋 Pasos en Orden

### PASO 1: Verificar que tienes .NET SDK 8.0.300 o superior

**Abre PowerShell o CMD:**
- Presiona `Windows + R`
- Escribe `powershell` y presiona Enter
- O busca "PowerShell" en el menú inicio

**Ejecuta:**
```powershell
dotnet --version
```

**Resultado esperado:**
- Debe mostrar `8.0.300` o superior (ej: `8.0.300`, `8.0.400`, `8.0.500`)
- Si muestra error o versión menor, ve al [Paso 1.1](#paso-11-si-no-tienes-net-sdk-80300)

**Si ya tienes la versión correcta:** ✅ Continúa al [Paso 2](#paso-2-clonar-o-actualizar-el-repositorio)

---

### PASO 1.1: Si NO tienes .NET SDK 8.0.300

**Opción A: Descargar e Instalar Manualmente**

1. Abre tu navegador
2. Ve a: https://dotnet.microsoft.com/download/dotnet/8.0
3. Busca la sección ".NET 8.0"
4. Haz clic en "Download .NET SDK" (NO Runtime)
5. Selecciona "Windows x64"
6. Descarga el instalador (ej: `dotnet-sdk-8.0.300-win-x64.exe`)
7. Ejecuta el instalador
8. Sigue las instrucciones del instalador
9. Verifica: Abre PowerShell y ejecuta `dotnet --version`

**Opción B: Instalar desde Visual Studio**

1. Abre Visual Studio
2. Ve a: **Herramientas** → **Obtener herramientas y características**
3. Busca ".NET 8.0 SDK" en la lista
4. Márcalo y haz clic en **Modificar**
5. Espera a que termine la instalación
6. Verifica: Abre PowerShell y ejecuta `dotnet --version`

---

### PASO 2: Clonar o Actualizar el Repositorio

**Si es la primera vez (no has clonado el repositorio):**

**Abre PowerShell:**
- Presiona `Windows + R`
- Escribe `powershell` y presiona Enter

**Ejecuta estos comandos en orden:**
```powershell
# Ir a la carpeta donde quieres guardar el proyecto (ej: Documentos)
cd $HOME\Documents

# Clonar el repositorio
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# Entrar a la carpeta del proyecto
cd AdministracionFlotillas
```

**Si ya tienes el repositorio clonado:**

**Abre PowerShell en la carpeta del proyecto:**
```powershell
# Ir a la carpeta del proyecto (ajusta la ruta según donde lo tengas)
cd $HOME\Documents\AdministracionFlotillas

# Actualizar desde el repositorio
git pull origin main
```

---

### PASO 3: Verificar la Configuración

**Ejecuta estos comandos en PowerShell (en la carpeta del proyecto):**

```powershell
# Verificar versión de .NET
dotnet --version

# Verificar que global.json existe y está correcto
Get-Content global.json

# Restaurar paquetes NuGet
dotnet restore
```

**Resultado esperado:**
- `dotnet --version` debe mostrar `8.0.300` o superior
- `global.json` debe mostrar `"version": "8.0.300"` y `"rollForward": "latestPatch"`
- `dotnet restore` debe completarse sin errores

---

### PASO 4: Compilar el Proyecto

**Ejecuta en PowerShell:**
```powershell
dotnet build
```

**Resultado esperado:**
- Debe mostrar `Build succeeded`
- Debe mostrar `0 Warning(s)` y `0 Error(s)`

**Si hay errores:**
- Verifica que tienes .NET SDK 8.0.300 o superior
- Ejecuta: `dotnet clean` y luego `dotnet restore` y `dotnet build` de nuevo

---

### PASO 5: Abrir el Proyecto en Visual Studio

**Opción A: Desde PowerShell**
```powershell
# Abrir la solución en Visual Studio
start AdministracionFlotillas.sln
```

**Opción B: Desde el Explorador de Archivos**
1. Abre el Explorador de Archivos
2. Navega a la carpeta del proyecto
3. Busca el archivo `AdministracionFlotillas.sln`
4. Haz doble clic en `AdministracionFlotillas.sln`
5. Se abrirá en Visual Studio

**Opción C: Desde Visual Studio**
1. Abre Visual Studio
2. **Archivo** → **Abrir** → **Proyecto o solución**
3. Navega a la carpeta del proyecto
4. Selecciona `AdministracionFlotillas.sln`
5. Haz clic en **Abrir**

---

### PASO 6: Configurar Visual Studio (Primera Vez)

**Si Visual Studio muestra errores o no detecta el SDK:**

1. **Cerrar Visual Studio completamente**

2. **Eliminar carpetas bin y obj (desde PowerShell):**
   ```powershell
   # Desde la carpeta del proyecto
   Get-ChildItem -Path . -Recurse -Directory -Filter bin | Remove-Item -Recurse -Force
   Get-ChildItem -Path . -Recurse -Directory -Filter obj | Remove-Item -Recurse -Force
   ```

3. **Abrir Visual Studio de nuevo**

4. **Verificar SDK en Visual Studio:**
   - **Herramientas** → **Opciones**
   - **Proyectos y soluciones** → **.NET Core**
   - Verifica que aparezca SDK 8.0.300 o superior en la lista

5. **Limpiar y Recompilar:**
   - **Compilar** → **Limpiar solución**
   - **Compilar** → **Recompilar solución**

---

### PASO 7: Configurar el Proyecto de Inicio

**En Visual Studio:**

1. En el **Explorador de soluciones** (panel izquierdo)
2. Busca el proyecto `AdministracionFlotillas.Web`
3. Haz **clic derecho** en `AdministracionFlotillas.Web`
4. Selecciona **Establecer como proyecto de inicio**

**O desde la barra de herramientas:**
- En la barra superior, busca el menú desplegable de proyectos
- Selecciona `AdministracionFlotillas.Web`

---

### PASO 8: Ejecutar el Proyecto

**Opción A: Desde Visual Studio (Recomendado)**

1. Presiona **F5** (o haz clic en el botón verde "▶ AdministracionFlotillas.Web")
2. O ve a: **Depurar** → **Iniciar depuración**

**Opción B: Desde PowerShell**

```powershell
# Ejecutar el proyecto web
dotnet run --project src\AdministracionFlotillas.Web\AdministracionFlotillas.Web.csproj
```

---

### PASO 9: Ver el Proyecto en el Navegador

**Después de ejecutar el proyecto:**

1. Se abrirá automáticamente tu navegador predeterminado
2. La URL será algo como: `https://localhost:5001` o `http://localhost:5000`
3. Si no se abre automáticamente:
   - Mira la consola de Visual Studio o PowerShell
   - Busca una línea que diga: `Now listening on: https://localhost:XXXX`
   - Copia esa URL y ábrela en tu navegador

**Si aparece un error de certificado SSL:**
- Haz clic en **Avanzado** o **Advanced**
- Haz clic en **Continuar de todas formas** o **Proceed anyway**

---

## 🔧 Solución de Problemas Comunes

### Problema: "No se puede encontrar SDK 8.0.300"

**Solución:**
```powershell
# Verificar SDKs instalados
dotnet --list-sdks

# Si no aparece 8.0.300 o superior, instálalo (ver Paso 1.1)
```

### Problema: "El proyecto no compila en Visual Studio"

**Solución:**
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

**Solución:**
1. Cierra Visual Studio
2. Elimina carpetas `bin` y `obj` (ver Paso 6)
3. Abre Visual Studio de nuevo
4. **Archivo** → **Invalidar caché y reiniciar** (si está disponible)
5. O: **Compilar** → **Limpiar solución** → **Recompilar solución**

### Problema: "El navegador no se abre o muestra error"

**Solución:**
1. Verifica que el proyecto se ejecutó correctamente
2. Busca en la consola la URL (ej: `https://localhost:5001`)
3. Ábrela manualmente en el navegador
4. Si el puerto está ocupado, cierra otras aplicaciones que puedan estar usándolo

---

## ✅ Verificación Final

**Si todo funciona correctamente, deberías ver:**
- ✅ El proyecto compila sin errores
- ✅ Visual Studio muestra el proyecto sin errores
- ✅ El navegador se abre automáticamente
- ✅ Puedes ver la aplicación web funcionando

---

## 📚 Comandos de Referencia Rápida

**Para usar cada vez que trabajes en el proyecto:**

```powershell
# 1. Actualizar desde el repositorio
git pull origin main

# 2. Restaurar paquetes
dotnet restore

# 3. Compilar
dotnet build

# 4. Ejecutar (opcional, si no usas Visual Studio)
dotnet run --project src\AdministracionFlotillas.Web\AdministracionFlotillas.Web.csproj
```

---

## 🎉 ¡Listo!

Si seguiste todos los pasos, deberías tener el proyecto corriendo en tu navegador.

**Para detener el servidor:**
- En Visual Studio: Presiona **Shift + F5** o haz clic en el botón de detener
- En PowerShell: Presiona **Ctrl + C**

---

**¿Necesitas ayuda?** Consulta:
- [QUICK_START_CROSS_PLATFORM.md](./QUICK_START_CROSS_PLATFORM.md) - Guía rápida
- [COMPATIBILIDAD_CROSS_PLATFORM.md](./COMPATIBILIDAD_CROSS_PLATFORM.md) - Guía completa
