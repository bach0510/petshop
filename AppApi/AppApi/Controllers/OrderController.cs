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
    public class OrderController : ApiController
    {
        OrderDL order = new OrderDL();


        [HttpPost]
        [Route("update-order")]
        public bool Update(Order input)
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
        [Route("assign-order")]
        public bool UpdateAssign(Order input)
        {
            try
            {
                return order.UpdateAssign(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("order")]
        public List<Order> GetOrder(GetOrderInputDto input)
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
        [Route("order-by-shipper")]
        public List<Order> GetOrderByUserId(GetOrderByUserIdDto input)
        {
            try
            {
                return order.GetOrderByUserId(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-order")]
        public bool DeleteOrder(Order input)
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
        public bool RegisterOrder(Order input)
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
