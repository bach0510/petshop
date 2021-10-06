using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class KhuyenMai
    {
        [StringLength(10)]
        public String kmID { get; set; }

        public int GiaKhuyenMai { get; set; }
        public DateTime ngayBD { get; set; }
        public DateTime ngayKT { get; set; }
    }
}
