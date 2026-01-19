# Configuración Completa del Wallet de Oracle

## ✅ Wallet Configurado

**Ubicación del Wallet**: `/Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2/`

**Contraseña del Wallet**: `Leleupi3469189.` (solo para desbloquear el wallet, no se usa en el connection string)

**Contraseña del Usuario ADMIN**: `Leleupi3469` (esta es la que va en el connection string)

## 📋 Connection String Configurado

**Archivo**: `src/AdministracionFlotillas.Web/appsettings.json`

```json
"ConnectionStrings": {
  "OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=Leleupi3469;"
},
"OracleSettings": {
  "TnsAdmin": "/Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2"
}
```

**Explicación**:
- `adminflotillas_high` → Alias del TNS name (definido en `tnsnames.ora` del wallet)
- `TNS_ADMIN` → Se configura como variable de entorno en `Program.cs` (no va en el connection string)
- `User Id=ADMIN` → Usuario de la base de datos
- `Password=Leleupi3469` → Contraseña del usuario ADMIN (no la del wallet)

**Importante**: Oracle Managed Data Access requiere que `TNS_ADMIN` se configure como variable de entorno, no como parámetro en el connection string. Por eso se configura en `Program.cs` antes de crear cualquier conexión.

## 🔍 Verificación del Wallet

El wallet contiene:
- ✅ `tnsnames.ora` → Define los aliases (adminflotillas_high, etc.)
- ✅ `ewallet.p12` → Certificado del wallet
- ✅ `cwallet.sso` → Wallet automático
- ✅ `sqlnet.ora` → Configuración de red
- ✅ Otros archivos de certificados

## 🧪 Probar la Conexión

1. **Ejecuta la aplicación**:
   ```bash
   dotnet run
   ```

2. **Navega a**: http://localhost:5050/Orders

3. **Verifica en la consola del navegador**:
   - Deberías ver: "Grid creado, cargando datos..."
   - Si hay datos: "Datos cargados: X órdenes"
   - Si hay error de conexión, revisa los logs del servidor

## ⚠️ Si Hay Error de Conexión

### Verificar Permisos del Wallet
```bash
ls -la /Users/wallfacer/Downloads/Wallet_ADMINFLOTILLAS-2/
```

Todos los archivos deben ser legibles.

### Verificar que el Alias Existe
El alias `adminflotillas_high` está definido en `tnsnames.ora` del wallet.

### Verificar Logs del Servidor
Revisa la consola donde ejecutaste `dotnet run` para ver errores específicos de Oracle.

## 📝 Notas Importantes

1. **Contraseña del Wallet vs Contraseña del Usuario**:
   - **Wallet password** (`Leleupi3469189.`): Solo se usa para desbloquear el wallet manualmente
   - **User password** (`Leleupi3469`): Es la que va en el connection string

2. **TNS_ADMIN**:
   - Se configura como variable de entorno en `Program.cs` (no en el connection string)
   - Debe apuntar a la **carpeta** del wallet, no al archivo .p12
   - La ruta debe ser absoluta
   - Se lee desde `appsettings.json` → `OracleSettings:TnsAdmin`

3. **Seguridad**:
   - ⚠️ NO subas el wallet a Git
   - ⚠️ NO subas `appsettings.json` con contraseñas a Git
   - Usa `appsettings.Development.json` para desarrollo local

## 🔄 Si Necesitas Mover el Wallet

Si mueves el wallet a otra ubicación, actualiza `OracleSettings:TnsAdmin` en `appsettings.json`:

```json
"OracleSettings": {
  "TnsAdmin": "/NUEVA/RUTA/DEL/WALLET"
}
```

**No necesitas cambiar el connection string**, solo la configuración de `TnsAdmin`.
