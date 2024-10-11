namespace GEM.Server.DTOs
{
    public class GymDTO
    {

        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public IFormFile? Image { get; set; }


    }
}
