import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCreatePharmacyTicketModalComponent } from './private-create-pharmacy-ticket-modal.component';

describe('PrivateCreatePharmacyTicketModalComponent', () => {
  let component: PrivateCreatePharmacyTicketModalComponent;
  let fixture: ComponentFixture<PrivateCreatePharmacyTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCreatePharmacyTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCreatePharmacyTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
