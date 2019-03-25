using AutoMapper;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Models;
using System;
using System.Collections.Generic;
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

        public async Task<LeaveCategoryViewModel> CreateAsync(LeaveCategoryViewModel leaveCategoryViewModel)
        {
            var leaveCategory = m_mapper.Map<LeaveCategory>(leaveCategoryViewModel);
            var updatedDate = DateTime.UtcNow;
            leaveCategory.UpdatedDate = updatedDate;
            leaveCategory.CreatedDate = updatedDate;
            leaveCategory = await m_leaveCategoryRepository.CreateAsync(leaveCategory);

            return m_mapper.Map<LeaveCategoryViewModel>(leaveCategory);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await m_leaveCategoryRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LeaveCategoryViewModel>> GetAllAsync()
        {
            var leaveCategories = await m_leaveCategoryRepository.GetAllAsync();
            return m_mapper.Map<IEnumerable<LeaveCategoryViewModel>>(leaveCategories);
        }

        public async Task<LeaveCategoryViewModel> GetAsync(int id)
        {
            var leaveCategory = await m_leaveCategoryRepository.GetAsync(id);
            return m_mapper.Map<LeaveCategoryViewModel>(leaveCategory);
        }

        public async Task<LeaveCategoryViewModel> UpdateAsync(LeaveCategoryViewModel leaveCategoryViewModel)
        {
            var leaveCategory = m_mapper.Map<LeaveCategory>(leaveCategoryViewModel);
            var updatedDate = DateTime.UtcNow;
            leaveCategory.UpdatedDate = updatedDate;
            leaveCategory = await m_leaveCategoryRepository.UpdateAsync(leaveCategory);

            return m_mapper.Map<LeaveCategoryViewModel>(leaveCategory);
        }
    }
}
