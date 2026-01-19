-- ============================================================================
-- Script Maestro: Configuración Completa de Base de Datos Oracle
-- Descripción: Ejecuta todos los scripts necesarios para configurar la BD
--              con estructura y datos mock
-- Schema: CO (Customer Orders)
-- Usuario: FLOTILLAS_APP
-- Conexión: jdbc:oracle:thin:@adminflotillas_high
-- ============================================================================

-- ============================================================================
-- INSTRUCCIONES DE USO
-- ============================================================================
-- 1. Conectar a Oracle Cloud usando SQL Developer, SQL*Plus o cualquier cliente SQL
-- 2. Conectarse como usuario FLOTILLAS_APP o con permisos suficientes
-- 3. Ejecutar este script o ejecutar los scripts individuales en orden:
--    a) 05_CREATE_NEW_TABLES.sql (crear nuevas tablas)
--    b) 06_INSERT_MOCK_DATA.sql (insertar datos mock)
-- 4. Verificar que todo se creó correctamente con el script de verificación
-- ============================================================================

-- Configurar el schema actual
ALTER SESSION SET CURRENT_SCHEMA = CO;

-- ============================================================================
-- PASO 1: Verificar estructura existente
-- ============================================================================
PROMPT ============================================================================
PROMPT PASO 1: Verificando estructura existente...
PROMPT ============================================================================

SELECT 
    'TABLAS EXISTENTES' AS TIPO,
    table_name AS NOMBRE,
    num_rows AS REGISTROS
FROM user_tables
WHERE table_name IN (
    'ORDERS', 'ORDER_ITEMS', 'CUSTOMERS', 'PRODUCTS', 
    'STORES', 'SHIPMENTS', 'INVENTORY',
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES', 'CHAIN_SALESPERSON'
)
ORDER BY table_name;

-- ============================================================================
-- PASO 2: Crear nuevas tablas (si no existen)
-- ============================================================================
PROMPT ============================================================================
PROMPT PASO 2: Creando nuevas tablas...
PROMPT ============================================================================
PROMPT Ejecutando: 05_CREATE_NEW_TABLES.sql
PROMPT (Por favor, ejecuta este script manualmente si no se ejecuta automáticamente)
PROMPT ============================================================================

-- Nota: En SQL*Plus puedes usar @ para ejecutar scripts externos:
-- @05_CREATE_NEW_TABLES.sql

-- ============================================================================
-- PASO 3: Insertar datos mock
-- ============================================================================
PROMPT ============================================================================
PROMPT PASO 3: Insertando datos mock...
PROMPT ============================================================================
PROMPT Ejecutando: 06_INSERT_MOCK_DATA.sql
PROMPT (Por favor, ejecuta este script manualmente si no se ejecuta automáticamente)
PROMPT ============================================================================

-- Nota: En SQL*Plus puedes usar @ para ejecutar scripts externos:
-- @06_INSERT_MOCK_DATA.sql

-- ============================================================================
-- PASO 4: Verificación final
-- ============================================================================
PROMPT ============================================================================
PROMPT PASO 4: Verificación final de datos...
PROMPT ============================================================================

SELECT 
    'CUSTOMERS' AS TABLA, 
    COUNT(*) AS REGISTROS 
FROM CO.CUSTOMERS
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

-- ============================================================================
-- PASO 5: Verificar índices creados
-- ============================================================================
PROMPT ============================================================================
PROMPT PASO 5: Verificando índices...
PROMPT ============================================================================

SELECT 
    table_name,
    index_name,
    column_name,
    column_position
FROM user_ind_columns
WHERE table_name IN (
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES', 'CHAIN_SALESPERSON'
)
ORDER BY table_name, index_name, column_position;

-- ============================================================================
-- PASO 6: Verificar constraints (Foreign Keys)
-- ============================================================================
PROMPT ============================================================================
PROMPT PASO 6: Verificando constraints...
PROMPT ============================================================================

SELECT 
    constraint_name,
    table_name,
    constraint_type,
    status
FROM user_constraints
WHERE table_name IN (
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES', 'CHAIN_SALESPERSON'
)
ORDER BY table_name, constraint_type;

-- ============================================================================
-- FIN DEL SCRIPT MAESTRO
-- ============================================================================
PROMPT ============================================================================
PROMPT Script maestro completado.
PROMPT Si hay errores, revisa los scripts individuales.
PROMPT ============================================================================
