# Quick Start: Configuración Cross-Platform

## ✅ Respuesta Rápida

**¿Es compatible 8.0.300 con 8.0.417?**
- **Sí**, ambas son versiones patch de .NET 8.0 y son completamente compatibles.

**¿Quién debe migrar?**
- **Nadie**. La configuración actual funciona para ambos.

**¿Hay una versión compatible con ambos?**
- **Sí, .NET 8.0**. El proyecto ya está configurado para funcionar en ambos sistemas.

## 🚀 Configuración Actual

El proyecto está configurado para:
- **Windows**: .NET SDK 8.0.300 o superior
- **Mac**: .NET SDK 8.0.417 o superior
- **Ambos**: Funcionan con el mismo código sin problemas

## 📋 Verificación Rápida

### En Windows:
```powershell
dotnet --version
# Debe mostrar: 8.0.300 o superior

dotnet build
# Debe compilar sin errores
```

### En Mac:
```bash
dotnet --version
# Debe mostrar: 8.0.417 o superior

dotnet build
# Debe compilar sin errores
```

## 📚 Documentación Completa

Para detalles completos, ver: [COMPATIBILIDAD_CROSS_PLATFORM.md](./COMPATIBILIDAD_CROSS_PLATFORM.md)

## 🔧 Si Algo No Funciona

1. **Verifica tu versión:**
   ```bash
   dotnet --version
   ```

2. **Limpia y recompila:**
   ```bash
   dotnet clean
   dotnet restore
   dotnet build
   ```

3. **Verifica global.json:**
   ```bash
   cat global.json  # Mac
   type global.json # Windows
   ```
   Debe mostrar: `"version": "8.0.300"` y `"rollForward": "latestPatch"`

---

**✅ Todo listo para colaborar entre Windows y Mac!**
