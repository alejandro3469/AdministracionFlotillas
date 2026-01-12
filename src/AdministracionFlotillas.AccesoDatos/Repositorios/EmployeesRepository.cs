using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio para acceder a datos de la tabla EMPLOYEES de Oracle HR
/// Por ahora retorna datos mock, luego se conectará a Oracle
/// </summary>
public class EmployeesRepository : IEmployeesRepository
{
    // Implementación con datos mock basados en HR
    public async Task<List<Employee>> ObtenerEmployeesAsync()
    {
        // Datos mock realistas basados en la estructura de HR
        return new List<Employee>
        {
            new Employee 
            { 
                EmployeeId = 100, 
                FirstName = "Steven",
                LastName = "King",
                Email = "SKING",
                PhoneNumber = "515.123.4567",
                HireDate = new DateTime(2003, 6, 17),
                JobId = 1,
                Salary = 24000,
                ManagerId = null,
                DepartmentId = 90
            },
            new Employee 
            { 
                EmployeeId = 101, 
                FirstName = "Neena",
                LastName = "Kochhar",
                Email = "NKOCHHAR",
                PhoneNumber = "515.123.4568",
                HireDate = new DateTime(2005, 9, 21),
                JobId = 2,
                Salary = 17000,
                ManagerId = 100,
                DepartmentId = 90
            },
            new Employee 
            { 
                EmployeeId = 102, 
                FirstName = "Lex",
                LastName = "De Haan",
                Email = "LDEHAAN",
                PhoneNumber = "515.123.4569",
                HireDate = new DateTime(2001, 1, 13),
                JobId = 2,
                Salary = 17000,
                ManagerId = 100,
                DepartmentId = 90
            },
            new Employee 
            { 
                EmployeeId = 103, 
                FirstName = "Alexander",
                LastName = "Hunold",
                Email = "AHUNOLD",
                PhoneNumber = "590.423.4567",
                HireDate = new DateTime(2006, 1, 3),
                JobId = 3,
                Salary = 9000,
                ManagerId = 102,
                DepartmentId = 60
            },
            new Employee 
            { 
                EmployeeId = 104, 
                FirstName = "Bruce",
                LastName = "Ernst",
                Email = "BERNST",
                PhoneNumber = "590.423.4568",
                HireDate = new DateTime(2007, 5, 21),
                JobId = 4,
                Salary = 6000,
                ManagerId = 103,
                DepartmentId = 60
            },
            new Employee 
            { 
                EmployeeId = 105, 
                FirstName = "David",
                LastName = "Austin",
                Email = "DAUSTIN",
                PhoneNumber = "590.423.4569",
                HireDate = new DateTime(2005, 6, 25),
                JobId = 4,
                Salary = 4800,
                ManagerId = 103,
                DepartmentId = 60
            },
            new Employee 
            { 
                EmployeeId = 106, 
                FirstName = "Valli",
                LastName = "Pataballa",
                Email = "VPATABAL",
                PhoneNumber = "590.423.4560",
                HireDate = new DateTime(2006, 2, 5),
                JobId = 4,
                Salary = 4800,
                ManagerId = 103,
                DepartmentId = 60
            },
            new Employee 
            { 
                EmployeeId = 107, 
                FirstName = "Diana",
                LastName = "Lorentz",
                Email = "DLORENTZ",
                PhoneNumber = "590.423.5567",
                HireDate = new DateTime(2007, 2, 7),
                JobId = 4,
                Salary = 4200,
                ManagerId = 103,
                DepartmentId = 60
            }
        };
    }
    
    public async Task<Employee?> ObtenerEmployeePorIdAsync(int id)
    {
        var employees = await ObtenerEmployeesAsync();
        return employees.FirstOrDefault(e => e.EmployeeId == id);
    }
}

