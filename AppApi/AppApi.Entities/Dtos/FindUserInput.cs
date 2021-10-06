using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Dtos
{
    public class FindUserInput
    {
        public string MaNv { get; set; }
        public string TenTk { get; set; }
        public string MatKhau { get; set; }
        public string Token { get; set; }


    }
}
