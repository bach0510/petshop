using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Dtos
{
    public class GetOrderInputDto
    {
        public string Status { get; set; }
        public string OrderCode { get; set; }
        public string OrderName { get; set; }
        //public string CusTel { get; set; }
        //public string CusCmnd { get; set; }
        //public int AreaId { get; set; }
    }
}
