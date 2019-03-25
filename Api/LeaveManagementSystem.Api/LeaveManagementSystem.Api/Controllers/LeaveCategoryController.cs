using LeaveManagementSystem.Api.Attributes;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using Microsoft.AspNetCore.Cors;
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
            var leaveCategories = await m_leaveCategoryService.GetLeaveCategoriesAsync();
            return leaveCategories;
        }
    }
}