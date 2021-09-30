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
    public class CustomerDL : DBConnect
    {
        public List<Customer> GetCustomer(GetCusInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_GetCustomers]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@CusName", input.CusName ?? "");
            //cmd.Parameters.AddWithValue("@CusAdd", input.CusAdd);
            cmd.Parameters.AddWithValue("@CusEmail", input.CusEmail ?? "");
            cmd.Parameters.AddWithValue("@CusTel", input.CusTel ?? "");
            cmd.Parameters.AddWithValue("@CusCmnd", input.CusCmnd ??"");
            cmd.Parameters.AddWithValue("@AreaId", input.AreaId );

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var customers = new List<Customer>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var cus = new Customer();
                    cus.Id = (int)sqlDataReader["id"];
                    cus.CusName = sqlDataReader["cus_name"].ToString();
                    //employee.Img = (byte[])sqlDataReader["image"];
                    cus.CusEmail = sqlDataReader["cus_email"].ToString();
                    cus.CusCmnd = sqlDataReader["cus_cmnd"].ToString();
                    cus.CusTel = sqlDataReader["cus_tel"].ToString();
                    cus.CusAdd = sqlDataReader["cus_add"].ToString();
                    //employee.Birthday = (DateTime)sqlDataReader["Birthday"];
                    cus.AreaId = (int)sqlDataReader["area_id"];
                    customers.Add(cus);
                }
            }
            _conn.Close();
            return customers.ToList();
        }

        public List<Customer> GetCustomerByTel(GetCusInputDto input)
        {
            _conn.Open();

            string SQL = string.Format("select * from customer where cus_tel = @CusTel ");
            SqlCommand cmd = new SqlCommand(SQL, _conn);

            cmd.Parameters.AddWithValue("@CusTel", input.CusTel);
            //cmd.Parameters.AddWithValue("@CusAdd", input.CusAdd);
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var customers = new List<Customer>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var cus = new Customer();
                    cus.Id = (int)sqlDataReader["id"];
                    cus.CusName = sqlDataReader["cus_name"].ToString();
                    //employee.Img = (byte[])sqlDataReader["image"];
                    cus.CusEmail = sqlDataReader["cus_email"].ToString();
                    cus.CusCmnd = sqlDataReader["cus_cmnd"].ToString();
                    cus.CusTel = sqlDataReader["cus_tel"].ToString();
                    cus.CusAdd = sqlDataReader["cus_add"].ToString();
                    //employee.Birthday = (DateTime)sqlDataReader["Birthday"];
                    cus.AreaId = (int)sqlDataReader["area_id"];
                    customers.Add(cus);
                }
            }
            _conn.Close();
            return customers.ToList();
        }

        public List<Customer> GetCustomerById(GetCusInputDto input)
        {
            _conn.Open();

            string SQL = string.Format("select * from customer where id = @Id ");
            SqlCommand cmd = new SqlCommand(SQL, _conn);

            cmd.Parameters.AddWithValue("@Id", input.Id);
            //cmd.Parameters.AddWithValue("@CusAdd", input.CusAdd);
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var customers = new List<Customer>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var cus = new Customer();
                    cus.Id = (int)sqlDataReader["id"];
                    cus.CusName = sqlDataReader["cus_name"].ToString();
                    //employee.Img = (byte[])sqlDataReader["image"];
                    if (!Convert.IsDBNull(sqlDataReader["cus_email"]))
                    {
                        cus.CusEmail = sqlDataReader["cus_email"].ToString();
                    }

                    if (!Convert.IsDBNull(sqlDataReader["cus_email"]))
                    {
                        cus.CusCmnd = sqlDataReader["cus_cmnd"].ToString();
                    }
                    if (!Convert.IsDBNull(sqlDataReader["cus_tel"]))
                    {
                        cus.CusTel = sqlDataReader["cus_tel"].ToString();
                    }

                    if (!Convert.IsDBNull(sqlDataReader["cus_add"]))
                    {
                        cus.CusAdd = sqlDataReader["cus_add"].ToString();
                    }
                    //employee.Birthday = (DateTime)sqlDataReader["Birthday"];
                    if (!Convert.IsDBNull(sqlDataReader["area_id"]))
                    {
                        cus.AreaId = (int)sqlDataReader["area_id"];
                    }
                    
                    customers.Add(cus);
                }
            }
            _conn.Close();
            return customers.ToList();
        }

        public bool RegisterDL(Customer input)
        {
            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.customer(cus_name, cus_add,cus_email, cus_tel,cus_cmnd,area_id) VALUES(@CusName, @CusAdd,@CusEmail, @CusTel, @CusCmnd,@AreaId)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@CusName", input.CusName ??"");
            sqlCommand.Parameters.AddWithValue("@CusAdd", input.CusAdd??"");
            sqlCommand.Parameters.AddWithValue("@CusEmail", input.CusEmail?? "");
            sqlCommand.Parameters.AddWithValue("@CusTel", input.CusTel ?? "");
            sqlCommand.Parameters.AddWithValue("@CusCmnd", input.CusCmnd??"");
            sqlCommand.Parameters.AddWithValue("@AreaId", input.AreaId);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(Customer input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.customer SET area_id = @AreaId , cus_name = @CusName, cus_add = @CusAdd, cus_email = @CusEmail, cus_tel = @CusTel, cus_cmnd = @CusCmnd WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@CusName", input.CusName??"");
            sqlCommand.Parameters.AddWithValue("@CusAdd", input.CusAdd??"");
            sqlCommand.Parameters.AddWithValue("@CusEmail", input.CusEmail??"");
            sqlCommand.Parameters.AddWithValue("@CusTel", input.CusTel ??"");
            sqlCommand.Parameters.AddWithValue("@CusCmnd", input.CusCmnd ?? "");
            sqlCommand.Parameters.AddWithValue("@AreaId", input.AreaId);
            //sqlCommand.Parameters.AddWithValue("@Birthday", input.Birthday);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(Customer input)
        {
            _conn.Open();

            string SQL = string.Format("delete from customer where Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

    }
}
