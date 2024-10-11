import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiCalculatorComponent } from './bmi-calculator.component';

describe('BmiCalculatorComponent', () => {
  let component: BmiCalculatorComponent;
  let fixture: ComponentFixture<BmiCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmiCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmiCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
