import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleAdmissionComponent } from './private-single-admission.component';

describe('PrivateSingleAdmissionComponent', () => {
  let component: PrivateSingleAdmissionComponent;
  let fixture: ComponentFixture<PrivateSingleAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleAdmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
