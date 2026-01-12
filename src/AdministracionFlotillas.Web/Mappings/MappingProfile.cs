using AutoMapper;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Mappings;

/// <summary>
/// Perfil de AutoMapper para mapear entre modelos de negocio y ViewModels
/// </summary>
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapeo Employee -> EmployeeViewModel
        CreateMap<Employee, EmployeeViewModel>()
            .ForMember(dest => dest.HireDate, opt => opt.MapFrom(src => src.HireDate.ToString("dd/MM/yyyy")))
            .ForMember(dest => dest.Salary, opt => opt.MapFrom(src => src.Salary.HasValue ? src.Salary.Value.ToString("C") : null))
            .ForMember(dest => dest.CommissionPct, opt => opt.MapFrom(src => src.CommissionPct.HasValue ? (src.CommissionPct.Value * 100).ToString("F2") + "%" : null))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}".Trim()));
        
        // Mapeo EmployeeViewModel -> Employee
        CreateMap<EmployeeViewModel, Employee>()
            .ForMember(dest => dest.HireDate, opt => opt.MapFrom(src => DateTime.Parse(src.HireDate)))
            .ForMember(dest => dest.Salary, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Salary) ? decimal.Parse(src.Salary.Replace("$", "").Replace(",", "")) : (decimal?)null))
            .ForMember(dest => dest.CommissionPct, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.CommissionPct) ? decimal.Parse(src.CommissionPct.Replace("%", "")) / 100 : (decimal?)null));
    }
}
