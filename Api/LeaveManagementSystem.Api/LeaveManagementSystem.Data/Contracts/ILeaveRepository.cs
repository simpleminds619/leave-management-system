using LeaveManagementSystem.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Data.Contracts
{
    public interface ILeaveRepository
    {
        Task<IEnumerable<Leave>> GetAllAsync(int userId);

        Task<Leave> CreateAsync(Leave leave);

        Task<IEnumerable<LeaveBank>> GetLeaveBankAsync(int userId);
    }
}
