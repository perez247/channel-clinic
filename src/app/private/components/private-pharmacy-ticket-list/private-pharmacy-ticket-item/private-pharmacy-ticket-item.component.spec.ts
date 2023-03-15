import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePharmacyTicketItemComponent } from './private-pharmacy-ticket-item.component';

describe('PrivatePharmacyTicketItemComponent', () => {
  let component: PrivatePharmacyTicketItemComponent;
  let fixture: ComponentFixture<PrivatePharmacyTicketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePharmacyTicketItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePharmacyTicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
