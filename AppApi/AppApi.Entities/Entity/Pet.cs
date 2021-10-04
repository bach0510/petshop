using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Pet
    {
        [StringLength(5)]
        public String petID { get; set; }

        [StringLength(10)]
        public String giongID { get; set; }

        public int gia { get; set; }
    }
}
