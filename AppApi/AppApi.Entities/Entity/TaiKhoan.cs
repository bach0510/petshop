using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class TaiKhoan
    {
        public string MaNv { get; set; }
        public string TenTk { get; set; }
        public string MatKhau { get; set; }
        public string Token { get; set; }
    }
}