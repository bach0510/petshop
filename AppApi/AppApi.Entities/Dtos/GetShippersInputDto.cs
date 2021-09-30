using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Dtos
{
    public class GetShippersInputDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Tel { get; set; }
        public string Cmnd { get; set; }
        public string Code { get; set; }
        public string RegisterNo { get; set; }
        public string AreaId { get; set; }
    }
}
