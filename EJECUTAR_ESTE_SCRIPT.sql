-- =============================================
-- ⚠️ EJECUTAR ESTE SCRIPT PRIMERO ⚠️
-- =============================================
-- Este script corrige el error ORA-01006 en SP_BUSCAR_ORDERS
-- 
-- INSTRUCCIONES:
-- 1. Conectarse a Oracle Database Actions
-- 2. Abrir SQL Worksheet
-- 3. Ejecutar este script completo como usuario CO o ADMIN
-- 4. Verificar que no haya errores
-- =============================================

-- Verificar schema actual
SELECT sys_context('USERENV', 'CURRENT_SCHEMA') AS current_schema FROM dual;

-- Verificar que el paquete existe
SELECT owner, object_name, object_type, status
FROM all_objects
WHERE object_name = 'PKG_ORDERS'
ORDER BY owner;

-- =============================================
-- CORREGIR SP_BUSCAR_ORDERS
-- =============================================
-- Reemplazar el cuerpo del paquete con la versión corregida
CREATE OR REPLACE PACKAGE BODY PKG_ORDERS AS
    
    PROCEDURE SP_OBTENER_ORDERS(
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                O.ORDER_ID,
                O.ORDER_TMS,
                O.CUSTOMER_ID,
                O.ORDER_STATUS,
                O.STORE_ID
            FROM ORDERS O
            ORDER BY O.ORDER_TMS DESC;
    END SP_OBTENER_ORDERS;
    
    PROCEDURE SP_OBTENER_ORDER_POR_ID(
        P_ORDER_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                O.ORDER_ID,
                O.ORDER_TMS,
                O.CUSTOMER_ID,
                O.ORDER_STATUS,
                O.STORE_ID
            FROM ORDERS O
            WHERE O.ORDER_ID = P_ORDER_ID;
    END SP_OBTENER_ORDER_POR_ID;
    
    PROCEDURE SP_BUSCAR_ORDERS(
        P_CUSTOMER_ID IN NUMBER DEFAULT NULL,
        P_STORE_ID IN NUMBER DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_FECHA_INICIO IN TIMESTAMP DEFAULT NULL,
        P_FECHA_FIN IN TIMESTAMP DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        -- ✅ CORRECCIÓN: Usar consulta estática que maneja NULLs correctamente
        -- Esto evita el error ORA-01006 con bind variables
        OPEN P_RESULTADO FOR
            SELECT 
                O.ORDER_ID,
                O.ORDER_TMS,
                O.CUSTOMER_ID,
                O.ORDER_STATUS,
                O.STORE_ID
            FROM ORDERS O
            WHERE (P_CUSTOMER_ID IS NULL OR O.CUSTOMER_ID = P_CUSTOMER_ID)
              AND (P_STORE_ID IS NULL OR O.STORE_ID = P_STORE_ID)
              AND (P_STATUS IS NULL OR O.ORDER_STATUS = P_STATUS)
              AND (P_FECHA_INICIO IS NULL OR O.ORDER_TMS >= P_FECHA_INICIO)
              AND (P_FECHA_FIN IS NULL OR O.ORDER_TMS <= P_FECHA_FIN)
            ORDER BY O.ORDER_TMS DESC;
    END SP_BUSCAR_ORDERS;
    
    PROCEDURE SP_OBTENER_ORDERS_POR_RANGO_FECHAS(
        P_FECHA_INICIO IN TIMESTAMP,
        P_FECHA_FIN IN TIMESTAMP,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                O.ORDER_ID,
                O.ORDER_TMS,
                O.CUSTOMER_ID,
                O.ORDER_STATUS,
                O.STORE_ID
            FROM ORDERS O
            WHERE O.ORDER_TMS >= P_FECHA_INICIO
              AND O.ORDER_TMS <= P_FECHA_FIN
            ORDER BY O.ORDER_TMS DESC;
    END SP_OBTENER_ORDERS_POR_RANGO_FECHAS;
    
END PKG_ORDERS;
/

-- =============================================
-- VERIFICACIÓN
-- =============================================
-- Verificar que el paquete se compiló correctamente
SELECT owner, object_name, object_type, status
FROM all_objects
WHERE object_name = 'PKG_ORDERS'
ORDER BY owner;

-- Si STATUS = 'VALID', el paquete está correcto
-- Si STATUS = 'INVALID', hay un error de compilación

-- Verificar el código del stored procedure corregido
SELECT text 
FROM all_source 
WHERE owner = USER
  AND name = 'PKG_ORDERS' 
  AND type = 'PACKAGE BODY'
  AND line BETWEEN 73 AND 98
ORDER BY line;

-- =============================================
-- PRUEBA RÁPIDA (Opcional)
-- =============================================
-- Descomentar para probar el stored procedure
/*
DECLARE
    v_cursor SYS_REFCURSOR;
    v_order_id NUMBER;
    v_order_tms TIMESTAMP;
    v_customer_id NUMBER;
    v_order_status VARCHAR2(20);
    v_store_id NUMBER;
BEGIN
    -- Probar sin filtros
    PKG_ORDERS.SP_BUSCAR_ORDERS(
        P_CUSTOMER_ID => NULL,
        P_STORE_ID => NULL,
        P_STATUS => NULL,
        P_FECHA_INICIO => NULL,
        P_FECHA_FIN => NULL,
        P_RESULTADO => v_cursor
    );
    
    DBMS_OUTPUT.PUT_LINE('✅ SP_BUSCAR_ORDERS ejecutado correctamente');
    
    -- Probar con filtro de estado
    PKG_ORDERS.SP_BUSCAR_ORDERS(
        P_CUSTOMER_ID => NULL,
        P_STORE_ID => NULL,
        P_STATUS => 'COMPLETE',
        P_FECHA_INICIO => NULL,
        P_FECHA_FIN => NULL,
        P_RESULTADO => v_cursor
    );
    
    DBMS_OUTPUT.PUT_LINE('✅ SP_BUSCAR_ORDERS con filtro ejecutado correctamente');
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('❌ Error: ' || SQLERRM);
END;
/
*/

-- =============================================
-- FIN DEL SCRIPT
-- =============================================
-- Si no hay errores, el stored procedure está corregido
-- Reinicia la aplicación y prueba los filtros
