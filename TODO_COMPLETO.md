# 📋 TODO COMPLETO - Lista de Tareas Pendientes desde la Raíz

## 🔴 CRÍTICO - Ejecutar AHORA en Oracle Database

### 1. ⚠️ CORREGIR ERROR ORA-01006 (URGENTE)

**Problema**: El stored procedure `SP_BUSCAR_ORDERS` tiene un error de bind variables.

**Solución**: Ejecutar el script SQL corregido en Oracle Database.

**Archivo**: `FIX_SP_BUSCAR_ORDERS.sql` (en la raíz del proyecto)

**Pasos**:
1. Conectarse a Oracle Database Actions como usuario `CO` o `ADMIN`
2. Abrir SQL Worksheet
3. Ejecutar el contenido completo de `FIX_SP_BUSCAR_ORDERS.sql`
4. Verificar que no haya errores

**Verificación**:
```sql
-- Verificar que el stored procedure está actualizado
SELECT text FROM all_source 
WHERE owner = 'CO' 
  AND name = 'PKG_ORDERS' 
  AND type = 'PACKAGE BODY'
  AND line BETWEEN 73 AND 98
ORDER BY line;
```

---

## 📊 BASE DE DATOS

### 2. ✅ Verificar Permisos del Usuario FLOTILLAS_APP

**Archivo**: `PERMISOS_FLOTILLAS_APP.sql`

**Ejecutar como ADMIN o CO**:
```sql
-- Verificar permisos actuales
SELECT * FROM dba_tab_privs WHERE grantee = 'FLOTILLAS_APP';
SELECT * FROM dba_sys_privs WHERE grantee = 'FLOTILLAS_APP';

-- Si faltan permisos, ejecutar PERMISOS_FLOTILLAS_APP.sql
```

### 3. ⚠️ Verificar Schema Correcto

**Problema**: Los scripts mencionan schema `ADMIN` pero la base de datos usa `CO`.

**Verificar**:
```sql
-- Ver en qué schema están los objetos
SELECT owner, object_name, object_type 
FROM all_objects 
WHERE object_name IN ('ORDERS', 'PKG_ORDERS')
ORDER BY owner, object_name;
```

**Ajustar scripts si es necesario**:
- Si los objetos están en `CO`, los scripts ya están correctos
- Si están en `ADMIN`, actualizar los scripts

### 4. 📝 Crear Stored Procedures para Otros Módulos

**Faltan**:
- [ ] `PKG_PRODUCTS` - Para módulo de Productos
- [ ] `PKG_CUSTOMERS` - Para módulo de Clientes  
- [ ] `PKG_EMPLOYEES` - Para módulo de Empleados (si aplica)

**Ubicación**: `src/AdministracionFlotillas.Web/scripts/`

---

## 🔧 CONFIGURACIÓN DE APLICACIÓN

### 5. ⚠️ Verificar Connection String

**Archivo**: `src/AdministracionFlotillas.Web/appsettings.json`

**Verificar**:
- [ ] Usuario correcto: `FLOTILLAS_APP` o `CO`
- [ ] Contraseña correcta
- [ ] Timeout configurado (60 segundos)
- [ ] Service name correcto

### 6. ⚠️ Verificar ACL (Access Control List)

**En Oracle Cloud Console**:
- [ ] Access type: `Allow secure access from specified IPs and VCNs`
- [ ] Access control list: `Enabled`
- [ ] IP actual agregada: `187.155.152.91` (verificar IP actual)

**Verificar IP actual**:
```bash
curl ifconfig.me
```

---

## 🎨 FRONTEND - Funcionalidades Pendientes

### 7. 📊 Dashboard

**Estado**: Parcialmente implementado

**Falta**:
- [ ] Verificar que los gráficos de Syncfusion funcionen correctamente
- [ ] Agregar más métricas si es necesario
- [ ] Optimizar carga de datos

### 8. 📦 Módulo Products

**Estado**: Vista creada, falta integración real

**Falta**:
- [ ] Crear `PKG_PRODUCTS` en Oracle
- [ ] Implementar repositorio real (actualmente usa mock)
- [ ] Conectar con base de datos Oracle
- [ ] Agregar filtros funcionales
- [ ] Implementar CRUD completo

### 9. 👥 Módulo Customers

**Estado**: Vista creada, falta integración real

**Falta**:
- [ ] Crear `PKG_CUSTOMERS` en Oracle
- [ ] Implementar repositorio real (actualmente usa mock)
- [ ] Conectar con base de datos Oracle
- [ ] Agregar filtros funcionales
- [ ] Implementar CRUD completo

### 10. 👔 Módulo Employees

**Estado**: Vista existe pero usa DataTables (no Syncfusion)

**Falta**:
- [ ] Migrar a Syncfusion Grid (como Orders)
- [ ] Unificar formato con otros módulos
- [ ] Agregar indicadores compactos
- [ ] Agregar breadcrumbs
- [ ] Integrar con base de datos (si aplica)

---

## 🧪 TESTING

### 11. ⚠️ Probar Funcionalidades

**Órdenes**:
- [ ] Cargar lista de órdenes
- [ ] Aplicar filtros (ID Cliente, Estado, ID Tienda, Fechas)
- [ ] Exportar a Excel
- [ ] Exportar a PDF
- [ ] Ver detalles de orden
- [ ] Ver items de factura

**Dashboard**:
- [ ] Cargar métricas
- [ ] Cargar grid de órdenes
- [ ] Aplicar filtros desde dashboard
- [ ] Navegación a detalles

**Productos**:
- [ ] Cargar lista (actualmente mock)
- [ ] Verificar que los datos se muestren

**Clientes**:
- [ ] Cargar lista (actualmente mock)
- [ ] Verificar que los datos se muestren

---

## 📚 DOCUMENTACIÓN

### 12. 📝 Documentación Pendiente

**Falta**:
- [ ] Documentar estructura de base de datos completa
- [ ] Documentar stored procedures y sus parámetros
- [ ] Documentar APIs y endpoints
- [ ] Guía de despliegue
- [ ] Guía de troubleshooting

---

## 🔐 SEGURIDAD

### 13. ⚠️ Seguridad

**Falta**:
- [ ] Mover connection string a User Secrets o Azure Key Vault
- [ ] Implementar autenticación/autorización
- [ ] Validar inputs en servidor
- [ ] Implementar CSRF protection
- [ ] Agregar logging de errores

---

## 🚀 DEPLOYMENT

### 14. ⚠️ Preparación para Producción

**Falta**:
- [ ] Configurar variables de entorno
- [ ] Configurar logging
- [ ] Configurar error handling
- [ ] Optimizar queries
- [ ] Configurar caching si es necesario
- [ ] Configurar monitoring

---

## 📦 DEPENDENCIAS

### 15. ⚠️ Verificar Dependencias

**Verificar**:
- [ ] Syncfusion licencia activa
- [ ] Oracle.ManagedDataAccess.Core versión correcta
- [ ] Todas las dependencias NuGet actualizadas
- [ ] No hay vulnerabilidades de seguridad

---

## 🐛 BUGS CONOCIDOS

### 16. ⚠️ Errores Pendientes

1. **ORA-01006**: Bind variable does not exist
   - **Estado**: Script de corrección listo (`FIX_SP_BUSCAR_ORDERS.sql`)
   - **Acción**: Ejecutar script en Oracle

2. **404 en Dashboard**: Error al cargar órdenes
   - **Estado**: Corregido (cambió `/Orders/Buscar` a `/Orders/BuscarOrders`)
   - **Verificar**: Probar que funciona

---

## ✅ CHECKLIST DE VERIFICACIÓN INICIAL

Antes de continuar con el desarrollo, verificar:

- [ ] Script `FIX_SP_BUSCAR_ORDERS.sql` ejecutado en Oracle
- [ ] Error ORA-01006 resuelto
- [ ] Connection string correcto en `appsettings.json`
- [ ] ACL configurado en Oracle Cloud
- [ ] Permisos de `FLOTILLAS_APP` verificados
- [ ] Aplicación compila sin errores
- [ ] Dashboard carga correctamente
- [ ] Módulo Orders funciona con filtros
- [ ] Exportación Excel/PDF funciona

---

## 📞 PRÓXIMOS PASOS INMEDIATOS

1. **AHORA**: Ejecutar `FIX_SP_BUSCAR_ORDERS.sql` en Oracle
2. **Luego**: Verificar que los filtros de Orders funcionen
3. **Después**: Crear stored procedures para Products y Customers
4. **Finalmente**: Migrar Employees a Syncfusion

---

## 📁 ARCHIVOS IMPORTANTES

- `FIX_SP_BUSCAR_ORDERS.sql` - **EJECUTAR ESTE PRIMERO**
- `PERMISOS_FLOTILLAS_APP.sql` - Verificar permisos
- `src/AdministracionFlotillas.Web/scripts/02_CREATE_PKG_ORDERS.sql` - Script completo del paquete
- `src/AdministracionFlotillas.Web/appsettings.json` - Connection string

---

**Última actualización**: 2026-01-17
