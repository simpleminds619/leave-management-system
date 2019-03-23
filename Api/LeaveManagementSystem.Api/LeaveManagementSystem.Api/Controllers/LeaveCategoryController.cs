using LeaveManagementSystem.Api.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace LeaveManagementSystem.Api.Controllers
{
    public class LeaveCategoryController : Controller
    {
        private readonly ILeaveCategoryService m_leaveCategoryService;

        public LeaveCategoryController(ILeaveCategoryService leaveCategoryService)
        {
            m_leaveCategoryService = leaveCategoryService;
        }
    }
}