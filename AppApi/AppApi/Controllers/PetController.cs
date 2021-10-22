using AppApi.DL;
using AppApi.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class PetController : ApiController
    {
        PetDL pets = new PetDL();

        [HttpPost]
        [Route("get-pets")]
        public List<PetInputDTO> GetPets(GetPetsInput input)
        {
            try
            {
               return pets.GetPet(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("update-pet")]
        public bool UpdatePet(PetInputDTO input)
        {
            try
            {
                return pets.UpdatePet(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-pet")]
        public bool DeletePet(PetInputDTO input)
        {
            try
            {
                return pets.DeletePet(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("add-pet")]
        public bool RegisterPet(PetInputDTO input)
        {
            try
            {
                return pets.RegisterPet(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-giong")]
        public bool DeleteGiong(PetInputDTO input)
        {
            try
            {
                return pets.DeleteGiong(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-loai")]
        public bool DeleteLoai(PetInputDTO input)
        {
            try
            {
                return pets.DeleteLoai(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
