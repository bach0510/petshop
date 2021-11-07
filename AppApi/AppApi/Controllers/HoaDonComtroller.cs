﻿using AppApi.DL;
using AppApi.Entities.Dtos;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class HoaDonComtroller : ApiController
    {
        HoaDonDL HoaDon = new HoaDonDL();


        [HttpPost]
        [Route("HoaDon")]
        public List<HoaDon> GetCustomer(GetHoaDonInput input)
        {
            try
            {
                return HoaDon.DoanhThu(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("update-HoaDon")]
        public bool Update(HoaDon input)
        {
            try
            {
                return HoaDon.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /*[HttpPost]
        [Route("delete-HoaDon")]
        public bool DeleteCustomer(KhachHang input)
        {
            try
            {
                return HoaDon.DeleteDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }*/


        /*[HttpPost]
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
        }*/
    }
}