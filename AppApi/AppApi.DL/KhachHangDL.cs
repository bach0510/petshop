using AppApi.Entities;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AppApi.DL
{
    public class KhachHangDL : DBConnect
    {
/*        public List<KhachHang> GetCustomer(GetCusInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[TimKhachHangbyMaKH]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@MAKH", input.MAKH);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();


            var customers = new List<KhachHang>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var cus = new KhachHang();
                    cus.MAKH = (String)sqlDataReader["MAKH"];
                    cus.HoTen = sqlDataReader["HOTEN"].ToString();
                    cus.gioiTinh = sqlDataReader["GIOITINH"].ToString();
                    cus.CMND = sqlDataReader["CMND"].ToString();
                    cus.sdt = sqlDataReader["SDT"].ToString();
                    cus.diaChi = sqlDataReader["DIACHI"].ToString();
                    cus.ngaySinh = (DateTime)sqlDataReader["NGAYSINH"];
                    customers.Add(cus);
                }
            }
            _conn.Close();
            return customers.ToList();
        }
*/
        
        public List<KhachHang> GetCustomerByTel(GetCusInputDto input)
        {
            _conn.Open();

            string SQL = string.Format("select * from customer where SDT = @sdt ");
            SqlCommand cmd = new SqlCommand(SQL, _conn);

            cmd.Parameters.AddWithValue("@sdt", input.sdt);

            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var customers = new List<KhachHang>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var cus = new KhachHang();
                    cus.MAKH = (String)sqlDataReader["MAKH"];
                    cus.HoTen = sqlDataReader["HOTEN"].ToString();
                    cus.gioiTinh = sqlDataReader["GIOITINH"].ToString();
                    cus.CMND = sqlDataReader["CMND"].ToString();
                    cus.sdt = sqlDataReader["SDT"].ToString();
                    cus.diaChi = sqlDataReader["DIACHI"].ToString();
                    cus.ngaySinh = (DateTime)sqlDataReader["NGAYSINH"];

                    customers.Add(cus);
                }
            }
            _conn.Close();
            return customers.ToList();
        }

        public List<KhachHang> GetCustomerById(GetCusInputDto input)
        {
            _conn.Open();

            string SQL = string.Format("select * from customer where MAKH = @MAKH ");
            SqlCommand cmd = new SqlCommand(SQL, _conn);

            cmd.Parameters.AddWithValue("@MAKH", input.MAKH);

            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var customers = new List<KhachHang>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var cus = new KhachHang();

                    cus.MAKH = sqlDataReader["MAKH"].ToString();
                    cus.HoTen = sqlDataReader["HoTen"].ToString();

                    if (!Convert.IsDBNull(sqlDataReader["gioiTinh"]))
                    {
                        cus.gioiTinh = sqlDataReader["gioiTinh"].ToString();
                    }

                    if (!Convert.IsDBNull(sqlDataReader["diaChi"]))
                    {
                        cus.diaChi = sqlDataReader["diaChi"].ToString();
                    }
                    if (!Convert.IsDBNull(sqlDataReader["sdt"]))
                    {
                        cus.sdt = sqlDataReader["sdt"].ToString();
                    }

                    if (!Convert.IsDBNull(sqlDataReader["cus_add"]))
                    {
                        cus.ngaySinh = (DateTime)sqlDataReader["ngaySinh"];
                    }
                    //employee.Birthday = (DateTime)sqlDataReader["Birthday"];
                    if (!Convert.IsDBNull(sqlDataReader["CMND"]))
                    {
                        cus.CMND = sqlDataReader["CMND"].ToString();
                    }
                    
                    customers.Add(cus);
                }
            }
            _conn.Close();
            return customers.ToList();
        }

        public bool RegisterDL(KhachHang input)
        {
            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.customer(HOTEN, DIACHI, GIOITINH, SDT, CMND, NGAYSINH) VALUES(@HoTen, @diaChi,@gioiTinh, @sdt, @CMND,@ngaySinh)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@HoTen", input.HoTen ?? "");
            sqlCommand.Parameters.AddWithValue("@diaChi", input.diaChi ?? "");
            sqlCommand.Parameters.AddWithValue("@gioiTinh", input.gioiTinh ?? "");
            sqlCommand.Parameters.AddWithValue("@sdt", input.sdt ?? "");
            sqlCommand.Parameters.AddWithValue("@CMND", input.CMND ?? "");
            sqlCommand.Parameters.AddWithValue("@ngaySinh", input.ngaySinh);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(KhachHang input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.customer SET HOTEN = @HoTen , DIACHI = @diaChi, GIOITINH = @gioiTinh, SDT = @sdt, CMND = @CMND, NGAYSINH = @ngaySinh WHERE MAKH = @MAKH");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@HoTen", input.HoTen ?? "");
            sqlCommand.Parameters.AddWithValue("@diaChi", input.diaChi ?? "");
            sqlCommand.Parameters.AddWithValue("@gioiTinh", input.gioiTinh ?? "");
            sqlCommand.Parameters.AddWithValue("@sdt", input.sdt ?? "");
            sqlCommand.Parameters.AddWithValue("@CMND", input.CMND ?? "");
            sqlCommand.Parameters.AddWithValue("@ngaySinh", input.ngaySinh);
            //sqlCommand.Parameters.AddWithValue("@Birthday", input.Birthday);
            sqlCommand.Parameters.AddWithValue("@MAKH", input.MAKH);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(KhachHang input)
        {
            _conn.Open();

            string SQL = string.Format("delete from customer where MAKH = @MAKH");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);

            sqlCommand.Parameters.AddWithValue("@MAKH", input.MAKH);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

    }
}
