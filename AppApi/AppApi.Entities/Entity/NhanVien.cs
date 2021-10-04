using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class NhanVien
    
    {
        [StringLength(5)]
        public String nvID { get; set; }

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
        public string MaNv { get; set; }
    }
}