import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymAndClassComponent } from './gym-and-class.component';

describe('GymAndClassComponent', () => {
  let component: GymAndClassComponent;
  let fixture: ComponentFixture<GymAndClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GymAndClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymAndClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
