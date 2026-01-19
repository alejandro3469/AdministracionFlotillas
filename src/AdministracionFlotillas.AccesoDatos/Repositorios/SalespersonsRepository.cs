using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio de Vendedores con datos mock
/// Adaptado de requerimientos de Cremería Americana
/// </summary>
public class SalespersonsRepository : ISalespersonsRepository
{
    private readonly List<Salesperson> _salespersonsMock = new()
    {
        new Salesperson
        {
            SalespersonId = 1,
            FullName = "Juan Pérez García",
            Email = "juan.perez@empresa.com",
            Phone = "+52 55 1234 5678",
            CoverageZone = "Norte",
            BaseCommission = 5.0m,
            VariableCommission = 2.5m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 6, 1),
            TotalOrders = 145,
            TotalSales = 850000.00m,
            TotalCommissions = 63750.00m,
            AssignedChains = 3
        },
        new Salesperson
        {
            SalespersonId = 2,
            FullName = "María González López",
            Email = "maria.gonzalez@empresa.com",
            Phone = "+52 33 9876 5432",
            CoverageZone = "Sur",
            BaseCommission = 5.5m,
            VariableCommission = 3.0m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 3, 15),
            TotalOrders = 189,
            TotalSales = 1120000.00m,
            TotalCommissions = 95200.00m,
            AssignedChains = 4
        },
        new Salesperson
        {
            SalespersonId = 3,
            FullName = "Carlos Ramírez Martínez",
            Email = "carlos.ramirez@empresa.com",
            Phone = "+52 81 2345 6789",
            CoverageZone = "Centro",
            BaseCommission = 4.5m,
            VariableCommission = 2.0m,
            Status = "ACTIVE",
            HireDate = new DateTime(2024, 1, 10),
            TotalOrders = 98,
            TotalSales = 580000.00m,
            TotalCommissions = 37700.00m,
            AssignedChains = 2
        },
        new Salesperson
        {
            SalespersonId = 4,
            FullName = "Ana Sánchez Hernández",
            Email = "ana.sanchez@empresa.com",
            Phone = "+52 998 1234 567",
            CoverageZone = "Este",
            BaseCommission = 5.0m,
            VariableCommission = 2.5m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 8, 20),
            TotalOrders = 167,
            TotalSales = 950000.00m,
            TotalCommissions = 71250.00m,
            AssignedChains = 3
        },
        new Salesperson
        {
            SalespersonId = 5,
            FullName = "Roberto Torres Díaz",
            Email = "roberto.torres@empresa.com",
            Phone = "+52 55 5555 1234",
            CoverageZone = "Nacional",
            BaseCommission = 6.0m,
            VariableCommission = 3.5m,
            Status = "ACTIVE",
            HireDate = new DateTime(2022, 4, 5),
            TotalOrders = 234,
            TotalSales = 1450000.00m,
            TotalCommissions = 137750.00m,
            AssignedChains = 5
        },
        new Salesperson
        {
            SalespersonId = 6,
            FullName = "Laura Fernández Ruiz",
            Email = "laura.fernandez@empresa.com",
            Phone = "+52 222 3456 789",
            CoverageZone = "Oeste",
            BaseCommission = 4.8m,
            VariableCommission = 2.2m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 11, 12),
            TotalOrders = 112,
            TotalSales = 670000.00m,
            TotalCommissions = 46900.00m,
            AssignedChains = 2
        },
        new Salesperson
        {
            SalespersonId = 7,
            FullName = "Miguel Ángel Morales",
            Email = "miguel.morales@empresa.com",
            Phone = "+52 664 4567 890",
            CoverageZone = "Norte",
            BaseCommission = 5.2m,
            VariableCommission = 2.8m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 7, 8),
            TotalOrders = 156,
            TotalSales = 920000.00m,
            TotalCommissions = 73600.00m,
            AssignedChains = 3
        },
        new Salesperson
        {
            SalespersonId = 8,
            FullName = "Patricia Jiménez Castro",
            Email = "patricia.jimenez@empresa.com",
            Phone = "+52 55 9999 8888",
            CoverageZone = "Sur",
            BaseCommission = 5.0m,
            VariableCommission = 2.5m,
            Status = "ON_LEAVE",
            HireDate = new DateTime(2022, 9, 15),
            TotalOrders = 201,
            TotalSales = 1180000.00m,
            TotalCommissions = 88500.00m,
            AssignedChains = 4
        },
        new Salesperson
        {
            SalespersonId = 9,
            FullName = "José Luis Vargas",
            Email = "jose.vargas@empresa.com",
            Phone = "+52 33 7777 6666",
            CoverageZone = "Centro",
            BaseCommission = 4.5m,
            VariableCommission = 2.0m,
            Status = "ACTIVE",
            HireDate = new DateTime(2024, 2, 1),
            TotalOrders = 67,
            TotalSales = 390000.00m,
            TotalCommissions = 25350.00m,
            AssignedChains = 1
        },
        new Salesperson
        {
            SalespersonId = 10,
            FullName = "Sofía Mendoza",
            Email = "sofia.mendoza@empresa.com",
            Phone = "+52 81 8888 7777",
            CoverageZone = "Este",
            BaseCommission = 5.5m,
            VariableCommission = 3.0m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 5, 22),
            TotalOrders = 178,
            TotalSales = 1050000.00m,
            TotalCommissions = 89250.00m,
            AssignedChains = 3
        },
        // Escenarios adicionales para pruebas
        new Salesperson
        {
            SalespersonId = 11,
            FullName = "Pedro Martínez López",
            Email = "pedro.martinez@empresa.com",
            Phone = "+52 55 1111 2222",
            CoverageZone = "Norte",
            BaseCommission = 4.0m,
            VariableCommission = 1.5m,
            Status = "INACTIVE",
            HireDate = new DateTime(2022, 1, 10),
            TotalOrders = 89,
            TotalSales = 450000.00m,
            TotalCommissions = 24750.00m,
            AssignedChains = 1
        },
        new Salesperson
        {
            SalespersonId = 12,
            FullName = "Luis Hernández García",
            Email = "luis.hernandez@empresa.com",
            Phone = "+52 33 2222 3333",
            CoverageZone = "Sur",
            BaseCommission = 6.5m,
            VariableCommission = 4.0m,
            Status = "ACTIVE",
            HireDate = new DateTime(2021, 3, 15),
            TotalOrders = 456,
            TotalSales = 2800000.00m,
            TotalCommissions = 273000.00m,
            AssignedChains = 6
        },
        new Salesperson
        {
            SalespersonId = 13,
            FullName = "Ana García Ruiz",
            Email = "ana.garcia@empresa.com",
            Phone = "+52 81 3333 4444",
            CoverageZone = "Centro",
            BaseCommission = 5.0m,
            VariableCommission = 2.5m,
            Status = "ON_LEAVE",
            HireDate = new DateTime(2023, 2, 1),
            TotalOrders = 123,
            TotalSales = 720000.00m,
            TotalCommissions = 54000.00m,
            AssignedChains = 2
        },
        new Salesperson
        {
            SalespersonId = 14,
            FullName = "Carmen López Torres",
            Email = "carmen.lopez@empresa.com",
            Phone = "+52 222 4444 5555",
            CoverageZone = "Este",
            BaseCommission = 4.8m,
            VariableCommission = 2.2m,
            Status = "ACTIVE",
            HireDate = new DateTime(2024, 1, 5),
            TotalOrders = 34,
            TotalSales = 200000.00m,
            TotalCommissions = 14000.00m,
            AssignedChains = 1
        },
        new Salesperson
        {
            SalespersonId = 15,
            FullName = "Roberto Sánchez Díaz",
            Email = "roberto.sanchez@empresa.com",
            Phone = "+52 664 5555 6666",
            CoverageZone = "Oeste",
            BaseCommission = 5.2m,
            VariableCommission = 2.8m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 9, 10),
            TotalOrders = 201,
            TotalSales = 1180000.00m,
            TotalCommissions = 94400.00m,
            AssignedChains = 4
        },
        new Salesperson
        {
            SalespersonId = 16,
            FullName = "Miguel Torres Ramírez",
            Email = "miguel.torres@empresa.com",
            Phone = "+52 55 6666 7777",
            CoverageZone = "Nacional",
            BaseCommission = 7.0m,
            VariableCommission = 4.5m,
            Status = "ACTIVE",
            HireDate = new DateTime(2019, 6, 1),
            TotalOrders = 789,
            TotalSales = 5000000.00m,
            TotalCommissions = 575000.00m,
            AssignedChains = 10
        },
        new Salesperson
        {
            SalespersonId = 17,
            FullName = "Jorge Ramírez Vargas",
            Email = "jorge.ramirez@empresa.com",
            Phone = "+52 33 7777 8888",
            CoverageZone = "Norte",
            BaseCommission = 3.5m,
            VariableCommission = 1.0m,
            Status = "ACTIVE",
            HireDate = DateTime.Now.AddDays(-30),
            TotalOrders = 5,
            TotalSales = 25000.00m,
            TotalCommissions = 1125.00m,
            AssignedChains = 0
        },
        new Salesperson
        {
            SalespersonId = 18,
            FullName = "Fernando Díaz Morales",
            Email = "fernando.diaz@empresa.com",
            Phone = "+52 81 8888 9999",
            CoverageZone = "Sur",
            BaseCommission = 5.0m,
            VariableCommission = 2.5m,
            Status = "INACTIVE",
            HireDate = new DateTime(2023, 4, 1),
            TotalOrders = 67,
            TotalSales = 380000.00m,
            TotalCommissions = 28500.00m,
            AssignedChains = 1
        },
        new Salesperson
        {
            SalespersonId = 19,
            FullName = "Alejandro Morales Castro",
            Email = "alejandro.morales@empresa.com",
            Phone = "+52 998 9999 0000",
            CoverageZone = "Este",
            BaseCommission = 6.0m,
            VariableCommission = 3.5m,
            Status = "ACTIVE",
            HireDate = new DateTime(2022, 8, 15),
            TotalOrders = 345,
            TotalSales = 2100000.00m,
            TotalCommissions = 199500.00m,
            AssignedChains = 5
        },
        new Salesperson
        {
            SalespersonId = 20,
            FullName = "Ricardo Vega Jiménez",
            Email = "ricardo.vega@empresa.com",
            Phone = "+52 55 0000 1111",
            CoverageZone = "Centro",
            BaseCommission = 4.5m,
            VariableCommission = 2.0m,
            Status = "ON_LEAVE",
            HireDate = new DateTime(2023, 11, 1),
            TotalOrders = 78,
            TotalSales = 450000.00m,
            TotalCommissions = 29250.00m,
            AssignedChains = 2
        },
        new Salesperson
        {
            SalespersonId = 21,
            FullName = "Patricia Castro Ruiz",
            Email = "patricia.castro@empresa.com",
            Phone = "+52 222 1111 2222",
            CoverageZone = "Oeste",
            BaseCommission = 5.5m,
            VariableCommission = 3.0m,
            Status = "ACTIVE",
            HireDate = new DateTime(2023, 7, 20),
            TotalOrders = 234,
            TotalSales = 1400000.00m,
            TotalCommissions = 119000.00m,
            AssignedChains = 4
        },
        new Salesperson
        {
            SalespersonId = 22,
            FullName = "Gabriel Mendoza Hernández",
            Email = "gabriel.mendoza@empresa.com",
            Phone = "+52 664 2222 3333",
            CoverageZone = "Norte",
            BaseCommission = 4.0m,
            VariableCommission = 1.5m,
            Status = "ACTIVE",
            HireDate = new DateTime(2024, 3, 1),
            TotalOrders = 12,
            TotalSales = 60000.00m,
            TotalCommissions = 3300.00m,
            AssignedChains = 1
        },
        new Salesperson
        {
            SalespersonId = 23,
            FullName = "Verónica Jiménez López",
            Email = "veronica.jimenez@empresa.com",
            Phone = "+52 33 3333 4444",
            CoverageZone = "Sur",
            BaseCommission = 5.0m,
            VariableCommission = 2.5m,
            Status = "ACTIVE",
            HireDate = new DateTime(2022, 12, 1),
            TotalOrders = 312,
            TotalSales = 1850000.00m,
            TotalCommissions = 138750.00m,
            AssignedChains = 5
        },
        new Salesperson
        {
            SalespersonId = 24,
            FullName = "Daniel Ruiz Martínez",
            Email = "daniel.ruiz@empresa.com",
            Phone = "+52 81 4444 5555",
            CoverageZone = "Centro",
            BaseCommission = 4.8m,
            VariableCommission = 2.2m,
            Status = "INACTIVE",
            HireDate = new DateTime(2023, 1, 15),
            TotalOrders = 45,
            TotalSales = 250000.00m,
            TotalCommissions = 17500.00m,
            AssignedChains = 1
        },
        new Salesperson
        {
            SalespersonId = 25,
            FullName = "Elena Vargas Torres",
            Email = "elena.vargas@empresa.com",
            Phone = "+52 998 5555 6666",
            CoverageZone = "Este",
            BaseCommission = 6.5m,
            VariableCommission = 4.0m,
            Status = "ACTIVE",
            HireDate = new DateTime(2021, 5, 10),
            TotalOrders = 567,
            TotalSales = 3500000.00m,
            TotalCommissions = 367500.00m,
            AssignedChains = 7
        }
    };

    public Task<List<Salesperson>> ObtenerSalespersonsAsync()
    {
        return Task.FromResult(_salespersonsMock.ToList());
    }

    public Task<Salesperson?> ObtenerSalespersonPorIdAsync(int idVendedor)
    {
        var salesperson = _salespersonsMock.FirstOrDefault(s => s.SalespersonId == idVendedor);
        return Task.FromResult(salesperson);
    }

    public Task<List<Salesperson>> BuscarSalespersonsAsync(string? nombre, string? zona, string? estado)
    {
        var resultado = _salespersonsMock.AsQueryable();

        if (!string.IsNullOrWhiteSpace(nombre))
        {
            resultado = resultado.Where(s => 
                s.FullName.Contains(nombre, StringComparison.OrdinalIgnoreCase) ||
                s.Email.Contains(nombre, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(zona))
        {
            resultado = resultado.Where(s => s.CoverageZone == zona);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            resultado = resultado.Where(s => s.Status == estado);
        }

        return Task.FromResult(resultado.ToList());
    }

    public Task<int> CrearSalespersonAsync(Salesperson vendedor)
    {
        vendedor.SalespersonId = _salespersonsMock.Any() ? _salespersonsMock.Max(v => v.SalespersonId) + 1 : 1;
        vendedor.HireDate = DateTime.Now;
        _salespersonsMock.Add(vendedor);
        return Task.FromResult(vendedor.SalespersonId);
    }

    public Task ActualizarSalespersonAsync(Salesperson vendedor)
    {
        var index = _salespersonsMock.FindIndex(v => v.SalespersonId == vendedor.SalespersonId);
        if (index != -1)
        {
            _salespersonsMock[index] = vendedor;
        }
        return Task.CompletedTask;
    }

    public Task EliminarSalespersonAsync(int idVendedor)
    {
        _salespersonsMock.RemoveAll(v => v.SalespersonId == idVendedor);
        return Task.CompletedTask;
    }

    public Task<int> ContarSalespersonsActivosAsync()
    {
        return Task.FromResult(_salespersonsMock.Count(v => v.Status == "ACTIVE"));
    }

    public Task<int> ContarSalespersonsInactivosAsync()
    {
        return Task.FromResult(_salespersonsMock.Count(v => v.Status == "INACTIVE" || v.Status == "ON_LEAVE"));
    }
}
