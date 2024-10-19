import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClassComponent } from './update-class.component';

describe('UpdateClassComponent', () => {
  let component: UpdateClassComponent;
  let fixture: ComponentFixture<UpdateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
