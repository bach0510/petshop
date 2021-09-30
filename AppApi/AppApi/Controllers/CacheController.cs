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
    public class CacheController : ApiController
    {
        CacheDL cache = new CacheDL();

        [HttpPost]
        [Route("get-area")]
        public List<Area> GetArea()
        {
            try
            {
                return cache.GetArea();
            }
            catch (Exception)
            {
                throw;
            }
        }

        
    }
}
