using System.Data.SqlClient;

namespace AppApi.DL
{
    public class DBConnect
    {
        protected SqlConnection _conn = new SqlConnection("server=DESKTOP-8PT3G6R;database=QuanLyThuCung;uid=admin;password=5011;");
    }
}
