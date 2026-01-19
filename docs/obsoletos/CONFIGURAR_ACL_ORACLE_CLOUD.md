# Configurar Access Control List en Oracle Cloud

## 📋 Tu Información

**Tu IP Pública**: `187.155.152.91`  
**Ubicación**: Mérida, Yucatán, México  
**ISP**: Uninet

## 🎯 Pasos para Configurar ACL

### Paso 1: Navegar a Network Access

1. En Oracle Cloud Console, asegúrate de estar en tu Autonomous Database:
   - **Nombre**: `ADMINFLOTILLAS`
   - **Tipo**: Autonomous AI Database

2. En el menú lateral izquierdo, busca y haz clic en:
   - **"Network"** o
   - **"Access Control List"** o
   - **"Network Access"**

### Paso 2: Agregar Regla de Acceso

1. Haz clic en el botón:
   - **"Add Access Control Rule"** o
   - **"Edit Access Control List"** o
   - **"Manage Access Control List"**

2. Si ves una lista de reglas existentes, haz clic en **"Add Another Access Control Rule"**

### Paso 3: Configurar la Regla

**Configuración**:
- **Source Type**: Selecciona `IP Address` o `IP Address/CIDR`
- **Source**: Ingresa `187.155.152.91`
- **Description**: `Desarrollo Local - Mac - Mérida, Yucatán`
- **Access Type**: `Allow` (si hay opción)

**Formato alternativo (si pide CIDR)**:
- Si el campo requiere formato CIDR, usa: `187.155.152.91/32`
  - `/32` significa "solo esta IP específica"

### Paso 4: Guardar

1. Haz clic en **"Save"** o **"Update"** o **"Add"**
2. Espera 1-2 minutos para que la configuración se aplique

### Paso 5: Verificar

1. Deberías ver tu IP en la lista de reglas de acceso
2. El estado debería ser **"Active"** o **"Enabled"**

## 🔄 Si Tu IP Cambia

Si cambias de red (WiFi diferente, VPN, etc.), tu IP puede cambiar. En ese caso:

1. Obtén tu nueva IP:
   ```bash
   curl ifconfig.me
   ```
   O visita: https://whatismyipaddress.com/

2. Agrega la nueva IP al ACL (puedes tener múltiples IPs)
3. O elimina la IP antigua y agrega la nueva

## ⚠️ Opción Temporal (Solo para Pruebas)

**⚠️ NO usar en producción**:

Si necesitas probar rápidamente, puedes permitir todas las IPs temporalmente:

- **Source Type**: `IP Address/CIDR`
- **Source**: `0.0.0.0/0`
- **Description**: `TEMPORAL - Permitir todas las IPs - ELIMINAR DESPUÉS`

**Recuerda eliminar esta regla después de las pruebas.**

## 🧪 Probar la Conexión

Después de configurar el ACL:

1. **Espera 1-2 minutos** para que se aplique
2. **Reinicia tu aplicación**:
   ```bash
   # Detén la app (Ctrl+C)
   dotnet run
   ```
3. **Navega a**: http://localhost:5050/Orders
4. **Verifica**: Deberías ver datos en el grid sin errores de timeout

## 📝 Notas Importantes

1. **IP Dinámica**: Si tu ISP asigna IPs dinámicas, tu IP puede cambiar periódicamente
2. **Múltiples Redes**: Si trabajas desde diferentes lugares, agrega todas las IPs que uses
3. **VPN**: Si usas VPN, necesitarás agregar la IP que te asigna el VPN
4. **Seguridad**: Solo agrega IPs que realmente necesites

## 🔍 Verificar que Funciona

Si después de configurar el ACL aún hay timeout:

1. **Verifica que la regla está activa** en Oracle Cloud Console
2. **Verifica tu IP actual** (puede haber cambiado):
   ```bash
   curl ifconfig.me
   ```
3. **Prueba con DataGrip** para aislar el problema:
   - Si DataGrip funciona → problema en el código
   - Si DataGrip no funciona → problema de red/ACL

## 📞 Ubicación de la Configuración en Oracle Cloud

**Ruta típica**:
```
Oracle Cloud Console
  → Oracle Database
    → Autonomous Database
      → ADMINFLOTILLAS
        → Network (menú lateral)
          → Access Control List
            → Add Access Control Rule
```

**Si no encuentras "Network"**:
- Busca en el menú lateral: **"Security"** → **"Network"**
- O en la pestaña superior: **"Network"** o **"Access Control"**
