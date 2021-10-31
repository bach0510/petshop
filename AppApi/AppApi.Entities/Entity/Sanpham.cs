using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Sanpham
    {
        [StringLength(5)]
        public string masp { get; set; }

        [StringLength(5)]
        public string loaiID { get; set; }

        [StringLength(100)]
        public string tenSP { get; set; }

        public int gia { get; set; }

        public int soLuong { get; set; }
    }
}
