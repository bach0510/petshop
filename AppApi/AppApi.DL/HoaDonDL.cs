
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

                cmd.Parameters.AddWithValue("@NgayBD", input.FromDate.ToLower() == "invalid date" ? "01/01/2000" : input.FromDate);
                cmd.Parameters.AddWithValue("@NgayKT", input.ToDate.ToLower() == "invalid date" ? DateTime.Now.ToString("MM/dd/yyyy") : input.ToDate);
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
                    //if (!Convert.IsDBNull(sqlDataReader["giaKhuyenMai"]))
                    //{
                    //    hoaDon.giaKhuyenMai = (int)sqlDataReader["giaKhuyenMai"];
                    //}
                   
                    hoaDon.NGAYLAP = DateTime.Parse(sqlDataReader["NGAYLAP"].ToString());
                    hoaDon.tong = (int)sqlDataReader["TONG"];
                    hoaDon.MAHD = sqlDataReader["MAHD"].ToString();

                    DanhSachHoaDon.Add(hoaDon);
                }
            }
            _conn.Close();
            return DanhSachHoaDon.ToList();
        }

        public List<ChiTietHoaDonSanPham> GetChiTietHoaDon(GetHoaDonInput input)
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
            spName = @"dbo.[XemChiTietHoaDon]";
            cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@maHD", input.MaHd);
            //}

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var DanhSachHoaDon = new List<ChiTietHoaDonSanPham>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var hoaDon = new ChiTietHoaDonSanPham();

                    hoaDon.ma = sqlDataReader["MA"].ToString();
                    hoaDon.ten = sqlDataReader["TEN"].ToString();
                    hoaDon.soLuong = (int)sqlDataReader["SOLUONG"];
                    hoaDon.gia = (int)sqlDataReader["DONGIA"];

                    DanhSachHoaDon.Add(hoaDon);
                }
            }
            _conn.Close();
            return DanhSachHoaDon.ToList();
        }

        public List<KhuyenMai> GetKhuyenMai(string makm)
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            spName = @"dbo.[findKhuyenMai]";
            cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@makm", makm);
            //}

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var DanhSachKhuyenMai = new List<KhuyenMai>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var km = new KhuyenMai();

                    km.MaKm = sqlDataReader["MAKM"].ToString();
                    km.GiaKhuyenMai = (int)sqlDataReader["GIATRIKM"];
                    km.ngayBD = DateTime.Parse(sqlDataReader["NGAYBD"].ToString());
                    km.ngayKT = DateTime.Parse(sqlDataReader["NGAYKT"].ToString());

                    DanhSachKhuyenMai.Add(km);
                }
            }
            _conn.Close();
            return DanhSachKhuyenMai.ToList();
        }


        public bool UpdateDL(HoaDon input)
        {
            _conn.Open();

            string spName = @"dbo.[updateHoaDon]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@mahd", input.MAHD);
            cmd.Parameters.AddWithValue("@manv", input.NGUOILAPHD);
            cmd.Parameters.AddWithValue("@makh", input.MAKH);
            cmd.Parameters.AddWithValue("@makm", input.MAKM ?? "");
            cmd.Parameters.AddWithValue("@ngaylap", input.NGAYLAP);
            //cmd.Parameters.AddWithValue("@tong", input.tong);

            cmd.CommandType = CommandType.StoredProcedure;

            //SqlDataReader sqlDataReader = cmd.ExecuteReader();

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool AddHoaDon(HoaDon input)
        {
            _conn.Open();

            string spName = @"dbo.[insertHoaDon]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@mahd", input.MAHD);
            cmd.Parameters.AddWithValue("@manv", input.NGUOILAPHD);
            cmd.Parameters.AddWithValue("@makh", input.MAKH);
            cmd.Parameters.AddWithValue("@makm", input.MAKM ?? "" );
            cmd.Parameters.AddWithValue("@ngaylap", input.NGAYLAP);

            cmd.CommandType = CommandType.StoredProcedure;


            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDetail(List<ChiTietHoaDon> input)
        {
            _conn.Open();

            string spName = string.Format("delete from CTHOADONSANPHAM where MAHD = @mahd");
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@mahd", input[0].MaHd);
            cmd.ExecuteNonQuery();

            string spName2 = string.Format("delete from CTHOADONTHUCUNG where MAHD = @mahd");
            SqlCommand cmd2 = new SqlCommand(spName2, _conn);

            cmd2.Parameters.AddWithValue("@mahd", input[0].MaHd);
            cmd2.ExecuteNonQuery();

            foreach (var e in input)
            {
                if (e.Ma.Contains("TC"))
                {
                    string spName3 = string.Format("INSERT INTO CTHOADONTHUCUNG  VALUES (@mahd, 1, @matc, @soluong,@dongia)");
                    SqlCommand cmd3 = new SqlCommand(spName3, _conn);

                    cmd3.Parameters.AddWithValue("@mahd", e.MaHd);
                    cmd3.Parameters.AddWithValue("@matc", e.Ma);
                    cmd3.Parameters.AddWithValue("@soluong", e.SoLuong);
                    cmd3.Parameters.AddWithValue("@dongia", e.Gia);

                    cmd3.ExecuteNonQuery();
                }

                if (e.Ma.Contains("SP"))
                {
                    string spName4 = string.Format("INSERT INTO CTHOADONSANPHAM VALUES (@mahd, 1, @masp, @soluong,@dongia)");
                    SqlCommand cmd4 = new SqlCommand(spName4, _conn);

                    cmd4.Parameters.AddWithValue("@mahd", e.MaHd);
                    cmd4.Parameters.AddWithValue("@masp", e.Ma);
                    cmd4.Parameters.AddWithValue("@soluong", e.SoLuong);
                    cmd4.Parameters.AddWithValue("@dongia", e.Gia);

                    cmd4.ExecuteNonQuery();
                }
            }

            
            _conn.Close();
            return false;
        }


        public bool DeleteDL(HoaDon input)
        {
            _conn.Open();
            string spname = @"dbo.[deleteHoaDon]";
            SqlCommand cmd = new SqlCommand(spname, _conn);

            cmd.Parameters.AddWithValue("@mahd", input.MAHD);
            cmd.CommandType = CommandType.StoredProcedure;

            string spName1 = string.Format("delete from CTHOADONSANPHAM where MAHD = @mahd");
            SqlCommand cmd1 = new SqlCommand(spName1, _conn);

            cmd1.Parameters.AddWithValue("@mahd", input.MAHD);
            cmd1.ExecuteNonQuery();

            string spName2 = string.Format("delete from CTHOADONTHUCUNG where MAHD = @mahd");
            SqlCommand cmd2 = new SqlCommand(spName2, _conn);

            cmd2.Parameters.AddWithValue("@mahd", input.MAHD);
            cmd2.ExecuteNonQuery();

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

    }
}
