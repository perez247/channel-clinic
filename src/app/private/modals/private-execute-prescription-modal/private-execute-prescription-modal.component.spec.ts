import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateExecutePrescriptionModalComponent } from './private-execute-prescription-modal.component';

describe('PrivateExecutePrescriptionModalComponent', () => {
  let component: PrivateExecutePrescriptionModalComponent;
  let fixture: ComponentFixture<PrivateExecutePrescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateExecutePrescriptionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateExecutePrescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
