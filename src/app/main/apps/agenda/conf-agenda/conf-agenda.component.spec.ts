import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfAgendaComponent } from './conf-agenda.component';

describe('ConfAgendaComponent', () => {
  let component: ConfAgendaComponent;
  let fixture: ComponentFixture<ConfAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
