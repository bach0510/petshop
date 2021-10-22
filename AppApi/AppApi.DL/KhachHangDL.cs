using AppApi.Entities;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AppApi.DL
{
    public class KhachHangDL : DBConnect
    {
        public List<KhachHang> GetKhachHang(GetKhachHangInput input)
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            if (input.Value == 1)
            {
                spName = @"dbo.[findKhachHangByMAKH]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@makh", input.Filter);
            }

            else if (input.Value == 2)
            {
                spName = @"dbo.[findKhachHangByName]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@hoten", input.Filter);
            }
            else if (input.Value == 3)
            {
                spName = @"dbo.[findKhachHangByPhone]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@SDT", input.Filter);
            }
            if (string.IsNullOrWhiteSpace(input.Filter))
            {
                spName = @"dbo.[getAllKhachHang]";
                cmd = new SqlCommand(spName, _conn);
            }

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var Customers = new List<KhachHang>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var customer = new KhachHang();

                    customer.MAKH = sqlDataReader["MAKH"].ToString();
                    customer.HoTen = sqlDataReader["HOTEN"].ToString();
                    customer.gioiTinh = sqlDataReader["GIOITINH"].ToString();
                    customer.ngaySinh = (DateTime)sqlDataReader["NGAYSINH"];
                    customer.diaChi = sqlDataReader["DIACHI"].ToString();
                    customer.CMND = sqlDataReader["CMND"].ToString();
                    customer.sdt = sqlDataReader["LUONG"].ToString();

                    Customers.Add(customer);
                }
            }
            _conn.Close();
            return Customers.ToList();
        }

        public bool RegisterDL(KhachHang input)
        {
            _conn.Open();

            string spName = @"dbo.[insertKhachHang]";
            SqlCommand cmd = new SqlCommand(spName, _conn);


            cmd.Parameters.AddWithValue("@makh", input.MAKH ?? "");
            cmd.Parameters.AddWithValue("@tenkh", input.HoTen ?? "");
            cmd.Parameters.AddWithValue("@gioiTinh", input.gioiTinh ?? "");
            cmd.Parameters.AddWithValue("@ngaysinh", input.ngaySinh);
            cmd.Parameters.AddWithValue("@diachi", input.diaChi ?? "");
            cmd.Parameters.AddWithValue("@sdt", input.sdt ?? "");
            cmd.Parameters.AddWithValue("@cmnd", input.CMND ?? "");

            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(KhachHang input)
        {
            string spName = @"dbo.[updateKhachHang]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@makh", input.MAKH);
            cmd.Parameters.AddWithValue("@tenkh", input.HoTen);
            cmd.Parameters.AddWithValue("@gioiTinh", input.gioiTinh);
            cmd.Parameters.AddWithValue("@ngaysinh", input.ngaySinh);
            cmd.Parameters.AddWithValue("@diachi", input.diaChi);
            cmd.Parameters.AddWithValue("@sdt", input.sdt);
            cmd.Parameters.AddWithValue("@cmnd", input.CMND);

            cmd.CommandType = CommandType.StoredProcedure;

            //SqlDataReader sqlDataReader = cmd.ExecuteReader();

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(KhachHang input)
        {
            string spName = @"dbo.[deleteKhachHang]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@makh", input.MAKH);
            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

    }
}
