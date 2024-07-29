import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailForgetPassComponent } from './email-forget-pass.component';

describe('EmailForgetPassComponent', () => {
  let component: EmailForgetPassComponent;
  let fixture: ComponentFixture<EmailForgetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailForgetPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailForgetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
