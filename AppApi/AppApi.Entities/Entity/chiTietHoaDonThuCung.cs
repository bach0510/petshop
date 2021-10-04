using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class ChiTietHoaDonThuCung
    {
        [StringLength(10)]
        public String hdID { get; set; }

        public int stt { get; set; }

        [StringLength(5)]
        public String petID { get; set; }

        public int soLuong { get; set; }

        public int gia { get; set; }



    }
}
