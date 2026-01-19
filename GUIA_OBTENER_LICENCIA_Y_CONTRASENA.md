# Guía Paso a Paso: Obtener Licencia Syncfusion y Contraseña Oracle

## PARTE 1: OBTENER TU LICENCIA DE SYNCFUSION

### Opción A: Si ya tienes cuenta en Syncfusion

1. **Ir a tu cuenta de Syncfusion**:
   - Visita: https://www.syncfusion.com/account/manage-license-keys
   - O ve a: https://www.syncfusion.com/account/login
   - Inicia sesión con tu email y contraseña

2. **Navegar a "License & Downloads"**:
   - Una vez dentro, busca la sección "License & Downloads"
   - O "Trials & Downloads" si aún estás en período de prueba

3. **Generar o Ver tu License Key**:
   - Busca la opción "Claim License Key" o "Generate License Key"
   - Selecciona la plataforma: **ASP.NET Core EJ2**
   - Copia la clave de licencia (es una cadena larga de texto)

4. **Si tienes Community License aprobada**:
   - La clave será **permanente** (sin fecha de expiración)
   - Estará en la sección "Active License"
   - Copia toda la cadena de texto

### Opción B: Si NO tienes cuenta o no encuentras la licencia

1. **Revisar tu email**:
   - Busca en tu bandeja de entrada emails de Syncfusion
   - Busca términos: "Syncfusion", "License", "Community License", "Trial"
   - Revisa también la carpeta de SPAM

2. **Si recibiste email de aprobación**:
   - El email contiene la clave de licencia permanente
   - Busca una sección que diga "License Key" o "Your License Key"
   - Copia toda la cadena de texto

3. **Si solo tienes clave de prueba (7 días)**:
   - Puedes usarla temporalmente
   - Luego solicita la Community License permanente en:
     https://www.syncfusion.com/products/communitylicense

### Opción C: Solicitar nueva licencia (si no tienes ninguna)

1. **Ir a la página de Community License**:
   - Visita: https://www.syncfusion.com/products/communitylicense
   - O: https://www.syncfusion.com/downloads/communitylicense

2. **Completar el formulario**:
   - Nombre completo
   - Email corporativo
   - Nombre de la organización
   - Información sobre ingresos anuales (< $1M USD)
   - Número de desarrolladores (< 5)
   - Número total de empleados (< 10)

3. **Recibirás**:
   - Email inmediato con clave de prueba de 7 días
   - Después de 48 horas hábiles: Community License permanente

---

## PARTE 2: ENCONTRAR TU CONTRASEÑA DE ORACLE

### Opción A: Si tienes acceso a Oracle Cloud Console

1. **Ir a Oracle Cloud Console**:
   - Visita: https://cloud.oracle.com/
   - Inicia sesión con tu cuenta

2. **Navegar a Database**:
   - Menú principal → "Oracle Database" → "Autonomous Database"
   - O busca "Database" en el menú

3. **Ver detalles de tu base de datos**:
   - Selecciona tu base de datos (adminflotillas_high)
   - Ve a "DB Connection" o "Connection Strings"
   - Ahí verás la contraseña o podrás resetearla

### Opción B: Si tienes el archivo Wallet o TNS

1. **Buscar archivo wallet**:
   - Busca archivos con extensión `.p12`, `.pem`, o carpeta `wallet`
   - Estos archivos suelen contener información de conexión

2. **Revisar archivos de configuración**:
   - Busca archivos `tnsnames.ora` o `sqlnet.ora`
   - Pueden estar en tu carpeta de descargas o documentos

### Opción C: Si tienes acceso a SQL Developer o DBeaver

1. **Abrir SQL Developer o DBeaver**:
   - Si ya tienes una conexión guardada, puedes ver la contraseña
   - En SQL Developer: Tools → Preferences → Database → Connections
   - En DBeaver: Database → Edit Connection → ver contraseña (puede estar enmascarada)

### Opción D: Si tienes documentación o notas

1. **Buscar en tus documentos**:
   - Busca archivos de texto, Word, o notas con información de Oracle
   - Revisa emails relacionados con la configuración de Oracle
   - Busca en tu gestor de contraseñas (si usas uno)

### Opción E: Resetear la contraseña (si tienes acceso administrativo)

1. **Desde Oracle Cloud Console**:
   - Ve a tu base de datos
   - Opción "Reset Password" o "Change Password"
   - Establece una nueva contraseña
   - **IMPORTANTE**: Guarda la nueva contraseña en un lugar seguro

2. **Desde SQL*Plus (si tienes acceso)**:
   ```sql
   ALTER USER ADMIN IDENTIFIED BY "NuevaContrasena123";
   ```

### Opción F: Si usas Oracle XE local

1. **Contraseña por defecto**:
   - Si es instalación nueva: puede ser la que configuraste durante la instalación
   - Usuario común: `SYSTEM` o `SYS`
   - Revisa la documentación de instalación

2. **Resetear desde terminal**:
   ```bash
   sqlplus / as sysdba
   ALTER USER ADMIN IDENTIFIED BY "NuevaContrasena123";
   ```

---

## PASO 3: CONFIGURAR EN EL PROYECTO

Una vez que tengas ambos valores:

### 1. Configurar Licencia de Syncfusion

**Archivo**: `src/AdministracionFlotillas.Web/Program.cs`

**Línea 24**, reemplaza:
```csharp
SyncfusionLicenseProvider.RegisterLicense("TU_LICENCIA_PERMANENTE_AQUI");
```

**Con tu licencia real**:
```csharp
SyncfusionLicenseProvider.RegisterLicense("TU_LICENCIA_REAL_AQUI_COPIADA_DEL_EMAIL_O_CUENTA");
```

### 2. Configurar Contraseña de Oracle

**Archivo**: `src/AdministracionFlotillas.Web/appsettings.json`

**Línea 10**, reemplaza:
```json
"OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_PASSWORD;"
```

**Con tu contraseña real**:
```json
"OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TuContrasenaReal123;"
```

---

## VERIFICACIÓN

### Verificar Licencia Syncfusion

1. Ejecuta la aplicación:
   ```bash
   dotnet run
   ```

2. Navega a: http://localhost:5000/Orders

3. Si ves componentes Syncfusion funcionando sin mensajes de "trial", la licencia está correcta.

### Verificar Conexión Oracle

1. La aplicación intentará conectarse cuando cargues la página de Orders
2. Si hay error de conexión, revisa:
   - La contraseña es correcta
   - El connection string está bien formado
   - La base de datos está accesible desde tu red

---

## TIPS IMPORTANTES

### Seguridad

- ⚠️ **NO** subas estos archivos a Git con las credenciales reales
- ⚠️ Usa `appsettings.Development.json` para desarrollo local
- ⚠️ Usa variables de entorno o Azure Key Vault para producción

### Si no encuentras la contraseña

- Contacta al administrador de la base de datos
- Revisa documentación del proyecto
- Si es Oracle Cloud, puedes resetearla desde la consola

### Si no encuentras la licencia

- Revisa todos tus emails (incluyendo spam)
- Contacta soporte de Syncfusion con tu número de ticket
- Puedes solicitar una nueva Community License si cumples requisitos

---

## CONTACTO DE SOPORTE

### Syncfusion
- Email: support@syncfusion.com
- Portal: https://www.syncfusion.com/support

### Oracle
- Oracle Cloud Support: Desde la consola de Oracle Cloud
- Documentación: https://docs.oracle.com/
