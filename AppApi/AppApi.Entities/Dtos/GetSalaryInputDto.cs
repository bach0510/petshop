using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Dtos
{
    public class GetSalaryInputDto
    {
        public int Month { get; set; }
        public long Year { get; set; }
    }
}
