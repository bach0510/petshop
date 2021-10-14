using AppApi.DL;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class SanPhamController : ApiController
    {
        SanPhamDL order = new SanPhamDL();



        [HttpPost]
        [Route("order")]
        public List<Sanpham> GetOrder(GetOptionInput input)
        {
            try
            {
                return order.GetOrder(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("update-order")]
        public bool Update(Sanpham input)
        {
            try
            {
                return order.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-order")]
        public bool DeleteOrder(Sanpham input)
        {
            try
            {
                return order.DeleteDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("add-order")]
        public bool RegisterOrder(Sanpham input)
        {
            try
            {
                return order.RegisterDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
