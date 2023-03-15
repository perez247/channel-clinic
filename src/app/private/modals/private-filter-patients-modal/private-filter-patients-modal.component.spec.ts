import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterPatientsModalComponent } from './private-filter-patients-modal.component';

describe('PrivateFilterPatientsModalComponent', () => {
  let component: PrivateFilterPatientsModalComponent;
  let fixture: ComponentFixture<PrivateFilterPatientsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterPatientsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterPatientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
