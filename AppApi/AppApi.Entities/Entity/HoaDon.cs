using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class HoaDon
    {
        [StringLength(10)]
        public string MAHD { get; set; }

        [StringLength(5)]
        public string NGUOILAPHD { get; set; }

        public DateTime NGAYLAP { get; set; }

        [StringLength(5)]
        public string MAKH { get; set; }

        [StringLength(10)]
        public string MAKM { get; set; }
        public int giaKhuyenMai { get; set; }

        public int tong { get; set; }

    }
}
