using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Loai
    {
        [StringLength(5)]
        public string MaLoai { get; set; }

        [StringLength(50)]
        public string TenLoai { get; set; }
    }
}
