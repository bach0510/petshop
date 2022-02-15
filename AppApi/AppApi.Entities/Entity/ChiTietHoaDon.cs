using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity
{
    public class ChiTietHoaDon
    {
        public string MaHd { get; set; }

        public int Stt { get; set; }

        public string Ma { get; set; }

        public int SoLuong { get; set; }

        public int Gia { get; set; }

    }
}
