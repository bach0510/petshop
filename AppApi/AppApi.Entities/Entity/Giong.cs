using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Giong
    {
        [StringLength(10)]
        public string giongID { get; set; }

        [StringLength(5)]
        public string loaiID { get; set; }

        [StringLength(50)]
        public string tenGiong { get; set; }

        [StringLength(500)]
        public string mota { get; set; }
    }
}
