using LeaveManagementSystem.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Data.Contracts
{
    public interface ILeaveCategoryRepository
    {
        Task<IEnumerable<LeaveCategory>> GetLeaveCategoriesAsync();

        Task<LeaveCategory> GetLeaveCategoryAsync(int id);
    }
}