import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAdmissionSectionComponent } from './private-admission-section.component';

describe('PrivateAdmissionSectionComponent', () => {
  let component: PrivateAdmissionSectionComponent;
  let fixture: ComponentFixture<PrivateAdmissionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAdmissionSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAdmissionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
