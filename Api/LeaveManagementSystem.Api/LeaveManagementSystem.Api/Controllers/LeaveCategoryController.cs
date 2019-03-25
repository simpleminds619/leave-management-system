using LeaveManagementSystem.Api.Attributes;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Controllers
{
    [Route("api/v1")]
    public class LeaveCategoryController : Controller
    {
        private readonly ILeaveCategoryService m_leaveCategoryService;

        public LeaveCategoryController(ILeaveCategoryService leaveCategoryService)
        {
            m_leaveCategoryService = leaveCategoryService;
        }

        [HttpPost("leavecategories.list")]
        [ResultName("leaveCategories")]
        public async Task<IEnumerable<LeaveCategoryViewModel>> GetLeaveCategoriesAsync()
        {
            var leaveCategories = await m_leaveCategoryService.GetAllAsync();
            return leaveCategories;
        }

        [HttpPost("leavecategory.create")]
        [ResultName("leaveCategory")]
        public async Task<LeaveCategoryViewModel> CreateLeaveCategoriesAsync([FromBody] LeaveCategoryViewModel leaveCategoryViewModel)
        {
            var leaveCategory = await m_leaveCategoryService.CreateAsync(leaveCategoryViewModel);
            return leaveCategory;
        }

        [HttpPost("leavecategory.update")]
        [ResultName("leaveCategory")]
        public async Task<LeaveCategoryViewModel> UpdateLeaveCategoriesAsync([FromBody] LeaveCategoryViewModel leaveCategoryViewModel)
        {
            var leaveCategory = await m_leaveCategoryService.UpdateAsync(leaveCategoryViewModel);
            return leaveCategory;
        }

        [HttpPost("leavecategory.delete")]
        [ResultName("leaveCategory")]
        public async Task<bool> DeleteLeaveCategoriesAsync(int id)
        {
            var isDeleted = await m_leaveCategoryService.DeleteAsync(id);
            return isDeleted;
        }
    }
}