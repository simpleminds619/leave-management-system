using LeaveManagementSystem.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services.Contracts
{
    public interface IHolidayService
    {
        Task<IEnumerable<HolidayViewModel>> GetAllAsync();

        Task<HolidayViewModel> CreateAsync(HolidayViewModel holiday);

        Task<HolidayViewModel> UpdateAsync(HolidayViewModel holidayViewModel);

        Task<bool> DeleteAsync(int holidayId);
    }
}
