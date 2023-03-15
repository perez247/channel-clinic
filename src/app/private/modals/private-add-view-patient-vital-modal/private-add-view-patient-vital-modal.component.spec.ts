import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddViewPatientVitalModalComponent } from './private-add-view-patient-vital-modal.component';

describe('PrivateAddViewPatientVitalModalComponent', () => {
  let component: PrivateAddViewPatientVitalModalComponent;
  let fixture: ComponentFixture<PrivateAddViewPatientVitalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddViewPatientVitalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddViewPatientVitalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
