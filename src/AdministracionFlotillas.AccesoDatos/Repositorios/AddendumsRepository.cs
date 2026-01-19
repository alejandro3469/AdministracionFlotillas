using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio de Adendas con datos mock
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class AddendumsRepository : IAddendumsRepository
{
    private readonly List<Addendum> _addendumsMock = new()
    {
        new Addendum
        {
            AddendumId = 1,
            ChainId = 1,
            ChainName = "Cadena Comercial Norte",
            AddendumName = "Contrato Anual 2024",
            SpecialDiscount = 10.0m,
            CreditDays = 45,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Descuento del 10% en productos seleccionados, crédito extendido a 45 días",
            CreationDate = new DateTime(2023, 12, 15),
            LastRenewalDate = null,
            AutoRenewal = true,
            MinimumOrderAmount = 50000.00m
        },
        new Addendum
        {
            AddendumId = 2,
            ChainId = 2,
            ChainName = "Supermercados del Sur",
            AddendumName = "Contrato Premium 2024",
            SpecialDiscount = 12.5m,
            CreditDays = 60,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Descuento del 12.5% en toda la línea de productos, crédito a 60 días",
            CreationDate = new DateTime(2023, 11, 20),
            LastRenewalDate = null,
            AutoRenewal = true,
            MinimumOrderAmount = 75000.00m
        },
        new Addendum
        {
            AddendumId = 3,
            ChainId = 5,
            ChainName = "Distribuidora Nacional",
            AddendumName = "Contrato Corporativo 2024",
            SpecialDiscount = 15.0m,
            CreditDays = 90,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Descuento del 15% en todos los productos, crédito a 90 días, envío gratuito",
            CreationDate = new DateTime(2023, 10, 5),
            LastRenewalDate = null,
            AutoRenewal = true,
            MinimumOrderAmount = 100000.00m
        },
        new Addendum
        {
            AddendumId = 4,
            ChainId = 3,
            ChainName = "Tiendas del Centro",
            AddendumName = "Contrato Semestral Q1-Q2 2024",
            SpecialDiscount = 8.0m,
            CreditDays = 30,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 6, 30),
            Status = "ACTIVE",
            SpecialConditions = "Descuento del 8% en productos seleccionados",
            CreationDate = new DateTime(2023, 12, 10),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 30000.00m
        },
        new Addendum
        {
            AddendumId = 5,
            ChainId = 4,
            ChainName = "Mercados Regionales",
            AddendumName = "Contrato Trimestral Q1 2024",
            SpecialDiscount = 7.5m,
            CreditDays = 30,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 3, 31),
            Status = "EXPIRED",
            SpecialConditions = "Descuento del 7.5% en productos seleccionados",
            CreationDate = new DateTime(2023, 12, 20),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 25000.00m
        },
        new Addendum
        {
            AddendumId = 6,
            ChainId = 6,
            ChainName = "Comercializadora Este",
            AddendumName = "Contrato Anual 2024",
            SpecialDiscount = 9.0m,
            CreditDays = 45,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Descuento del 9% en productos seleccionados, crédito a 45 días",
            CreationDate = new DateTime(2023, 12, 18),
            LastRenewalDate = null,
            AutoRenewal = true,
            MinimumOrderAmount = 40000.00m
        },
        new Addendum
        {
            AddendumId = 7,
            ChainId = 9,
            ChainName = "Mercados Express",
            AddendumName = "Contrato Express 2024",
            SpecialDiscount = 11.0m,
            CreditDays = 45,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Descuento del 11% en toda la línea, envío prioritario",
            CreationDate = new DateTime(2023, 11, 25),
            LastRenewalDate = null,
            AutoRenewal = true,
            MinimumOrderAmount = 60000.00m
        }
    };

    public Task<List<Addendum>> ObtenerAddendumsAsync()
    {
        return Task.FromResult(_addendumsMock.ToList());
    }

    public Task<Addendum?> ObtenerAddendumPorIdAsync(int idAdenda)
    {
        var addendum = _addendumsMock.FirstOrDefault(a => a.AddendumId == idAdenda);
        return Task.FromResult(addendum);
    }

    public Task<List<Addendum>> BuscarAddendumsAsync(int? idCadena, string? estado)
    {
        var resultado = _addendumsMock.AsQueryable();

        if (idCadena.HasValue)
        {
            resultado = resultado.Where(a => a.ChainId == idCadena.Value);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            resultado = resultado.Where(a => a.Status == estado);
        }

        return Task.FromResult(resultado.ToList());
    }
}
