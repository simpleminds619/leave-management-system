using LeaveManagementSystem.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services.Contracts
{
    public interface ILeaveCategoryService
    {
        Task<IEnumerable<LeaveCategoryViewModel>> GetAllAsync();

        Task<LeaveCategoryViewModel> GetAsync(int id);

        Task<LeaveCategoryViewModel> CreateAsync(LeaveCategoryViewModel leaveCategoryViewModel);

        Task<LeaveCategoryViewModel> UpdateAsync(LeaveCategoryViewModel leaveCategoryViewModel);

        Task<bool> DeleteAsync(int id);
    }
}
