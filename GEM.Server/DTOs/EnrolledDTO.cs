namespace GEM.Server.DTOs
{
    public class EnrolledDTO
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public int? ClassSubId { get; set; }

        public int? ClassTimeId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? PaymentMethod { get; set; }

    }
}
