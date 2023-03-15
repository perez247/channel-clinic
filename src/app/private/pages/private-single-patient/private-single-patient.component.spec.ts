import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSinglePatientComponent } from './private-single-patient.component';

describe('PrivateSinglePatientComponent', () => {
  let component: PrivateSinglePatientComponent;
  let fixture: ComponentFixture<PrivateSinglePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSinglePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSinglePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
