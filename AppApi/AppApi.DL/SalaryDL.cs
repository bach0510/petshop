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
    public class SalaryDL : DBConnect
    {
        public List<SalaryDto> GetSalary(GetSalaryInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_GetSalary]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@Month", input.Month);
            cmd.Parameters.AddWithValue("@Year", input.Year);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var salary = new List<SalaryDto>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var s = new SalaryDto();
                    s.Id = (int)sqlDataReader["user_id"];
                    s.FullName = sqlDataReader["full_name"].ToString();
                    s.SoDon = (int)sqlDataReader["so_don"];
                    if (!Convert.IsDBNull(sqlDataReader["tien_phat"]))
                    {
                        s.TienPhat = (float)Convert.ToDouble(sqlDataReader["tien_phat"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["tien_thuong"]))
                    {
                        s.TienThuong = (float)Convert.ToDouble(sqlDataReader["tien_thuong"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["tien_luong"]))
                    {
                        s.TienLuong = (float)Convert.ToDouble(sqlDataReader["tien_luong"]);
                    }

                    salary.Add(s);
                }
            }
            _conn.Close();
            return salary.ToList();
        }

        

    }
}
