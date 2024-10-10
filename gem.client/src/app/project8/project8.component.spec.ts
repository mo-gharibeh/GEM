import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project8Component } from './project8.component';

describe('Project8Component', () => {
  let component: Project8Component;
  let fixture: ComponentFixture<Project8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Project8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
