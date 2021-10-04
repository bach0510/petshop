using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Loai
    {
        [StringLength(5)]
        public String loaiID { get; set; }

        [StringLength(50)]
        public String TenLoai { get; set; }
    }
}
