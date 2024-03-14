import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSaveFinanceRecordComponent } from './private-save-finance-record.component';

describe('PrivateSaveFinanceRecordComponent', () => {
  let component: PrivateSaveFinanceRecordComponent;
  let fixture: ComponentFixture<PrivateSaveFinanceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSaveFinanceRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSaveFinanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
