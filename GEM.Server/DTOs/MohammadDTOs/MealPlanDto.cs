namespace GEM.Server.DTOs.MohammadDTOs
{
    public class MealPlanDto
    {
        public int MealPlanId { get; set; }

        public string? Title { get; set; }

        public IFormFile? Image { get; set; }

        public string? Description { get; set; }

    }
}
