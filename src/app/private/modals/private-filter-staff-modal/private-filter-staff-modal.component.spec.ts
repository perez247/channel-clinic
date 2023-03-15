import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterStaffModalComponent } from './private-filter-staff-modal.component';

describe('PrivateFilterStaffModalComponent', () => {
  let component: PrivateFilterStaffModalComponent;
  let fixture: ComponentFixture<PrivateFilterStaffModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterStaffModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterStaffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
