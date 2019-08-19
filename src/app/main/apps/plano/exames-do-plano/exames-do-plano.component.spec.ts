import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamesDoPlanoComponent } from './exames-do-plano.component';

describe('ExamesDoPlanoComponent', () => {
  let component: ExamesDoPlanoComponent;
  let fixture: ComponentFixture<ExamesDoPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamesDoPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamesDoPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
