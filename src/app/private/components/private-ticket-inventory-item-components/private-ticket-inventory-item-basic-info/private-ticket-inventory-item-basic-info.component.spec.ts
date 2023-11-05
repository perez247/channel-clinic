import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemBasicInfoComponent } from './private-ticket-inventory-item-basic-info.component';

describe('PrivateTicketInventoryItemBasicInfoComponent', () => {
  let component: PrivateTicketInventoryItemBasicInfoComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
