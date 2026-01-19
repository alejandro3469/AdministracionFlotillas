# Solución: Timeout Persistente Después de Configurar ACL

## 🔍 Diagnóstico

**Error**: `ORA-50000: Connection request timed out`  
**Timeout**: ~60 segundos (coincide con `Connection Timeout=60`)

**Posibles causas**:
1. ACL no se aplicó completamente (necesita más tiempo)
2. IP cambió (IPv6 vs IPv4)
3. ACL configurado incorrectamente
4. Problema de red/firewall

## ✅ Verificaciones Inmediatas

### 1. Verificar tu IP Actual

```bash
# IPv4
curl -4 ifconfig.me

# IPv6 (si aplica)
curl -6 ifconfig.me
```

**Importante**: Oracle Cloud ACL necesita la **IPv4**, no IPv6.

### 2. Verificar ACL en Oracle Cloud

En Oracle Cloud Console → Network → Access Control List:

- ✅ **Access type**: `Allow secure access from specified IPs and VCNs`
- ✅ **Access control list**: `Enabled`
- ✅ **Values**: Debe contener tu **IPv4 actual** (ej: `187.155.152.91`)

**Si tu IP cambió**, agrega la nueva IP al ACL.

### 3. Esperar Tiempo de Propagación

Después de guardar el ACL:
- **Tiempo mínimo**: 2-3 minutos
- **Tiempo recomendado**: 5 minutos
- **Si no funciona**: Espera hasta 10 minutos

## 🔄 Alternativa: Probar con EZConnect

Si el wallet no funciona, podemos probar con EZConnect directamente:

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

**Nota**: Esto requiere que el ACL esté configurado correctamente, pero no usa el wallet.

## 🧪 Probar con DataGrip

Para aislar el problema:

1. **Abre DataGrip**
2. **Crea nueva conexión Oracle**:
   - **Host**: `adb.mx-queretaro-1.oraclecloud.com`
   - **Port**: `1522`
   - **Service Name**: `gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com`
   - **User**: `ADMIN`
   - **Password**: `Leleupi3469`
   - **Advanced** → **TNS_ADMIN**: `/Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2`
3. **Haz clic en "Test Connection"**

**Resultados**:
- ✅ **Si DataGrip funciona**: El problema está en el código de la aplicación
- ❌ **Si DataGrip NO funciona**: El problema es de red/ACL

## 🔍 Verificar Configuración del Wallet

```bash
# Verificar que los archivos existen
ls -la /Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2/

# Verificar que tnsnames.ora tiene el alias
grep "adminflotillas_high" /Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2/tnsnames.ora

# Verificar que TNS_ADMIN está configurado (en la app)
# Esto se hace en Program.cs, no en la terminal
```

## ⚠️ Problemas Comunes

### 1. ACL No se Aplicó

**Síntomas**: Timeout después de configurar ACL

**Soluciones**:
- Espera 5-10 minutos después de guardar
- Verifica que el ACL esté "Enabled" y tu IP esté en la lista
- Verifica que Access type sea "Allow secure access from specified IPs and VCNs"

### 2. IP Cambió o es IPv6

**Síntomas**: ACL configurado pero timeout persiste

**Soluciones**:
- Obtén tu IPv4 actual: `curl -4 ifconfig.me`
- Agrega la nueva IP al ACL
- **Importante**: Oracle Cloud ACL necesita IPv4, no IPv6

### 3. Firewall Local

**Síntomas**: Timeout incluso con ACL configurado

**Verificación**:
```bash
# Verificar estado del firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

**Normalmente no es necesario** para conexiones salientes, pero verifica.

### 4. Red/ISP Bloquea Puerto 1522

**Síntomas**: Timeout desde ciertas redes

**Soluciones**:
- Prueba desde otra red (móvil, VPN, etc.)
- Contacta a tu ISP si es necesario

## 📝 Checklist de Verificación

- [ ] ACL está "Enabled" en Oracle Cloud
- [ ] Tu **IPv4** está en la lista de Values (no IPv6)
- [ ] Access type es "Allow secure access from specified IPs and VCNs"
- [ ] Esperaste 5-10 minutos después de guardar
- [ ] Verificaste tu IPv4 actual: `curl -4 ifconfig.me`
- [ ] Probaste con DataGrip para aislar el problema
- [ ] Verificaste que el wallet existe y tiene los archivos correctos

## 🆘 Si Nada Funciona

1. **Verifica en Oracle Cloud Console**:
   - Network → Access Control List
   - Que esté "Enabled"
   - Que tu IPv4 esté en la lista
   - Que Access type sea correcto

2. **Prueba con DataGrip**:
   - Si DataGrip funciona → problema en el código
   - Si DataGrip no funciona → problema de red/ACL

3. **Prueba con EZConnect**:
   - Actualiza `appsettings.json` con el formato EZConnect completo
   - Esto evita el wallet pero requiere ACL

4. **Contacta soporte de Oracle Cloud**:
   - Si el ACL está bien configurado pero no funciona
   - Puede haber un problema del lado de Oracle

## 🔄 Próximos Pasos

1. **Verifica tu IPv4 actual**: `curl -4 ifconfig.me`
2. **Verifica el ACL en Oracle Cloud** (que tu IPv4 esté en la lista)
3. **Espera 5-10 minutos** después de cualquier cambio
4. **Prueba con DataGrip** para aislar el problema
5. **Si DataGrip funciona**, el problema está en el código
6. **Si DataGrip no funciona**, el problema es de red/ACL
