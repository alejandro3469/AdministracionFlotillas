-- =============================================
-- Paquete de Stored Procedures para PRODUCTS
-- Base de Datos: AdministracionFlotillas
-- Schema: CO
-- =============================================

-- Especificación del Paquete
CREATE OR REPLACE PACKAGE PKG_PRODUCTS AS
    -- Obtener todos los productos
    PROCEDURE SP_OBTENER_PRODUCTS(
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener un producto por ID
    PROCEDURE SP_OBTENER_PRODUCT_POR_ID(
        P_PRODUCT_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Buscar productos con filtros opcionales
    PROCEDURE SP_BUSCAR_PRODUCTS(
        P_CATEGORY IN VARCHAR2 DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_STOCK_MINIMO IN NUMBER DEFAULT NULL,
        P_PRECIO_MINIMO IN NUMBER DEFAULT NULL,
        P_PRECIO_MAXIMO IN NUMBER DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener productos por categoría
    PROCEDURE SP_OBTENER_PRODUCTS_POR_CATEGORIA(
        P_CATEGORY IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener productos con stock bajo
    PROCEDURE SP_OBTENER_PRODUCTS_STOCK_BAJO(
        P_NIVEL_REORDEN IN NUMBER DEFAULT 10,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener productos por estado
    PROCEDURE SP_OBTENER_PRODUCTS_POR_ESTADO(
        P_STATUS IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    );
END PKG_PRODUCTS;
/

-- Cuerpo del Paquete
CREATE OR REPLACE PACKAGE BODY PKG_PRODUCTS AS
    
    PROCEDURE SP_OBTENER_PRODUCTS(
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                P.PRODUCT_ID,
                P.PRODUCT_NAME,
                P.DESCRIPTION,
                P.CATEGORY,
                P.UNIT_PRICE,
                P.STOCK_QUANTITY,
                P.STATUS,
                P.COST_PRICE,
                NVL(P.UNIT_PRICE, 0) - NVL(P.COST_PRICE, 0) AS MARGEN_GANANCIA
            FROM PRODUCTS P
            ORDER BY P.PRODUCT_NAME ASC;
    END SP_OBTENER_PRODUCTS;
    
    PROCEDURE SP_OBTENER_PRODUCT_POR_ID(
        P_PRODUCT_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                P.PRODUCT_ID,
                P.PRODUCT_NAME,
                P.DESCRIPTION,
                P.CATEGORY,
                P.UNIT_PRICE,
                P.STOCK_QUANTITY,
                P.STATUS,
                P.COST_PRICE,
                NVL(P.UNIT_PRICE, 0) - NVL(P.COST_PRICE, 0) AS MARGEN_GANANCIA
            FROM PRODUCTS P
            WHERE P.PRODUCT_ID = P_PRODUCT_ID;
    END SP_OBTENER_PRODUCT_POR_ID;
    
    PROCEDURE SP_BUSCAR_PRODUCTS(
        P_CATEGORY IN VARCHAR2 DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_STOCK_MINIMO IN NUMBER DEFAULT NULL,
        P_PRECIO_MINIMO IN NUMBER DEFAULT NULL,
        P_PRECIO_MAXIMO IN NUMBER DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                P.PRODUCT_ID,
                P.PRODUCT_NAME,
                P.DESCRIPTION,
                P.CATEGORY,
                P.UNIT_PRICE,
                P.STOCK_QUANTITY,
                P.STATUS,
                P.COST_PRICE,
                NVL(P.UNIT_PRICE, 0) - NVL(P.COST_PRICE, 0) AS MARGEN_GANANCIA
            FROM PRODUCTS P
            WHERE (P_CATEGORY IS NULL OR UPPER(P.CATEGORY) = UPPER(P_CATEGORY))
              AND (P_STATUS IS NULL OR UPPER(P.STATUS) = UPPER(P_STATUS))
              AND (P_NOMBRE IS NULL OR UPPER(P.PRODUCT_NAME) LIKE '%' || UPPER(P_NOMBRE) || '%')
              AND (P_STOCK_MINIMO IS NULL OR P.STOCK_QUANTITY >= P_STOCK_MINIMO)
              AND (P_PRECIO_MINIMO IS NULL OR P.UNIT_PRICE >= P_PRECIO_MINIMO)
              AND (P_PRECIO_MAXIMO IS NULL OR P.UNIT_PRICE <= P_PRECIO_MAXIMO)
            ORDER BY P.PRODUCT_NAME ASC;
    END SP_BUSCAR_PRODUCTS;
    
    PROCEDURE SP_OBTENER_PRODUCTS_POR_CATEGORIA(
        P_CATEGORY IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                P.PRODUCT_ID,
                P.PRODUCT_NAME,
                P.DESCRIPTION,
                P.CATEGORY,
                P.UNIT_PRICE,
                P.STOCK_QUANTITY,
                P.STATUS,
                P.COST_PRICE,
                NVL(P.UNIT_PRICE, 0) - NVL(P.COST_PRICE, 0) AS MARGEN_GANANCIA
            FROM PRODUCTS P
            WHERE UPPER(P.CATEGORY) = UPPER(P_CATEGORY)
            ORDER BY P.PRODUCT_NAME ASC;
    END SP_OBTENER_PRODUCTS_POR_CATEGORIA;
    
    PROCEDURE SP_OBTENER_PRODUCTS_STOCK_BAJO(
        P_NIVEL_REORDEN IN NUMBER DEFAULT 10,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                P.PRODUCT_ID,
                P.PRODUCT_NAME,
                P.DESCRIPTION,
                P.CATEGORY,
                P.UNIT_PRICE,
                P.STOCK_QUANTITY,
                P.STATUS,
                P.COST_PRICE,
                NVL(P.UNIT_PRICE, 0) - NVL(P.COST_PRICE, 0) AS MARGEN_GANANCIA
            FROM PRODUCTS P
            WHERE P.STOCK_QUANTITY <= P_NIVEL_REORDEN
              AND P.STATUS = 'ACTIVE'
            ORDER BY P.STOCK_QUANTITY ASC, P.PRODUCT_NAME ASC;
    END SP_OBTENER_PRODUCTS_STOCK_BAJO;
    
    PROCEDURE SP_OBTENER_PRODUCTS_POR_ESTADO(
        P_STATUS IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                P.PRODUCT_ID,
                P.PRODUCT_NAME,
                P.DESCRIPTION,
                P.CATEGORY,
                P.UNIT_PRICE,
                P.STOCK_QUANTITY,
                P.STATUS,
                P.COST_PRICE,
                NVL(P.UNIT_PRICE, 0) - NVL(P.COST_PRICE, 0) AS MARGEN_GANANCIA
            FROM PRODUCTS P
            WHERE UPPER(P.STATUS) = UPPER(P_STATUS)
            ORDER BY P.PRODUCT_NAME ASC;
    END SP_OBTENER_PRODUCTS_POR_ESTADO;
    
END PKG_PRODUCTS;
/
