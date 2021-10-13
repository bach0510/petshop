using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class HoaDon
    {
        [StringLength(10)]
        public string hdID { get; set; }

        [StringLength(5)]
        public string nguoiLap { get; set; }

        public DateTime ngayLap { get; set; }

        [StringLength(5)]
        public string khachHangID { get; set; }

        [StringLength(10)]
        public string khuyenMaiID { get; set; }

    }
}
