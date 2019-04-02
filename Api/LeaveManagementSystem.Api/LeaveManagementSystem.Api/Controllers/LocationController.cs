using LeaveManagementSystem.Api.Attributes;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Controllers
{
    [Route("api/v1")]
    public class LocationController : Controller
    {
        private readonly ILocationService m_locationService;

        public LocationController(ILocationService locationService)
        {
            m_locationService = locationService;
        }

        [HttpPost("locations.list")]
        [ResultName("locations")]
        public async Task<IEnumerable<LocationViewModel>> GetLocationsAsync()
        {
            var locations = await m_locationService.GetAllAsync();
            return locations;
        }
    }
}
