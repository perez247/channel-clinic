import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePharmacyTicketListComponent } from './private-pharmacy-ticket-list.component';

describe('PrivatePharmacyTicketListComponent', () => {
  let component: PrivatePharmacyTicketListComponent;
  let fixture: ComponentFixture<PrivatePharmacyTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePharmacyTicketListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePharmacyTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
