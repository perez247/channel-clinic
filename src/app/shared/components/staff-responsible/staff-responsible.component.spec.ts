import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffResponsibleComponent } from './staff-responsible.component';

describe('StaffResponsibleComponent', () => {
  let component: StaffResponsibleComponent;
  let fixture: ComponentFixture<StaffResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffResponsibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
