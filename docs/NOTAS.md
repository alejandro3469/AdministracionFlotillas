# Notas Personales

##  Fechas Importantes

- **Inicio del proyecto**: 12 de Enero, 2026
- **.NET Version**: 10.0.101

##  Tareas Completadas

- [x] Crear soluci贸n AdministracionFlotillas
- [x] Crear proyecto AccesoDatos

##  Tareas Pendientes

- [ ] Agregar proyecto AccesoDatos a la soluci贸n (corregir comando con espacio)
- [ ] Crear proyecto ReglasNegocio
- [ ] Crear proyecto Web (MVC)
- [ ] Configurar referencias entre proyectos
- [ ] Agregar paquetes NuGet necesarios
- [ ] Configurar conexi贸n a base de datos
- [ ] Crear modelos de negocio
- [ ] Implementar repositorios
- [ ] Crear controladores
- [ ] Crear vistas

##  Problemas Encontrados

### Error al agregar proyecto a soluci贸n
**Fecha**: 12 de Enero, 2026
**Error**: 
```
Could not find project or directory `src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.`.
Could not find project or directory `csproj`.
```

**Causa**: Espacio extra antes de `.csproj` en el comando

**Soluci贸n**: Usar comando sin espacios:
```bash
dotnet sln add src/AdministracionFlotillas.AccesoDatos/AdministracionFlotillas.AccesoDatos.csproj
```

## 挕 Ideas y Recordatorios

- Recordar que en Mac la carpeta es "Documents", no "Documentos"
- Usar AdventureWorks como base de datos de ejemplo para desarrollo
- Configurar DataGrip para ver la base de datos mientras trabajas

##  Enlaces 胻iles

- Gu胊 completa: `/Users/wallfacer/proyectos-gitlab/pos-online/GUIA_PROYECTO_NET_CROSS_PLATFORM.md`
- Documentaci贸n .NET: https://learn.microsoft.com/dotnet/
- AdventureWorks: https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure

##  Notas de Desarrollo

### Estructura de Capas

1. **AccesoDatos**: Se comunica directamente con la base de datos
2. **ReglasNegocio**: Contiene la l贸gica de negocio y transforma datos
3. **Web**: Contiene los controladores, vistas y JavaScript

### Convenciones de Nombres

- Variables: camelCase (ej: `nombreFlotilla`)
- M茅todos: PascalCase (ej: `BuscarFlotillas()`)
- Clases: PascalCase (ej: `ServicioFlotillas`)

