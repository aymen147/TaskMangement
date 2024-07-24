import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashbordComponent } from './header-dashbord.component';

describe('HeaderDashbordComponent', () => {
  let component: HeaderDashbordComponent;
  let fixture: ComponentFixture<HeaderDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
