# Crear Usuario para la Aplicación

## 🎯 Por Qué Crear un Usuario Específico

Oracle recomienda **NO usar ADMIN** para desarrollo regular. Es mejor crear un usuario específico para la aplicación.

## ✅ Pasos para Crear el Usuario

### Paso 1: Crear el Usuario

1. En la página **Database Users**, haz clic en **"Create User"**

2. Completa el formulario:

   **User Tab**:
   - **User Name**: `APP_USER` (o el nombre que prefieras, ej: `FLOTILLAS_APP`)
   - **Password**: `Leleupi3469` (o una contraseña segura)
   - **Confirm Password**: `Leleupi3469` (la misma contraseña)
   - **Quota on tablespace DATA**: `Unlimited` (o el espacio que necesites)
   - ✅ **Web access**: Marca esta opción (habilita REST)
   - **REST Alias**: `app_user` (o el alias que prefieras)

   **Granted Roles Tab**:
   - ✅ **CONNECT**: Marca "Granted"
   - ✅ **RESOURCE**: Marca "Granted"
   - ✅ **DWROLE**: Marca "Granted" (si necesitas Data Warehouse)
   - Opcional: Otros roles según necesites

3. Haz clic en **"Create User"**

### Paso 2: Verificar que el Usuario se Creó

1. En la lista de **"All Users"**, deberías ver tu nuevo usuario
2. Verifica que tenga **"REST Enabled"** si lo habilitaste

### Paso 3: Actualizar Connection String

Actualiza `appsettings.json` para usar el nuevo usuario:

```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.mx-queretaro-1.oraclecloud.com))(connect_data=(service_name=gccb3c39d89c090_adminflotillas_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)));User Id=APP_USER;Password=Leleupi3469;Connection Timeout=60;"
  }
}
```

**Cambios**:
- `User Id=ADMIN` → `User Id=APP_USER` (o el nombre que elegiste)
- `Password=Leleupi3469` → La contraseña que configuraste

## 🔐 Permisos Necesarios

Para que la aplicación funcione, el usuario necesita:

### Roles Mínimos:
- ✅ **CONNECT**: Para conectarse a la base de datos
- ✅ **RESOURCE**: Para crear objetos (tablas, procedimientos, etc.)

### Permisos Adicionales (si usas stored procedures):
- ✅ **EXECUTE** en el paquete `PKG_ORDERS`
- O crear los procedimientos en el schema del usuario

## 📝 Nota sobre el Schema CO

Veo que ya existe un usuario **"CO"** en tu base de datos. Si ese es el schema que quieres usar:

1. **Opción A**: Usar el usuario CO existente
   - Actualiza el connection string con `User Id=CO`
   - Verifica que tenga los permisos necesarios

2. **Opción B**: Crear un nuevo usuario específico para la aplicación
   - Sigue los pasos arriba
   - Usa un nombre como `FLOTILLAS_APP` o `APP_USER`

## 🧪 Probar la Conexión

Después de crear el usuario y actualizar el connection string:

1. **Reinicia la aplicación**:
   ```bash
   # Detén la app (Ctrl+C)
   dotnet run
   ```

2. **Navega a**: http://localhost:5050/Orders

3. **Verifica**: Deberías ver datos en el grid sin errores

## ⚠️ Importante

1. **ACL debe estar configurado**: Asegúrate de que tu IP `187.155.152.91` esté en el Access Control List
2. **Permisos en objetos**: Si los stored procedures están en el schema ADMIN, el nuevo usuario necesita permisos:
   ```sql
   GRANT EXECUTE ON PKG_ORDERS TO APP_USER;
   ```
3. **Tablas**: Si las tablas están en otro schema, necesitas permisos:
   ```sql
   GRANT SELECT, INSERT, UPDATE, DELETE ON ADMIN.ORDERS TO APP_USER;
   ```

## 🔄 Si Usas el Usuario CO Existente

Si decides usar el usuario **CO** que ya existe:

1. Verifica que tenga los permisos necesarios
2. Actualiza el connection string:
   ```json
   "User Id=CO;Password=TU_CONTRASEÑA_DE_CO;"
   ```
3. Si no conoces la contraseña de CO, puedes resetearla desde Database Users
