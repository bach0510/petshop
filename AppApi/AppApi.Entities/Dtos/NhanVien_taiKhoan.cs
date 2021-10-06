using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Dtos
{

    public class NhanVien_taiKhoan 
    {
        [StringLength(5)]
        public string MaNv { get; set; }

        [StringLength(50)]
        public String HoTen { get; set; }

        [StringLength(3)]
        public String GioiTinh { get; set; }

        public DateTime NgaySinh { get; set; }

        [StringLength(200)]
        public String DiaChi { get; set; }

        [StringLength(12)]
        public String Sdt { get; set; }

        [StringLength(10)]
        public String ChucVu { get; set; }

        public int Luong { get; set; }

        [StringLength(10)]
        public String CMND { get; set; }

        [StringLength(50)]
        public String taiKhoan { get; set; }
        public String matKhau { get; set; }


    }
}
