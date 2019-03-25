using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Models;
using Dapper;
using System.Linq;
using LeaveManagementSystem.Data.Enums;
using System;

namespace LeaveManagementSystem.Data
{
    public class LeaveCategoryRepository : Repository, ILeaveCategoryRepository
    {
        public LeaveCategoryRepository(TransactionManager transactionManager) : base(transactionManager)
        {
        }

        public async Task<LeaveCategory> CreateAsync(LeaveCategory leaveCategory)
        {
            var categoryId = await Connection.InsertAsync<int>(leaveCategory, transaction: Transaction);
            leaveCategory.Id = categoryId;
            return leaveCategory;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var leaveCategory = await GetAsync(id);
            leaveCategory.Status = (int)Status.Deleted;
            leaveCategory.UpdatedDate = DateTime.UtcNow;
            int result = await Connection.UpdateAsync(leaveCategory, transaction: Transaction);
            return result > 0;
        }

        public async Task<IEnumerable<LeaveCategory>> GetAllAsync()
        {
            var leaveCategories = await Connection.GetListAsync<LeaveCategory>();
            return leaveCategories.Where((l) => l.Status != (int)Status.Deleted);
        }

        public async Task<LeaveCategory> GetAsync(int id)
        {
            return await Connection.GetAsync<LeaveCategory>(id);
        }

        public async Task<LeaveCategory> UpdateAsync(LeaveCategory leaveCategory)
        {
            var result = await Connection.UpdateAsync(leaveCategory, transaction: Transaction);
            return await GetAsync(leaveCategory.Id);
        }
    }
}