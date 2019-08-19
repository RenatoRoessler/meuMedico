import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfExameComponent } from './conf-exame.component';

describe('ConfExameComponent', () => {
  let component: ConfExameComponent;
  let fixture: ComponentFixture<ConfExameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfExameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
