# Pasos para Encontrar tu Contraseña de Oracle

## 📋 Información de tu Base de Datos
- **Connection String**: `adminflotillas_high`
- **Usuario**: `ADMIN`
- **Tipo**: Oracle Cloud (Autonomous Database)

## 🔍 Opción 1: Desde Oracle Cloud Console (Recomendado)

### Paso 1: Acceder a Oracle Cloud
1. Ve a: https://cloud.oracle.com/
2. Inicia sesión con tu cuenta de Oracle Cloud

### Paso 2: Navegar a tu Base de Datos
1. En el menú principal, busca **"Oracle Database"** o **"Autonomous Database"**
2. Click en **"Autonomous Database"**
3. Busca tu base de datos: **adminflotillas_high**
4. Click en el nombre de la base de datos

### Paso 3: Ver o Resetear Contraseña
1. En la página de detalles, busca la sección **"DB Connection"** o **"Connection"**
2. Click en **"DB Connection"** o **"Service Console"**
3. Ahí verás:
   - **Opción A**: Ver la contraseña actual (si está visible)
   - **Opción B**: Botón **"Reset Password"** o **"Change Password"**

### Paso 4: Resetear Contraseña (si no la encuentras)
1. Click en **"Reset Password"** o **"Change Password"**
2. Ingresa una nueva contraseña (guárdala en un lugar seguro)
3. Confirma la contraseña
4. **IMPORTANTE**: Copia y guarda la nueva contraseña

## 🔍 Opción 2: Desde Wallet File (si tienes el archivo)

### Si tienes el archivo Wallet descargado:
1. Busca archivos con extensión `.zip` que contengan "wallet"
2. El archivo suele llamarse: `Wallet_adminflotillas.zip`
3. Dentro del ZIP, busca el archivo `tnsnames.ora`
4. Abre el archivo con un editor de texto
5. Busca la línea que contiene la contraseña (puede estar enmascarada)

## 🔍 Opción 3: Revisar Documentación o Emails

### Buscar en:
1. **Emails**: Busca en tu email (alejandro.perez3469@gmail.com) términos:
   - "Oracle"
   - "Database"
   - "adminflotillas"
   - "ADMIN password"
   - "Autonomous Database"

2. **Documentos del Proyecto**:
   - Revisa carpetas de documentación
   - Archivos de configuración
   - Notas o archivos de texto

3. **Gestor de Contraseñas**:
   - Si usas 1Password, LastPass, etc.
   - Busca "Oracle" o "adminflotillas"

## 🔍 Opción 4: Si tienes SQL Developer o DBeaver

### SQL Developer:
1. Abre SQL Developer
2. Ve a: **Tools** → **Preferences** → **Database** → **Connections**
3. Busca la conexión "adminflotillas_high"
4. La contraseña puede estar guardada (aunque esté enmascarada)

### DBeaver:
1. Abre DBeaver
2. Ve a: **Database** → **Edit Connection**
3. Selecciona la conexión de Oracle
4. Ve a la pestaña **"Main"** o **"Security"**
5. La contraseña puede estar visible o enmascarada

## 🔧 Opción 5: Resetear desde SQL*Plus (si tienes acceso administrativo)

Si tienes acceso como administrador:

```sql
-- Conectarse como administrador
sqlplus / as sysdba

-- Resetear contraseña del usuario ADMIN
ALTER USER ADMIN IDENTIFIED BY "NuevaContrasena123";

-- Dar permisos necesarios
GRANT CONNECT, RESOURCE TO ADMIN;
```

## ✅ Configurar en el Proyecto

Una vez que tengas la contraseña:

### Archivo: `src/AdministracionFlotillas.Web/appsettings.json`

**Línea 10**, reemplaza:
```json
"OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_PASSWORD;"
```

**Con tu contraseña real**:
```json
"OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TuContrasenaReal123;"
```

## 🔒 Seguridad

### ⚠️ IMPORTANTE:
- **NO** subas el archivo `appsettings.json` con la contraseña real a Git
- Usa `appsettings.Development.json` para desarrollo local
- Para producción, usa:
  - Variables de entorno
  - Azure Key Vault
  - Secretos de configuración

### Crear appsettings.Development.json (Recomendado):

```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_CONTRASENA_DEVELOPMENT;"
  }
}
```

Y asegúrate de que `appsettings.json` tenga un placeholder:
```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=CONFIGURAR_EN_VARIABLES_ENTORNO;"
  }
}
```

## 🧪 Verificar Conexión

Después de configurar:

1. Ejecuta la aplicación:
   ```bash
   dotnet run
   ```

2. Navega a: http://localhost:5000/Orders

3. Si hay error de conexión, revisa:
   - La contraseña es correcta
   - El connection string está bien formado
   - La base de datos está accesible desde tu red
   - El firewall permite la conexión

## 📞 Si No Puedes Encontrar la Contraseña

### Contactar Soporte:
- **Oracle Cloud Support**: Desde la consola de Oracle Cloud
- **Documentación**: https://docs.oracle.com/en/cloud/paas/autonomous-database/
- **Foros**: https://community.oracle.com/

### Resetear desde Oracle Cloud Console:
1. Ve a tu base de datos en Oracle Cloud
2. Click en **"DB Connection"**
3. Click en **"Reset Password"**
4. Establece una nueva contraseña
5. **Guarda la nueva contraseña en un lugar seguro**
