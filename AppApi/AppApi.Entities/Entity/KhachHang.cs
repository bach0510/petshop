using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class KhachHang
    {
        [StringLength(5)]
        public string MAKH { get; set; }

        [StringLength(50)]
        public string HoTen { get; set; }

        [StringLength(3)]
        public string gioiTinh { get; set; }

        public DateTime ngaySinh { get; set; }

        [StringLength(200)]
        public string diaChi { get; set; }

        [StringLength(12)]
        public string sdt { get; set; }

        [StringLength(10)]
        public string CMND { get; set; }


    }
}
