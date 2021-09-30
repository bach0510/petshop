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
    public class TaiKhoanDL : DBConnect
    {
        public TaiKhoan GetTaiKhoan(TaiKhoanInput input)
        {
            _conn.Open();

            string spName = @"dbo.[tim_tai_khoan]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@tentk", input.TenTk);
            cmd.Parameters.AddWithValue("@matkhau", input.MatKhau);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var tklist = new List<TaiKhoan>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var s = new TaiKhoan();
                    s.MaNv = sqlDataReader["MANV"].ToString();
                    s.TenTk = sqlDataReader["TENTK"].ToString();
                    s.MatKhau = sqlDataReader["MATKHAU"].ToString();
                    s.Token = GetToken();

                    tklist.Add(s);
                }
                
            }
            _conn.Close();
            return tklist.ToList()[0];

        }

        public NhanVien GetCurrentUser(FindUserInput input)
        {
            _conn.Open();

            string spName = @"dbo.[findNhanVienByMANV]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@manv", input.MaNv);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var s = new NhanVien();
                    s.MaNv = sqlDataReader["MANV"].ToString();
                    s.ChucVu = sqlDataReader["CHUCVU"].ToString();
                    s.Cmnd = sqlDataReader["CMND"].ToString();
                    s.DiaChi = sqlDataReader["DIACHI"].ToString();
                    s.HoTen = sqlDataReader["HOTEN"].ToString();
                    s.GioiTinh = sqlDataReader["GIOITINH"].ToString();
                    s.Luong = (int)sqlDataReader["LUONG"];
                    s.NgaySinh = (DateTime)sqlDataReader["NGAYSINH"];
                    s.Sdt = sqlDataReader["SDT"].ToString();
                    s.Token = input.Token;
                    s.TenTk = input.TenTk;
                    s.MatKhau = input.MatKhau;
                    return s;
                }
            }
            _conn.Close();
            return null;

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
