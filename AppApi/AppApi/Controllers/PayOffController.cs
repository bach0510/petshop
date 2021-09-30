using AppApi.DL;
using AppApi.Entities;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class PayOffController : ApiController
    {
        PayOffDL payoff = new PayOffDL();

        [HttpPost]
        [Route("payoff")]
        public List<Payoff> GetPayoff(PayoffDto input)
        {
            try
            {
                return payoff.GetPayoff(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-payoff")]
        public bool DeletePayoff(PayoffDto input)
        {
            try
            {
                return payoff.DeletePayoff(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("user-payoff")]
        public List<UserPayoff> GetUserPayoff(PayoffDto input)
        {
            try
            {
                return payoff.GetUserPayoff(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-user-payoff")]
        public bool DeleteUserPayoff(PayoffDto input)
        {
            try
            {
                return payoff.DeleteUserPayoff(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("add-payoff")]
        public bool RegisterPayoff(PayoffDto input)
        {
            try
            {
                return payoff.RegisterPayoff(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        [Route("add-user-payoff")]
        public bool RegisterUserPayoff(PayoffDto input)
        {
            try
            {
                return payoff.RegisterUserPayoff(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}