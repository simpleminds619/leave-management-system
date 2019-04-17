using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Api.ViewModels
{
    public class LeaveViewModel
    {
        public int? Id { get; set; }

        public int CategoryId { get; set; }

        public int UserId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Reason { get; set; }

        public string Status { get; set; }

        public DateTime ApprovalDate { get; set; }

        public string ApproverComments { get; set; }
    }
}
