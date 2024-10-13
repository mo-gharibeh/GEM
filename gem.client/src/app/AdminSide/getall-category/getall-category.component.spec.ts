import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallCategoryComponent } from './getall-category.component';

describe('GetallCategoryComponent', () => {
  let component: GetallCategoryComponent;
  let fixture: ComponentFixture<GetallCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetallCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
