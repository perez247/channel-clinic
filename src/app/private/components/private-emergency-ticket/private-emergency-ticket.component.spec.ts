import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateEmergencyTicketComponent } from './private-emergency-ticket.component';

describe('PrivateEmergencyTicketComponent', () => {
  let component: PrivateEmergencyTicketComponent;
  let fixture: ComponentFixture<PrivateEmergencyTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateEmergencyTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateEmergencyTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
