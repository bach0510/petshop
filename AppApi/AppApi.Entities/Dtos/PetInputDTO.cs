using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Dtos
{
    public class PetInputDTO
    {
        [StringLength(5)]
        public string MATC { get; set; }

        public int DONGIA { get; set; }

        [StringLength(10)]
        public string MAGIONG { get; set; }

        [StringLength(50)]
        public string TENGIONG { get; set; }

        [StringLength(500)]
        public string MOTA { get; set; }

        [StringLength(5)]
        public string MALOAI { get; set; }

        [StringLength(50)]
        public string TENLOAI { get; set; }

    }
}
