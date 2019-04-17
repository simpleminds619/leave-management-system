using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.ViewModels
{
    public class LeaveBankViewModel
    {
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public int TotalCurrentYearLeaves { get; set; }

        public int TotalLeavesAvailed { get; set; }

        public int TotalAvailableLeaves { get; set; }

        public int UpperLimit { get; set; }
    }
}
