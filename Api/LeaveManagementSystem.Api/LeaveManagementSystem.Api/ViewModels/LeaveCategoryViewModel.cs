using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.ViewModels
{
    public class LeaveCategoryViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public int? TotalLeaves { get; set; }

        public int? TotalCarryFwdLeaves { get; set; }

        public int? UpperLimitOfLeaves { get; set; }

        public string Status { get; set; }
    }
}
