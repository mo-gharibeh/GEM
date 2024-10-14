namespace GEM.Server.DTOs
{
    public class ClasseDTO
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public IFormFile? Image { get; set; }

        public string? Trainer { get; set; }

       public ClassTimeDTO? dTO { get; set; }
    }

    public class ClassTimeDTO
    {
        public int? ClassId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

    }
}
