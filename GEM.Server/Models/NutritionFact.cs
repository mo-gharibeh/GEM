using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class NutritionFact
{
    public int NutritionId { get; set; }

    public int? MealPlanId { get; set; }

    public int? Calories { get; set; }

    public decimal? TotalFat { get; set; }

    public decimal? SaturatedFat { get; set; }

    public int? Cholesterol { get; set; }

    public int? Sodium { get; set; }

    public decimal? Carbohydrates { get; set; }

    public decimal? DietaryFiber { get; set; }

    public decimal? Sugars { get; set; }

    public decimal? Protein { get; set; }

    public decimal? VitaminD { get; set; }

    public int? Calcium { get; set; }

    public decimal? Iron { get; set; }

    public int? Potassium { get; set; }

    public int? SubMealPlans { get; set; }

    public virtual SubMealPlan? SubMealPlansNavigation { get; set; }
}
