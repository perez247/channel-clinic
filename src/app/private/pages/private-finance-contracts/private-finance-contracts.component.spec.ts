import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinanceContractsComponent } from './private-finance-contracts.component';

describe('PrivateFinanceContractsComponent', () => {
  let component: PrivateFinanceContractsComponent;
  let fixture: ComponentFixture<PrivateFinanceContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinanceContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinanceContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
