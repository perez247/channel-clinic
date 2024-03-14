import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemResultsComponent } from './private-ticket-inventory-item-results.component';

describe('PrivateTicketInventoryItemResultsComponent', () => {
  let component: PrivateTicketInventoryItemResultsComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
