import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPassworsComponent } from './rest-passwors.component';

describe('RestPassworsComponent', () => {
  let component: RestPassworsComponent;
  let fixture: ComponentFixture<RestPassworsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestPassworsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestPassworsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
