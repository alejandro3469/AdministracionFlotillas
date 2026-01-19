-- =============================================
-- VERIFICACIÓN FINAL - Después de Ejecutar la Corrección
-- =============================================

-- 1. Verificar estado del paquete
SELECT owner, object_name, object_type, status, last_ddl_time
FROM all_objects
WHERE object_name = 'PKG_ORDERS'
ORDER BY owner;

-- STATUS debe ser 'VALID' ✅

-- 2. Ver el código del SP_BUSCAR_ORDERS (buscar la parte crítica)
SELECT line, text
FROM all_source
WHERE owner = 'CO'
  AND name = 'PKG_ORDERS'
  AND type = 'PACKAGE BODY'
  AND (
    UPPER(text) LIKE '%SP_BUSCAR_ORDERS%' 
    OR UPPER(text) LIKE '%P_CUSTOMER_ID IS NULL%'
    OR UPPER(text) LIKE '%OPEN P_RESULTADO FOR%'
  )
ORDER BY line;

-- 3. Verificar que NO existe SQL dinámico con USING (debe estar vacío)
SELECT '⚠️ ADVERTENCIA: Aún existe SQL dinámico con USING' AS advertencia
FROM all_source
WHERE owner = 'CO'
  AND name = 'PKG_ORDERS'
  AND type = 'PACKAGE BODY'
  AND UPPER(text) LIKE '%USING%'
  AND UPPER(text) LIKE '%P_CUSTOMER_ID%'
HAVING COUNT(*) > 0;

-- Si no devuelve resultados, está bien ✅

-- 4. Verificar permisos de FLOTILLAS_APP
SELECT 
    'Permisos en Tabla' AS tipo,
    grantee,
    owner,
    table_name AS objeto,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND table_name = 'ORDERS'
UNION ALL
SELECT 
    'Permisos en Paquete' AS tipo,
    grantee,
    owner,
    name AS objeto,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND name = 'PKG_ORDERS'
ORDER BY tipo, objeto, privilege;

-- 5. Verificar sinónimos
SELECT owner, synonym_name, table_owner, table_name
FROM all_synonyms
WHERE owner = 'FLOTILLAS_APP'
  AND synonym_name IN ('ORDERS', 'PKG_ORDERS');

-- 6. PRUEBA FINAL: Ejecutar el stored procedure
SET SERVEROUTPUT ON;

DECLARE
    v_cursor SYS_REFCURSOR;
    v_order_id NUMBER;
    v_order_tms TIMESTAMP;
    v_customer_id NUMBER;
    v_order_status VARCHAR2(20);
    v_store_id NUMBER;
    v_count NUMBER := 0;
    v_error_occurred BOOLEAN := FALSE;
BEGIN
    DBMS_OUTPUT.PUT_LINE('========================================');
    DBMS_OUTPUT.PUT_LINE('PRUEBA 1: Sin filtros');
    DBMS_OUTPUT.PUT_LINE('========================================');
    
    BEGIN
        PKG_ORDERS.SP_BUSCAR_ORDERS(
            P_CUSTOMER_ID => NULL,
            P_STORE_ID => NULL,
            P_STATUS => NULL,
            P_FECHA_INICIO => NULL,
            P_FECHA_FIN => NULL,
            P_RESULTADO => v_cursor
        );
        
        LOOP
            FETCH v_cursor INTO v_order_id, v_order_tms, v_customer_id, v_order_status, v_store_id;
            EXIT WHEN v_cursor%NOTFOUND;
            v_count := v_count + 1;
            IF v_count <= 5 THEN
                DBMS_OUTPUT.PUT_LINE('  Orden ' || v_count || ': ID=' || v_order_id || ', Estado=' || v_order_status);
            END IF;
        END LOOP;
        CLOSE v_cursor;
        
        DBMS_OUTPUT.PUT_LINE('✅ PRUEBA 1 EXITOSA: ' || v_count || ' órdenes encontradas');
        
    EXCEPTION
        WHEN OTHERS THEN
            v_error_occurred := TRUE;
            DBMS_OUTPUT.PUT_LINE('❌ PRUEBA 1 FALLÓ');
            DBMS_OUTPUT.PUT_LINE('   Error: ' || SQLERRM);
            DBMS_OUTPUT.PUT_LINE('   Código: ' || SQLCODE);
            IF SQLCODE = -1006 THEN
                DBMS_OUTPUT.PUT_LINE('   ⚠️ ERROR ORA-01006: Bind variable does not exist');
                DBMS_OUTPUT.PUT_LINE('   ⚠️ El stored procedure NO está corregido');
            END IF;
    END;
    
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('========================================');
    DBMS_OUTPUT.PUT_LINE('PRUEBA 2: Con filtro de estado');
    DBMS_OUTPUT.PUT_LINE('========================================');
    
    v_count := 0;
    BEGIN
        PKG_ORDERS.SP_BUSCAR_ORDERS(
            P_CUSTOMER_ID => NULL,
            P_STORE_ID => NULL,
            P_STATUS => 'COMPLETE',
            P_FECHA_INICIO => NULL,
            P_FECHA_FIN => NULL,
            P_RESULTADO => v_cursor
        );
        
        LOOP
            FETCH v_cursor INTO v_order_id, v_order_tms, v_customer_id, v_order_status, v_store_id;
            EXIT WHEN v_cursor%NOTFOUND;
            v_count := v_count + 1;
        END LOOP;
        CLOSE v_cursor;
        
        DBMS_OUTPUT.PUT_LINE('✅ PRUEBA 2 EXITOSA: ' || v_count || ' órdenes COMPLETE encontradas');
        
    EXCEPTION
        WHEN OTHERS THEN
            v_error_occurred := TRUE;
            DBMS_OUTPUT.PUT_LINE('❌ PRUEBA 2 FALLÓ');
            DBMS_OUTPUT.PUT_LINE('   Error: ' || SQLERRM);
            DBMS_OUTPUT.PUT_LINE('   Código: ' || SQLCODE);
            IF SQLCODE = -1006 THEN
                DBMS_OUTPUT.PUT_LINE('   ⚠️ ERROR ORA-01006: Bind variable does not exist');
                DBMS_OUTPUT.PUT_LINE('   ⚠️ El stored procedure NO está corregido');
            END IF;
    END;
    
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('========================================');
    IF v_error_occurred THEN
        DBMS_OUTPUT.PUT_LINE('❌ RESULTADO: Hay errores - Revisar arriba');
    ELSE
        DBMS_OUTPUT.PUT_LINE('✅ RESULTADO: Todas las pruebas pasaron');
        DBMS_OUTPUT.PUT_LINE('✅ El stored procedure está CORREGIDO');
        DBMS_OUTPUT.PUT_LINE('✅ NO hay error ORA-01006');
    END IF;
    DBMS_OUTPUT.PUT_LINE('========================================');
    
END;
/
