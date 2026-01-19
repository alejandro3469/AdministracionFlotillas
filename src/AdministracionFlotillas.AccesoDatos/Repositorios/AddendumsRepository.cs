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
        },
        // Escenarios adicionales para pruebas
        new Addendum
        {
            AddendumId = 8,
            ChainId = 11,
            ChainName = "Cadena Suspendida Temporal",
            AddendumName = "Contrato Suspendido",
            SpecialDiscount = 5.0m,
            CreditDays = 30,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "CANCELLED",
            SpecialConditions = "Contrato cancelado por suspensión de cadena",
            CreationDate = new DateTime(2023, 12, 1),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 25000.00m
        },
        new Addendum
        {
            AddendumId = 9,
            ChainId = 12,
            ChainName = "Mega Cadena Nacional",
            AddendumName = "Contrato Mega 2024",
            SpecialDiscount = 20.0m,
            CreditDays = 120,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Descuento del 20% en todos los productos, crédito a 120 días, envío gratuito prioritario",
            CreationDate = new DateTime(2023, 9, 1),
            LastRenewalDate = new DateTime(2023, 12, 15),
            AutoRenewal = true,
            MinimumOrderAmount = 500000.00m
        },
        new Addendum
        {
            AddendumId = 10,
            ChainId = 13,
            ChainName = "Cadena Nueva Registro",
            AddendumName = "Contrato Inicial",
            SpecialDiscount = 3.0m,
            CreditDays = 15,
            StartDate = DateTime.Now.AddDays(-5),
            EndDate = DateTime.Now.AddDays(360),
            Status = "ACTIVE",
            SpecialConditions = "Descuento inicial para nueva cadena",
            CreationDate = DateTime.Now.AddDays(-5),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 10000.00m
        },
        new Addendum
        {
            AddendumId = 11,
            ChainId = 4,
            ChainName = "Mercados Regionales",
            AddendumName = "Contrato Trimestral Q2 2024",
            SpecialDiscount = 7.5m,
            CreditDays = 30,
            StartDate = new DateTime(2024, 4, 1),
            EndDate = new DateTime(2024, 6, 30),
            Status = "ACTIVE",
            SpecialConditions = "Contrato trimestral renovado",
            CreationDate = new DateTime(2024, 3, 20),
            LastRenewalDate = new DateTime(2024, 3, 20),
            AutoRenewal = false,
            MinimumOrderAmount = 25000.00m
        },
        new Addendum
        {
            AddendumId = 12,
            ChainId = 5,
            ChainName = "Distribuidora Nacional",
            AddendumName = "Contrato Anual 2023",
            SpecialDiscount = 15.0m,
            CreditDays = 90,
            StartDate = new DateTime(2023, 1, 1),
            EndDate = new DateTime(2023, 12, 31),
            Status = "EXPIRED",
            SpecialConditions = "Contrato anual expirado",
            CreationDate = new DateTime(2022, 12, 1),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 100000.00m
        },
        new Addendum
        {
            AddendumId = 13,
            ChainId = 7,
            ChainName = "Super Tiendas Oeste",
            AddendumName = "Contrato Sin Renovación",
            SpecialDiscount = 8.5m,
            CreditDays = 30,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Contrato sin renovación automática",
            CreationDate = new DateTime(2023, 12, 10),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 35000.00m
        },
        new Addendum
        {
            AddendumId = 14,
            ChainId = 8,
            ChainName = "Cadena Premium",
            AddendumName = "Contrato Premium Renovado",
            SpecialDiscount = 10.0m,
            CreditDays = 45,
            StartDate = new DateTime(2024, 1, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Contrato renovado con condiciones premium",
            CreationDate = new DateTime(2023, 11, 1),
            LastRenewalDate = new DateTime(2024, 1, 1),
            AutoRenewal = true,
            MinimumOrderAmount = 50000.00m
        },
        new Addendum
        {
            AddendumId = 15,
            ChainId = 10,
            ChainName = "Distribuidora Local",
            AddendumName = "Contrato Inactivo",
            SpecialDiscount = 5.0m,
            CreditDays = 30,
            StartDate = new DateTime(2023, 12, 1),
            EndDate = new DateTime(2024, 11, 30),
            Status = "CANCELLED",
            SpecialConditions = "Contrato cancelado por inactividad de cadena",
            CreationDate = new DateTime(2023, 11, 15),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 20000.00m
        },
        new Addendum
        {
            AddendumId = 16,
            ChainId = 2,
            ChainName = "Supermercados del Sur",
            AddendumName = "Contrato Bono Adicional",
            SpecialDiscount = 13.0m,
            CreditDays = 60,
            StartDate = new DateTime(2024, 6, 1),
            EndDate = new DateTime(2024, 12, 31),
            Status = "ACTIVE",
            SpecialConditions = "Bono adicional por volumen de compras",
            CreationDate = new DateTime(2024, 5, 15),
            LastRenewalDate = null,
            AutoRenewal = false,
            MinimumOrderAmount = 80000.00m
        },
        new Addendum
        {
            AddendumId = 17,
            ChainId = 1,
            ChainName = "Cadena Comercial Norte",
            AddendumName = "Contrato Especial Navidad",
            SpecialDiscount = 12.0m,
            CreditDays = 60,
            StartDate = new DateTime(2024, 11, 1),
            EndDate = new DateTime(2025, 1, 31),
            Status = "ACTIVE",
            SpecialConditions = "Contrato especial para temporada navideña",
            CreationDate = new DateTime(2024, 10, 15),
            LastRenewalDate = null,
            AutoRenewal = false,
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

    public Task<int> CrearAddendumAsync(Addendum adenda)
    {
        adenda.AddendumId = _addendumsMock.Any() ? _addendumsMock.Max(a => a.AddendumId) + 1 : 1;
        adenda.CreationDate = DateTime.Now;
        _addendumsMock.Add(adenda);
        return Task.FromResult(adenda.AddendumId);
    }

    public Task ActualizarAddendumAsync(Addendum adenda)
    {
        var index = _addendumsMock.FindIndex(a => a.AddendumId == adenda.AddendumId);
        if (index != -1)
        {
            _addendumsMock[index] = adenda;
        }
        return Task.CompletedTask;
    }

    public Task EliminarAddendumAsync(int idAdenda)
    {
        _addendumsMock.RemoveAll(a => a.AddendumId == idAdenda);
        return Task.CompletedTask;
    }

    public Task<int> ContarAddendumsActivasAsync()
    {
        return Task.FromResult(_addendumsMock.Count(a => a.Status == "ACTIVE"));
    }

    public Task<int> ContarAddendumsExpiradasAsync()
    {
        return Task.FromResult(_addendumsMock.Count(a => a.Status == "EXPIRED" || a.Status == "CANCELLED"));
    }
}
