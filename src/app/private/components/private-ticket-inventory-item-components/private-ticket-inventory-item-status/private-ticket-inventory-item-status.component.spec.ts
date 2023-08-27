import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemStatusComponent } from './private-ticket-inventory-item-status.component';

describe('PrivateTicketInventoryItemStatusComponent', () => {
  let component: PrivateTicketInventoryItemStatusComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
