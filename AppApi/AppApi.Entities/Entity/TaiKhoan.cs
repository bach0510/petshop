using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class TaiKhoan
    {
        [StringLength(5)]
        public String nvID { get; set; }

        [StringLength(50)]
        public String taiKhoan { get; set; }
        public String matKhau { get; set; }

    }
}
