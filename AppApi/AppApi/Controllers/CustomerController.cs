using AppApi.DL;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class CustomerController : ApiController
    {
        KhachHangDL Customer = new KhachHangDL();


        [HttpPost]
        [Route("customer")]
        public List<KhachHang> GetCustomer(GetKhachHangInput input)
        {
            try
            {
                return Customer.GetKhachHang( input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("update-customer")]
        public bool Update(KhachHang input)
        {
            try
            {
                return Customer.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-customer")]
        public bool DeleteCustomer(KhachHang input)
        {
            try
            {
                return Customer.DeleteDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("add-customer")]
        public bool RegisterCustomer(KhachHang input)
        {
            try
            {
                return Customer.RegisterDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
