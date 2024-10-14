import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplycontactComponent } from './replycontact.component';

describe('ReplycontactComponent', () => {
  let component: ReplycontactComponent;
  let fixture: ComponentFixture<ReplycontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReplycontactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplycontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
