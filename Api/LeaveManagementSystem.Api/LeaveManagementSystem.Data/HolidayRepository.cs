using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using LeaveManagementSystem.Data.Enums;
using System;

namespace LeaveManagementSystem.Data
{
    public class HolidayRepository : Repository, IHolidayRepository
    {
        public HolidayRepository(TransactionManager transactionManager) : base(transactionManager)
        {
        }

        public async Task<IEnumerable<LocationHoliday>> GetAllAsync()
        {
            var holidays = await Connection.GetListAsync<Holiday>();
            var locations = await Connection.GetListAsync<Location>();

            var locationHolidays = from h in holidays
                                   join l in locations
                                   on h.LocationId equals l.Id
                                   where h.Status != (int)Status.Deleted
                                   select new LocationHoliday()
                                   {
                                       Id = h.Id,
                                       LocationId = h.LocationId,
                                       LocationName = l.Name,
                                       Reason = h.Reason,
                                       Status = h.Status,
                                       Year = h.Year,
                                       EffectiveDate = h.EffectiveDate
                                   };
            return locationHolidays.OrderBy(h=>h.EffectiveDate);
        }

        public async Task<LocationHoliday> CreateAsync(LocationHoliday locationHoliday)
        {
            var holiday = new Holiday()
            {
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow,
                EffectiveDate = locationHoliday.EffectiveDate,
                LocationId = locationHoliday.LocationId,
                Reason = locationHoliday.Reason,
                Status = locationHoliday.Status,
                Year = locationHoliday.Year
            };
            var id = await Connection.InsertAsync<int>(holiday, Transaction);
            locationHoliday.Id = id;
            return locationHoliday;
        }

        public async Task<bool> DeleteAsync(int holidayId)
        {
            var holiday = await Connection.GetAsync<Holiday>(holidayId, transaction: Transaction);
            holiday.Status = (int)Status.Deleted;
            holiday.UpdatedDate = DateTime.UtcNow;
            var result = await Connection.UpdateAsync(holiday, Transaction);
            return result == 1;
        }

        public async Task<LocationHoliday> UpdateAsync(LocationHoliday locationHoliday)
        {
            var holiday = new Holiday()
            {
                Id = locationHoliday.Id,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow,
                EffectiveDate = locationHoliday.EffectiveDate,
                LocationId = locationHoliday.LocationId,
                Reason = locationHoliday.Reason,
                Status = locationHoliday.Status,
                Year = locationHoliday.Year
            };
            var result = await Connection.UpdateAsync(holiday, transaction: Transaction);
            return locationHoliday;
        }
    }
}
