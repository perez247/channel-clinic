import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedPrescriptionsComponent } from './logged-prescriptions.component';

describe('LoggedPrescriptionsComponent', () => {
  let component: LoggedPrescriptionsComponent;
  let fixture: ComponentFixture<LoggedPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedPrescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
