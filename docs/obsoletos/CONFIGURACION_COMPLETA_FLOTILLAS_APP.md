# Configuración Completa: Usuario FLOTILLAS_APP

## ✅ Usuario Creado

**Usuario**: `FLOTILLAS_APP`  
**Contraseña**: `Leleupi3469189.` (con punto al final)  
**REST Enabled**: ✅ Sí  
**ORDS Alias**: `flotillas_app`  
**Roles**: CONNECT, RESOURCE

## 📋 Pasos Completados

### 1. ✅ Usuario Creado
- Usuario `FLOTILLAS_APP` creado exitosamente
- REST habilitado
- Roles CONNECT y RESOURCE otorgados

### 2. ✅ Connection String Actualizado
**Archivo**: `src/AdministracionFlotillas.Web/appsettings.json`

```json
"OracleConnection": "Data Source=(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.mx-queretaro-1.oraclecloud.com))(connect_data=(service_name=gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)));User Id=FLOTILLAS_APP;Password=Leleupi3469189.;Connection Timeout=60;"
```

### 3. ⚠️ Pendiente: Otorgar Permisos

El usuario `FLOTILLAS_APP` necesita permisos para:
- Ejecutar stored procedures en `PKG_ORDERS`
- Leer/escribir en la tabla `ORDERS`

**Ejecuta este script en SQL Worksheet (como ADMIN)**:

```sql
-- Otorgar permisos para ejecutar stored procedures
GRANT EXECUTE ON ADMIN.PKG_ORDERS TO FLOTILLAS_APP;

-- Otorgar permisos para leer/escribir en la tabla ORDERS
GRANT SELECT, INSERT, UPDATE, DELETE ON ADMIN.ORDERS TO FLOTILLAS_APP;

-- (Opcional) Crear sinónimos para facilitar el acceso
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.ORDERS FOR ADMIN.ORDERS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_ORDERS FOR ADMIN.PKG_ORDERS;
```

**Archivo del script**: `PERMISOS_FLOTILLAS_APP.sql`

### 4. ⚠️ Pendiente: Verificar ACL

Asegúrate de que el Access Control List esté configurado:
- **Access type**: `Allow secure access from specified IPs and VCNs`
- **Access control list**: `Enabled`
- **Values**: Debe contener `187.155.152.91` (tu IP)

## 🧪 Probar la Conexión

### Paso 1: Otorgar Permisos

1. En Database Actions, ve a **SQL Worksheet**
2. Ejecuta el script `PERMISOS_FLOTILLAS_APP.sql` (como ADMIN)
3. Verifica que no haya errores

### Paso 2: Verificar ACL

1. Ve a **Network** → **Access Control List**
2. Verifica que esté "Enabled" y tu IP esté en la lista
3. Si no está, agrega `187.155.152.91`

### Paso 3: Reiniciar la Aplicación

```bash
# Detén la app (Ctrl+C)
dotnet run
```

### Paso 4: Probar

1. Navega a: http://localhost:5050/Orders
2. Deberías ver datos en el grid sin errores

## 🔍 Verificación

### Verificar Permisos Otorgados

Ejecuta en SQL Worksheet (como ADMIN):

```sql
-- Ver permisos en tablas
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE = 'FLOTILLAS_APP';

-- Ver permisos en procedimientos
SELECT * FROM DBA_TAB_PRIVS 
WHERE GRANTEE = 'FLOTILLAS_APP' 
AND TABLE_NAME = 'PKG_ORDERS';

-- Ver roles
SELECT * FROM DBA_ROLE_PRIVS WHERE GRANTEE = 'FLOTILLAS_APP';
```

### Verificar Conexión

Si hay errores de conexión:
1. Verifica el ACL (tu IP debe estar en la lista)
2. Verifica los permisos (el usuario debe poder ejecutar PKG_ORDERS)
3. Verifica el connection string (usuario y contraseña correctos)

## 📝 Notas Importantes

1. **Contraseña**: `Leleupi3469189.` (con punto al final)
2. **Schema**: Los objetos están en `ADMIN`, pero el usuario es `FLOTILLAS_APP`
3. **Sinónimos**: Los sinónimos facilitan el acceso sin especificar `ADMIN.`
4. **ACL**: Es crítico que tu IP esté en el Access Control List

## 🆘 Si Hay Errores

### Error: "ORA-01031: insufficient privileges"
- **Solución**: Ejecuta el script de permisos como ADMIN

### Error: "ORA-50000: Connection request timed out"
- **Solución**: Verifica el ACL en Oracle Cloud Console

### Error: "ORA-00942: table or view does not exist"
- **Solución**: Crea los sinónimos o usa `ADMIN.ORDERS` en el código

## ✅ Checklist Final

- [ ] Usuario `FLOTILLAS_APP` creado
- [ ] Connection string actualizado en `appsettings.json`
- [ ] Permisos otorgados (ejecutar script `PERMISOS_FLOTILLAS_APP.sql`)
- [ ] ACL configurado con tu IP `187.155.152.91`
- [ ] Aplicación reiniciada
- [ ] Datos visibles en el grid sin errores
