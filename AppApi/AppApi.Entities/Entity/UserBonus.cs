using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class UserBonus
    {
        public int Id { get; set; }
        public int BonusId { get; set; }
        public int UserId { get; set; }
        public DateTime? BonusTime { get; set; }
    }
}