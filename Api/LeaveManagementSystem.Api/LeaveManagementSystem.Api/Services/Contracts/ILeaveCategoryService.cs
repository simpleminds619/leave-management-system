﻿using LeaveManagementSystem.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.Services.Contracts
{
    public interface ILeaveCategoryService
    {
        Task<IEnumerable<LeaveCategoryViewModel>> GetLeaveCategoriesAsync();

        Task<LeaveCategoryViewModel> GetLeaveCategoryAsync(int id);
    }
}
