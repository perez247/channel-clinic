import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddAPatientModalComponent } from './private-add-a-patient-modal.component';

describe('PrivateAddAPatientModalComponent', () => {
  let component: PrivateAddAPatientModalComponent;
  let fixture: ComponentFixture<PrivateAddAPatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddAPatientModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddAPatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
