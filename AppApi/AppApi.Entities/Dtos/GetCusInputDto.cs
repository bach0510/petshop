using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Dtos
{
    public class GetCusInputDto 
    {
        public string CusName { get; set; }
        public string CusEmail { get; set; }
        public string CusTel { get; set; }
        public string CusCmnd { get; set; }
        public int AreaId { get; set; }
        public int Id { get; set; }
    }
}
