using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class NhanVien
    
    {
        public string MaNv { get; set; }
        public string HoTen { get; set; }
        public string GioiTinh { get; set; }
        public int Luong { get; set; }
        public string DiaChi { get; set; }
        public string Sdt { get; set; }
        public string ChucVu { get; set; }
        public string Cmnd { get; set; }
        public string Token { get; set; }
        public string TenTk { get; set; }
        public string MatKhau { get; set; }
        public DateTime NgaySinh { get; set; }
    }
}