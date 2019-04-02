using LeaveManagementSystem.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Data.Contracts
{
    public interface IHolidayRepository
    {
        Task<IEnumerable<LocationHoliday>> GetAllAsync();

        Task<LocationHoliday> CreateAsync(LocationHoliday holiday);

        Task<bool> DeleteAsync(int holidayId);

        Task<LocationHoliday> UpdateAsync(LocationHoliday locationHoliday);
    }
}