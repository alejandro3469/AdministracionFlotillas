-- =============================================
-- Paquete de Stored Procedures para CUSTOMERS
-- Base de Datos: AdministracionFlotillas
-- Schema: CO
-- =============================================

-- Especificación del Paquete
CREATE OR REPLACE PACKAGE PKG_CUSTOMERS AS
    -- Obtener todos los clientes
    PROCEDURE SP_OBTENER_CUSTOMERS(
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener un cliente por ID
    PROCEDURE SP_OBTENER_CUSTOMER_POR_ID(
        P_CUSTOMER_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Buscar clientes con filtros opcionales
    PROCEDURE SP_BUSCAR_CUSTOMERS(
        P_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_CIUDAD IN VARCHAR2 DEFAULT NULL,
        P_ESTADO IN VARCHAR2 DEFAULT NULL,
        P_PAIS IN VARCHAR2 DEFAULT NULL,
        P_LIMITE_CREDITO_MINIMO IN NUMBER DEFAULT NULL,
        P_LIMITE_CREDITO_MAXIMO IN NUMBER DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener clientes por estado
    PROCEDURE SP_OBTENER_CUSTOMERS_POR_ESTADO(
        P_STATUS IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener clientes por ciudad
    PROCEDURE SP_OBTENER_CUSTOMERS_POR_CIUDAD(
        P_CIUDAD IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener clientes activos con límite de crédito
    PROCEDURE SP_OBTENER_CUSTOMERS_CON_LIMITE_CREDITO(
        P_LIMITE_MINIMO IN NUMBER DEFAULT 0,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener clientes por rango de fechas de registro
    PROCEDURE SP_OBTENER_CUSTOMERS_POR_RANGO_FECHAS(
        P_FECHA_INICIO IN DATE,
        P_FECHA_FIN IN DATE,
        P_RESULTADO OUT SYS_REFCURSOR
    );
END PKG_CUSTOMERS;
/

-- Cuerpo del Paquete
CREATE OR REPLACE PACKAGE BODY PKG_CUSTOMERS AS
    
    PROCEDURE SP_OBTENER_CUSTOMERS(
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                C.CUSTOMER_ID,
                C.CUSTOMER_NAME,
                C.EMAIL,
                C.PHONE,
                C.ADDRESS,
                C.CITY,
                C.STATE,
                C.ZIP_CODE,
                C.COUNTRY,
                C.STATUS,
                C.REGISTRATION_DATE,
                C.CREDIT_LIMIT
            FROM CUSTOMERS C
            ORDER BY C.CUSTOMER_NAME ASC;
    END SP_OBTENER_CUSTOMERS;
    
    PROCEDURE SP_OBTENER_CUSTOMER_POR_ID(
        P_CUSTOMER_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                C.CUSTOMER_ID,
                C.CUSTOMER_NAME,
                C.EMAIL,
                C.PHONE,
                C.ADDRESS,
                C.CITY,
                C.STATE,
                C.ZIP_CODE,
                C.COUNTRY,
                C.STATUS,
                C.REGISTRATION_DATE,
                C.CREDIT_LIMIT
            FROM CUSTOMERS C
            WHERE C.CUSTOMER_ID = P_CUSTOMER_ID;
    END SP_OBTENER_CUSTOMER_POR_ID;
    
    PROCEDURE SP_BUSCAR_CUSTOMERS(
        P_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_CIUDAD IN VARCHAR2 DEFAULT NULL,
        P_ESTADO IN VARCHAR2 DEFAULT NULL,
        P_PAIS IN VARCHAR2 DEFAULT NULL,
        P_LIMITE_CREDITO_MINIMO IN NUMBER DEFAULT NULL,
        P_LIMITE_CREDITO_MAXIMO IN NUMBER DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                C.CUSTOMER_ID,
                C.CUSTOMER_NAME,
                C.EMAIL,
                C.PHONE,
                C.ADDRESS,
                C.CITY,
                C.STATE,
                C.ZIP_CODE,
                C.COUNTRY,
                C.STATUS,
                C.REGISTRATION_DATE,
                C.CREDIT_LIMIT
            FROM CUSTOMERS C
            WHERE (P_NOMBRE IS NULL OR UPPER(C.CUSTOMER_NAME) LIKE '%' || UPPER(P_NOMBRE) || '%')
              AND (P_STATUS IS NULL OR UPPER(C.STATUS) = UPPER(P_STATUS))
              AND (P_CIUDAD IS NULL OR UPPER(C.CITY) = UPPER(P_CIUDAD))
              AND (P_ESTADO IS NULL OR UPPER(C.STATE) = UPPER(P_ESTADO))
              AND (P_PAIS IS NULL OR UPPER(C.COUNTRY) = UPPER(P_PAIS))
              AND (P_LIMITE_CREDITO_MINIMO IS NULL OR NVL(C.CREDIT_LIMIT, 0) >= P_LIMITE_CREDITO_MINIMO)
              AND (P_LIMITE_CREDITO_MAXIMO IS NULL OR NVL(C.CREDIT_LIMIT, 0) <= P_LIMITE_CREDITO_MAXIMO)
            ORDER BY C.CUSTOMER_NAME ASC;
    END SP_BUSCAR_CUSTOMERS;
    
    PROCEDURE SP_OBTENER_CUSTOMERS_POR_ESTADO(
        P_STATUS IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                C.CUSTOMER_ID,
                C.CUSTOMER_NAME,
                C.EMAIL,
                C.PHONE,
                C.ADDRESS,
                C.CITY,
                C.STATE,
                C.ZIP_CODE,
                C.COUNTRY,
                C.STATUS,
                C.REGISTRATION_DATE,
                C.CREDIT_LIMIT
            FROM CUSTOMERS C
            WHERE UPPER(C.STATUS) = UPPER(P_STATUS)
            ORDER BY C.CUSTOMER_NAME ASC;
    END SP_OBTENER_CUSTOMERS_POR_ESTADO;
    
    PROCEDURE SP_OBTENER_CUSTOMERS_POR_CIUDAD(
        P_CIUDAD IN VARCHAR2,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                C.CUSTOMER_ID,
                C.CUSTOMER_NAME,
                C.EMAIL,
                C.PHONE,
                C.ADDRESS,
                C.CITY,
                C.STATE,
                C.ZIP_CODE,
                C.COUNTRY,
                C.STATUS,
                C.REGISTRATION_DATE,
                C.CREDIT_LIMIT
            FROM CUSTOMERS C
            WHERE UPPER(C.CITY) = UPPER(P_CIUDAD)
            ORDER BY C.CUSTOMER_NAME ASC;
    END SP_OBTENER_CUSTOMERS_POR_CIUDAD;
    
    PROCEDURE SP_OBTENER_CUSTOMERS_CON_LIMITE_CREDITO(
        P_LIMITE_MINIMO IN NUMBER DEFAULT 0,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                C.CUSTOMER_ID,
                C.CUSTOMER_NAME,
                C.EMAIL,
                C.PHONE,
                C.ADDRESS,
                C.CITY,
                C.STATE,
                C.ZIP_CODE,
                C.COUNTRY,
                C.STATUS,
                C.REGISTRATION_DATE,
                C.CREDIT_LIMIT
            FROM CUSTOMERS C
            WHERE C.STATUS = 'ACTIVE'
              AND NVL(C.CREDIT_LIMIT, 0) >= P_LIMITE_MINIMO
            ORDER BY C.CREDIT_LIMIT DESC, C.CUSTOMER_NAME ASC;
    END SP_OBTENER_CUSTOMERS_CON_LIMITE_CREDITO;
    
    PROCEDURE SP_OBTENER_CUSTOMERS_POR_RANGO_FECHAS(
        P_FECHA_INICIO IN DATE,
        P_FECHA_FIN IN DATE,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                C.CUSTOMER_ID,
                C.CUSTOMER_NAME,
                C.EMAIL,
                C.PHONE,
                C.ADDRESS,
                C.CITY,
                C.STATE,
                C.ZIP_CODE,
                C.COUNTRY,
                C.STATUS,
                C.REGISTRATION_DATE,
                C.CREDIT_LIMIT
            FROM CUSTOMERS C
            WHERE C.REGISTRATION_DATE >= P_FECHA_INICIO
              AND C.REGISTRATION_DATE <= P_FECHA_FIN
            ORDER BY C.REGISTRATION_DATE DESC, C.CUSTOMER_NAME ASC;
    END SP_OBTENER_CUSTOMERS_POR_RANGO_FECHAS;
    
END PKG_CUSTOMERS;
/
