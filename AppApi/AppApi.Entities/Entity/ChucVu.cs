using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class ChucVu
    {
        [StringLength(5)]
        public String cvID { get; set; }

        [StringLength(100)]
        public String dienGiai { get; set; }
    }
}
