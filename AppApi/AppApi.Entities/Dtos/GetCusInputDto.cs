using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Dtos
{
    public class GetCusInputDto 
    {
        public String MAKH { get; set; }
        public string HoTen { get; set; }
        public string gioiTinh { get; set; }
        public string sdt { get; set; }
        public string CMND { get; set; }
        public DateTime ngaySinh { get; set; }
        public String  diaChi { get; set; }
    }
}
