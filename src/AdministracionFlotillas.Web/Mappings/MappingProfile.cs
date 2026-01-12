using AutoMapper;
using AdministracionFlotillas.ModelosComunes;
using AdministracionFlotillas.Web.ViewModels;

namespace AdministracionFlotillas.Web.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Flotilla, FlotillaViewModel>()
            .ForMember(dest => dest.FechaCreacion, opt => opt.MapFrom(src => src.FechaCreacion.ToString("dd/MM/yyyy")));
        
        CreateMap<FlotillaViewModel, Flotilla>();
    }
}

