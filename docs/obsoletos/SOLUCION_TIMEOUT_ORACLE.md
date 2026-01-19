# Solución: ORA-50000 Connection Request Timed Out

## 🔍 Diagnóstico

El error `ORA-50000: Connection request timed out` indica que:
- ✅ El wallet está configurado correctamente (ya no hay error de TNS_ADMIN)
- ❌ La conexión no puede establecerse (timeout)

## 🔧 Causas Comunes

### 1. Access Control List (ACL) en Oracle Cloud

**Oracle Cloud bloquea conexiones por defecto**. Necesitas agregar tu IP a la lista blanca.

### 2. Firewall Local

Tu firewall o red puede estar bloqueando el puerto `1522`.

### 3. Red/ISP

Algunos ISPs bloquean puertos no estándar.

## ✅ Solución Paso a Paso

### Paso 1: Configurar Access Control List en Oracle Cloud

**Tu IP Pública**: `187.155.152.91` (Mérida, Yucatán, México)

1. **Accede a Oracle Cloud Console**:
   - Ve a: https://cloud.oracle.com/
   - Inicia sesión con tu cuenta

2. **Navega a tu Autonomous Database**:
   - Menu → **Oracle Database** → **Autonomous Database**
   - Selecciona: `ADMINFLOTILLAS`

3. **Abre Network Access**:
   - En el menú lateral, haz clic en **"Network"**
   - O busca **"Access Control List"**

4. **Agrega tu IP**:
   - Haz clic en **"Add Access Control Rule"** o **"Edit Access Control List"**
   - **Configuración**:
     - **Source Type**: `IP Address` o `IP Address/CIDR`
     - **Source**: `187.155.152.91` (o `187.155.152.91/32` si requiere CIDR)
     - **Description**: `Desarrollo Local - Mac - Mérida, Yucatán`
   - **Opción Alternativa - Permitir Todo** (Solo para pruebas, ⚠️ NO usar en producción):
     - **Source Type**: `IP Address/CIDR`
     - **Source**: `0.0.0.0/0`
     - **Description**: `TEMPORAL - Permitir todas las IPs`

5. **Guardar**:
   - Haz clic en **"Save"** o **"Update"**
   - Espera 1-2 minutos para que se aplique

**Ver guía detallada**: `CONFIGURAR_ACL_ORACLE_CLOUD.md`

### Paso 2: Verificar Firewall Local (Mac)

```bash
# Verificar si el puerto 1522 está bloqueado
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Si está activo, puedes agregar una excepción temporal
# (Normalmente no es necesario para conexiones salientes)
```

### Paso 3: Probar Conexión con Timeout Aumentado

Ya configuramos `Connection Timeout=60` en `appsettings.json`.

**Reinicia la aplicación**:
```bash
# Detén la app (Ctrl+C)
dotnet run
```

### Paso 4: Verificar con Herramienta Externa

**Opción A - DataGrip**:
1. Abre DataGrip
2. Crea nueva conexión Oracle
3. Configura:
   - **Host**: `adb.mx-queretaro-1.oraclecloud.com`
   - **Port**: `1522`
   - **Service Name**: `gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com`
   - **User**: `ADMIN`
   - **Password**: `Leleupi3469`
   - **Advanced** → **TNS_ADMIN**: `/Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2`
4. Haz clic en **"Test Connection"**

**Si DataGrip funciona pero la app no**:
- El problema está en el código de la aplicación
- Revisa los logs del servidor

**Si DataGrip tampoco funciona**:
- El problema es de red/ACL
- Verifica el Access Control List en Oracle Cloud

## 🔍 Verificación Adicional

### Verificar que el Wallet Funciona

```bash
# Verificar que los archivos del wallet existen
ls -la /Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2/

# Verificar que tnsnames.ora tiene el alias
grep "adminflotillas_high" /Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2/tnsnames.ora
```

### Verificar Variables de Entorno

La aplicación debe configurar `TNS_ADMIN` en `Program.cs`:
```csharp
Environment.SetEnvironmentVariable("TNS_ADMIN", tnsAdmin);
```

### Probar Conexión Directa (sin wallet)

Si el ACL está configurado, puedes probar con EZConnect:

```json
"OracleConnection": "Data Source=(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.mx-queretaro-1.oraclecloud.com))(connect_data=(service_name=gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)));User Id=ADMIN;Password=Leleupi3469;Connection Timeout=60;"
```

## 📝 Configuración Actual

**appsettings.json**:
```json
"ConnectionStrings": {
  "OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=Leleupi3469;Connection Timeout=60;"
},
"OracleSettings": {
  "TnsAdmin": "/Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2"
}
```

**Program.cs**:
```csharp
// Configurar TNS_ADMIN para Oracle Wallet (ANTES de cualquier conexión)
var tnsAdmin = builder.Configuration["OracleSettings:TnsAdmin"];
if (!string.IsNullOrEmpty(tnsAdmin))
{
    Environment.SetEnvironmentVariable("TNS_ADMIN", tnsAdmin);
}
```

## ⚠️ Importante

1. **Access Control List es OBLIGATORIO**:
   - Oracle Cloud bloquea todas las conexiones por defecto
   - Debes agregar tu IP a la lista blanca

2. **IP Dinámica**:
   - Si tu IP cambia (redes diferentes, VPN, etc.), debes actualizar el ACL

3. **Seguridad**:
   - ⚠️ NO uses `0.0.0.0/0` en producción
   - Solo agrega IPs específicas que necesites

## 🧪 Próximos Pasos

1. ✅ Configura Access Control List en Oracle Cloud
2. ✅ Agrega tu IP pública actual
3. ✅ Espera 1-2 minutos
4. ✅ Reinicia la aplicación
5. ✅ Prueba la conexión

## 📞 Si Aún No Funciona

1. **Verifica los logs del servidor** para ver el error exacto
2. **Prueba con DataGrip** para aislar el problema
3. **Verifica tu IP pública** (puede haber cambiado)
4. **Revisa Oracle Cloud Console** → **Network** → **Access Control List**
