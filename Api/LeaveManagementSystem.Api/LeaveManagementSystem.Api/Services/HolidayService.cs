using AutoMapper;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services
{
    public class HolidayService : IHolidayService
    {
        private readonly IHolidayRepository m_holidayRepository;
        private readonly IMapper m_mapper;

        public HolidayService(IHolidayRepository holidayRepository, IMapper mapper)
        {
            m_holidayRepository = holidayRepository;
            m_mapper = mapper;
        }

        public async Task<HolidayViewModel> CreateAsync(HolidayViewModel holiday)
        {
            var locationHoliday = m_mapper.Map<LocationHoliday>(holiday);
            locationHoliday = await m_holidayRepository.CreateAsync(locationHoliday);
            return m_mapper.Map<HolidayViewModel>(locationHoliday);
        }

        public async Task<bool> DeleteAsync(int holidayId)
        {
            return await m_holidayRepository.DeleteAsync(holidayId);
        }

        public async Task<IEnumerable<HolidayViewModel>> GetAllAsync()
        {
            var holidays = await m_holidayRepository.GetAllAsync();
            return m_mapper.Map<IEnumerable<HolidayViewModel>>(holidays);
        }

        public async Task<HolidayViewModel> UpdateAsync(HolidayViewModel holidayViewModel)
        {
            var locationHoliday = m_mapper.Map<LocationHoliday>(holidayViewModel);
            locationHoliday = await m_holidayRepository.UpdateAsync(locationHoliday);
            return m_mapper.Map<HolidayViewModel>(locationHoliday);
        }
    }
}