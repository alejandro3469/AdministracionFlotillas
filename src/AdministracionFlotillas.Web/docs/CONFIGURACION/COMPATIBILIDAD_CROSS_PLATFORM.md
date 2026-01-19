# Guía de Compatibilidad Cross-Platform: Windows y Mac

## Resumen Ejecutivo

Este proyecto está configurado para funcionar en **Windows** y **Mac** simultáneamente, permitiendo colaboración sin conflictos de versiones.

### Versiones Compatibles

- **Windows**: .NET SDK 8.0.300 o superior
- **Mac**: .NET SDK 8.0.417 o superior
- **Target Framework**: .NET 8.0 (compatible con ambos)

### Configuración Actual

El archivo `global.json` está configurado para:
- **Versión mínima**: 8.0.300 (la versión más baja entre ambos sistemas)
- **RollForward**: `latestPatch` (permite usar versiones más nuevas si están disponibles)
- **Resultado**: Ambos sistemas pueden trabajar con el mismo código sin problemas

---

## ¿Por Qué Esta Configuración Funciona?

### 1. Compatibilidad de Versiones

Las versiones 8.0.300 y 8.0.417 son **compatibles entre sí** porque:
- Ambas son versiones **patch** (parches) de .NET 8.0
- No hay cambios incompatibles entre versiones patch
- El código compilado con 8.0.300 funciona con 8.0.417 y viceversa

### 2. Configuración de global.json

```json
{
  "sdk": {
    "version": "8.0.300",
    "rollForward": "latestPatch",
    "allowPrerelease": false
  }
}
```

**Explicación:**
- `version: "8.0.300"`: Especifica la versión mínima requerida
- `rollForward: "latestPatch"`: Permite usar versiones más nuevas del mismo patch (8.0.300, 8.0.301, 8.0.417, etc.)
- `allowPrerelease: false`: No permite versiones pre-lanzamiento

**Comportamiento:**
- **Windows (8.0.300)**: Usa exactamente 8.0.300 ✓
- **Mac (8.0.417)**: Usa 8.0.417 (porque es un patch más nuevo) ✓
- **Ambos**: Compilan el mismo código sin diferencias ✓

---

Para ver la documentación completa, consulta el archivo en el repositorio.

**Última actualización**: Enero 2026
**Configuración**: .NET 8.0.300+ (Windows) y 8.0.417+ (Mac)
