using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdministracionFlotillas.ModelosComunes;

public class EmployeeResumen
{
    public int TotalEmpleados { get; set; }
    public decimal PromedioSalario { get; set; }
    public string? EmpleadoMayorSalario { get; set; }
    public int AntiguedadMayor { get; set; }
    public List<EmpleadosPorDepartamento> EmpleadosPorDepartamento { get; set; } = new();
}

public class EmpleadosPorDepartamento
{
    public int? IdDepartamento { get; set; }
    public int Total { get; set; }
}

