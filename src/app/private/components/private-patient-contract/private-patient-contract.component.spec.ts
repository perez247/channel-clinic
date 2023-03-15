import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePatientContractComponent } from './private-patient-contract.component';

describe('PrivatePatientContractComponent', () => {
  let component: PrivatePatientContractComponent;
  let fixture: ComponentFixture<PrivatePatientContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePatientContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePatientContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
