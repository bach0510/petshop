using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Dtos
{

    public class NhanVien_taiKhoan 
    {
        [StringLength(5)]
        public string MaNv { get; set; }

        [StringLength(50)]
        public string HoTen { get; set; }

        [StringLength(3)]
        public string GioiTinh { get; set; }

        public DateTime NgaySinh { get; set; }

        [StringLength(200)]
        public string DiaChi { get; set; }

        [StringLength(12)]
        public string Sdt { get; set; }

        [StringLength(10)]
        public string ChucVu { get; set; }

        public int Luong { get; set; }

        [StringLength(10)]
        public string CMND { get; set; }

        [StringLength(50)]
        public string taiKhoan { get; set; }
        public string matKhau { get; set; }


    }
}
