using LeaveManagementSystem.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services.Contracts
{
    public interface ILeaveService
    {
        Task<IEnumerable<LeaveViewModel>> GetAllAsync(int userId);

        Task<LeaveViewModel> ApplyLeaveAsync(LeaveViewModel leaveViewModel);

        Task<IEnumerable<LeaveBankViewModel>> GetLeaveBankAsync(int userId);
    }
}
