using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveManagementSystem.Data.Models
{
    [Table("Location_ref", Schema = "dbo")]
    public class Location
    {
        [Column("Id"), Key()]
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