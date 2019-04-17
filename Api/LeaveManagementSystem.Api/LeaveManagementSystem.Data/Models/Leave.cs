using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveManagementSystem.Data.Models
{
    [Table("Leave_ref", Schema = "dbo")]
    public class Leave
    {
        [Column("Id"), Key()]
        public int Id
        {
            get;
            set;
        }

        [Column("CategoryId")]
        public int? CategoryId
        {
            get;
            set;
        }

        [Column("UserId")]
        public int? UserId
        {
            get;
            set;
        }

        [Column("StartDate")]
        public DateTime? StartDate
        {
            get;
            set;
        }

        [Column("EndDate")]
        public DateTime? EndDate
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

        [Column("StatusId")]
        public int? StatusId
        {
            get;
            set;
        }

        [Column("ApprovalDate")]
        public DateTime? ApprovalDate
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

        [Column("UpdatedDate")]
        public DateTime? UpdatedDate
        {
            get;
            set;
        }
    }
}