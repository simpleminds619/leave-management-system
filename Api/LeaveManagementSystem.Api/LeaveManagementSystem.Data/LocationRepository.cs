using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Enums;
using LeaveManagementSystem.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace LeaveManagementSystem.Data
{
    public class LocationRepository : Repository, ILocationRepository
    {
        public LocationRepository(TransactionManager transactionManager) : base(transactionManager)
        {
        }

        public Task<IEnumerable<Location>> GetAllLocationsAsync(Status? status=Status.Active)
        {
            int statusVal = (int)status;
            return Connection.GetListAsync<Location>(new { Status = status });
        }
    }
}
