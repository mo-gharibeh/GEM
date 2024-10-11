using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class SubMealPlan
{
    public int SubMealPlanId { get; set; }

    public string? Title { get; set; }

    public string? Image { get; set; }

    public string? Description { get; set; }

    public int? PreparationTime { get; set; }

    public string? Instructions { get; set; }

    public int? MealPlanId { get; set; }

    public virtual MealPlan? MealPlan { get; set; }

    public virtual ICollection<NutritionFact> NutritionFacts { get; set; } = new List<NutritionFact>();
}
