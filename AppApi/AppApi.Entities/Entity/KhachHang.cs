using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class KhachHang
    {
        [StringLength(5)]
        public String MAKH { get; set; }

        [StringLength(50)]
        public String HoTen { get; set; }

        [StringLength(3)]
        public String gioiTinh { get; set; }

        public DateTime ngaySinh { get; set; }

        [StringLength(200)]
        public String diaChi { get; set; }

        [StringLength(12)]
        public String sdt { get; set; }

        [StringLength(10)]
        public String CMND { get; set; }


    }
}
