using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
    public class DBConnect
    {
        protected SqlConnection _conn = new SqlConnection("server=DESKTOP-8PT3G6R;database=QuanLyCuaHangThuCung;uid=admin;password=admin;");
    }
}
