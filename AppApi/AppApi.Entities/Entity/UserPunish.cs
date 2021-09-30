using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class UserPunish
    {
        public int Id { get; set; }
        public int PunishId { get; set; }
        public int UserId { get; set; }
        public DateTime? PunishTime { get; set; }
    }
}