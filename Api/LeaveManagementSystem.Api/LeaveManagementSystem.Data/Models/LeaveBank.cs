using System;
using System.Collections.Generic;
using System.Text;

namespace LeaveManagementSystem.Data.Models
{
    public class LeaveBank
    {
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public int TotalCurrentYearLeaves { get; set; }

        public int TotalLeavesAvailed { get; set; }

        public int TotalAvailableLeaves { get; set; }

        public int UpperLimit { get; set; }
    }
}
