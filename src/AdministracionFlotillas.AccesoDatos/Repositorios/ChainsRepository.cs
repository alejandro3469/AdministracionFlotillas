using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio de Cadenas Comerciales con datos mock
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class ChainsRepository : IChainsRepository
{
    private readonly List<Chain> _chainsMock = new()
    {
        new Chain
        {
            ChainId = 1,
            ChainName = "Cadena Comercial Norte",
            BusinessName = "Comercial Norte S.A. de C.V.",
            RFC = "CON123456ABC",
            NumberOfStores = 15,
            CreditLimit = 500000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2024, 1, 15),
            ContactEmail = "contacto@comercialnorte.com",
            ContactPhone = "+52 55 1234 5678",
            Address = "Av. Principal 123",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01234",
            Country = "México",
            TotalOrders = 245,
            TotalSales = 1250000.00m
        },
        new Chain
        {
            ChainId = 2,
            ChainName = "Supermercados del Sur",
            BusinessName = "Supermercados del Sur S.A. de C.V.",
            RFC = "SDS789012DEF",
            NumberOfStores = 22,
            CreditLimit = 750000.00m,
            CreditDays = 45,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2023, 8, 20),
            ContactEmail = "ventas@supermercadossur.com",
            ContactPhone = "+52 33 9876 5432",
            Address = "Blvd. Comercial 456",
            City = "Guadalajara",
            State = "Jalisco",
            PostalCode = "44100",
            Country = "México",
            TotalOrders = 389,
            TotalSales = 2100000.00m
        },
        new Chain
        {
            ChainId = 3,
            ChainName = "Tiendas del Centro",
            BusinessName = "Tiendas del Centro S.A. de C.V.",
            RFC = "TDC345678GHI",
            NumberOfStores = 8,
            CreditLimit = 300000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2024, 3, 10),
            ContactEmail = "info@tiendascentro.com",
            ContactPhone = "+52 81 2345 6789",
            Address = "Calle Central 789",
            City = "Monterrey",
            State = "Nuevo León",
            PostalCode = "64000",
            Country = "México",
            TotalOrders = 156,
            TotalSales = 890000.00m
        },
        new Chain
        {
            ChainId = 4,
            ChainName = "Mercados Regionales",
            BusinessName = "Mercados Regionales S.A. de C.V.",
            RFC = "MRE901234JKL",
            NumberOfStores = 12,
            CreditLimit = 400000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2023, 11, 5),
            ContactEmail = "contacto@mercadosregionales.com",
            ContactPhone = "+52 998 1234 567",
            Address = "Av. Regional 321",
            City = "Cancún",
            State = "Quintana Roo",
            PostalCode = "77500",
            Country = "México",
            TotalOrders = 198,
            TotalSales = 1100000.00m
        },
        new Chain
        {
            ChainId = 5,
            ChainName = "Distribuidora Nacional",
            BusinessName = "Distribuidora Nacional S.A. de C.V.",
            RFC = "DIN567890MNO",
            NumberOfStores = 35,
            CreditLimit = 1000000.00m,
            CreditDays = 60,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2022, 6, 15),
            ContactEmail = "ventas@distribuidoranacional.com",
            ContactPhone = "+52 55 5555 1234",
            Address = "Av. Nacional 654",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01234",
            Country = "México",
            TotalOrders = 567,
            TotalSales = 3500000.00m
        },
        new Chain
        {
            ChainId = 6,
            ChainName = "Comercializadora Este",
            BusinessName = "Comercializadora Este S.A. de C.V.",
            RFC = "CES234567PQR",
            NumberOfStores = 18,
            CreditLimit = 600000.00m,
            CreditDays = 45,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2023, 9, 22),
            ContactEmail = "info@comercializadoraeste.com",
            ContactPhone = "+52 222 3456 789",
            Address = "Blvd. Este 987",
            City = "Puebla",
            State = "Puebla",
            PostalCode = "72000",
            Country = "México",
            TotalOrders = 312,
            TotalSales = 1800000.00m
        },
        new Chain
        {
            ChainId = 7,
            ChainName = "Super Tiendas Oeste",
            BusinessName = "Super Tiendas Oeste S.A. de C.V.",
            RFC = "STO678901STU",
            NumberOfStores = 10,
            CreditLimit = 350000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2024, 2, 14),
            ContactEmail = "ventas@supertiendasoeste.com",
            ContactPhone = "+52 664 4567 890",
            Address = "Av. Oeste 147",
            City = "Tijuana",
            State = "Baja California",
            PostalCode = "22000",
            Country = "México",
            TotalOrders = 134,
            TotalSales = 720000.00m
        },
        new Chain
        {
            ChainId = 8,
            ChainName = "Cadena Premium",
            BusinessName = "Cadena Premium S.A. de C.V.",
            RFC = "CPR890123VWX",
            NumberOfStores = 5,
            CreditLimit = 250000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2024, 5, 8),
            ContactEmail = "contacto@cadenapremium.com",
            ContactPhone = "+52 55 9999 8888",
            Address = "Av. Premium 258",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01234",
            Country = "México",
            TotalOrders = 89,
            TotalSales = 450000.00m
        },
        new Chain
        {
            ChainId = 9,
            ChainName = "Mercados Express",
            BusinessName = "Mercados Express S.A. de C.V.",
            RFC = "MEX123456YZA",
            NumberOfStores = 25,
            CreditLimit = 850000.00m,
            CreditDays = 45,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2023, 4, 18),
            ContactEmail = "info@mercadosexpress.com",
            ContactPhone = "+52 33 7777 6666",
            Address = "Blvd. Express 369",
            City = "Guadalajara",
            State = "Jalisco",
            PostalCode = "44100",
            Country = "México",
            TotalOrders = 423,
            TotalSales = 2400000.00m
        },
        new Chain
        {
            ChainId = 10,
            ChainName = "Distribuidora Local",
            BusinessName = "Distribuidora Local S.A. de C.V.",
            RFC = "DIL456789BCD",
            NumberOfStores = 7,
            CreditLimit = 200000.00m,
            CreditDays = 30,
            Status = "INACTIVE",
            RegistrationDate = new DateTime(2023, 12, 1),
            ContactEmail = "contacto@distribuidoralocal.com",
            ContactPhone = "+52 81 8888 7777",
            Address = "Calle Local 741",
            City = "Monterrey",
            State = "Nuevo León",
            PostalCode = "64000",
            Country = "México",
            TotalOrders = 67,
            TotalSales = 380000.00m
        },
        // Escenarios adicionales para pruebas
        new Chain
        {
            ChainId = 11,
            ChainName = "Cadena Suspendida Temporal",
            BusinessName = "Suspendida Temporal S.A. de C.V.",
            RFC = "SUS111111AAA",
            NumberOfStores = 3,
            CreditLimit = 100000.00m,
            CreditDays = 15,
            Status = "SUSPENDED",
            RegistrationDate = new DateTime(2023, 1, 10),
            ContactEmail = "contacto@suspendida.com",
            ContactPhone = "+52 55 1111 1111",
            Address = "Av. Suspendida 111",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01000",
            Country = "México",
            TotalOrders = 12,
            TotalSales = 50000.00m
        },
        new Chain
        {
            ChainId = 12,
            ChainName = "Mega Cadena Nacional",
            BusinessName = "Mega Cadena Nacional S.A. de C.V.",
            RFC = "MCN999999ZZZ",
            NumberOfStores = 100,
            CreditLimit = 5000000.00m,
            CreditDays = 90,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2020, 1, 1),
            ContactEmail = "contacto@megacadena.com",
            ContactPhone = "+52 55 9999 9999",
            Address = "Av. Nacional 9999",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01000",
            Country = "México",
            TotalOrders = 5000,
            TotalSales = 50000000.00m
        },
        new Chain
        {
            ChainId = 13,
            ChainName = "Cadena Nueva Registro",
            BusinessName = "Nueva Registro S.A. de C.V.",
            RFC = "NRE20240101ABC",
            NumberOfStores = 1,
            CreditLimit = 50000.00m,
            CreditDays = 15,
            Status = "ACTIVE",
            RegistrationDate = DateTime.Now.AddDays(-5),
            ContactEmail = "contacto@nuevaregistro.com",
            ContactPhone = "+52 55 2024 0101",
            Address = "Av. Nueva 2024",
            City = "Guadalajara",
            State = "Jalisco",
            PostalCode = "44100",
            Country = "México",
            TotalOrders = 0,
            TotalSales = 0.00m
        },
        new Chain
        {
            ChainId = 14,
            ChainName = "Cadena Sin Órdenes",
            BusinessName = "Sin Órdenes S.A. de C.V.",
            RFC = "SOR000000XYZ",
            NumberOfStores = 2,
            CreditLimit = 75000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2024, 6, 1),
            ContactEmail = "contacto@sinordenes.com",
            ContactPhone = "+52 55 0000 0000",
            Address = "Av. Sin Órdenes 0",
            City = "Monterrey",
            State = "Nuevo León",
            PostalCode = "64000",
            Country = "México",
            TotalOrders = 0,
            TotalSales = 0.00m
        },
        new Chain
        {
            ChainId = 15,
            ChainName = "Cadena Límite Crédito Bajo",
            BusinessName = "Límite Bajo S.A. de C.V.",
            RFC = "LBA100000MIN",
            NumberOfStores = 1,
            CreditLimit = 10000.00m,
            CreditDays = 7,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2024, 1, 1),
            ContactEmail = "contacto@limitebajo.com",
            ContactPhone = "+52 55 1000 0000",
            Address = "Av. Límite 1000",
            City = "Puebla",
            State = "Puebla",
            PostalCode = "72000",
            Country = "México",
            TotalOrders = 5,
            TotalSales = 8000.00m
        },
        new Chain
        {
            ChainId = 16,
            ChainName = "Cadena Antigua",
            BusinessName = "Antigua S.A. de C.V.",
            RFC = "ANT20100101OLD",
            NumberOfStores = 50,
            CreditLimit = 2000000.00m,
            CreditDays = 60,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2010, 1, 1),
            ContactEmail = "contacto@antigua.com",
            ContactPhone = "+52 55 2010 0101",
            Address = "Av. Antigua 2010",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01000",
            Country = "México",
            TotalOrders = 10000,
            TotalSales = 100000000.00m
        },
        new Chain
        {
            ChainId = 17,
            ChainName = "Cadena Crédito Extendido",
            BusinessName = "Crédito Extendido S.A. de C.V.",
            RFC = "CRE120000EXT",
            NumberOfStores = 20,
            CreditLimit = 1500000.00m,
            CreditDays = 120,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2023, 5, 15),
            ContactEmail = "contacto@creditoextendido.com",
            ContactPhone = "+52 55 1200 0000",
            Address = "Av. Crédito 1200",
            City = "Guadalajara",
            State = "Jalisco",
            PostalCode = "44100",
            Country = "México",
            TotalOrders = 800,
            TotalSales = 12000000.00m
        },
        new Chain
        {
            ChainId = 18,
            ChainName = "Cadena Inactiva Reciente",
            BusinessName = "Inactiva Reciente S.A. de C.V.",
            RFC = "INR20240101INA",
            NumberOfStores = 4,
            CreditLimit = 150000.00m,
            CreditDays = 30,
            Status = "INACTIVE",
            RegistrationDate = new DateTime(2023, 10, 1),
            ContactEmail = "contacto@inactivareciente.com",
            ContactPhone = "+52 55 2024 0101",
            Address = "Av. Inactiva 2024",
            City = "Monterrey",
            State = "Nuevo León",
            PostalCode = "64000",
            Country = "México",
            TotalOrders = 45,
            TotalSales = 250000.00m
        },
        new Chain
        {
            ChainId = 19,
            ChainName = "Cadena Múltiples Sucursales",
            BusinessName = "Múltiples Sucursales S.A. de C.V.",
            RFC = "MSU200000MUL",
            NumberOfStores = 200,
            CreditLimit = 10000000.00m,
            CreditDays = 90,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2015, 3, 20),
            ContactEmail = "contacto@multiplessucursales.com",
            ContactPhone = "+52 55 2000 0000",
            Address = "Av. Múltiples 2000",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01000",
            Country = "México",
            TotalOrders = 15000,
            TotalSales = 200000000.00m
        },
        new Chain
        {
            ChainId = 20,
            ChainName = "Cadena Zona Fronteriza",
            BusinessName = "Zona Fronteriza S.A. de C.V.",
            RFC = "ZFR300000FRO",
            NumberOfStores = 6,
            CreditLimit = 300000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2023, 7, 10),
            ContactEmail = "contacto@zonafronteriza.com",
            ContactPhone = "+52 664 3000 0000",
            Address = "Av. Fronteriza 3000",
            City = "Tijuana",
            State = "Baja California",
            PostalCode = "22000",
            Country = "México",
            TotalOrders = 234,
            TotalSales = 1500000.00m
        },
        new Chain
        {
            ChainId = 21,
            ChainName = "Cadena Turística",
            BusinessName = "Turística S.A. de C.V.",
            RFC = "TUR400000TUR",
            NumberOfStores = 8,
            CreditLimit = 400000.00m,
            CreditDays = 30,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2023, 2, 14),
            ContactEmail = "contacto@turistic.com",
            ContactPhone = "+52 998 4000 0000",
            Address = "Av. Turística 4000",
            City = "Cancún",
            State = "Quintana Roo",
            PostalCode = "77500",
            Country = "México",
            TotalOrders = 567,
            TotalSales = 3500000.00m
        },
        new Chain
        {
            ChainId = 22,
            ChainName = "Cadena Industrial",
            BusinessName = "Industrial S.A. de C.V.",
            RFC = "IND500000IND",
            NumberOfStores = 12,
            CreditLimit = 800000.00m,
            CreditDays = 60,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2022, 9, 1),
            ContactEmail = "contacto@industrial.com",
            ContactPhone = "+52 222 5000 0000",
            Address = "Av. Industrial 5000",
            City = "Puebla",
            State = "Puebla",
            PostalCode = "72000",
            Country = "México",
            TotalOrders = 890,
            TotalSales = 7500000.00m
        },
        new Chain
        {
            ChainId = 23,
            ChainName = "Cadena Recién Suspendida",
            BusinessName = "Recién Suspendida S.A. de C.V.",
            RFC = "RSUS600000SUS",
            NumberOfStores = 5,
            CreditLimit = 250000.00m,
            CreditDays = 30,
            Status = "SUSPENDED",
            RegistrationDate = new DateTime(2023, 11, 1),
            ContactEmail = "contacto@reciensuspendida.com",
            ContactPhone = "+52 55 6000 0000",
            Address = "Av. Suspendida 6000",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01000",
            Country = "México",
            TotalOrders = 78,
            TotalSales = 450000.00m
        },
        new Chain
        {
            ChainId = 24,
            ChainName = "Cadena Sin Contacto",
            BusinessName = "Sin Contacto S.A. de C.V.",
            RFC = "SCO700000NOC",
            NumberOfStores = 3,
            CreditLimit = 100000.00m,
            CreditDays = 15,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2024, 4, 1),
            ContactEmail = "",
            ContactPhone = "",
            Address = "Av. Sin Contacto 7000",
            City = "Monterrey",
            State = "Nuevo León",
            PostalCode = "64000",
            Country = "México",
            TotalOrders = 2,
            TotalSales = 15000.00m
        },
        new Chain
        {
            ChainId = 25,
            ChainName = "Cadena Máximo Crédito",
            BusinessName = "Máximo Crédito S.A. de C.V.",
            RFC = "MCR800000MAX",
            NumberOfStores = 75,
            CreditLimit = 10000000.00m,
            CreditDays = 180,
            Status = "ACTIVE",
            RegistrationDate = new DateTime(2018, 6, 1),
            ContactEmail = "contacto@maximocredito.com",
            ContactPhone = "+52 55 8000 0000",
            Address = "Av. Máximo 8000",
            City = "Ciudad de México",
            State = "CDMX",
            PostalCode = "01000",
            Country = "México",
            TotalOrders = 5000,
            TotalSales = 75000000.00m
        }
    };

    public Task<List<Chain>> ObtenerChainsAsync()
    {
        return Task.FromResult(_chainsMock.ToList());
    }

    public Task<Chain?> ObtenerChainPorIdAsync(int idCadena)
    {
        var chain = _chainsMock.FirstOrDefault(c => c.ChainId == idCadena);
        return Task.FromResult(chain);
    }

    public Task<List<Chain>> BuscarChainsAsync(string? nombre = null, string? estado = null, string? rfc = null)
    {
        var resultado = _chainsMock.AsQueryable();

        if (!string.IsNullOrWhiteSpace(nombre))
        {
            resultado = resultado.Where(c => 
                c.ChainName.Contains(nombre, StringComparison.OrdinalIgnoreCase) ||
                c.BusinessName.Contains(nombre, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            resultado = resultado.Where(c => c.Status == estado);
        }

        if (!string.IsNullOrWhiteSpace(rfc))
        {
            resultado = resultado.Where(c => c.RFC.Contains(rfc, StringComparison.OrdinalIgnoreCase));
        }

        return Task.FromResult(resultado.ToList());
    }

    public Task<int> CrearChainAsync(Chain cadena)
    {
        cadena.ChainId = _chainsMock.Any() ? _chainsMock.Max(c => c.ChainId) + 1 : 1;
        cadena.RegistrationDate = DateTime.Now;
        _chainsMock.Add(cadena);
        return Task.FromResult(cadena.ChainId);
    }

    public Task ActualizarChainAsync(Chain cadena)
    {
        var index = _chainsMock.FindIndex(c => c.ChainId == cadena.ChainId);
        if (index != -1)
        {
            _chainsMock[index] = cadena;
        }
        return Task.CompletedTask;
    }

    public Task EliminarChainAsync(int idCadena)
    {
        _chainsMock.RemoveAll(c => c.ChainId == idCadena);
        return Task.CompletedTask;
    }

    public Task<int> ContarChainsActivasAsync()
    {
        return Task.FromResult(_chainsMock.Count(c => c.Status == "ACTIVE"));
    }

    public Task<int> ContarChainsInactivasAsync()
    {
        return Task.FromResult(_chainsMock.Count(c => c.Status == "INACTIVE" || c.Status == "SUSPENDED"));
    }
}
