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
    public class NhanVienDL : DBConnect
    {
        public List<NhanVien> GetNhanVien(GetOptionInput input)
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);
            if (input.Value == 1)
            {
                spName = @"dbo.[TimKiemNhanVienTheoMaNV]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@manv", input.Filter);
            }
            else if (input.Value == 2)
            {
                spName = @"dbo.[TimKiemNhanVienTheoHoTen]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@hoten", input.Filter);
            }
            else if (input.Value == 3)
            {
                spName = @"dbo.[TimKiemNhanVienTheoCMND]";
                cmd = new SqlCommand(spName, _conn);

                cmd.Parameters.AddWithValue("@cmnd", input.Filter);
            }
            if (string.IsNullOrWhiteSpace(input.Filter))
            {
                spName = @"dbo.[getAllNhanVien]";
                cmd = new SqlCommand(spName, _conn);
            }

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var employees = new List<NhanVien>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var employee = new NhanVien();
                    employee.MaNv = sqlDataReader["MANV"].ToString();
                    employee.HoTen = sqlDataReader["HOTEN"].ToString();
                    employee.DiaChi = sqlDataReader["DIACHI"].ToString();
                    employee.ChucVu = sqlDataReader["CHUCVU"].ToString();
                    employee.Cmnd = sqlDataReader["CMND"].ToString();
                    employee.GioiTinh = sqlDataReader["GIOITINH"].ToString();
                    employee.Luong = (int)sqlDataReader["LUONG"];
                    employee.NgaySinh = DateTime.Parse(sqlDataReader["NGAYSINH"].ToString());
                    employee.Sdt = sqlDataReader["SDT"].ToString();
                    employee.TenTk = sqlDataReader["TENTK"].ToString();
                    employee.MatKhau = sqlDataReader["MATKHAU"].ToString();

                    employees.Add(employee);
                }
            }
            _conn.Close();
            return employees.ToList();
        }

        public bool RegisterDL(NhanVien input)
        {
            _conn.Open();

            string spName = @"dbo.[insertNhanVien]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@manv", input.MaNv);
            cmd.Parameters.AddWithValue("@hoten", input.HoTen);
            cmd.Parameters.AddWithValue("@gioitinh", input.GioiTinh);
            cmd.Parameters.AddWithValue("@ngaysinh", input.NgaySinh);
            cmd.Parameters.AddWithValue("@diachi", input.DiaChi);
            cmd.Parameters.AddWithValue("@sdt", input.Sdt);
            cmd.Parameters.AddWithValue("@cmnd", input.Cmnd);
            cmd.Parameters.AddWithValue("@chucvu", input.ChucVu);
            cmd.Parameters.AddWithValue("@luong", input.Luong);


            cmd.CommandType = CommandType.StoredProcedure;

            string spName2 = @"dbo.[insertTaiKhoan]";
            SqlCommand cmd2 = new SqlCommand(spName2, _conn);

            cmd2.Parameters.AddWithValue("@manv", input.MaNv);
            cmd2.Parameters.AddWithValue("@tentk", input.TenTk);
            cmd2.Parameters.AddWithValue("@matkhau", input.MatKhau);



            cmd2.CommandType = CommandType.StoredProcedure;
            //SqlDataReader sqlDataReader = cmd.ExecuteReader();

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(NhanVien input)
        {
            _conn.Open();

            string spName = @"dbo.[updateUserInfo]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@manv", input.MaNv);
            cmd.Parameters.AddWithValue("@hoten", input.HoTen);
            cmd.Parameters.AddWithValue("@gioitinh", input.GioiTinh);
            cmd.Parameters.AddWithValue("@ngaysinh", input.NgaySinh);
            cmd.Parameters.AddWithValue("@diachi", input.DiaChi);
            cmd.Parameters.AddWithValue("@sdt", input.Sdt);
            cmd.Parameters.AddWithValue("@cmnd", input.Cmnd);

            cmd.CommandType = CommandType.StoredProcedure;

            //SqlDataReader sqlDataReader = cmd.ExecuteReader();

            string spName2 = @"dbo.[updateTaiKhoan]";
            SqlCommand cmd2 = new SqlCommand(spName2, _conn);

            cmd2.Parameters.AddWithValue("@manv", input.MaNv);
            cmd2.Parameters.AddWithValue("@tentk", input.TenTk);
            cmd2.Parameters.AddWithValue("@matkhau", input.MatKhau);



            cmd2.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0 && cmd2.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(NhanVien input)
        {
            _conn.Open();

            string spName = @"dbo.[deleteNhanVien]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@manv", input.MaNv);

            cmd.CommandType = CommandType.StoredProcedure;
            //SqlDataReader sqlDataReader = cmd.ExecuteReader();

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public string GetToken()
        {
            string key = "my_secret_key_12345"; //Secret key which will be used later during validation    
            var issuer = "http://mysite.com";  //normally this will be your site URL    

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Create a List of Claims, Keep claims name short    
            var permClaims = new List<Claim>();
            permClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            //Create Security Token object by giving required parameters    
            var token = new JwtSecurityToken(issuer, //Issure    
                            issuer,  //Audience    
                            permClaims,
                            expires: DateTime.Now.AddDays(1),
                            signingCredentials: credentials);
            var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt_token;
        }
    }
}
