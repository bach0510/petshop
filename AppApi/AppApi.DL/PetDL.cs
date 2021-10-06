using AppApi.Entities.Dtos;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace AppApi.DL
{
    public class PetDL : DBConnect
    {
        public List<PetInputDTO> GetPet(GetOptionInput input)
        {
            _conn.Open();
            string spName = "";
            SqlCommand cmd = new SqlCommand(spName, _conn);


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

            if (string.IsNullOrWhiteSpace(input.Filter))
            {
                spName = @"dbo.[GetAllPetsInfor]";
                cmd = new SqlCommand(spName, _conn);
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
                    pet.DONGIA = (int)sqlDataReader["DONGIA"];
                    pet.MAGIONG = sqlDataReader["MAGIONG"].ToString();
                    pet.TENGIONG = sqlDataReader["TENGIONG"].ToString();
                    pet.MOTA = sqlDataReader["MOTA"].ToString();
                    pet.MALOAI = sqlDataReader["MALOAI"].ToString();
                    pet.TENLOAI = sqlDataReader["TENLOAI"].ToString();

                    pets.Add(pet);
                }
            }
            _conn.Close();
            return pets.ToList();

            
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

            string spName3 = @"dbo.[insertLoai]";
            SqlCommand cmd3 = new SqlCommand(spName3, _conn);
            cmd3.Parameters.AddWithValue("@MALOAI", input.MALOAI);
            cmd3.Parameters.AddWithValue("@TENLOAI", input.TENLOAI);
            cmd3.CommandType = CommandType.StoredProcedure;


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

            cmd.Parameters.AddWithValue("@DONGIA", input.DONGIA);
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
