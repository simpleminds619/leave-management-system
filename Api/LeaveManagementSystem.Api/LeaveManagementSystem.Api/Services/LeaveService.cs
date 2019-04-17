using AutoMapper;
using LeaveManagementSystem.Api.Services.Contracts;
using LeaveManagementSystem.Api.ViewModels;
using LeaveManagementSystem.Data.Contracts;
using LeaveManagementSystem.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services
{
    public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository m_leaveRepository;
        private readonly IMapper m_mapper;

        public LeaveService(ILeaveRepository leaveRepository, IMapper mapper)
        {
            m_leaveRepository = leaveRepository;
            m_mapper = mapper;
        }

        public async Task<LeaveViewModel> ApplyLeaveAsync(LeaveViewModel leaveViewModel)
        {
            var leave = m_mapper.Map<Leave>(leaveViewModel);
            leave.CreatedDate = DateTime.UtcNow;
            leave.UpdatedDate = DateTime.UtcNow;
            leave = await m_leaveRepository.CreateAsync(leave);
            return m_mapper.Map<LeaveViewModel>(leave);
        }

        public async Task<IEnumerable<LeaveViewModel>> GetAllAsync(int userId)
        {
            var leaves = await m_leaveRepository.GetAllAsync(userId);
            return m_mapper.Map<IEnumerable<LeaveViewModel>>(leaves);
        }

        public async Task<IEnumerable<LeaveBankViewModel>> GetLeaveBankAsync(int userId)
        {
            var userLeaveBank = await m_leaveRepository.GetLeaveBankAsync(userId);
            return m_mapper.Map<IEnumerable<LeaveBankViewModel>>(userLeaveBank);
        }
    }
}