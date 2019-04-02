using System;
using System.Collections.Generic;
using System.Text;

namespace LeaveManagementSystem.Data.Models
{
    public class LocationHoliday
    {
        public int Id
        {
            get;
            set;
        }

        public int? LocationId
        {
            get;
            set;
        }

        public string LocationName
        {
            get;
            set;
        }

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

        public int? Status
        {
            get;
            set;
        }

        public DateTime? UpdatedDate
        {
            get;
            set;
        }

        public DateTime? CreatedDate
        {
            get;
            set;
        }
    }
}
