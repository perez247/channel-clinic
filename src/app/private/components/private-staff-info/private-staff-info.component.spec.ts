import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateStaffInfoComponent } from './private-staff-info.component';

describe('PrivateStaffInfoComponent', () => {
  let component: PrivateStaffInfoComponent;
  let fixture: ComponentFixture<PrivateStaffInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateStaffInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateStaffInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
