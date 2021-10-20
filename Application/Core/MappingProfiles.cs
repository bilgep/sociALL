using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<SocialEvent, SocialEvent>();  // Map from => Map to
        }
    }
}