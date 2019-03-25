using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveManagementSystem.Data.Models
{
    [Table("LeaveCategory_ref", Schema = "dbo")]
    public class LeaveCategory
    {
        [Column("Id"),Key]
        public int Id
        {
            get;
            set;
        }

        [Column("Name")]
        public string Name
        {
            get;
            set;
        }

        [Column("Code")]
        public string Code
        {
            get;
            set;
        }

        [Column("TotalLeaves")]
        public int? TotalLeaves
        {
            get;
            set;
        }

        [Column("TotalCarryFwdLeaves")]
        public int? TotalCarryFwdLeaves
        {
            get;
            set;
        }

        [Column("CarryFwdUpperLimit")]
        public int? CarryFwdUpperLimit
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