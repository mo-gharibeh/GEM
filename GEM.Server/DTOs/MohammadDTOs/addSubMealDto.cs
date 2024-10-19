namespace GEM.Server.DTOs.MohammadDTOs
{
    public class addSubMealDto
    {
        public int SubMealPlanId { get; set; }

        public string? Title { get; set; }

        public IFormFile? Image { get; set; }

        public string? Description { get; set; }

        public int? PreparationTime { get; set; }

        public string? Instructions { get; set; }

        public int? MealPlanId { get; set; }

        public string? FirstStepes { get; set; }

        public string? SecondStepes { get; set; }

        public string? FinalStepes { get; set; }

    }
}
