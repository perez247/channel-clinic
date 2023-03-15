import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePatientVitalsComponent } from './private-patient-vitals.component';

describe('PrivatePatientVitalsComponent', () => {
  let component: PrivatePatientVitalsComponent;
  let fixture: ComponentFixture<PrivatePatientVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePatientVitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePatientVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
