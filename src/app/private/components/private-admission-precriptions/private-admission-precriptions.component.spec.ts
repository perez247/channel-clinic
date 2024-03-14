import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAdmissionPrecriptionsComponent } from './private-admission-precriptions.component';

describe('PrivateAdmissionPrecriptionsComponent', () => {
  let component: PrivateAdmissionPrecriptionsComponent;
  let fixture: ComponentFixture<PrivateAdmissionPrecriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAdmissionPrecriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAdmissionPrecriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
