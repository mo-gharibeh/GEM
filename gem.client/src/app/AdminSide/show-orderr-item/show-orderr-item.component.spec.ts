import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderrItemComponent } from './show-orderr-item.component';

describe('ShowOrderrItemComponent', () => {
  let component: ShowOrderrItemComponent;
  let fixture: ComponentFixture<ShowOrderrItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowOrderrItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrderrItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
