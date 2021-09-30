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
    public class OrderDL : DBConnect
    {
        public List<Order> GetOrder(GetOrderInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[sp_GetOrders]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@Status", input.Status);
            cmd.Parameters.AddWithValue("@OrderCode", input.OrderCode);
            cmd.Parameters.AddWithValue("@OrderName", input.OrderName);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var orders = new List<Order>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var order = new Order();
                    order.Id = (int)sqlDataReader["id"];
                    if (!Convert.IsDBNull(sqlDataReader["order_code"]))
                        order.OrderCode = sqlDataReader["order_code"].ToString();
                    order.OrderName = sqlDataReader["order_name"].ToString();
                    order.DeliveryAdd = sqlDataReader["delivery_add"].ToString();
                    if (!Convert.IsDBNull(sqlDataReader["create_date"]))
                    {
                        order.CreateDate = Convert.ToDateTime(sqlDataReader["create_date"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["receive_date"]))
                    {
                        order.ReceiveDate = Convert.ToDateTime(sqlDataReader["receive_date"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["price"]))
                    {
                        order.Price = (float)Convert.ToDouble(sqlDataReader["price"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["weight"]))
                    {
                        order.Weight = (float)Convert.ToDouble(sqlDataReader["weight"]);
                    }

                    order.Status = sqlDataReader["status"].ToString();
                    order.ErrStatus = sqlDataReader["err_status"].ToString();
                    if (!Convert.IsDBNull(sqlDataReader["user_id"]))
                    {
                        order.UserId = (int)sqlDataReader["user_id"] ;
                    }
                    if (!Convert.IsDBNull(sqlDataReader["customer_id"]))
                    {
                        order.CustomerId = (int)sqlDataReader["customer_id"];
                    }
                    orders.Add(order);
                }
            }
            _conn.Close();
            return orders.ToList();
        }

        public List<Order> GetOrderByUserId(GetOrderByUserIdDto input)
        {
            _conn.Open();

            string SQL = string.Format("select * from orders where user_id = @UserId");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@UserId", input.UserId);
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            var orders = new List<Order>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var order = new Order();
                    order.Id = (int)sqlDataReader["id"];
                    if (!Convert.IsDBNull(sqlDataReader["order_code"]))
                        order.OrderCode = sqlDataReader["order_code"].ToString();
                    order.OrderName = sqlDataReader["order_name"].ToString();
                    order.DeliveryAdd = sqlDataReader["delivery_add"].ToString();
                    if (!Convert.IsDBNull(sqlDataReader["create_date"]))
                    {
                        order.CreateDate = Convert.ToDateTime(sqlDataReader["create_date"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["receive_date"]))
                    {
                        order.ReceiveDate = Convert.ToDateTime(sqlDataReader["receive_date"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["price"]))
                    {
                        order.Price = (float)Convert.ToDouble(sqlDataReader["price"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["weight"]))
                    {
                        order.Weight = (float)Convert.ToDouble(sqlDataReader["weight"]);
                    }

                    order.Status = sqlDataReader["status"].ToString();
                    order.ErrStatus = sqlDataReader["err_status"].ToString();
                    if (!Convert.IsDBNull(sqlDataReader["user_id"]))
                    {
                        order.UserId = (int)sqlDataReader["user_id"];
                    }
                    if (!Convert.IsDBNull(sqlDataReader["customer_id"]))
                    {
                        order.CustomerId = (int)sqlDataReader["customer_id"];
                    }
                    orders.Add(order);
                }
            }
            _conn.Close();
            return orders.ToList();
        }
        public bool RegisterDL(Order input)
        {
            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.orders(order_code,order_name,price,status,err_status,weight,delivery_add,create_date,customer_id) VALUES" +
                "(@OrderCode,@OrderName,@Price,@Status,@ErrStatus,@Weight,@DeliveryAdd,@CreateDate,@CustomerId)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@OrderCode", input.OrderCode);
            sqlCommand.Parameters.AddWithValue("@OrderName", input.OrderName);
            sqlCommand.Parameters.AddWithValue("@Price", input.Price);
            sqlCommand.Parameters.AddWithValue("@Status", input.Status);
            sqlCommand.Parameters.AddWithValue("@ErrStatus", input.ErrStatus);
            sqlCommand.Parameters.AddWithValue("@Weight", input.Weight);
            sqlCommand.Parameters.AddWithValue("@DeliveryAdd", input.DeliveryAdd);
            sqlCommand.Parameters.AddWithValue("@CreateDate", input.CreateDate);
            sqlCommand.Parameters.AddWithValue("@CustomerId", input.CustomerId);
            sqlCommand.Parameters.AddWithValue("@AreaId", input.AreaId);
            sqlCommand.Parameters.AddWithValue("@UserId", input.UserId);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(Order input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.orders SET  customer_id = @CustomerId, delivery_add = @DeliveryAdd, order_code = @OrderCode, order_name = @OrderName" +
                ", price = @Price, status = @Status, err_status = @ErrStatus, weight = @Weight, receive_date = @ReceiveDate" +
                ", create_date = @CreateDate WHERE Id = @Id");

            string SQL2 = string.Format("UPDATE dbo.orders SET  customer_id = @CustomerId, delivery_add = @DeliveryAdd, order_code = @OrderCode, order_name = @OrderName" +
                ", price = @Price, status = @Status, err_status = @ErrStatus, weight = @Weight" +
                ", create_date = @CreateDate WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            if (input.ReceiveDate == null)
                sqlCommand = new SqlCommand(SQL2, _conn);

            sqlCommand.Parameters.AddWithValue("@OrderCode", input.OrderCode);
            sqlCommand.Parameters.AddWithValue("@OrderName", input.OrderName);
            sqlCommand.Parameters.AddWithValue("@Price", input.Price);
            sqlCommand.Parameters.AddWithValue("@Status", input.Status);
            sqlCommand.Parameters.AddWithValue("@ErrStatus", input.ErrStatus);
            sqlCommand.Parameters.AddWithValue("@Weight", input.Weight);
            sqlCommand.Parameters.AddWithValue("@DeliveryAdd", input.DeliveryAdd);
            if (input.ReceiveDate != null)
            {
                sqlCommand.Parameters.AddWithValue("@ReceiveDate", input.ReceiveDate);
            }
            sqlCommand.Parameters.AddWithValue("@CreateDate", input.CreateDate);
            sqlCommand.Parameters.AddWithValue("@CustomerId", input.CustomerId);
            //sqlCommand.Parameters.AddWithValue("@UserId", input.UserId);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateAssign(Order input)
        {
            _conn.Open();

            string SQL = string.Format("UPDATE dbo.orders SET  user_id = @UserId, status = @Status WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);

            sqlCommand.Parameters.AddWithValue("@Status", input.Status);
            sqlCommand.Parameters.AddWithValue("@UserId", input.UserId);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(Order input)
        {
            _conn.Open();

            string SQL = string.Format("delete from orders where Id = @id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input.Id);
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

    }
}
