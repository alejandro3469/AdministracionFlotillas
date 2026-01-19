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
}
