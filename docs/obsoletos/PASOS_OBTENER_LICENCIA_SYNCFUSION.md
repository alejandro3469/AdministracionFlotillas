# Pasos para Obtener tu License Key de Syncfusion

## ✅ Estado Actual
- **Trial Activo**: ASP.NET Core (Essential JS 2)
- **Válido hasta**: Febrero 16, 2026 (31 días restantes)
- **Versión**: 32.1.19

## 📋 Pasos para Obtener tu License Key

### Paso 1: Ir a tu cuenta de Syncfusion
1. Abre tu navegador
2. Ve a: https://www.syncfusion.com/account/login
3. Inicia sesión con tu email: alejandro.perez3469@gmail.com

### Paso 2: Navegar a "Trial Downloads and Unlock Keys"
1. Una vez dentro de tu cuenta, busca en el menú:
   - **"License & Downloads"** → **"Manage Trials"** → **"Trial Downloads and Unlock Keys"**
   - O directamente: https://www.syncfusion.com/account/manage-trials/trial-downloads

### Paso 3: Encontrar tu Trial de ASP.NET Core
1. Busca la sección: **"ASP.NET Core (Essential JS 2) - Trial License Valid Until February 16, 2026"**
2. Verás varios botones:
   - **"Get License Key"** ← **ESTE ES EL QUE NECESITAS**
   - Get Unlock Key
   - Security Management Report
   - More Download Options

### Paso 4: Obtener la License Key
1. **Click en "Get License Key"**
2. Se abrirá un modal o página con tu License Key
3. **Copia TODA la cadena de texto** (es una cadena larga de caracteres alfanuméricos)
4. La clave se verá algo así: `NTE3ODAzQDMxMzcyZTM0MmUzMEF...` (mucho más larga)

### Paso 5: Pegar en Program.cs
1. Abre el archivo: `src/AdministracionFlotillas.Web/Program.cs`
2. En la línea 28, reemplaza `"TU_LICENCIA_AQUI"` con tu clave real
3. Debe quedar así:
   ```csharp
   SyncfusionLicenseProvider.RegisterLicense("TU_CLAVE_REAL_AQUI_COPIADA");
   ```

## ⚠️ Importante

### Sobre el Trial
- Esta es una **clave de TRIAL** (prueba) válida por 31 días más
- Funciona perfectamente para desarrollo y pruebas
- Después del 16 de febrero de 2026, necesitarás una licencia permanente

### Para Obtener Licencia Permanente (Community License)
1. Ve a: https://www.syncfusion.com/products/communitylicense
2. Completa el formulario
3. Si cumples requisitos (ingresos < $1M, < 5 desarrolladores, < 10 empleados)
4. Recibirás una licencia **PERMANENTE** y gratuita

## 🔍 Si No Encuentras el Botón "Get License Key"

### Alternativa 1: Desde "License & Downloads"
1. Ve a: https://www.syncfusion.com/account/manage-license-keys
2. Busca la sección de "Active Trials"
3. Click en "Claim License Key" o "Generate License Key"
4. Selecciona plataforma: **ASP.NET Core EJ2**

### Alternativa 2: Revisar Email
1. Busca en tu email: alejandro.perez3469@gmail.com
2. Busca emails de Syncfusion con asunto: "License Key" o "Trial"
3. La clave puede estar en el email de confirmación del trial

## ✅ Verificación

Después de configurar la licencia:

1. Ejecuta la aplicación:
   ```bash
   dotnet run
   ```

2. Navega a: http://localhost:5000/Orders

3. Si los componentes Syncfusion funcionan sin errores, la licencia está correcta.

## 📞 Si Tienes Problemas

- **Soporte Syncfusion**: support@syncfusion.com
- **Chat en vivo**: Disponible en su sitio web (3:00 AM - 9:00 PM UTC, Lunes-Viernes)
- **Foro**: https://www.syncfusion.com/forums
