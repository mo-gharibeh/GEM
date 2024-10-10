import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMealComponent } from './sub-meal.component';

describe('SubMealComponent', () => {
  let component: SubMealComponent;
  let fixture: ComponentFixture<SubMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
