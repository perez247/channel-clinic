import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateStaffComponent } from './private-staff.component';

describe('PrivateStaffComponent', () => {
  let component: PrivateStaffComponent;
  let fixture: ComponentFixture<PrivateStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
