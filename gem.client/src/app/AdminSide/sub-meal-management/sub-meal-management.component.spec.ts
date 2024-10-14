import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMealManagementComponent } from './sub-meal-management.component';

describe('SubMealManagementComponent', () => {
  let component: SubMealManagementComponent;
  let fixture: ComponentFixture<SubMealManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubMealManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMealManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
