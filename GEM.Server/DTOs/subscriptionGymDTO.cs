namespace GEM.Server.DTOs
{
    public class subscriptionGymDTO
    {

        public int? UserId { get; set; }

        public int? ClassSubId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? PaymentMethod { get; set; }

    }
}
