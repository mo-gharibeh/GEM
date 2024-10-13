import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGymComponent } from './update-gym.component';

describe('UpdateGymComponent', () => {
  let component: UpdateGymComponent;
  let fixture: ComponentFixture<UpdateGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateGymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
