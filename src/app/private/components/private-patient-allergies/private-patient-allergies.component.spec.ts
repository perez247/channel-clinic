import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePatientAllergiesComponent } from './private-patient-allergies.component';

describe('PrivatePatientAllergiesComponent', () => {
  let component: PrivatePatientAllergiesComponent;
  let fixture: ComponentFixture<PrivatePatientAllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePatientAllergiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePatientAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
