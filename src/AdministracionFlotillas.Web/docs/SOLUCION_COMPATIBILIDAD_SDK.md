# Solución de Compatibilidad SDK: Windows y Mac

## Problema
Visual Studio 2022 en Windows está usando SDK 8.0.300 en lugar de SDK 10.0.101, causando errores de compilación.

## Solución Recomendada: Usar global.json

### Paso 1: Crear global.json en la raíz del proyecto

Ejecuta en CMD desde el directorio del repositorio:
```
dotnet new globaljson --sdk-version 10.0.101
```

Esto crea un archivo `global.json` en la raíz que fuerza a usar SDK 10.0.101.

### Paso 2: Verificar que global.json se creó correctamente

```
type global.json
```

Debe mostrar:
```json
{
  "sdk": {
    "version": "10.0.101"
  }
}
```

### Paso 3: Cerrar y reiniciar Visual Studio

1. Cierra Visual Studio 2022 completamente
2. Reinicia tu computadora (importante para que Visual Studio detecte el cambio)
3. Abre Visual Studio 2022
4. Abre el proyecto `AdministracionFlotillas.sln`

### Paso 4: Verificar en Visual Studio

En Visual Studio:
- Herramientas → Opciones → Proyectos y soluciones → .NET Core
- Verifica que aparezca .NET SDK 10.0.101 en la lista

### Paso 5: Limpiar y compilar

En Visual Studio:
- Build → Clean Solution
- Build → Rebuild Solution

---

## Solución Alternativa: Cambiar a .NET 8.0 (Compatibilidad Total)

Si la solución anterior no funciona, podemos cambiar el proyecto a .NET 8.0 que es compatible con ambos SDKs.

### Ventajas:
- Compatible con SDK 8.0 y 10.0
- Funciona en Windows y Mac sin problemas
- No requiere reiniciar computadora

### Desventajas:
- No usamos las características más nuevas de .NET 10.0

### Pasos para cambiar a .NET 8.0:

1. Editar todos los archivos `.csproj` y cambiar:
   ```xml
   <TargetFramework>net10.0</TargetFramework>
   ```
   Por:
   ```xml
   <TargetFramework>net8.0</TargetFramework>
   ```

2. Actualizar paquetes NuGet si es necesario

3. Compilar y verificar

---

## Verificar Versión de Visual Studio

Visual Studio 2022 necesita versión **17.14 o superior** para soportar completamente .NET 10.0.

Para verificar:
- Ayuda → Acerca de Microsoft Visual Studio
- Verifica que la versión sea 17.14.x o superior

Si no lo es, actualiza Visual Studio:
- Ayuda → Buscar actualizaciones

---

## ¿Es Seguro Tener Múltiples SDKs Instalados?

**Sí, es completamente seguro y recomendado** tener múltiples versiones del SDK instaladas. .NET está diseñado para soportar esto.

- El SDK 8.0 puede quedarse instalado
- El SDK 10.0 puede instalarse junto a él
- El archivo `global.json` controla qué versión usar por proyecto

**No es necesario desinstalar el SDK 8.0** a menos que quieras liberar espacio en disco.

---

## Comandos de Diagnóstico

Si el problema persiste, ejecuta estos comandos en CMD:

```
dotnet --list-sdks
dotnet --version
type global.json
dotnet build AdministracionFlotillas.sln -v detailed | findstr "Using SDK"
```

---

## Recomendación Final

1. **Primero intenta**: Crear `global.json` y reiniciar computadora
2. **Si no funciona**: Verifica que Visual Studio esté en versión 17.14 o superior
3. **Si aún no funciona**: Considera cambiar temporalmente a .NET 8.0 para compatibilidad total
