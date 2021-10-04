using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class ChiTietHoaDonSanPham
    {
        [StringLength(10)]
        public String hdID { get; set; }

        public int stt { get; set; }

        [StringLength(5)]
        public String spID { get; set; }

        public int soLuong { get; set; }

        public int gia { get; set; }



    }
}
