using AppApi.DL;
using AppApi.Entities;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class SalaryController : ApiController
    {
        SalaryDL s = new SalaryDL();

        [HttpPost]
        [Route("salary")]
        public List<SalaryDto> GetSalary(GetSalaryInputDto input)
        {
            try
            {
                return s.GetSalary(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
