import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionGymComponent } from './subscription-gym.component';

describe('SubscriptionGymComponent', () => {
  let component: SubscriptionGymComponent;
  let fixture: ComponentFixture<SubscriptionGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionGymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
