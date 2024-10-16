namespace GEM.Server.DTOs.MohammadDTOs
{
    public class AddNutritionDto
    {
        public int? MealPlanId { get; set; }
        public int? SubMealPlanId { get; set; }
        public int Calories { get; set; }
        public decimal TotalFat { get; set; }
        public decimal SaturatedFat { get; set; }
        public int Cholesterol { get; set; }
        public int Sodium { get; set; }
        public decimal Carbohydrates { get; set; }
        public decimal DietaryFiber { get; set; }
    }
}
