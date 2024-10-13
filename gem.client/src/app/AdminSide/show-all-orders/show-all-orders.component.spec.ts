import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllOrdersComponent } from './show-all-orders.component';

describe('ShowAllOrdersComponent', () => {
  let component: ShowAllOrdersComponent;
  let fixture: ComponentFixture<ShowAllOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
