using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace AppApi.DL
{
    public class PetDL : DBConnect
    {
        public List<PetInputDTO> GetPet(GetPetsInput input)
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            if (string.IsNullOrWhiteSpace(input.Filter))
            {
                spName = @"dbo.[GetAllPetsInfor]";
                cmd = new SqlCommand(spName, _conn);
            }
            else
            {
                if (input.Value == 1)
                {
                    spName = @"dbo.[lay_danh_sach_vat_nuoi_theo_ma_giong]";
                    cmd = new SqlCommand(spName, _conn);

                    cmd.Parameters.AddWithValue("@MAGIONG", input.Filter);
                }
                else if (input.Value == 2)
                {
                    spName = @"dbo.[lay_danh_sach_vat_nuoi_theo_loai]";
                    cmd = new SqlCommand(spName, _conn);

                    cmd.Parameters.AddWithValue("@MALOAI", input.Filter);
                }
                else if (input.Value == 3)
                {
                    spName = @"dbo.[lay_danh_sach_giong_vat_nuoi]";
                    cmd = new SqlCommand(spName, _conn);

                    cmd.Parameters.AddWithValue("@MALOAI", input.Filter);
                }
                else if (input.Value == 4)
                {
                    spName = @"dbo.[GetAllPetInfor]";
                    cmd = new SqlCommand(spName, _conn);

                    cmd.Parameters.AddWithValue("@MATC", input.Filter);
                }
            }

                cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var pets = new List<PetInputDTO>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var pet = new PetInputDTO();
                    pet.MATC = sqlDataReader["MATC"].ToString();
                    /*pet.DONGIA = (int)sqlDataReader["DONGIA"];*/

                    pet.MAGIONG = sqlDataReader["MAGIONG"].ToString();
                    pet.TENGIONG = sqlDataReader["TENGIONG"].ToString();
                    pet.MOTA = sqlDataReader["MOTA"].ToString();

                    pet.MALOAI = sqlDataReader["MALOAI"].ToString();
                    pet.TENLOAI = sqlDataReader["TENLOAI"].ToString();
                    if (!Convert.IsDBNull(sqlDataReader["DONGIA"]))
                    {
                        pet.DONGIA = (int)sqlDataReader["DONGIA"];
                    }
                    //pet.DONGIA = (int)sqlDataReader["DONGIA"];

                    pets.Add(pet);
                }
            }
            _conn.Close();
            return pets.ToList();

            
        }

        public List<Loai> GetLoai()
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            spName = @"dbo.[getLoai]";
            cmd = new SqlCommand(spName, _conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var list = new List<Loai>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var loai = new Loai();
                    loai.MaLoai = sqlDataReader["MALOAI"].ToString();
                    /*pet.DONGIA = (int)sqlDataReader["DONGIA"];*/

                    loai.TenLoai = sqlDataReader["TENLOAI"].ToString();

                    list.Add(loai);
                }
            }
            _conn.Close();
            return list.ToList();
        }

        public List<Giong> GetGiong()
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            spName = @"dbo.[getGiong]";
            cmd = new SqlCommand(spName, _conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var list = new List<Giong>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var giong = new Giong();
                    giong.MaGiong = sqlDataReader["MAGIONG"].ToString();
                    giong.TenGiong = sqlDataReader["TENGIONG"].ToString();
                    giong.Maloai = sqlDataReader["MALOAI"].ToString();
                    giong.Mota = sqlDataReader["MOTA"].ToString();

                    list.Add(giong);
                }
            }
            _conn.Close();
            return list.ToList();
        }


        public bool RegisterPet(PetInputDTO input)
        {
            _conn.Open();

            string spName = @"dbo.[insertThuCung]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@MATC", input.MATC);
            cmd.Parameters.AddWithValue("@DONGIA", input.DONGIA);
            cmd.Parameters.AddWithValue("@MAGIONG", input.MAGIONG);
            cmd.CommandType = CommandType.StoredProcedure;



            string spName2 = @"dbo.[insertGiong]";
            SqlCommand cmd2 = new SqlCommand(spName2, _conn);

            cmd2.Parameters.AddWithValue("@MAGIONG", input.MAGIONG);
            cmd2.Parameters.AddWithValue("@TENGIONG", input.TENGIONG);
            cmd2.Parameters.AddWithValue("@MOTA", input.MOTA);
            cmd2.CommandType = CommandType.StoredProcedure;

            //string spName3 = @"dbo.[insertLoai]";
            //SqlCommand cmd3 = new SqlCommand(spName3, _conn);
            //cmd3.Parameters.AddWithValue("@MALOAI", input.MALOAI);
            //cmd3.Parameters.AddWithValue("@TENLOAI", input.TENLOAI);
            //cmd3.CommandType = CommandType.StoredProcedure;


            if (cmd.ExecuteNonQuery() > 0 ) return true;
            _conn.Close();
            return false;
        }

        public bool ThemGiong(PetInputDTO input)
        {
            _conn.Open();

            string spName = @"dbo.[insertGiong]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@MAGIONG", input.MAGIONG);
            cmd.Parameters.AddWithValue("@TENGIONG", input.TENGIONG);
            cmd.Parameters.AddWithValue("@maloai", input.MALOAI);
            cmd.Parameters.AddWithValue("@MOTA", input.MOTA);
            cmd.CommandType = CommandType.StoredProcedure;


            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool ChinhGiong(PetInputDTO input)
        {
            _conn.Open();

            string spName = @"dbo.[sua_giong]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@magiong", input.MAGIONG);
            cmd.Parameters.AddWithValue("@tengiong", input.TENGIONG);
            cmd.Parameters.AddWithValue("@mota", input.MOTA);
            cmd.Parameters.AddWithValue("@maloai", input.MOTA);
            cmd.CommandType = CommandType.StoredProcedure;


            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }


        public bool UpdatePet(PetInputDTO input)
        {
            _conn.Open();
            /** chỉ thay đổi giá của pet**/
            string spName = @"dbo.[sua_thu_cung]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@donGia", input.DONGIA);
            cmd.Parameters.AddWithValue("@maTC", input.MATC);
            cmd.Parameters.AddWithValue("@magiong", input.MAGIONG);
            cmd.Parameters.AddWithValue("@maloai", input.MALOAI);
            cmd.Parameters.AddWithValue("@tenloai", input.TENLOAI);

            cmd.CommandType = CommandType.StoredProcedure;


            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeletePet(PetInputDTO input)
        {
            _conn.Open();

            string spName = @"dbo.[deleteThuCung]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@MATC", input.MATC);
            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteGiong(PetInputDTO input)
        {
            _conn.Open();

            string spName = @"dbo.[deleteGiong]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@MAGIONG", input.MAGIONG);
            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteLoai(PetInputDTO input)
        {
            _conn.Open();

            string spName = @"dbo.[deleteLoai]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@MALOAI", input.MALOAI);
            cmd.CommandType = CommandType.StoredProcedure;

            if (cmd.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }


    }
}
