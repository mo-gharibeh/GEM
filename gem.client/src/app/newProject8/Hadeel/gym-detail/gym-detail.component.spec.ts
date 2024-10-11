import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymDetailComponent } from './gym-detail.component';

describe('GymDetailComponent', () => {
  let component: GymDetailComponent;
  let fixture: ComponentFixture<GymDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GymDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
