import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketInventoryDebtorComponent } from './add-ticket-inventory-debtor.component';

describe('AddTicketInventoryDebtorComponent', () => {
  let component: AddTicketInventoryDebtorComponent;
  let fixture: ComponentFixture<AddTicketInventoryDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTicketInventoryDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketInventoryDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
