using AutoMapper;
using LeaveManagementSystem.Api.Attributes;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Controllers
{
    [Route("api/v1")]
    public class HolidayController : Controller
    {
        private readonly IHolidayService m_holidayService;
        public HolidayController(IHolidayService holidayService)
        {
            m_holidayService = holidayService;
        }

        [HttpPost("holidays.list")]
        [ResultName("holidays")]
        public async Task<IEnumerable<HolidayViewModel>> GetHolidaysListAsync()
        {
            return await m_holidayService.GetAllAsync();
        }

        [HttpPost("holiday.create")]
        [ResultName("holiday")]
        public async Task<HolidayViewModel> CreateHolidaysAsync([FromBody]HolidayViewModel holidayViewModel)
        {
            return await m_holidayService.CreateAsync(holidayViewModel);
        }

        [HttpPost("holiday.update")]
        [ResultName("holiday")]
        public async Task<HolidayViewModel> UpdateHolidaysAsync([FromBody]HolidayViewModel holidayViewModel)
        {
            return await m_holidayService.UpdateAsync(holidayViewModel);
        }

        [HttpPost("holiday.delete")]
        [ResultName("holiday")]
        public async Task<bool> DeleteHolidaysAsync(int holidayId)
        {
            return await m_holidayService.DeleteAsync(holidayId);
        }
    }
}
