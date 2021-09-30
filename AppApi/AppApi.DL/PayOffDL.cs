using AppApi.Entities;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
   public class PayOffDL : DBConnect
    {
        public List<Payoff> GetPayoff( PayoffDto type)
        {
            if (type.Type == 1)
            {
                _conn.Open();

                string SQL = string.Format("select * from bonus ");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                var payoff = new List<Payoff>();
                if (sqlDataReader.HasRows)
                {
                    while (sqlDataReader.Read())
                    {
                        var bon = new Payoff();
                        bon.Id = (int)sqlDataReader["id"];
                        bon.PayoffName = sqlDataReader["bonus_name"].ToString();
                        bon.Price = (double)sqlDataReader["price"];
                        payoff.Add(bon);
                    }
                }
                _conn.Close();
                return payoff.ToList();
            }
            else
            {
                _conn.Open();

                string SQL = string.Format("select * from punish ");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                var payoff = new List<Payoff>();
                if (sqlDataReader.HasRows)
                {
                    while (sqlDataReader.Read())
                    {
                        var bon = new Payoff();
                        bon.Id = (int)sqlDataReader["id"];
                        bon.PayoffName = sqlDataReader["punish_name"].ToString();
                        bon.Price = (double)sqlDataReader["price"];
                        payoff.Add(bon);
                    }
                }
                _conn.Close();
                return payoff.ToList();
            }
        }

        public bool DeletePayoff(PayoffDto type)
        {
            if (type.Type == 1)
            {
                _conn.Open();

                string SQL3 = string.Format("delete  from user_bonus WHERE bonus_id = @id");

                SqlCommand sqlCommand3 = new SqlCommand(SQL3, _conn);
                sqlCommand3.Parameters.AddWithValue("@id", type.Id);
                sqlCommand3.ExecuteNonQuery();

                string SQL4 = string.Format("delete  from user_punish WHERE punish_id = @id");

                SqlCommand sqlCommand4 = new SqlCommand(SQL4, _conn);
                sqlCommand4.Parameters.AddWithValue("@id", type.Id);
                sqlCommand4.ExecuteNonQuery();

                string SQL = string.Format("delete from bonus where id = @id");

                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@id", type.Id);
                sqlCommand.ExecuteNonQuery();
                if (sqlCommand3.ExecuteNonQuery() > 0 && sqlCommand4.ExecuteNonQuery() > 0 && sqlCommand.ExecuteNonQuery() > 0) return true;
                _conn.Close();
            }
            else
            {
                _conn.Open();

                string SQL3 = string.Format("delete  from user_bonus WHERE bonus_id = @id");

                SqlCommand sqlCommand3 = new SqlCommand(SQL3, _conn);
                sqlCommand3.Parameters.AddWithValue("@id", type.Id);
                sqlCommand3.ExecuteNonQuery();

                string SQL4 = string.Format("delete  from user_punish WHERE punish_id = @id");

                SqlCommand sqlCommand4 = new SqlCommand(SQL4, _conn);
                sqlCommand4.Parameters.AddWithValue("@id", type.Id);
                sqlCommand4.ExecuteNonQuery();

                string SQL = string.Format("delete from punish where id = @id");

                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@id", type.Id);
                sqlCommand.ExecuteNonQuery();
                if (sqlCommand3.ExecuteNonQuery() > 0 && sqlCommand4.ExecuteNonQuery() > 0 && sqlCommand.ExecuteNonQuery() > 0 ) return true;
                _conn.Close();
            }
            return false;
        }

        public List<UserPayoff> GetUserPayoff(PayoffDto type)
        {
            if (type.Type == 1)
            {
                _conn.Open();

                string SQL = string.Format("select * from user_bonus ");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                var payoff = new List<UserPayoff>();
                if (sqlDataReader.HasRows)
                {
                    while (sqlDataReader.Read())
                    {
                        var bon = new UserPayoff();
                        bon.Id = (int)sqlDataReader["id"];
                        bon.PayoffId = (int)sqlDataReader["bonus_id"];
                        bon.UserId = (int)sqlDataReader["user_id"];
                        bon.PayoffTime = (DateTime)sqlDataReader["bonus_time"];
                        payoff.Add(bon);
                    }
                }
                _conn.Close();
                return payoff.ToList();
            }
            else
            {
                _conn.Open();

                string SQL = string.Format("select * from user_punish ");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                var payoff = new List<UserPayoff>();
                if (sqlDataReader.HasRows)
                {
                    while (sqlDataReader.Read())
                    {
                        var bon = new UserPayoff();
                        bon.Id = (int)sqlDataReader["id"];
                        bon.PayoffId = (int)sqlDataReader["punish_id"];
                        bon.UserId = (int)sqlDataReader["user_id"];
                        bon.PayoffTime = (DateTime)sqlDataReader["punish_time"];
                        payoff.Add(bon);
                    }
                }
                _conn.Close();
                return payoff.ToList();
            }
        }

        public bool DeleteUserPayoff(PayoffDto type)
        {
            if (type.Type == 1)
            {
                _conn.Open();

                string SQL = string.Format("delete from user_bonus where id = @id");

                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@id", type.Id);
                if (sqlCommand.ExecuteNonQuery() > 0) return true;
                _conn.Close();
            }
            else
            {
                _conn.Open();

                string SQL = string.Format("delete from user_punish where id = @id");

                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@id", type.Id);
                if (sqlCommand.ExecuteNonQuery() > 0) return true;
                _conn.Close();
            }
            return false;
        }

        public bool RegisterPayoff(PayoffDto type)
        {
            if(type.Type == 1)
            {
                _conn.Open();

                string SQL = string.Format("INSERT INTO dbo.bonus(bonus_name,price) VALUES(@BonusName,@Price)");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@BonusName", type.PayoffName ?? "");
                sqlCommand.Parameters.AddWithValue("@Price", type.Price);

                if (sqlCommand.ExecuteNonQuery() > 0) return true;
                _conn.Close();
            }
            else
            {
                _conn.Open();

                string SQL = string.Format("INSERT INTO dbo.punish(punish_name,price) VALUES(@PunishName,@Price)");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@PunishName", type.PayoffName??"");
                sqlCommand.Parameters.AddWithValue("@Price", type.Price);

                if (sqlCommand.ExecuteNonQuery() > 0) return true;
                _conn.Close();
            }
            return false;
        }

        public bool RegisterUserPayoff(PayoffDto type)
        {
            if (type.Type == 1)
            {
                _conn.Open();

                string SQL = string.Format("INSERT INTO dbo.user_bonus(user_id, bonus_id, bonus_time) VALUES(@UserId,@BonusId,@BonusTime)");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@UserId", type.UserId);
                sqlCommand.Parameters.AddWithValue("@BonusId", type.PayoffId);
                sqlCommand.Parameters.AddWithValue("@BonusTime", type.PayoffTime ?? DateTime.Now);

                if (sqlCommand.ExecuteNonQuery() > 0) return true;
                _conn.Close();
            }
            else
            {
                _conn.Open();

                string SQL = string.Format("INSERT INTO dbo.user_punish(user_id, punish_id, punish_time) VALUES(@UserId,@PunishId,@PunishTime)");
                SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
                sqlCommand.Parameters.AddWithValue("@UserId", type.UserId);
                sqlCommand.Parameters.AddWithValue("@PunishId", type.PayoffId);
                sqlCommand.Parameters.AddWithValue("@PunishTime", type.PayoffTime ?? DateTime.Now);

                if (sqlCommand.ExecuteNonQuery() > 0) return true;
                _conn.Close();
            }
            return false;
        }
    }
}
