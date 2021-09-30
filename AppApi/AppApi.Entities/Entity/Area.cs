using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class Area
    {
        public int Id { get; set; }
        public string AreaName { get; set; }
        public string AreaCode { get; set; }
    }
}