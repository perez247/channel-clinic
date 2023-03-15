import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateStaffRolesComponent } from './private-staff-roles.component';

describe('PrivateStaffRolesComponent', () => {
  let component: PrivateStaffRolesComponent;
  let fixture: ComponentFixture<PrivateStaffRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateStaffRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateStaffRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
