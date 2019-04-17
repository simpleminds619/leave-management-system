using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveManagementSystem.Data.Models
{
    [Table("UserLeave_xref", Schema = "dbo")]
    public class UserLeave
    {
        [Column("Id"), Key()]
        public int Id
        {
            get;
            set;
        }

        [Column("CategoryId")]
        public int CategoryId
        {
            get;
            set;
        }

        [Column("UserId")]
        public int UserId
        {
            get;
            set;
        }

        [Column("TotalAvailableLeaves")]
        public int? TotalAvailableLeaves
        {
            get;
            set;
        }
    }
}