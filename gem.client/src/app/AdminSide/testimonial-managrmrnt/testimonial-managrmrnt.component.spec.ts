import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialManagrmrntComponent } from './testimonial-managrmrnt.component';

describe('TestimonialManagrmrntComponent', () => {
  let component: TestimonialManagrmrntComponent;
  let fixture: ComponentFixture<TestimonialManagrmrntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialManagrmrntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialManagrmrntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
