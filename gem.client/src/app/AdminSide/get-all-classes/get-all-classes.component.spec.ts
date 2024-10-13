import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllClassesComponent } from './get-all-classes.component';

describe('GetAllClassesComponent', () => {
  let component: GetAllClassesComponent;
  let fixture: ComponentFixture<GetAllClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
