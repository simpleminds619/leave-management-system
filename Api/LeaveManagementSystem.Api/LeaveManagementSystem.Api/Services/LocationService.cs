using AutoMapper;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository m_locationRepository;
        private readonly IMapper m_mapper;

        public LocationService(ILocationRepository locationRepository, IMapper mapper)
        {
            m_locationRepository = locationRepository;
            m_mapper = mapper;
        }

        public async Task<IEnumerable<LocationViewModel>> GetAllAsync()
        {
            var locations = await m_locationRepository.GetAllLocationsAsync();
            return m_mapper.Map<IEnumerable<LocationViewModel>>(locations);
        }
    }
}
