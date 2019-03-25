using AutoMapper;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
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
        private readonly IMapper m_mapper;

        public LeaveCategoryService(ILeaveCategoryRepository leaveCategoryRepository
                                   , IMapper mapper)
        {
            m_leaveCategoryRepository = leaveCategoryRepository;
            m_mapper = mapper;
        }

        public async Task<IEnumerable<LeaveCategoryViewModel>> GetLeaveCategoriesAsync()
        {
            var leaveCategories = await m_leaveCategoryRepository.GetLeaveCategoriesAsync();
            return m_mapper.Map<IEnumerable<LeaveCategoryViewModel>>(leaveCategories);
        }

        public async Task<LeaveCategoryViewModel> GetLeaveCategoryAsync(int id)
        {
            var leaveCategory = await m_leaveCategoryRepository.GetLeaveCategoryAsync(id);
            return m_mapper.Map<LeaveCategoryViewModel>(leaveCategory);
        }
    }
}
