using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class HoaDon
    {
        [StringLength(10)]
        public String hdID { get; set; }

        [StringLength(5)]
        public String nguoiLap { get; set; }

        public DateTime ngayLap { get; set; }

        [StringLength(5)]
        public String khachHangID { get; set; }

        [StringLength(10)]
        public String khuyenMaiID { get; set; }

    }
}
