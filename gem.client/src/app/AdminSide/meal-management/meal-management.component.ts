import { Component } from '@angular/core';
import { UrlService } from '../../newProject8/Mohammad/MohammadURL/url.service';

@Component({
  selector: 'app-meal-management',
  templateUrl: './meal-management.component.html',
  styleUrl: './meal-management.component.css'
})
export class MealManagementComponent {
  mealPlans: any[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  currentMeal: any = {};
  selectedFile: File | null = null;

  constructor(private mealService: UrlService) { }

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals(): void {
    this.mealService.getMeals().subscribe(data => {
      this.mealPlans = data;
    });
  }

  openAddMealModal(): void {
    this.showModal = true;
    this.isEditing = false;
    this.currentMeal = {};
  }

  openEditMealModal(meal: any): void {
    this.showModal = true;
    this.isEditing = true;
    this.currentMeal = { ...meal };
  }

  closeModal(): void {
    this.showModal = false;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitMealForm(): void {
    const formData = new FormData();
    formData.append('title', this.currentMeal.title);
    formData.append('description', this.currentMeal.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing) {
      this.mealService.updateMeal(this.currentMeal.mealPlanId, formData).subscribe(() => {
        this.getMeals();
        this.closeModal();
      });
    } else {
      this.mealService.addMeal(formData).subscribe(() => {
        this.getMeals();
        this.closeModal();
      });
    }
  }

  deleteMeal(mealPlanId: number): void {
    if (confirm('Are you sure you want to delete this meal?')) {
      this.mealService.deleteMeal(mealPlanId).subscribe(() => {
        this.mealPlans = this.mealPlans.filter(meal => meal.mealPlanId !== mealPlanId);
      });
    }
    this.getMeals();
  }
}
