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
        SanPhamDL Order = new SanPhamDL();

        [HttpPost]
        [Route("get-Order")]
        public List<Sanpham> GetOrder(GetSanPhamInput input)
        {
            try
            {
                return Order.GetOrder(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("update-Order")]
        public bool UpdateDL(Sanpham input)
        {
            try
            {
                return Order.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-Order")]
        public bool DeleteDL(Sanpham input)
        {
            try
            {
                return Order.DeleteDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("add-Order")]
        public bool RegisterDL(Sanpham input)
        {
            try
            {
                return Order.RegisterDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
