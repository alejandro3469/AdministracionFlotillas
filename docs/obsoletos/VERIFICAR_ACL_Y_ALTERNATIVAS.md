# Verificar ACL y Alternativas de Conexión

## 🔍 Diagnóstico Actual

**Error**: `ORA-50000: Connection request timed out`  
**Timeout**: ~60 segundos (coincide con nuestro `Connection Timeout=60`)

Esto indica que:
- ✅ El código está intentando conectar
- ❌ La conexión no se establece (timeout después de 60 segundos)

## ✅ Paso 1: Verificar que el ACL se Configuró Correctamente

### En Oracle Cloud Console:

1. **Ve a tu Autonomous Database** → **Network**
2. **Verifica**:
   - **Access type**: Debe decir `Allow secure access from specified IPs and VCNs`
   - **Access control list**: Debe decir `Enabled`
   - **Values**: Debe mostrar `187.155.152.91` (tu IP)

3. **Si NO está configurado correctamente**:
   - Haz clic en **"Edit"** en "Access control list"
   - Asegúrate de que esté **"Enabled"**
   - Verifica que `187.155.152.91` esté en la lista de **Values**
   - Guarda y espera **2-3 minutos**

### Verificar tu IP Actual:

```bash
curl ifconfig.me
```

**Si tu IP cambió**, agrega la nueva IP al ACL.

## 🔄 Paso 2: Probar con EZConnect (Sin Wallet)

Si el ACL está configurado pero aún no funciona, podemos probar con EZConnect directamente:

### Opción A: EZConnect Completo

Actualiza `appsettings.json`:

```json
"ConnectionStrings": {
  "OracleConnection": "Data Source=(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.mx-queretaro-1.oraclecloud.com))(connect_data=(service_name=gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)));User Id=ADMIN;Password=Leleupi3469;Connection Timeout=60;"
}
```

**Nota**: Esto requiere que el ACL esté configurado, pero no usa el wallet.

### Opción B: Verificar que el Wallet Funciona

El wallet debería funcionar si el ACL está bien. Verifica:

```bash
# Verificar que TNS_ADMIN está configurado
echo $TNS_ADMIN

# Debería mostrar: /Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2
```

## 🔍 Paso 3: Verificar Firewall Local (Mac)

```bash
# Verificar estado del firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Si está activo, puedes agregar una excepción (normalmente no es necesario para conexiones salientes)
```

## 🧪 Paso 4: Probar Conexión con Herramienta Externa

### Con DataGrip:

1. Abre DataGrip
2. Crea nueva conexión Oracle:
   - **Host**: `adb.mx-queretaro-1.oraclecloud.com`
   - **Port**: `1522`
   - **Service Name**: `gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com`
   - **User**: `ADMIN`
   - **Password**: `Leleupi3469`
   - **Advanced** → **TNS_ADMIN**: `/Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2`
3. Haz clic en **"Test Connection"**

**Resultados**:
- ✅ **Si DataGrip funciona**: El problema está en el código de la aplicación
- ❌ **Si DataGrip NO funciona**: El problema es de red/ACL

## 🔄 Paso 5: Alternativa - Usar EZConnect Temporalmente

Si el wallet no funciona, podemos usar EZConnect directamente:

### Actualizar appsettings.json:

```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.mx-queretaro-1.oraclecloud.com))(connect_data=(service_name=gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)));User Id=ADMIN;Password=Leleupi3469;Connection Timeout=60;"
  },
  "OracleSettings": {
    "TnsAdmin": ""
  }
}
```

**Nota**: Esto requiere que el ACL esté configurado correctamente.

## ⚠️ Problemas Comunes

### 1. ACL No se Aplicó

- **Solución**: Espera 2-3 minutos después de guardar
- **Verifica**: Que el ACL esté "Enabled" y tu IP esté en la lista

### 2. IP Cambió

- **Solución**: Obtén tu IP actual: `curl ifconfig.me`
- **Agrega**: La nueva IP al ACL

### 3. Firewall Local

- **Solución**: Normalmente no es necesario, pero verifica el firewall de Mac

### 4. Red/ISP Bloquea Puerto 1522

- **Solución**: Prueba desde otra red (móvil, VPN, etc.)

## 📝 Checklist de Verificación

- [ ] ACL está "Enabled" en Oracle Cloud
- [ ] Tu IP `187.155.152.91` está en la lista de Values
- [ ] Access type es "Allow secure access from specified IPs and VCNs"
- [ ] Esperaste 2-3 minutos después de guardar
- [ ] Verificaste tu IP actual: `curl ifconfig.me`
- [ ] Probaste con DataGrip para aislar el problema

## 🆘 Si Nada Funciona

1. **Verifica en Oracle Cloud Console** que el ACL está correctamente configurado
2. **Prueba con DataGrip** para confirmar que es un problema de red o código
3. **Verifica tu IP actual** (puede haber cambiado)
4. **Contacta soporte de Oracle Cloud** si el ACL está bien pero no funciona
