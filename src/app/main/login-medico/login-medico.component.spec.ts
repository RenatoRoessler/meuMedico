import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMedicoComponent } from './login-medico.component';

describe('LoginMedicoComponent', () => {
  let component: LoginMedicoComponent;
  let fixture: ComponentFixture<LoginMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
