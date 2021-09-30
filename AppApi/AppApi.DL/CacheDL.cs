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
    public class CacheDL : DBConnect
    {
        public List<Area> GetArea()
        {
            _conn.Open();

            string SQL = string.Format("select * from areas");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            var areas = new List<Area>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var area = new Area();
                    area.Id = (int)sqlDataReader["id"];
                    area.AreaCode = sqlDataReader["area_code"].ToString();
                    area.AreaName = sqlDataReader["area_name"].ToString();
                    areas.Add(area);
                }
            }
            _conn.Close();
            return areas.ToList();
        }

        //public bool RegisterDL(Customer input)
        //{
        //    _conn.Open();

        //    string SQL = string.Format("INSERT INTO dbo.customer(cus_name, cus_add,cus_email, cus_tel,cus_cmnd) VALUES(@CusName, @CusAdd,@CusEmail, @CusTel, @CusCmnd)");
        //    SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
        //    sqlCommand.Parameters.AddWithValue("@CusName", input.CusName);
        //    sqlCommand.Parameters.AddWithValue("@CusAdd", input.CusAdd);
        //    sqlCommand.Parameters.AddWithValue("@CusEmail", input.CusEmail);
        //    sqlCommand.Parameters.AddWithValue("@CusTel", input.CusTel);
        //    sqlCommand.Parameters.AddWithValue("@CusCmnd", input.CusCmnd);

        //    if (sqlCommand.ExecuteNonQuery() > 0) return true;
        //    _conn.Close();
        //    return false;
        //}

        //public bool UpdateDL(Customer input)
        //{
        //    _conn.Open();

        //    string SQL = string.Format("UPDATE dbo.customer SET cus_name = @CusName, cus_add = @CusAdd, cus_email = @CusEmail, cus_tel = @CusTel, cus_cmnd = @CusCmnd WHERE Id = @Id");

        //    SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
        //    sqlCommand.Parameters.AddWithValue("@CusName", input.CusName);
        //    sqlCommand.Parameters.AddWithValue("@CusAdd", input.CusAdd);
        //    sqlCommand.Parameters.AddWithValue("@CusEmail", input.CusEmail);
        //    sqlCommand.Parameters.AddWithValue("@CusTel", input.CusTel);
        //    sqlCommand.Parameters.AddWithValue("@CusCmnd", input.CusCmnd);
        //    //sqlCommand.Parameters.AddWithValue("@Birthday", input.Birthday);
        //    sqlCommand.Parameters.AddWithValue("@Id", input.Id);

        //    if (sqlCommand.ExecuteNonQuery() > 0) return true;
        //    _conn.Close();
        //    return false;
        //}

        //public bool DeleteDL(Customer input)
        //{
        //    _conn.Open();

        //    string SQL = string.Format("delete * from customer where Id = @id");

        //    SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
        //    sqlCommand.Parameters.AddWithValue("@id", input.Id);
        //    if (sqlCommand.ExecuteNonQuery() > 0) return true;
        //    _conn.Close();
        //    return false;
        //}

    }
}
