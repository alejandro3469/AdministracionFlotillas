-- =============================================
-- VERIFICAR QUE LA CORRECCIÓN SE APLICÓ CORRECTAMENTE
-- =============================================

-- 1. Verificar que el paquete está válido
SELECT owner, object_name, object_type, status
FROM all_objects
WHERE object_name = 'PKG_ORDERS'
ORDER BY owner;

-- Si STATUS = 'VALID', el paquete está correcto ✅
-- Si STATUS = 'INVALID', hay un error ❌

-- 2. Ver el código completo del stored procedure SP_BUSCAR_ORDERS
SELECT line, text
FROM all_source
WHERE owner = 'CO'
  AND name = 'PKG_ORDERS'
  AND type = 'PACKAGE BODY'
  AND UPPER(text) LIKE '%SP_BUSCAR_ORDERS%'
ORDER BY line;

-- 3. Verificar que la consulta estática está presente (sin USING)
SELECT line, text
FROM all_source
WHERE owner = 'CO'
  AND name = 'PKG_ORDERS'
  AND type = 'PACKAGE BODY'
  AND line BETWEEN 40 AND 100
ORDER BY line;

-- 4. Buscar si todavía existe SQL dinámico con USING (debería estar vacío)
SELECT line, text
FROM all_source
WHERE owner = 'CO'
  AND name = 'PKG_ORDERS'
  AND type = 'PACKAGE BODY'
  AND UPPER(text) LIKE '%USING%'
ORDER BY line;

-- 5. Verificar que la consulta estática con NULLs está presente
SELECT line, text
FROM all_source
WHERE owner = 'CO'
  AND name = 'PKG_ORDERS'
  AND type = 'PACKAGE BODY'
  AND (UPPER(text) LIKE '%P_CUSTOMER_ID IS NULL%' 
       OR UPPER(text) LIKE '%P_STORE_ID IS NULL%'
       OR UPPER(text) LIKE '%P_STATUS IS NULL%')
ORDER BY line;

-- 6. Probar el stored procedure directamente
DECLARE
    v_cursor SYS_REFCURSOR;
    v_order_id NUMBER;
    v_order_tms TIMESTAMP;
    v_customer_id NUMBER;
    v_order_status VARCHAR2(20);
    v_store_id NUMBER;
    v_count NUMBER := 0;
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
    
    -- Contar resultados
    LOOP
        FETCH v_cursor INTO v_order_id, v_order_tms, v_customer_id, v_order_status, v_store_id;
        EXIT WHEN v_cursor%NOTFOUND;
        v_count := v_count + 1;
    END LOOP;
    CLOSE v_cursor;
    
    DBMS_OUTPUT.PUT_LINE('✅ SP_BUSCAR_ORDERS sin filtros: ' || v_count || ' órdenes encontradas');
    
    -- Probar con filtro de estado
    v_count := 0;
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
    
    DBMS_OUTPUT.PUT_LINE('✅ SP_BUSCAR_ORDERS con filtro COMPLETE: ' || v_count || ' órdenes encontradas');
    DBMS_OUTPUT.PUT_LINE('✅ El stored procedure funciona correctamente - NO hay error ORA-01006');
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('❌ Error: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('   Código: ' || SQLCODE);
        IF SQLCODE = -1006 THEN
            DBMS_OUTPUT.PUT_LINE('   ⚠️ Este es el error ORA-01006 - El stored procedure NO está corregido');
        END IF;
END;
/

-- 7. Verificar permisos de FLOTILLAS_APP
SELECT 
    grantee,
    owner,
    table_name,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND table_name IN ('ORDERS', 'PKG_ORDERS')
ORDER BY table_name, privilege;

SELECT 
    grantee,
    owner,
    name,
    type,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND name = 'PKG_ORDERS'
ORDER BY privilege;
