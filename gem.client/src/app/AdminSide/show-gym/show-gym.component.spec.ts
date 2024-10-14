import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGymComponent } from './show-gym.component';

describe('ShowGymComponent', () => {
  let component: ShowGymComponent;
  let fixture: ComponentFixture<ShowGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowGymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
