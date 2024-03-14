import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUpdateTicketInventoryComponent } from './private-update-ticket-inventory.component';

describe('PrivateUpdateTicketInventoryComponent', () => {
  let component: PrivateUpdateTicketInventoryComponent;
  let fixture: ComponentFixture<PrivateUpdateTicketInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUpdateTicketInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUpdateTicketInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
