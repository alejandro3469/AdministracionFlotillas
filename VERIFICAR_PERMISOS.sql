-- =============================================
-- VERIFICAR PERMISOS DE FLOTILLAS_APP
-- =============================================

-- 1. Verificar permisos en tabla ORDERS
SELECT 
    'Permisos en Tabla ORDERS' AS tipo,
    grantee,
    owner,
    table_name AS objeto,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND table_name = 'ORDERS'
  AND owner = 'CO'
ORDER BY privilege;

-- 2. Verificar permisos en paquete PKG_ORDERS
SELECT 
    'Permisos en Paquete PKG_ORDERS' AS tipo,
    grantee,
    owner,
    table_name AS objeto,
    privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND table_name = 'PKG_ORDERS'
  AND owner = 'CO'
ORDER BY privilege;

-- 3. Verificar sinónimos creados
SELECT 
    owner,
    synonym_name,
    table_owner,
    table_name,
    db_link
FROM all_synonyms
WHERE owner = 'FLOTILLAS_APP'
  AND synonym_name IN ('ORDERS', 'PKG_ORDERS')
ORDER BY synonym_name;

-- 4. Verificar roles del usuario
SELECT 
    grantee,
    granted_role,
    admin_option,
    default_role
FROM dba_role_privs
WHERE grantee = 'FLOTILLAS_APP'
ORDER BY granted_role;

-- 5. Resumen de permisos
SELECT 
    'RESUMEN' AS tipo,
    COUNT(*) AS total_permisos,
    LISTAGG(privilege, ', ') WITHIN GROUP (ORDER BY privilege) AS privilegios
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND owner = 'CO'
  AND table_name IN ('ORDERS', 'PKG_ORDERS');
