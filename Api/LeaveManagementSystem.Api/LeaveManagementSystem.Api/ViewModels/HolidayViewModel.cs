using System;

namespace LeaveManagementSystem.Api.ViewModels
{
    public class HolidayViewModel
    {
        public int Id { get; set; }

        public LocationViewModel Location { get; set; }

        public int? Year
        {
            get;
            set;
        }

        public string Reason
        {
            get;
            set;
        }

        public DateTime? EffectiveDate
        {
            get;
            set;
        }

        public string Day { get; set; }

        public string Status { get; set; }
    }
}
