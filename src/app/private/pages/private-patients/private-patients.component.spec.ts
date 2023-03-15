import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePatientsComponent } from './private-patients.component';

describe('PrivatePatientsComponent', () => {
  let component: PrivatePatientsComponent;
  let fixture: ComponentFixture<PrivatePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
