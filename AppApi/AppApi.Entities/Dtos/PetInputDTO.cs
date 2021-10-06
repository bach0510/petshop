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
        public String MAGIONG { get; set; }

        [StringLength(50)]
        public String TENGIONG { get; set; }

        [StringLength(500)]
        public String MOTA { get; set; }

        [StringLength(5)]
        public String MALOAI { get; set; }

        [StringLength(50)]
        public String TENLOAI { get; set; }

    }
}
