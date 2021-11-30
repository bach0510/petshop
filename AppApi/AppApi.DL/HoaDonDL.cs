
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace AppApi.DL
{
    public class HoaDonDL : DBConnect
    {
        public List<HoaDon> DoanhThu(GetHoaDonInput input)
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            //if (input.Value == 1)
            //{
            //    spName = @"dbo.[XemChiTietHoaDon]";
            //    cmd = new SqlCommand(spName, _conn);

            //    cmd.Parameters.AddWithValue("@maHD", input.Filter);
            //}
          
            //if (string.IsNullOrWhiteSpace(input.Filter))
            //{
                spName = @"dbo.[XuatHoaDon]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@NgayBD", input.Filter ?? "01/01/2000");
                cmd.Parameters.AddWithValue("@NgayKT", input.Filter ?? DateTime.Now.ToString());
            //}

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var DanhSachHoaDon = new List<HoaDon>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var hoaDon = new HoaDon();

                    hoaDon.MAKH = sqlDataReader["MAKH"].ToString();
                    hoaDon.NGUOILAPHD = sqlDataReader["NGUOILAPHD"].ToString();
                    hoaDon.MAKH = sqlDataReader["MAKH"].ToString();
                    hoaDon.MAKM = sqlDataReader["MAKM"].ToString(); 
                    hoaDon.giaKhuyenMai = (int)sqlDataReader["giaKhuyenMai"];
                    hoaDon.NGAYLAP = DateTime.Parse(sqlDataReader["NGAYLAP"].ToString());
                    hoaDon.tong = (int)sqlDataReader["tong"];

                    DanhSachHoaDon.Add(hoaDon);
                }
            }
            _conn.Close();
            return DanhSachHoaDon.ToList();
        }

        public bool UpdateDL(HoaDon input)
        {
            _conn.Open();

            string spName = @"dbo.[updateKhachHang]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@makh", input.MAKH);
            cmd.Parameters.AddWithValue("@NGUOILAPHD", input.NGUOILAPHD);
            cmd.Parameters.AddWithValue("@MAKH", input.MAKH);
            cmd.Parameters.AddWithValue("@MAKM", input.MAKM);
            cmd.Parameters.AddWithValue("@giaKhuyenMai", input.giaKhuyenMai);
            cmd.Parameters.AddWithValue("@NGAYLAP", input.NGAYLAP);
            //cmd.Parameters.AddWithValue("@tong", input.tong);

            cmd.CommandType = CommandType.StoredProcedure;

            //SqlDataReader sqlDataReader = cmd.ExecuteReader();

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        /*public bool DeleteDL(HoaDon input)
        {
            string spName = @"dbo.[deleteKhachHang]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@makh", input.MAKH);
            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }*/

    }
}
