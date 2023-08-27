import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAdmissionsComponent } from './private-admissions.component';

describe('PrivateAdmissionsComponent', () => {
  let component: PrivateAdmissionsComponent;
  let fixture: ComponentFixture<PrivateAdmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAdmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
