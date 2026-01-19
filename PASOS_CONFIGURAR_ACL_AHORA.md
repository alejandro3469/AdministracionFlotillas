# Pasos para Configurar ACL - Pantalla Actual

## 🎯 Lo que Veo en tu Pantalla

Estás en la sección **Network** de tu Autonomous Database `ADMINFLOTILLAS`.

## ✅ Pasos Exactos a Seguir

### Paso 1: Cambiar Access Type

1. Busca la sección **"Access type"**
2. Actualmente dice: **"Allow secure access from everywhere"**
3. Haz clic en **"Edit"** (al lado de "Access type")
4. Cambia a: **"Allow secure access from specified IPs and VCNs"**
5. Haz clic en **"Save"**

### Paso 2: Habilitar Access Control List

1. Busca la sección **"Access control list"**
2. Actualmente dice: **"Disabled"**
3. Haz clic en **"Edit"** (al lado de "Access control list")
4. Cambia a: **"Enabled"**

### Paso 3: Agregar tu IP

1. En la sección **"Access control list"**, verás:
   - **IP notation type**: (puedes dejarlo como está)
   - **Values**: (campo vacío o lista)
   - Botón: **"Add access control rule"**
   - **O mejor aún**: Botón **"Add my IP address(187.155.152.91) to IP value"** ⭐

2. **Opción Recomendada**: Haz clic en **"Add my IP address(187.155.152.91) to IP value"**
   - Esto agregará automáticamente tu IP: `187.155.152.91`

3. **O Manualmente**:
   - Haz clic en **"Add access control rule"**
   - En el campo **"Values"**, ingresa: `187.155.152.91`
   - Puedes agregar múltiples IPs separadas por comas si es necesario

### Paso 4: Guardar

1. Haz clic en **"Save"** (botón en la parte inferior)
2. Espera 1-2 minutos para que se aplique la configuración

## 📋 Resumen de Cambios

**Antes**:
- Access type: `Allow secure access from everywhere`
- Access control list: `Disabled`

**Después**:
- Access type: `Allow secure access from specified IPs and VCNs`
- Access control list: `Enabled`
- Values: `187.155.152.91` (tu IP)

## ⚠️ Importante

1. **No uses "Allow secure access from everywhere"** en producción
2. **Solo agrega IPs que realmente necesites**
3. **Si tu IP cambia**, tendrás que agregar la nueva IP

## 🧪 Después de Guardar

1. **Espera 1-2 minutos** para que se aplique
2. **Reinicia tu aplicación**:
   ```bash
   # Detén la app (Ctrl+C)
   dotnet run
   ```
3. **Navega a**: http://localhost:5050/Orders
4. **Deberías ver**: Datos en el grid sin errores de timeout

## 🔍 Verificación

Después de guardar, deberías ver:
- **Access type**: `Allow secure access from specified IPs and VCNs`
- **Access control list**: `Enabled`
- **Values**: `187.155.152.91` (o la lista de IPs que agregaste)

## 📝 Si Necesitas Agregar Más IPs

Si trabajas desde diferentes lugares o usas VPN:

1. Haz clic en **"Edit"** en "Access control list"
2. En **"Values"**, agrega las IPs separadas por comas:
   ```
   187.155.152.91, 192.168.1.100, 10.0.0.50
   ```
3. O haz clic en **"Add access control rule"** para agregar una por una
4. Guarda

## 🆘 Si No Funciona

1. **Verifica que guardaste** los cambios
2. **Espera 2-3 minutos** (a veces tarda más)
3. **Verifica tu IP actual**:
   ```bash
   curl ifconfig.me
   ```
4. **Prueba con DataGrip** para aislar el problema
