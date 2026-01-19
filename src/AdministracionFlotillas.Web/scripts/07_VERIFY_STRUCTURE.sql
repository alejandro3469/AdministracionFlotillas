-- ============================================================================
-- Script: Verificar Estructura y Datos de la Base de Datos
-- Descripción: Verifica que todas las tablas existan y tengan datos
-- Schema: CO (Customer Orders)
-- ============================================================================

ALTER SESSION SET CURRENT_SCHEMA = CO;

-- ============================================================================
-- 1. Verificar existencia de tablas
-- ============================================================================
PROMPT ============================================================================
PROMPT 1. VERIFICANDO EXISTENCIA DE TABLAS
PROMPT ============================================================================

SELECT 
    CASE 
        WHEN COUNT(*) = 14 THEN '✓ Todas las tablas existen'
        ELSE '✗ Faltan algunas tablas: ' || COUNT(*) || ' encontradas de 14 esperadas'
    END AS ESTADO,
    COUNT(*) AS TABLAS_ENCONTRADAS
FROM user_tables
WHERE table_name IN (
    'ORDERS', 'ORDER_ITEMS', 'CUSTOMERS', 'PRODUCTS', 
    'STORES', 'SHIPMENTS', 'INVENTORY',
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES', 'CHAIN_SALESPERSON'
);

SELECT table_name, num_rows 
FROM user_tables
WHERE table_name IN (
    'ORDERS', 'ORDER_ITEMS', 'CUSTOMERS', 'PRODUCTS', 
    'STORES', 'SHIPMENTS', 'INVENTORY',
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES', 'CHAIN_SALESPERSON'
)
ORDER BY table_name;

-- ============================================================================
-- 2. Contar registros en cada tabla
-- ============================================================================
PROMPT ============================================================================
PROMPT 2. CONTANDO REGISTROS EN CADA TABLA
PROMPT ============================================================================

SELECT 
    'CUSTOMERS' AS TABLA, 
    COUNT(*) AS REGISTROS,
    CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END AS ESTADO
FROM CO.CUSTOMERS
UNION ALL
SELECT 'ORDERS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.ORDERS
UNION ALL
SELECT 'ORDER_ITEMS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.ORDER_ITEMS
UNION ALL
SELECT 'PRODUCTS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.PRODUCTS
UNION ALL
SELECT 'STORES', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.STORES
UNION ALL
SELECT 'SHIPMENTS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.SHIPMENTS
UNION ALL
SELECT 'INVENTORY', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.INVENTORY
UNION ALL
SELECT 'CHAINS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.CHAINS
UNION ALL
SELECT 'SALESPERSONS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.SALESPERSONS
UNION ALL
SELECT 'ROUTES', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.ROUTES
UNION ALL
SELECT 'ADDENDUMS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.ADDENDUMS
UNION ALL
SELECT 'ORDER_CHANNELS', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.ORDER_CHANNELS
UNION ALL
SELECT 'INVOICES', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.INVOICES
UNION ALL
SELECT 'CHAIN_SALESPERSON', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✓' ELSE '✗' END FROM CO.CHAIN_SALESPERSON
ORDER BY TABLA;

-- ============================================================================
-- 3. Verificar estructura de nuevas tablas
-- ============================================================================
PROMPT ============================================================================
PROMPT 3. VERIFICANDO ESTRUCTURA DE NUEVAS TABLAS
PROMPT ============================================================================

-- CHAINS
PROMPT --- Tabla: CHAINS ---
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'CHAINS'
ORDER BY column_id;

-- SALESPERSONS
PROMPT --- Tabla: SALESPERSONS ---
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'SALESPERSONS'
ORDER BY column_id;

-- ROUTES
PROMPT --- Tabla: ROUTES ---
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'ROUTES'
ORDER BY column_id;

-- ADDENDUMS
PROMPT --- Tabla: ADDENDUMS ---
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'ADDENDUMS'
ORDER BY column_id;

-- ORDER_CHANNELS
PROMPT --- Tabla: ORDER_CHANNELS ---
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'ORDER_CHANNELS'
ORDER BY column_id;

-- INVOICES
PROMPT --- Tabla: INVOICES ---
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'INVOICES'
ORDER BY column_id;

-- ============================================================================
-- 4. Verificar índices
-- ============================================================================
PROMPT ============================================================================
PROMPT 4. VERIFICANDO ÍNDICES
PROMPT ============================================================================

SELECT 
    table_name,
    index_name,
    LISTAGG(column_name, ', ') WITHIN GROUP (ORDER BY column_position) AS COLUMNAS
FROM user_ind_columns
WHERE table_name IN (
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES', 'CHAIN_SALESPERSON'
)
GROUP BY table_name, index_name
ORDER BY table_name, index_name;

-- ============================================================================
-- 5. Verificar constraints (Foreign Keys)
-- ============================================================================
PROMPT ============================================================================
PROMPT 5. VERIFICANDO CONSTRAINTS (FOREIGN KEYS)
PROMPT ============================================================================

SELECT 
    uc.constraint_name,
    uc.table_name,
    uc.constraint_type,
    uc.status,
    ucc.column_name,
    uc.r_constraint_name AS REFERENCED_CONSTRAINT
FROM user_constraints uc
LEFT JOIN user_cons_columns ucc ON uc.constraint_name = ucc.constraint_name
WHERE uc.table_name IN (
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES', 'CHAIN_SALESPERSON'
)
AND uc.constraint_type IN ('P', 'R', 'C')
ORDER BY uc.table_name, uc.constraint_type;

-- ============================================================================
-- 6. Verificar triggers
-- ============================================================================
PROMPT ============================================================================
PROMPT 6. VERIFICANDO TRIGGERS
PROMPT ============================================================================

SELECT 
    trigger_name,
    table_name,
    triggering_event,
    status
FROM user_triggers
WHERE table_name IN (
    'CHAINS', 'SALESPERSONS', 'ROUTES', 'ADDENDUMS', 
    'ORDER_CHANNELS', 'INVOICES'
)
ORDER BY table_name, trigger_name;

-- ============================================================================
-- 7. Verificar datos de ejemplo
-- ============================================================================
PROMPT ============================================================================
PROMPT 7. MOSTRANDO DATOS DE EJEMPLO
PROMPT ============================================================================

PROMPT --- Primeras 3 Cadenas ---
SELECT CHAIN_ID, CHAIN_NAME, STATUS, NUMBER_OF_STORES, CREDIT_LIMIT
FROM CO.CHAINS
WHERE ROWNUM <= 3
ORDER BY CHAIN_ID;

PROMPT --- Primeros 3 Vendedores ---
SELECT SALESPERSON_ID, FULL_NAME, STATUS, COVERAGE_ZONE, BASE_COMMISSION
FROM CO.SALESPERSONS
WHERE ROWNUM <= 3
ORDER BY SALESPERSON_ID;

PROMPT --- Primeras 3 Rutas ---
SELECT ROUTE_ID, ROUTE_NAME, STATUS, GEOGRAPHIC_ZONE, ESTIMATED_TIME
FROM CO.ROUTES
WHERE ROWNUM <= 3
ORDER BY ROUTE_ID;

PROMPT --- Primeras 3 Adendas ---
SELECT ADDENDUM_ID, ADDENDUM_NAME, CHAIN_ID, STATUS, SPECIAL_DISCOUNT
FROM CO.ADDENDUMS
WHERE ROWNUM <= 3
ORDER BY ADDENDUM_ID;

PROMPT --- Canales de Pedidos ---
SELECT CHANNEL_ID, CHANNEL_NAME, CHANNEL_TYPE, STATUS, TOTAL_ORDERS
FROM CO.ORDER_CHANNELS
ORDER BY CHANNEL_ID;

PROMPT --- Primeras 3 Facturas ---
SELECT INVOICE_ID, ORDER_ID, FOLIO, STATUS, TOTAL
FROM CO.INVOICES
WHERE ROWNUM <= 3
ORDER BY INVOICE_ID;

-- ============================================================================
-- FIN DEL SCRIPT DE VERIFICACIÓN
-- ============================================================================
PROMPT ============================================================================
PROMPT Verificación completada.
PROMPT Revisa los resultados anteriores para confirmar que todo está correcto.
PROMPT ============================================================================
