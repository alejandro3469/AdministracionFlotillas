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

    public Task<List<Chain>> BuscarChainsAsync(string? nombre, string? estado)
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

        return Task.FromResult(resultado.ToList());
    }
}
