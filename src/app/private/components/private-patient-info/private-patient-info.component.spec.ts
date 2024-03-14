import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePatientInfoComponent } from './private-patient-info.component';

describe('PrivatePatientInfoComponent', () => {
  let component: PrivatePatientInfoComponent;
  let fixture: ComponentFixture<PrivatePatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePatientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
