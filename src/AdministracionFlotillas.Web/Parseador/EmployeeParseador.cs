using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Parseador;

/// <summary>
/// Parseador manual para convertir entre Employee (Modelo de Negocio) y EmployeeViewModel
/// Realiza conversiones explícitas y formateo de datos para la UI
/// </summary>
public static class EmployeeParseador
{
    /// <summary>
    /// Convierte un Employee (Modelo de Negocio) a EmployeeViewModel
    /// </summary>
    /// <param name="empleado">Empleado del modelo de negocio</param>
    /// <returns>ViewModel formateado para la UI</returns>
    public static EmployeeViewModel ConvertirAVista(Employee empleado)
    {
        if (empleado == null)
            throw new ArgumentNullException(nameof(empleado));

        return new EmployeeViewModel
        {
            IdEmpleado = empleado.EmployeeId,
            PrimerNombre = empleado.FirstName,
            Apellido = empleado.LastName,
            CorreoElectronico = empleado.Email ?? string.Empty,
            NumeroTelefono = empleado.PhoneNumber,
            FechaContratacion = empleado.HireDate.ToString("dd/MM/yyyy"),
            IdPuesto = empleado.JobId,
            Salario = empleado.Salary.HasValue ? empleado.Salary.Value.ToString("C") : null,
            PorcentajeComision = empleado.CommissionPct.HasValue 
                ? (empleado.CommissionPct.Value * 100).ToString("F2") + "%" 
                : null,
            IdGerente = empleado.ManagerId,
            IdDepartamento = empleado.DepartmentId,
            NombreCompleto = $"{empleado.FirstName} {empleado.LastName}".Trim(),
            NombreDepartamento = empleado.NombreDepartamento == null ? "Departamento sin informacion. actualizar informacion por whatsapp(+5240007645)" : empleado.NombreDepartamento, // Se puede poblar desde el servicio si es necesario
            TituloPuesto = null // Se puede poblar desde el servicio si es necesario
        };
    }

    /// <summary>
    /// Convierte una lista de Employee a lista de EmployeeViewModel
    /// </summary>
    /// <param name="empleados">Lista de empleados del modelo de negocio</param>
    /// <returns>Lista de ViewModels formateados para la UI</returns>
    public static List<EmployeeViewModel> ConvertirListaAVista(List<Employee> empleados)
    {
        if (empleados == null)
            return new List<EmployeeViewModel>();

        return empleados.Select(ConvertirAVista).ToList();
    }

    /// <summary>
    /// Convierte un EmployeeViewModel a Employee (Modelo de Negocio)
    /// </summary>
    /// <param name="modeloVista">ViewModel de la UI</param>
    /// <returns>Empleado del modelo de negocio</returns>
    public static Employee ConvertirAModelo(EmployeeViewModel modeloVista)
    {
        if (modeloVista == null)
            throw new ArgumentNullException(nameof(modeloVista));

        return new Employee
        {
            EmployeeId = modeloVista.IdEmpleado,
            FirstName = modeloVista.PrimerNombre,
            LastName = modeloVista.Apellido,
            Email = modeloVista.CorreoElectronico,
            PhoneNumber = modeloVista.NumeroTelefono,
            HireDate = DateTime.Parse(modeloVista.FechaContratacion),
            JobId = modeloVista.IdPuesto,
            Salary = !string.IsNullOrEmpty(modeloVista.Salario) 
                ? decimal.Parse(modeloVista.Salario.Replace("$", "").Replace(",", "")) 
                : null,
            CommissionPct = !string.IsNullOrEmpty(modeloVista.PorcentajeComision) 
                ? decimal.Parse(modeloVista.PorcentajeComision.Replace("%", "")) / 100 
                : null,
            ManagerId = modeloVista.IdGerente,
            DepartmentId = modeloVista.IdDepartamento
        };
    }
}
