
   
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
    public class EmployeeController : ApiController
    {
        NhanVienDL emp = new NhanVienDL();
        TaiKhoanDL tk = new TaiKhoanDL();

        [HttpPost]
        [Route("auth/register")]
        public bool Register(NhanVien input)
        {
            try
            {
                return emp.RegisterDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("update-employee")]
        public bool Update(NhanVien input)
        {
            try
            {
                return emp.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("auth/login")]
        public NhanVien Login(TaiKhoanInput input)
        {
            try
            {
                var taikhoan = tk.GetTaiKhoan(input);

                if (taikhoan != null)
                {
                    var s = new FindUserInput
                    {
                        MaNv = taikhoan.MaNv,
                        Token = taikhoan.Token,
                        TenTk = taikhoan.TenTk,
                        MatKhau = taikhoan.MatKhau,
                    };
                    return tk.GetCurrentUser(s);
                }
                else
                {
                    return null;
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("employees")]
        public List<NhanVien> GetNhanVIen(GetOptionInput input)
        {
            try
            {
                return emp.GetNhanVien(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-employee")]
        public bool DeleteNhanVien(NhanVien input)
        {
            try
            {
                return emp.DeleteDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

