using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Models;
using Dapper;

namespace LeaveManagementSystem.Data
{
    public class LeaveCategoryRepository : Repository, ILeaveCategoryRepository
    {
        public LeaveCategoryRepository(TransactionManager transactionManager) : base(transactionManager)
        {

        }

        public async Task<IEnumerable<LeaveCategory>> GetLeaveCategoriesAsync()
        {
            return await Connection.QueryAsync<LeaveCategory>("SELECT * FROM LeaveCategory_ref", transaction: Transaction);
        }

        public async Task<LeaveCategory> GetLeaveCategoryAsync(int id)
        {
            return await Connection.QuerySingleAsync<LeaveCategory>
                ($"SELECT * FROM LeaveCategory_ref WHERE Id={id}", transaction:Transaction);
        }
    }
}