using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Dtos
{
    public class Payoff
    {
        public int Id { get; set; }
        public string PayoffName { get; set; }
        public double Price { get; set; }
    }
}