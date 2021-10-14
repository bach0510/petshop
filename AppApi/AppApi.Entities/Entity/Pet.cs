using System;
using System.ComponentModel.DataAnnotations;


namespace AppApi.Entities.Entity 
{
    public class Pet
    {
        [StringLength(5)]
        public string petID { get; set; }

        [StringLength(10)]
        public string giongID { get; set; }

        public int gia { get; set; }
    }
}
