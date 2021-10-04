using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Giong
    {
        [StringLength(10)]
        public String giongID { get; set; }

        [StringLength(5)]
        public String loaiID { get; set; }

        [StringLength(50)]
        public String tenGiong { get; set; }

        [StringLength(500)]
        public String mota { get; set; }
    }
}
