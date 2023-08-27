import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemDepartmentNoteComponent } from './private-ticket-inventory-item-department-note.component';

describe('PrivateTicketInventoryItemDepartmentNoteComponent', () => {
  let component: PrivateTicketInventoryItemDepartmentNoteComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemDepartmentNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemDepartmentNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemDepartmentNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
