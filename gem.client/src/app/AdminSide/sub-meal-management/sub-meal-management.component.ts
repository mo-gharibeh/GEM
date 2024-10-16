import { Component } from '@angular/core';
import { UrlService } from '../../newProject8/Mohammad/MohammadURL/url.service';

@Component({
  selector: 'app-sub-meal-management',
  templateUrl: './sub-meal-management.component.html',
  styleUrl: './sub-meal-management.component.css'
})
export class SubMealManagementComponent {

  subMeals: any[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  currentSubMeal: any = {};
  selectedFile: File | null = null;

  constructor(private subMealService: UrlService) { }

  ngOnInit(): void {
    this.getSubMeals();
  }

  getSubMeals(): void {
    this.subMealService.getSubMeals().subscribe(data => {
      this.subMeals = data;
    });
  }

  openAddSubMealModal(): void {
    this.showModal = true;
    this.isEditing = false;
    this.currentSubMeal = {};
  }

  openEditSubMealModal(subMeal: any): void {
    this.showModal = true;
    this.isEditing = true;
    this.currentSubMeal = { ...subMeal };
  }

  closeModal(): void {
    this.showModal = false;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitSubMealForm(): void {
    const formData = new FormData();
    formData.append('title', this.currentSubMeal.title);
    formData.append('description', this.currentSubMeal.description);
    formData.append('preparationTime', this.currentSubMeal.preparationTime.toString());
    formData.append('firstStepes', this.currentSubMeal.firstStepes);
    formData.append('secondStepes', this.currentSubMeal.secondStepes);
    formData.append('finalStepes', this.currentSubMeal.finalStepes);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing) {
      this.subMealService.updateSubMeal(this.currentSubMeal.subMealPlanId, formData).subscribe(() => {
        this.getSubMeals();
        this.closeModal();
      });
    } else {
      this.subMealService.addSubMeal(formData).subscribe(() => {
        this.getSubMeals();
        this.closeModal();
      });
    }
  }

  deleteSubMeal(subMealPlanId: number): void {
    debugger
    if (confirm('Are you sure you want to delete this sub-meal?')) {
      this.subMealService.deleteSubMeal(subMealPlanId).subscribe(() => {
        this.subMeals = this.subMeals.filter(subMeal => subMeal.subMealPlanId !== subMealPlanId);
        this.getSubMeals();
      });
    }
  }
}
