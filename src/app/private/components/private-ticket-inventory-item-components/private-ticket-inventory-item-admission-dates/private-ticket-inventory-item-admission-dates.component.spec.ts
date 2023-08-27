import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemAdmissionDatesComponent } from './private-ticket-inventory-item-admission-dates.component';

describe('PrivateTicketInventoryItemAdmissionDatesComponent', () => {
  let component: PrivateTicketInventoryItemAdmissionDatesComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemAdmissionDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemAdmissionDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemAdmissionDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
