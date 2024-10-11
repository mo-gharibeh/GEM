import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmealDetailsComponent } from './submeal-details.component';

describe('SubmealDetailsComponent', () => {
  let component: SubmealDetailsComponent;
  let fixture: ComponentFixture<SubmealDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmealDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
