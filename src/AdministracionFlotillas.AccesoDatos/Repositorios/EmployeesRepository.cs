using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdministracionFlotillas.ModelosComunes;

namespace AdministracionFlotillas.AccesoDatos.Repositorios;

/// <summary>
/// Repositorio para acceder a datos de la tabla EMPLOYEES de Oracle HR
/// Por ahora retorna datos mock, luego se conectará a Oracle
/// </summary>
public class EmployeesRepository : IEmployeesRepository
{
    /// <summary>
    /// Obtiene todos los empleados de la base de datos
    /// Por ahora retorna datos mock, luego se conectará a Oracle
    /// </summary>
    public async Task<List<Employee>> ObtenerEmployeesAsync()
    {
        // Datos mock realistas basados en la estructura de HR
        var empleados = new List<Employee>
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
            },
            new Employee 
            { 
                EmployeeId = 108, 
                FirstName = "Nancy",
                LastName = "Greenberg",
                Email = "NGREENBE",
                PhoneNumber = "515.124.4569",
                HireDate = new DateTime(2002, 8, 17),
                JobId = 5,
                Salary = 12000,
                ManagerId = 101,
                DepartmentId = 100
            },
            new Employee 
            { 
                EmployeeId = 109, 
                FirstName = "Daniel",
                LastName = "Faviet",
                Email = "DFAVIET",
                PhoneNumber = "515.124.4169",
                HireDate = new DateTime(2002, 8, 16),
                JobId = 6,
                Salary = 9000,
                ManagerId = 108,
                DepartmentId = 100
            },
            new Employee 
            { 
                EmployeeId = 110, 
                FirstName = "John",
                LastName = "Chen",
                Email = "JCHEN",
                PhoneNumber = "515.124.4269",
                HireDate = new DateTime(2005, 9, 28),
                JobId = 6,
                Salary = 8200,
                ManagerId = 108,
                DepartmentId = 100
            },
            new Employee 
            { 
                EmployeeId = 111, 
                FirstName = "Ismael",
                LastName = "Sciarra",
                Email = "ISCIARRA",
                PhoneNumber = "515.124.4369",
                HireDate = new DateTime(2005, 9, 30),
                JobId = 6,
                Salary = 7700,
                ManagerId = 108,
                DepartmentId = 100
            },
            new Employee 
            { 
                EmployeeId = 112, 
                FirstName = "Jose Manuel",
                LastName = "Urman",
                Email = "JMURMAN",
                PhoneNumber = "515.124.4469",
                HireDate = new DateTime(2006, 3, 7),
                JobId = 6,
                Salary = 7800,
                ManagerId = 108,
                DepartmentId = 100
            },
            new Employee 
            { 
                EmployeeId = 113, 
                FirstName = "Luis",
                LastName = "Popp",
                Email = "LPOPP",
                PhoneNumber = "515.124.4567",
                HireDate = new DateTime(2007, 12, 7),
                JobId = 6,
                Salary = 6900,
                ManagerId = 108,
                DepartmentId = 100
            },
            new Employee 
            { 
                EmployeeId = 114, 
                FirstName = "Den",
                LastName = "Raphaely",
                Email = "DRAPHEAL",
                PhoneNumber = "515.127.4561",
                HireDate = new DateTime(2002, 12, 7),
                JobId = 7,
                Salary = 11000,
                ManagerId = 100,
                DepartmentId = 30
            },
            new Employee 
            { 
                EmployeeId = 115, 
                FirstName = "Alexander",
                LastName = "Khoo",
                Email = "AKHOO",
                PhoneNumber = "515.127.4562",
                HireDate = new DateTime(2003, 5, 18),
                JobId = 8,
                Salary = 3100,
                ManagerId = 114,
                DepartmentId = 30
            },
            new Employee 
            { 
                EmployeeId = 116, 
                FirstName = "Shelli",
                LastName = "Baida",
                Email = "SBAIDA",
                PhoneNumber = "515.127.4563",
                HireDate = new DateTime(2005, 12, 24),
                JobId = 8,
                Salary = 2900,
                ManagerId = 114,
                DepartmentId = 30
            },
            new Employee 
            { 
                EmployeeId = 117, 
                FirstName = "Sigal",
                LastName = "Tobias",
                Email = "STOBIAS",
                PhoneNumber = "515.127.4564",
                HireDate = new DateTime(2005, 7, 24),
                JobId = 8,
                Salary = 2800,
                ManagerId = 114,
                DepartmentId = 30
            },
            new Employee 
            { 
                EmployeeId = 118, 
                FirstName = "Guy",
                LastName = "Himuro",
                Email = "GHIMURO",
                PhoneNumber = "515.127.4565",
                HireDate = new DateTime(2006, 11, 15),
                JobId = 8,
                Salary = 2600,
                ManagerId = 114,
                DepartmentId = 30
            },
            new Employee 
            { 
                EmployeeId = 119, 
                FirstName = "Karen",
                LastName = "Colmenares",
                Email = "KCOLMENA",
                PhoneNumber = "515.127.4566",
                HireDate = new DateTime(2007, 8, 10),
                JobId = 8,
                Salary = 2500,
                ManagerId = 114,
                DepartmentId = 30
            },
            new Employee 
            { 
                EmployeeId = 120, 
                FirstName = "Matthew",
                LastName = "Weiss",
                Email = "MWEISS",
                PhoneNumber = "650.123.1234",
                HireDate = new DateTime(2004, 7, 18),
                JobId = 9,
                Salary = 8000,
                ManagerId = 100,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 121, 
                FirstName = "Adam",
                LastName = "Fripp",
                Email = "AFRIPP",
                PhoneNumber = "650.123.2234",
                HireDate = new DateTime(2005, 4, 10),
                JobId = 9,
                Salary = 8200,
                ManagerId = 100,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 122, 
                FirstName = "Payam",
                LastName = "Kaufling",
                Email = "PKAUFLIN",
                PhoneNumber = "650.123.3234",
                HireDate = new DateTime(2003, 5, 1),
                JobId = 9,
                Salary = 7900,
                ManagerId = 100,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 123, 
                FirstName = "Shanta",
                LastName = "Vollman",
                Email = "SVOLLMAN",
                PhoneNumber = "650.123.4234",
                HireDate = new DateTime(2005, 10, 10),
                JobId = 9,
                Salary = 6500,
                ManagerId = 100,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 124, 
                FirstName = "Kevin",
                LastName = "Mourgos",
                Email = "KMOURGOS",
                PhoneNumber = "650.123.5234",
                HireDate = new DateTime(2007, 11, 16),
                JobId = 9,
                Salary = 5800,
                ManagerId = 100,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 125, 
                FirstName = "Julia",
                LastName = "Nayer",
                Email = "JNAYER",
                PhoneNumber = "650.124.1214",
                HireDate = new DateTime(2005, 7, 16),
                JobId = 10,
                Salary = 3200,
                ManagerId = 120,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 126, 
                FirstName = "Irene",
                LastName = "Mikkilineni",
                Email = "IMIKKILI",
                PhoneNumber = "650.124.1224",
                HireDate = new DateTime(2006, 9, 28),
                JobId = 10,
                Salary = 2700,
                ManagerId = 120,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 127, 
                FirstName = "James",
                LastName = "Landry",
                Email = "JLANDRY",
                PhoneNumber = "650.124.1334",
                HireDate = new DateTime(2007, 1, 14),
                JobId = 10,
                Salary = 2400,
                ManagerId = 120,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 128, 
                FirstName = "Steven",
                LastName = "Markle",
                Email = "SMARKLE",
                PhoneNumber = "650.124.1434",
                HireDate = new DateTime(2008, 3, 8),
                JobId = 10,
                Salary = 2200,
                ManagerId = 120,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 129, 
                FirstName = "Laura",
                LastName = "Bissot",
                Email = "LBISSOT",
                PhoneNumber = "650.124.5234",
                HireDate = new DateTime(2005, 8, 20),
                JobId = 10,
                Salary = 3300,
                ManagerId = 121,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 130, 
                FirstName = "Mozhe",
                LastName = "Atkinson",
                Email = "MATKINSO",
                PhoneNumber = "650.124.6234",
                HireDate = new DateTime(2005, 10, 30),
                JobId = 10,
                Salary = 2800,
                ManagerId = 121,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 131, 
                FirstName = "James",
                LastName = "Marlow",
                Email = "JAMRLOW",
                PhoneNumber = "650.124.7234",
                HireDate = new DateTime(2005, 2, 16),
                JobId = 10,
                Salary = 2500,
                ManagerId = 121,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 132, 
                FirstName = "TJ",
                LastName = "Olson",
                Email = "TJOLSON",
                PhoneNumber = "650.124.8234",
                HireDate = new DateTime(2007, 4, 10),
                JobId = 10,
                Salary = 2100,
                ManagerId = 121,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 133, 
                FirstName = "Jason",
                LastName = "Mallin",
                Email = "JMALLIN",
                PhoneNumber = "650.127.1934",
                HireDate = new DateTime(2004, 6, 14),
                JobId = 10,
                Salary = 3300,
                ManagerId = 122,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 134, 
                FirstName = "Michael",
                LastName = "Rogers",
                Email = "MROGERS",
                PhoneNumber = "650.127.1834",
                HireDate = new DateTime(2006, 8, 26),
                JobId = 10,
                Salary = 2900,
                ManagerId = 122,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 135, 
                FirstName = "Ki",
                LastName = "Gee",
                Email = "KGEE",
                PhoneNumber = "650.127.1734",
                HireDate = new DateTime(2007, 12, 12),
                JobId = 10,
                Salary = 2400,
                ManagerId = 122,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 136, 
                FirstName = "Hazel",
                LastName = "Philtanker",
                Email = "HPHILTAN",
                PhoneNumber = "650.127.1634",
                HireDate = new DateTime(2008, 2, 6),
                JobId = 10,
                Salary = 2200,
                ManagerId = 122,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 137, 
                FirstName = "Renske",
                LastName = "Ladwig",
                Email = "RLADWIG",
                PhoneNumber = "650.121.1234",
                HireDate = new DateTime(2003, 7, 14),
                JobId = 10,
                Salary = 3600,
                ManagerId = 123,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 138, 
                FirstName = "Stephen",
                LastName = "Stiles",
                Email = "SSTILES",
                PhoneNumber = "650.121.2034",
                HireDate = new DateTime(2005, 10, 26),
                JobId = 10,
                Salary = 3200,
                ManagerId = 123,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 139, 
                FirstName = "John",
                LastName = "Seo",
                Email = "JSEO",
                PhoneNumber = "650.121.2019",
                HireDate = new DateTime(2006, 2, 12),
                JobId = 10,
                Salary = 2700,
                ManagerId = 123,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 140, 
                FirstName = "Joshua",
                LastName = "Patel",
                Email = "JPATEL",
                PhoneNumber = "650.121.1834",
                HireDate = new DateTime(2006, 4, 6),
                JobId = 10,
                Salary = 2500,
                ManagerId = 123,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 141, 
                FirstName = "Trenna",
                LastName = "Rajs",
                Email = "TRAJS",
                PhoneNumber = "650.121.8009",
                HireDate = new DateTime(2003, 10, 17),
                JobId = 10,
                Salary = 3500,
                ManagerId = 124,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 142, 
                FirstName = "Curtis",
                LastName = "Davies",
                Email = "CDAVIES",
                PhoneNumber = "650.121.2994",
                HireDate = new DateTime(2005, 1, 29),
                JobId = 10,
                Salary = 3100,
                ManagerId = 124,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 143, 
                FirstName = "Randall",
                LastName = "Matos",
                Email = "RMATOS",
                PhoneNumber = "650.121.2874",
                HireDate = new DateTime(2006, 3, 15),
                JobId = 10,
                Salary = 2600,
                ManagerId = 124,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 144, 
                FirstName = "Peter",
                LastName = "Vargas",
                Email = "PVARGAS",
                PhoneNumber = "650.121.2004",
                HireDate = new DateTime(2006, 7, 9),
                JobId = 10,
                Salary = 2500,
                ManagerId = 124,
                DepartmentId = 50
            },
            new Employee 
            { 
                EmployeeId = 145, 
                FirstName = "John",
                LastName = "Russell",
                Email = "JRUSSEL",
                PhoneNumber = "011.44.1344.429268",
                HireDate = new DateTime(2004, 10, 1),
                JobId = 11,
                Salary = 14000,
                CommissionPct = 0.40m,
                ManagerId = 100,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 146, 
                FirstName = "Karen",
                LastName = "Partners",
                Email = "KPARTNER",
                PhoneNumber = "011.44.1344.467268",
                HireDate = new DateTime(2005, 1, 5),
                JobId = 11,
                Salary = 13500,
                CommissionPct = 0.30m,
                ManagerId = 100,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 147, 
                FirstName = "Alberto",
                LastName = "Errazuriz",
                Email = "AERRAZUR",
                PhoneNumber = "011.44.1344.429278",
                HireDate = new DateTime(2005, 3, 10),
                JobId = 11,
                Salary = 12000,
                CommissionPct = 0.30m,
                ManagerId = 100,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 148, 
                FirstName = "Gerald",
                LastName = "Cambrault",
                Email = "GCAMBRAU",
                PhoneNumber = "011.44.1344.619268",
                HireDate = new DateTime(2007, 10, 15),
                JobId = 11,
                Salary = 11000,
                CommissionPct = 0.30m,
                ManagerId = 100,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 149, 
                FirstName = "Eleni",
                LastName = "Zlotkey",
                Email = "EZLOTKEY",
                PhoneNumber = "011.44.1344.429018",
                HireDate = new DateTime(2008, 1, 29),
                JobId = 11,
                Salary = 10500,
                CommissionPct = 0.20m,
                ManagerId = 100,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 150, 
                FirstName = "Peter",
                LastName = "Tucker",
                Email = "PTUCKER",
                PhoneNumber = "011.44.1344.129268",
                HireDate = new DateTime(2005, 1, 30),
                JobId = 12,
                Salary = 10000,
                CommissionPct = 0.30m,
                ManagerId = 145,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 151, 
                FirstName = "David",
                LastName = "Bernstein",
                Email = "DBERNSTE",
                PhoneNumber = "011.44.1344.345268",
                HireDate = new DateTime(2005, 3, 24),
                JobId = 12,
                Salary = 9500,
                CommissionPct = 0.25m,
                ManagerId = 145,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 152, 
                FirstName = "Peter",
                LastName = "Hall",
                Email = "PHALL",
                PhoneNumber = "011.44.1344.478968",
                HireDate = new DateTime(2005, 8, 20),
                JobId = 12,
                Salary = 9000,
                CommissionPct = 0.25m,
                ManagerId = 145,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 153, 
                FirstName = "Christopher",
                LastName = "Olsen",
                Email = "COLSEN",
                PhoneNumber = "011.44.1344.498718",
                HireDate = new DateTime(2006, 3, 30),
                JobId = 12,
                Salary = 8000,
                CommissionPct = 0.20m,
                ManagerId = 145,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 154, 
                FirstName = "Nanette",
                LastName = "Cambrault",
                Email = "NCAMBRAU",
                PhoneNumber = "011.44.1344.987668",
                HireDate = new DateTime(2006, 12, 9),
                JobId = 12,
                Salary = 7500,
                CommissionPct = 0.20m,
                ManagerId = 145,
                DepartmentId = 80
            },
            new Employee 
            { 
                EmployeeId = 155, 
                FirstName = "Oliver",
                LastName = "Tuvault",
                Email = "OTUVAULT",
                PhoneNumber = "011.44.1344.486508",
                HireDate = new DateTime(2007, 11, 23),
                JobId = 12,
                Salary = 7000,
                CommissionPct = 0.15m,
                ManagerId = 145,
                DepartmentId = 80
            }
        };
        
        return empleados;
    }
    
    /// <summary>
    /// Obtiene un empleado específico por su ID
    /// </summary>
    public async Task<Employee?> ObtenerEmployeePorIdAsync(int id)
    {
        var empleados = await ObtenerEmployeesAsync();
        return empleados.FirstOrDefault(empleado => empleado.EmployeeId == id);
    }
}

