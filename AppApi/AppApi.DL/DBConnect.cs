using System.Data.SqlClient;

namespace AppApi.DL
{
    public class DBConnect
    {
        protected SqlConnection _conn = new SqlConnection("server=DESKTOP-8PT3G6R;database=QuanLyCuaHangThuCung;uid=admin;password=admin;");
    }
}
