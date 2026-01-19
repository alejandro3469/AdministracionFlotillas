-- =============================================
-- Otorgar Permisos a FLOTILLAS_APP para Schema CO
-- Ejecutar como usuario CO o como ADMIN
-- =============================================

-- Verificar que estamos en el schema correcto
SELECT sys_context('USERENV', 'CURRENT_SCHEMA') AS current_schema FROM dual;

-- 1. Otorgar permisos para ejecutar stored procedures en PKG_ORDERS
GRANT EXECUTE ON CO.PKG_ORDERS TO FLOTILLAS_APP;

-- 2. Otorgar permisos para leer/escribir en la tabla ORDERS
GRANT SELECT, INSERT, UPDATE, DELETE ON CO.ORDERS TO FLOTILLAS_APP;

-- 3. Crear sinónimos para facilitar el acceso (opcional pero recomendado)
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.ORDERS FOR CO.ORDERS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_ORDERS FOR CO.PKG_ORDERS;

-- =============================================
-- Verificar permisos otorgados
-- =============================================
-- Verificar permisos en tabla ORDERS
SELECT 
    'Permisos en Tabla' AS tipo,
    grantee,
    owner,
    table_name AS objeto,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND table_name = 'ORDERS'
  AND owner = 'CO'
ORDER BY privilege;

-- Verificar permisos en paquete PKG_ORDERS
SELECT 
    'Permisos en Paquete' AS tipo,
    grantee,
    owner,
    table_name AS objeto,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND table_name = 'PKG_ORDERS'
  AND owner = 'CO'
ORDER BY privilege;

-- Verificar sinónimos
SELECT owner, synonym_name, table_owner, table_name
FROM all_synonyms
WHERE owner = 'FLOTILLAS_APP'
  AND synonym_name IN ('ORDERS', 'PKG_ORDERS');

-- =============================================
-- Si los permisos no aparecen, ejecutar como ADMIN:
-- =============================================
/*
-- Conectarse como ADMIN y ejecutar:
GRANT EXECUTE ON CO.PKG_ORDERS TO FLOTILLAS_APP;
GRANT SELECT, INSERT, UPDATE, DELETE ON CO.ORDERS TO FLOTILLAS_APP;
*/
