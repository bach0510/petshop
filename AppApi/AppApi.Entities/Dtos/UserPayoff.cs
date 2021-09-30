using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Dtos
{
    public class UserPayoff
    {
        public int Id { get; set; }
        public int PayoffId { get; set; }
        public int UserId { get; set; }
        public DateTime? PayoffTime { get; set; }
    }
}