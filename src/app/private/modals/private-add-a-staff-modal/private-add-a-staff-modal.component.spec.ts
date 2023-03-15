import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddAStaffModalComponent } from './private-add-a-staff-modal.component';

describe('PrivateAddAStaffModalComponent', () => {
  let component: PrivateAddAStaffModalComponent;
  let fixture: ComponentFixture<PrivateAddAStaffModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddAStaffModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddAStaffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
