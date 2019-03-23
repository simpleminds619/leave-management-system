using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services
{
    public class LeaveCategoryService : ILeaveCategoryService
    {
        private readonly ILeaveCategoryRepository m_leaveCategoryRepository;

        public LeaveCategoryService(ILeaveCategoryRepository leaveCategoryRepository)
        {
            m_leaveCategoryRepository = leaveCategoryRepository;
        }
    }
}
