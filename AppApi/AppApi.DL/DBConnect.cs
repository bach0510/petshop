using System.Data.SqlClient;

namespace AppApi.DL
{
    public class DBConnect
    {
        protected SqlConnection _conn = new SqlConnection("server=DESKTOP-Q441MKR;database=QuanLyThuCung;uid=admin;password=admin;");
    }
}
