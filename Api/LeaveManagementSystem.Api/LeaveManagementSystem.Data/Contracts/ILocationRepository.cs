using LeaveManagementSystem.Data.Enums;
using LeaveManagementSystem.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Data.Contracts
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> GetAllLocationsAsync(Status? status=Status.Active);
    }
}
