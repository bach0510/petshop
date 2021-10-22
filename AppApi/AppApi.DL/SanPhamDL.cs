using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace AppApi.DL
{
    public class SanPhamDL : DBConnect
    {
        public List<Sanpham> GetOrder(GetSanPhamInput input)
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            if (input.Value == 1)
            {
                spName = @"dbo.[lay_danh_sach_san_pham_theo_loai]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@maloai", input.Filter);
            }

            else if (input.Value == 2)
            {
                spName = @"dbo.[lay_danh_sach_san_pham_theo_loai_DK]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@maloai", input.Filter);
                cmd.Parameters.AddWithValue("@name", input.Filter);
            }
          
            if (string.IsNullOrWhiteSpace(input.Filter))
            {
                spName = @"dbo.[getAllSanPham]";
                cmd = new SqlCommand(spName, _conn);
            }

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var Orders = new List<Sanpham>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var order = new Sanpham();

                    order.masp = sqlDataReader["MASP"].ToString();
                    order.loaiID = sqlDataReader["LOAI"].ToString();
                    order.tenSP = sqlDataReader["TENSP"].ToString();
                    order.gia = (int)sqlDataReader["DONGIA"];
                    order.soLuong = (int)sqlDataReader["SL"];

                    Orders.Add(order);
                }
            }
            _conn.Close();
            return Orders.ToList();
        }

        public bool RegisterDL(Sanpham input)
        {
            _conn.Open();

            string spName = @"dbo.[insertSanPham]";
            SqlCommand cmd = new SqlCommand(spName, _conn);


            cmd.Parameters.AddWithValue("@masp", input.masp ?? "");
            cmd.Parameters.AddWithValue("@loai", input.loaiID ?? "");
            cmd.Parameters.AddWithValue("@tensp", input.tenSP ?? "");
            cmd.Parameters.AddWithValue("@dongia", input.gia);
            cmd.Parameters.AddWithValue("@soluong", input.soLuong);

            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(Sanpham input)
        {
            string spName = @"dbo.[updateSanPham]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@masp", input.masp ?? "");
            cmd.Parameters.AddWithValue("@loai", input.loaiID ?? "");
            cmd.Parameters.AddWithValue("@tensp", input.tenSP ?? "");
            cmd.Parameters.AddWithValue("@dongia", input.gia);
            cmd.Parameters.AddWithValue("@soluong", input.soLuong);

            cmd.CommandType = CommandType.StoredProcedure;

            //SqlDataReader sqlDataReader = cmd.ExecuteReader();

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(Sanpham input)
        {
            string spName = @"dbo.[deleteSanPham]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@masp", input.masp);
            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

    }
}
