import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndGymComponent } from './class-and-gym.component';

describe('ClassAndGymComponent', () => {
  let component: ClassAndGymComponent;
  let fixture: ComponentFixture<ClassAndGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassAndGymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAndGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
