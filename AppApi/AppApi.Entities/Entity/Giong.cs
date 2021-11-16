using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Giong
    {
        [StringLength(10)]
        public string MaGiong { get; set; }

        [StringLength(5)]
        public string Maloai { get; set; }

        [StringLength(50)]
        public string TenGiong { get; set; }

        [StringLength(500)]
        public string Mota { get; set; }
    }
}
