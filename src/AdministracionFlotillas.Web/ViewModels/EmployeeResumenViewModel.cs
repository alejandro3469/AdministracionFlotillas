namespace AdministracionFlotillas.Web.ViewModels;

public class EmployeeResumenViewModel
{
    public int TotalEmpleados { get; set; }
    public string PromedioSalario { get; set; } = string.Empty;
    public string? EmpleadoMayorSalario { get; set; }
    public string AntiguedadMayor { get; set; } = string.Empty;
    public List<EmpleadosPorDepartamentoViewModel> EmpleadosPorDepartamento { get; set; } = new();
}

public class EmpleadosPorDepartamentoViewModel
{
    public int? IdDepartamento { get; set; }
    public int Total { get; set; }
}

