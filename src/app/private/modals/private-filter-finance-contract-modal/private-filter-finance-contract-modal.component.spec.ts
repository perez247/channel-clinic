import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterFinanceContractModalComponent } from './private-filter-finance-contract-modal.component';

describe('PrivateFilterFinanceContractModalComponent', () => {
  let component: PrivateFilterFinanceContractModalComponent;
  let fixture: ComponentFixture<PrivateFilterFinanceContractModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterFinanceContractModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterFinanceContractModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
