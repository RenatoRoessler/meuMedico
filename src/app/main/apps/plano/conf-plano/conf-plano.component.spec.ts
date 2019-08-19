import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPlanoComponent } from './conf-plano.component';

describe('ConfPlanoComponent', () => {
  let component: ConfPlanoComponent;
  let fixture: ComponentFixture<ConfPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
