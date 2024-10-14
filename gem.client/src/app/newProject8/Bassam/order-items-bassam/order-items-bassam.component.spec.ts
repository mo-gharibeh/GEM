import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsBassamComponent } from './order-items-bassam.component';

describe('OrderItemsBassamComponent', () => {
  let component: OrderItemsBassamComponent;
  let fixture: ComponentFixture<OrderItemsBassamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemsBassamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemsBassamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
