# Gu�a de Instalación de Herramientas - Paso a Paso Granular

## Objetivo

Instalar todas las herramientas necesarias para desarrollar el proyecto en Mac y Windows.

## Herramientas Necesarias

### Para Mac (Desarrollador Principal):
- .NET SDK 10.0.101
- Rider (IDE)
- DataGrip (Herramienta de base de datos)

### Para Windows (Equipo):
- .NET SDK 10.0.101
- VS Code (IDE)
- Extensión C# para VS Code
- (Opcional) DataGrip o SQL Developer

---

## INSTALACI�N EN MAC

### PASO 1: Instalar .NET SDK 10.0.101

#### 1.1. Verificar si ya está instalado:

**Abre la Terminal:**
- Presiona `Cmd + Espacio` para Spotlight
- Escribe "Terminal" y presiona Enter
- O ve a: Aplicaciones �� Utilidades �� Terminal

**Ejecuta:**
```bash
dotnet --version
```

**Si muestra `10.0.101` o superior:**
-  Ya está instalado, salta al PASO 2

**Si muestra error o versión diferente:**
- Continúa con la instalación

#### 1.2. Descargar .NET SDK:

**1.2.1. Abre tu navegador:**
- Ve a: https://dotnet.microsoft.com/download/dotnet/10.0
- O directamente: https://dotnet.microsoft.com/en-us/download

**1.2.2. Busca la versión 10.0:**
- En la página, busca la sección ".NET 10.0"
- Haz clic en "Download .NET SDK" (NO Runtime, necesitas el SDK completo)

**1.2.3. Selecciona macOS:**
- Se abrirá una página con opciones
- Busca "macOS" y selecciona:
  - **Si tienes Mac con chip Apple Silicon (M1/M2/M3/M4)**: Selecciona "macOS Arm64"
  - **Si tienes Mac con chip Intel**: Selecciona "macOS x64"

**1.2.4. Verifica tu tipo de Mac:**
- Haz clic en el logo de Apple (arriba izquierda) �� "Acerca de este Mac"
- Si dice "Chip Apple" o "Apple Silicon" �� Descarga "macOS Arm64"
- Si dice "Procesador Intel" �� Descarga "macOS x64"

**1.2.5. Descarga el instalador:**
- Haz clic en el botón de descarga
- Se descargará un archivo `.pkg` (ej: `dotnet-sdk-10.0.101-osx-arm64.pkg`)
- La descarga puede tardar unos minutos

#### 1.3. Instalar .NET SDK:

**1.3.1. Abre el archivo descargado:**
- Ve a la carpeta "Descargas" (Downloads)
- Haz doble clic en el archivo `.pkg` descargado

**1.3.2. Sigue el asistente de instalación:**
- Se abrirá una ventana de instalación
- Haz clic en "Continuar"
- Lee y acepta los términos de licencia
- Haz clic en "Aceptar"
- Selecciona la ubicación de instalación (deja la predeterminada)
- Haz clic en "Instalar"
- Puede pedirte tu contraseña de administrador
- Ingresa tu contraseña y haz clic en "Instalar software"
- Espera a que termine la instalación (1-2 minutos)

**1.3.3. Verifica la instalación:**
- Abre la Terminal nuevamente
- Ejecuta:
```bash
dotnet --version
```
- Deber�as ver: `10.0.101` (o la versión que descargaste)

**1.3.4. Verifica que el SDK está instalado:**
```bash
dotnet --list-sdks
```
- Deber�as ver algo como:
```
10.0.101 [/usr/local/share/dotnet/sdk]
```

#### 1.4. (Opcional) Configurar variables de entorno:

**Normalmente no es necesario**, pero si tienes problemas:

**1.4.1. Abre el archivo de configuración:**
```bash
nano ~/.zshrc
```
(Si usas bash en lugar de zsh, usa `~/.bash_profile`)

**1.4.2. Agrega estas l�neas (si no están):**
```bash
export DOTNET_ROOT=/usr/local/share/dotnet
export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools
```

**1.4.3. Guarda y cierra:**
- Presiona `Ctrl + X`
- Presiona `Y` para confirmar
- Presiona `Enter` para guardar

**1.4.4. Recarga la configuración:**
```bash
source ~/.zshrc
```

---

### PASO 2: Instalar Rider (IDE para Mac)

#### 2.1. Descargar Rider:

**2.1.1. Abre tu navegador:**
- Ve a: https://www.jetbrains.com/rider/download/
- O busca "JetBrains Rider download" en Google

**2.1.2. Selecciona macOS:**
- En la página de descarga, deber�a detectar automáticamente macOS
- Si no, selecciona "macOS" manualmente

**2.1.3. Descarga:**
- Haz clic en "Download" (descarga la versión más reciente)
- Se descargará un archivo `.dmg` (ej: `Rider-2024.1.dmg`)
- La descarga puede tardar varios minutos (el archivo es grande, ~800MB)

#### 2.2. Instalar Rider:

**2.2.1. Abre el archivo .dmg:**
- Ve a la carpeta "Descargas"
- Haz doble clic en el archivo `.dmg` descargado
- Se abrirá una ventana con el icono de Rider

**2.2.2. Arrastra Rider a Aplicaciones:**
- Arrastra el icono de Rider a la carpeta "Aplicaciones"
- Espera a que termine la copia

**2.2.3. Abre Rider:**
- Ve a Aplicaciones
- Busca "Rider" y haz doble clic
- La primera vez puede tardar en abrirse

**2.2.4. Configurar licencia:**
- La primera vez te pedirá una licencia
- **Opciones:**
  - **Prueba gratuita**: 30 d�as gratis
  - **Estudiante**: Si eres estudiante, puedes obtener licencia gratuita
  - **Comprar**: Si quieres la versión completa
- Selecciona tu opción y continúa

**2.2.5. Configuración inicial:**
- Rider te preguntará sobre temas, plugins, etc.
- Puedes dejar las opciones predeterminadas
- Haz clic en "Next" hasta terminar

#### 2.3. Configurar Rider para .NET:

**2.3.1. Abre Rider:**
- Si no está abierto, ábrelo desde Aplicaciones

**2.3.2. Verifica que Rider detecta .NET:**
- Ve a: **Rider** �� **Preferences** (o `Cmd + ,`)
- En el menú izquierdo, busca "Build, Execution, Deployment" �� "Toolchains"
- Deber�as ver ".NET" listado
- Si ves la versión 10.0.101, está configurado correctamente

**2.3.3. Si no detecta .NET:**
- En la misma ventana, haz clic en el botón "+" (agregar)
- Selecciona "Add .NET SDK"
- Rider deber�a detectar automáticamente el SDK instalado
- Si no, navega manualmente a: `/usr/local/share/dotnet`
- Haz clic en "OK"

**2.3.4. Abre el proyecto:**
- En Rider, ve a: **File** �� **Open**
- Navega a: `/Users/wallfacer/Documents/AdministracionFlotillas`
- Selecciona el archivo `AdministracionFlotillas.slnx`
- Haz clic en "Open"
- Rider cargará el proyecto y deber�a detectar automáticamente .NET 10.0

---

### PASO 3: Instalar DataGrip (Herramienta de Base de Datos)

#### 3.1. Descargar DataGrip:

**3.1.1. Abre tu navegador:**
- Ve a: https://www.jetbrains.com/datagrip/download/
- O busca "JetBrains DataGrip download" en Google

**3.1.2. Selecciona macOS:**
- Deber�a detectar automáticamente macOS
- Haz clic en "Download"

**3.1.3. Descarga:**
- Se descargará un archivo `.dmg`
- La descarga puede tardar varios minutos

#### 3.2. Instalar DataGrip:

**3.2.1. Abre el archivo .dmg:**
- Ve a "Descargas"
- Haz doble clic en el archivo `.dmg` descargado

**3.2.2. Arrastra a Aplicaciones:**
- Arrastra DataGrip a la carpeta "Aplicaciones"

**3.2.3. Abre DataGrip:**
- Ve a Aplicaciones �� DataGrip
- Configura la licencia (similar a Rider)

**3.2.4. Configuración inicial:**
- DataGrip te preguntará sobre preferencias
- Puedes dejar las opciones predeterminadas

---

## INSTALACI�N EN WINDOWS

### PASO 1: Instalar .NET SDK 10.0.101

#### 1.1. Verificar si ya está instalado:

**Abre PowerShell o CMD:**
- Presiona `Win + X` y selecciona "Windows PowerShell"
- O presiona `Win + R`, escribe `powershell` y presiona Enter

**Ejecuta:**
```powershell
dotnet --version
```

**Si muestra `10.0.101` o superior:**
-  Ya está instalado, salta al PASO 2

**Si muestra error o versión diferente:**
- Continúa con la instalación

#### 1.2. Descargar .NET SDK:

**1.2.1. Abre tu navegador:**
- Ve a: https://dotnet.microsoft.com/download/dotnet/10.0
- O directamente: https://dotnet.microsoft.com/en-us/download

**1.2.2. Busca la versión 10.0:**
- En la página, busca la sección ".NET 10.0"
- Haz clic en "Download .NET SDK" (NO Runtime, necesitas el SDK completo)

**1.2.3. Selecciona Windows:**
- Se abrirá una página con opciones
- Selecciona "Windows x64" (para la mayor�a de computadoras Windows)
- Si tienes Windows de 32 bits (poco común), selecciona "Windows x86"

**1.2.4. Descarga el instalador:**
- Haz clic en el botón de descarga
- Se descargará un archivo `.exe` (ej: `dotnet-sdk-10.0.101-win-x64.exe`)
- La descarga puede tardar unos minutos

#### 1.3. Instalar .NET SDK:

**1.3.1. Abre el archivo descargado:**
- Ve a la carpeta "Descargas" (Downloads)
- Haz doble clic en el archivo `.exe` descargado

**1.3.2. Sigue el asistente de instalación:**
- Se abrirá una ventana de instalación
- Haz clic en "Next" (Siguiente)
- Lee y acepta los términos de licencia
- Marca la casilla "I agree" y haz clic en "Next"
- Selecciona la ubicación de instalación (deja la predeterminada: `C:\Program Files\dotnet`)
- Haz clic en "Next"
- Haz clic en "Install" (Instalar)
- Puede pedirte permisos de administrador
- Haz clic en "Yes" si aparece el diálogo de Control de cuentas de usuario (UAC)
- Espera a que termine la instalación (1-2 minutos)

**1.3.3. Verifica la instalación:**
- Abre PowerShell nuevamente (ciérralo y ábrelo de nuevo para que cargue las variables de entorno)
- Ejecuta:
```powershell
dotnet --version
```
- Deber�as ver: `10.0.101` (o la versión que descargaste)

**1.3.4. Verifica que el SDK está instalado:**
```powershell
dotnet --list-sdks
```
- Deber�as ver algo como:
```
10.0.101 [C:\Program Files\dotnet\sdk]
```

#### 1.4. (Opcional) Verificar variables de entorno:

**Normalmente Windows las configura automáticamente**, pero puedes verificar:

**1.4.1. Abre las variables de entorno:**
- Presiona `Win + R`
- Escribe `sysdm.cpl` y presiona Enter
- Ve a la pestaña "Opciones avanzadas"
- Haz clic en "Variables de entorno"

**1.4.2. Verifica que existe:**
- En "Variables del sistema", busca "Path"
- Deber�a incluir: `C:\Program Files\dotnet`
- Si no está, agrégalo manualmente

---

### PASO 2: Instalar VS Code (IDE para Windows)

#### 2.1. Descargar VS Code:

**2.1.1. Abre tu navegador:**
- Ve a: https://code.visualstudio.com/
- O busca "Visual Studio Code download" en Google

**2.1.2. Descarga para Windows:**
- En la página principal, haz clic en el botón grande "Download for Windows"
- Se descargará un archivo `.exe` (ej: `VSCodeUserSetup-x64-1.85.0.exe`)
- La descarga es rápida (~100MB)

#### 2.2. Instalar VS Code:

**2.2.1. Abre el archivo descargado:**
- Ve a la carpeta "Descargas"
- Haz clic derecho en el archivo `.exe` �� "Ejecutar como administrador"
- O simplemente haz doble clic

**2.2.2. Sigue el asistente de instalación:**
- Se abrirá una ventana de instalación
- Lee y acepta el acuerdo de licencia
- Haz clic en "Next"
- Selecciona la ubicación de instalación (deja la predeterminada)
- Haz clic en "Next"
- **Opciones de instalación:**
  - Marca "Add to PATH" (agregar al PATH)
  - Marca "Create a desktop icon" (crear icono en escritorio)
  - Marca "Register Code as an editor for supported file types"
- Haz clic en "Next"
- Haz clic en "Install" (Instalar)
- Espera a que termine (30 segundos - 1 minuto)

**2.2.3. Abre VS Code:**
- Al finalizar, marca "Launch Visual Studio Code" si está disponible
- O busca "Visual Studio Code" en el menú Inicio y ábrelo

#### 2.3. Instalar Extensión C# para VS Code:

**2.3.1. Abre VS Code:**
- Si no está abierto, ábrelo

**2.3.2. Abre el panel de extensiones:**
- Presiona `Ctrl + Shift + X`
- O haz clic en el icono de extensiones en la barra lateral izquierda (cuadrados apilados)

**2.3.3. Busca la extensión C#:**
- En el cuadro de búsqueda, escribe: `C#`
- Busca la extensión oficial: **"C#"** de **Microsoft**
- Deber�a ser la primera opción con el logo de Microsoft

**2.3.4. Instala la extensión:**
- Haz clic en el botón "Install" (Instalar)
- La instalación puede tardar 1-2 minutos
- VS Code puede pedirte reiniciar, haz clic en "Reload" si aparece

**2.3.5. Verifica la instalación:**
- Después de instalar, deber�as ver "Installed" en lugar de "Install"
- Cierra y vuelve a abrir VS Code para asegurar que todo está cargado

#### 2.4. Configurar VS Code para .NET:

**2.4.1. Abre VS Code:**
- Si no está abierto, ábrelo

**2.4.2. Abre el proyecto:**
- Ve a: **File** �� **Open Folder...**
- Navega a: `C:\Users\TU_USUARIO\Documents\AdministracionFlotillas`
- (Ajusta la ruta según donde tengas el proyecto)
- Haz clic en "Select Folder"

**2.4.3. Verifica que VS Code detecta .NET:**
- Abre la Terminal integrada: `Ctrl + `` (backtick, tecla arriba de Tab)
- O ve a: **Terminal** �� **New Terminal**
- Ejecuta:
```powershell
dotnet --version
```
- Deber�as ver: `10.0.101`

**2.4.4. (Opcional) Configurar terminal predeterminada:**
- VS Code puede usar PowerShell o CMD
- Para cambiar: **Terminal** �� **Select Default Profile**
- Selecciona "PowerShell" (recomendado)

---

### PASO 3: (Opcional) Instalar DataGrip o SQL Developer para Windows

#### Opción A: DataGrip (Recomendado - Misma herramienta que Mac)

**3.1. Descargar DataGrip:**
- Ve a: https://www.jetbrains.com/datagrip/download/
- Selecciona "Windows"
- Descarga el instalador `.exe`

**3.2. Instalar:**
- Ejecuta el instalador
- Sigue el asistente (similar a Rider)
- Configura la licencia

#### Opción B: SQL Developer (Alternativa gratuita)

**3.1. Descargar SQL Developer:**
- Ve a: https://www.oracle.com/database/technologies/appdev/sqldev.html
- Descarga la versión para Windows
- Es un archivo ZIP (no requiere instalación)

**3.2. Extraer y usar:**
- Extrae el ZIP a una carpeta (ej: `C:\Oracle\sqldeveloper`)
- Ejecuta `sqldeveloper.exe` desde esa carpeta

---

## Verificación Final

### Para Mac:

**Abre la Terminal y ejecuta:**
```bash
# Verificar .NET
dotnet --version
# Debe mostrar: 10.0.101

dotnet --list-sdks
# Debe mostrar el SDK instalado

# Verificar Rider
# Abre Rider y verifica que detecta .NET en Preferences
```

### Para Windows:

**Abre PowerShell y ejecuta:**
```powershell
# Verificar .NET
dotnet --version
# Debe mostrar: 10.0.101

dotnet --list-sdks
# Debe mostrar el SDK instalado

# Verificar VS Code
# Abre VS Code y verifica que la extensión C# está instalada
```

---

## Solución de Problemas

### Problema: "dotnet: command not found" (Mac)

**Solución:**
1. Verifica que .NET está instalado:
```bash
ls /usr/local/share/dotnet
```
2. Si existe, agrega al PATH (ver paso 1.4)
3. Reinicia la Terminal

### Problema: "dotnet is not recognized" (Windows)

**Solución:**
1. Verifica que .NET está instalado:
```powershell
Test-Path "C:\Program Files\dotnet\dotnet.exe"
```
2. Si existe, verifica variables de entorno (ver paso 1.4)
3. Reinicia PowerShell

### Problema: Rider no detecta .NET (Mac)

**Solución:**
1. Ve a: Rider �� Preferences �� Toolchains
2. Haz clic en "+" �� "Add .NET SDK"
3. Navega a: `/usr/local/share/dotnet`
4. Selecciona y haz clic en "OK"

### Problema: VS Code no detecta .NET (Windows)

**Solución:**
1. Verifica que la extensión C# está instalada
2. Abre la Terminal integrada en VS Code
3. Ejecuta `dotnet --version` para verificar
4. Si no funciona, reinicia VS Code

---

## Recursos Adicionales

- **Documentación oficial de .NET**: https://learn.microsoft.com/dotnet/
- **Rider Documentation**: https://www.jetbrains.com/help/rider/
- **VS Code C# Extension**: https://code.visualstudio.com/docs/languages/csharp
- **DataGrip Documentation**: https://www.jetbrains.com/help/datagrip/

---

**�ltima actualización**: Enero 2026

