# Scripts SQL para Oracle Database

## Descripción

Este directorio contiene scripts SQL para configurar la base de datos Oracle con:
- Estructura de nuevas tablas (Chains, Salespersons, Routes, Addendums, OrderChannels, Invoices)
- Datos mock realistas para todas las tablas
- Verificación de estructura y datos

## Conexión a Oracle

**Connection String**: `jdbc:oracle:thin:@adminflotillas_high`

**Schema**: `CO` (Customer Orders)

**Usuario**: `FLOTILLAS_APP`

## Scripts Disponibles

### 1. `00_MASTER_SCRIPT.sql`
Script maestro que ejecuta todos los pasos en orden. Incluye verificaciones y reportes.

**Uso**:
```sql
@00_MASTER_SCRIPT.sql
```

### 2. `05_CREATE_NEW_TABLES.sql`
Crea las nuevas tablas necesarias para los módulos adicionales:
- `CHAINS` - Cadenas comerciales
- `SALESPERSONS` - Vendedores/intermediarios
- `ROUTES` - Rutas de reparto
- `ADDENDUMS` - Adendas/contratos especiales
- `ORDER_CHANNELS` - Canales de pedidos
- `INVOICES` - Facturas CFDI
- `CHAIN_SALESPERSON` - Relación muchos a muchos

**Uso**:
```sql
@05_CREATE_NEW_TABLES.sql
```

### 3. `06_INSERT_MOCK_DATA.sql`
Inserta datos mock realistas en todas las tablas:
- 25 Cadenas
- 25 Vendedores
- 20 Rutas
- 15 Adendas
- 8 Canales de Pedidos
- 100 Facturas (basadas en órdenes existentes)
- Relaciones Chain-Salesperson

**Uso**:
```sql
@06_INSERT_MOCK_DATA.sql
```

### 4. `07_VERIFY_STRUCTURE.sql`
Verifica que todas las tablas existan, tengan datos y la estructura sea correcta.

**Uso**:
```sql
@07_VERIFY_STRUCTURE.sql
```

## Orden de Ejecución

### Opción 1: Script Maestro (Recomendado)
```sql
@00_MASTER_SCRIPT.sql
```

### Opción 2: Scripts Individuales
```sql
-- 1. Crear nuevas tablas
@05_CREATE_NEW_TABLES.sql

-- 2. Insertar datos mock
@06_INSERT_MOCK_DATA.sql

-- 3. Verificar estructura
@07_VERIFY_STRUCTURE.sql
```

## Verificación de Datos

Después de ejecutar los scripts, verifica los datos con:

```sql
SELECT 
    'CUSTOMERS' AS TABLA, COUNT(*) AS REGISTROS FROM CO.CUSTOMERS
UNION ALL
SELECT 'ORDERS', COUNT(*) FROM CO.ORDERS
UNION ALL
SELECT 'ORDER_ITEMS', COUNT(*) FROM CO.ORDER_ITEMS
UNION ALL
SELECT 'PRODUCTS', COUNT(*) FROM CO.PRODUCTS
UNION ALL
SELECT 'STORES', COUNT(*) FROM CO.STORES
UNION ALL
SELECT 'SHIPMENTS', COUNT(*) FROM CO.SHIPMENTS
UNION ALL
SELECT 'INVENTORY', COUNT(*) FROM CO.INVENTORY
UNION ALL
SELECT 'CHAINS', COUNT(*) FROM CO.CHAINS
UNION ALL
SELECT 'SALESPERSONS', COUNT(*) FROM CO.SALESPERSONS
UNION ALL
SELECT 'ROUTES', COUNT(*) FROM CO.ROUTES
UNION ALL
SELECT 'ADDENDUMS', COUNT(*) FROM CO.ADDENDUMS
UNION ALL
SELECT 'ORDER_CHANNELS', COUNT(*) FROM CO.ORDER_CHANNELS
UNION ALL
SELECT 'INVOICES', COUNT(*) FROM CO.INVOICES
UNION ALL
SELECT 'CHAIN_SALESPERSON', COUNT(*) FROM CO.CHAIN_SALESPERSON
ORDER BY TABLA;
```

## Estructura de Tablas

### Tablas Existentes (Sample Schema CO)
- `ORDERS` - Órdenes de venta
- `ORDER_ITEMS` - Items de órdenes
- `CUSTOMERS` - Clientes
- `PRODUCTS` - Productos
- `STORES` - Tiendas
- `SHIPMENTS` - Envíos
- `INVENTORY` - Inventario

### Nuevas Tablas Creadas
- `CHAINS` - Cadenas comerciales (25 registros mock)
- `SALESPERSONS` - Vendedores (25 registros mock)
- `ROUTES` - Rutas de reparto (20 registros mock)
- `ADDENDUMS` - Adendas/contratos (15 registros mock)
- `ORDER_CHANNELS` - Canales de pedidos (8 registros mock)
- `INVOICES` - Facturas CFDI (100 registros mock)
- `CHAIN_SALESPERSON` - Relaciones (31 registros mock)

## Características

### Índices
Todas las tablas tienen índices en:
- Campos de estado (STATUS)
- Campos de búsqueda frecuente (RFC, EMAIL, etc.)
- Foreign keys

### Triggers
Triggers automáticos para actualizar `UPDATED_DATE` en:
- CHAINS
- SALESPERSONS
- ROUTES
- ADDENDUMS
- ORDER_CHANNELS
- INVOICES

### Constraints
- Primary Keys en todas las tablas
- Foreign Keys donde corresponde
- Check Constraints para valores válidos (STATUS, etc.)

## Notas Importantes

1. **Backup**: Siempre haz backup antes de ejecutar scripts en producción
2. **Permisos**: Asegúrate de tener permisos suficientes (CREATE TABLE, INSERT, etc.)
3. **Schema**: Los scripts asumen que trabajas en el schema `CO`
4. **Datos Mock**: Los datos mock son para desarrollo/pruebas. No usar en producción
5. **Órdenes**: El script de facturas asume que existen órdenes en `CO.ORDERS`

## Troubleshooting

### Error: "table or view does not exist"
- Verifica que estés conectado al schema correcto: `ALTER SESSION SET CURRENT_SCHEMA = CO;`
- Verifica que el usuario tenga permisos: `SELECT * FROM user_tables;`

### Error: "insufficient privileges"
- Necesitas permisos CREATE TABLE, INSERT, etc.
- Contacta al DBA para otorgar permisos

### Error: "unique constraint violated"
- Los datos ya existen. Puedes:
  - Eliminar datos existentes: `TRUNCATE TABLE CO.CHAINS;`
  - O modificar el script para usar `MERGE` en lugar de `INSERT`

### Error: "foreign key constraint violated"
- Verifica que las tablas referenciadas existan y tengan datos
- Ejecuta los scripts en orden

## Generar Nuevos Datos

Para generar nuevos datos mock, puedes:

1. **Modificar los scripts existentes** agregando más registros
2. **Usar la aplicación** una vez que esté conectada a Oracle
3. **Crear procedimientos almacenados** para generar datos aleatorios

Ejemplo de procedimiento para generar datos aleatorios:

```sql
CREATE OR REPLACE PROCEDURE SP_GENERAR_CHAINS_MOCK(P_CANTIDAD IN NUMBER) AS
BEGIN
    FOR i IN 1..P_CANTIDAD LOOP
        INSERT INTO CO.CHAINS (
            CHAIN_NAME, BUSINESS_NAME, RFC, NUMBER_OF_STORES,
            CREDIT_LIMIT, CREDIT_DAYS, STATUS, REGISTRATION_DATE
        ) VALUES (
            'Cadena ' || LPAD(i, 3, '0'),
            'Razón Social ' || i,
            'CAD' || LPAD(i, 2, '0') || DBMS_RANDOM.STRING('X', 9),
            DBMS_RANDOM.VALUE(1, 50),
            DBMS_RANDOM.VALUE(10000, 1000000),
            DBMS_RANDOM.VALUE(7, 120),
            CASE MOD(i, 3) WHEN 0 THEN 'INACTIVE' WHEN 1 THEN 'SUSPENDED' ELSE 'ACTIVE' END,
            SYSDATE - DBMS_RANDOM.VALUE(1, 2000)
        );
    END LOOP;
    COMMIT;
END;
/
```

## Conexión desde la Aplicación

La aplicación está configurada para usar:
- **Connection String**: Configurado en `appsettings.json`
- **Mock Data**: Si `DatabaseSettings:UseMockData = true`, usa datos en memoria
- **Oracle Real**: Si `DatabaseSettings:UseMockData = false`, conecta a Oracle

Para cambiar entre mock y Oracle real, modifica `appsettings.json`:

```json
{
  "DatabaseSettings": {
    "UseMockData": false  // Cambiar a false para usar Oracle real
  },
  "ConnectionStrings": {
    "OracleConnection": "Data Source=adminflotillas_high;User Id=FLOTILLAS_APP;Password=TU_PASSWORD;"
  }
}
```

## Próximos Pasos

1. ✅ Ejecutar scripts de creación de tablas
2. ✅ Insertar datos mock
3. ✅ Verificar estructura y datos
4. ⏭️ Conectar aplicación a Oracle real
5. ⏭️ Crear stored procedures para nuevos módulos
6. ⏭️ Probar funcionalidad completa

## Referencias

- [Documentación Oracle Cloud](https://docs.oracle.com/en-us/iaas/Content/Database/Concepts/adboverview.htm)
- [Oracle Sample Schema CO](https://github.com/oracle-samples/db-sample-schemas)
- [Oracle SQL Developer](https://www.oracle.com/database/technologies/appdev/sql-developer.html)
