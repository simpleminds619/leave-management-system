using LeaveManagementSystem.Api.Attributes;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Controllers
{
    [Route("api/v1")]
    public class LeaveController : Controller
    {
        private readonly ILeaveService m_leaveService;
        public LeaveController(ILeaveService leaveService)
        {
            m_leaveService = leaveService;
        }

        [HttpPost("leaves.list")]
        [ResultName("leaves")]
        public async Task<IEnumerable<LeaveViewModel>> GetAllAsync(int userId)
        {
            return await m_leaveService.GetAllAsync(userId);
        }

        [HttpPost("leave.apply")]
        [ResultName("leave")]
        public async Task<LeaveViewModel> ApplyLeaveAsync([FromBody]LeaveViewModel leaveViewModel)
        {
            return await m_leaveService.ApplyLeaveAsync(leaveViewModel);
        }

        [HttpPost("leaves.userLeaveBank")]
        [ResultName("leaveBank")]
        public async Task<IEnumerable<LeaveBankViewModel>> GetLeaveBankAsync(int userId)
        {
            return await m_leaveService.GetLeaveBankAsync(userId);
        }
    }
}