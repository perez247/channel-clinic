import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePatientChangeCompanyComponent } from './private-patient-change-company.component';

describe('PrivatePatientChangeCompanyComponent', () => {
  let component: PrivatePatientChangeCompanyComponent;
  let fixture: ComponentFixture<PrivatePatientChangeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePatientChangeCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePatientChangeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
