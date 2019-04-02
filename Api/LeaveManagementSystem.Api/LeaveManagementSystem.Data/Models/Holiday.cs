using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveManagementSystem.Data.Models
{
    [Table("Holiday_ref", Schema = "dbo")]
    public class Holiday
    {
        [Column("Id"), Key()]
        public int Id
        {
            get;
            set;
        }

        [Column("LocationId")]
        public int? LocationId
        {
            get;
            set;
        }

        [Column("Year")]
        public int? Year
        {
            get;
            set;
        }

        [Column("Reason")]
        public string Reason
        {
            get;
            set;
        }

        [Column("EffectiveDate")]
        public DateTime? EffectiveDate
        {
            get;
            set;
        }

        [Column("Status")]
        public int? Status
        {
            get;
            set;
        }

        [Column("UpdatedDate")]
        public DateTime? UpdatedDate
        {
            get;
            set;
        }

        [Column("CreatedDate")]
        public DateTime? CreatedDate
        {
            get;
            set;
        }
    }
}