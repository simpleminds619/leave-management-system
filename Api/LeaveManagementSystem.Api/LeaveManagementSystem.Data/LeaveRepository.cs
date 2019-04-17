using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using LeaveManagementSystem.Data.Enums;
using System.Linq;
using System;

namespace LeaveManagementSystem.Data
{
    public class LeaveRepository : Repository, ILeaveRepository
    {
        public LeaveRepository(TransactionManager transactionManager) : base(transactionManager)
        {
            
        }

        public async Task<Leave> CreateAsync(Leave leave)
        {
            var requestId = await Connection.InsertAsync<int>(leave, transaction: Transaction);
            leave.Id = requestId;
            var userLeaveBank = (await Connection.GetListAsync<UserLeave>(new { leave.UserId, leave.CategoryId }, transaction: Transaction)).First();
            userLeaveBank.TotalAvailableLeaves = userLeaveBank.TotalAvailableLeaves - 1;
            await Connection.UpdateAsync(userLeaveBank, transaction: Transaction);
            return leave;
        }

        public async Task<IEnumerable<Leave>> GetAllAsync(int userId)
        {
            var leaves = await Connection.GetListAsync<Leave>(new { UserId = userId }, Transaction);
            return leaves;
        }

        public async Task<IEnumerable<LeaveBank>> GetLeaveBankAsync(int userId)
        {
            var leaveCategories = await Connection.GetListAsync<LeaveCategory>(new { Status = (int)Status.Active }, transaction: Transaction);
            var userLeaves = await Connection.GetListAsync<Leave>(
                                        new { UserId = userId });
            var userLeaveBalance = await Connection.GetListAsync<UserLeave>(new { UserId = userId });
            var userLeaveBank = new List<LeaveBank>();
            leaveCategories.ToList().ForEach(lc =>
            {
                var leaveBank = new LeaveBank()
                {
                    CategoryId = lc.Id,
                    CategoryName = $"{lc.Name} ({lc.Code})",
                    UpperLimit = lc.CarryFwdUpperLimit.Value,
                    TotalLeavesAvailed = userLeaves.Count(ul => ul.CategoryId == lc.Id
                                                    && (ul.StatusId != (int)LeaveStatus.Cancelled || ul.StatusId != (int)LeaveStatus.Rejected)),
                    TotalCurrentYearLeaves = userLeaves.Count(ul => ul.CategoryId == lc.Id
                                                    && (ul.StatusId != (int)LeaveStatus.Cancelled || ul.StatusId != (int)LeaveStatus.Rejected)
                                                    && (ul.CreatedDate.Value.Year == DateTime.UtcNow.Year)),
                };
                leaveBank.TotalAvailableLeaves = userLeaveBalance.First(ub=>ub.CategoryId == lc.Id).TotalAvailableLeaves.Value;
                userLeaveBank.Add(leaveBank);
            });
            return userLeaveBank;            
        }
    }
}
