using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Dtos
{
    public class SalaryDto
    {
        public int Id { get; set; }
        public int Month { get; set; }
        public long Year { get; set; }
        public string FullName { get; set; }
        public float TienThuong { get; set; }
        public float TienPhat { get; set; }
        public int SoDon { get; set; }
        public float TienLuong { get; set; }
    }
}
