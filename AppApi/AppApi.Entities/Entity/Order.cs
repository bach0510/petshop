using System;
using System.ComponentModel.DataAnnotations;

namespace AppApi.Entities.Entity
{
    public class Order
    {
        public int Id { get; set; }
        public int? AreaId { get; set; }
        public int? UserId { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? ReceiveDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public string OrderName { get; set; }
        public string OrderCode { get; set; }
        public float? Price { get; set; }
        public float? Weight { get; set; }
        public string DeliveryAdd { get; set; }
        public string Status { get; set; }
        public string ErrStatus { get; set; }

    }
}
