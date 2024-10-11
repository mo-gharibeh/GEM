import { Component } from '@angular/core';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.css'
})
export class BmiCalculatorComponent {
  height!: number;
  weight!: number;
  age!: number;
  sex!: string; 
  bmi!: number;
  bmiCategory!: string;

  calculateBMI() {
    if (this.height && this.weight) {
      const heightInMeters = this.height / 100;
      this.bmi = this.weight / (heightInMeters * heightInMeters);
      this.bmiCategory = this.getBMICategory(this.bmi);
    }
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'Healthy';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Overweight';
    } else if (bmi >= 30) {
      return 'Obese';
    }

    return 'Unknown';
  }
}

