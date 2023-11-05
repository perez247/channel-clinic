import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemAdditionalNoteComponent } from './private-ticket-inventory-item-additional-note.component';

describe('PrivateTicketInventoryItemAdditionalNoteComponent', () => {
  let component: PrivateTicketInventoryItemAdditionalNoteComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemAdditionalNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemAdditionalNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemAdditionalNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
