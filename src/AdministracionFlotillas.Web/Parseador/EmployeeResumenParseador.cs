using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador
{
    public static class EmployeeResumenParseador
    {
        public static EmployeeResumenViewModel ConvertirAVista(EmployeeResumen resumen)
        {
            if (resumen == null)
                throw new ArgumentNullException(nameof(resumen));

            return new EmployeeResumenViewModel
            {
                TotalEmpleados = resumen.TotalEmpleados,
                PromedioSalario = resumen.PromedioSalario.ToString("C"),
                EmpleadoMayorSalario = resumen.EmpleadoMayorSalario,
                AntiguedadMayor = $"{resumen.AntiguedadMayor} años",

                EmpleadosPorDepartamento = resumen.EmpleadosPorDepartamento
                    .Select(d => new EmpleadosPorDepartamentoViewModel
                    {
                        IdDepartamento = d.IdDepartamento,
                        Total = d.Total
                    })
                    .ToList()
            };
        }
    }
}
