namespace GEM.Server.DTOs.MohammadDTOs
{
    public class SubMealPlanDto
    {
        public int SubMealPlanID { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Instructions { get; set; }
        public string? FirstStepes { get; set; }

        public string? SecondStepes { get; set; }

        public string? FinalStepes { get; set; }
        public int? PreparationTime { get; set; }
        public int? MealPlanID { get; set; }
        public List<NutritionFactDto> NutritionFacts { get; set; }
    }
}
