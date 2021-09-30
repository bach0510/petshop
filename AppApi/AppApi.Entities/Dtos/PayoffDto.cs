using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Dtos
{
    public class PayoffDto
    {
        public int Id { get; set; }
        public string PayoffName { get; set; }
        public int PayoffId { get; set; }
        public double Price { get; set; }
        public int UserId { get; set; }
        public int Type { get; set; }
        public DateTime? PayoffTime { get; set; }
    }
}