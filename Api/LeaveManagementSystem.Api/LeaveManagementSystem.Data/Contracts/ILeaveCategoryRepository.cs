using LeaveManagementSystem.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Data.Contracts
{
    public interface ILeaveCategoryRepository
    {
        Task<IEnumerable<LeaveCategory>> GetAllAsync();

        Task<LeaveCategory> GetAsync(int id);

        Task<LeaveCategory> CreateAsync(LeaveCategory leaveCategory);

        Task<LeaveCategory> UpdateAsync(LeaveCategory leaveCategory);

        Task<bool> DeleteAsync(int id);
    }
}