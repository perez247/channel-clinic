import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCreateAdmissionTicketModalComponent } from './private-create-admission-ticket-modal.component';

describe('PrivateCreateAdmissionTicketModalComponent', () => {
  let component: PrivateCreateAdmissionTicketModalComponent;
  let fixture: ComponentFixture<PrivateCreateAdmissionTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCreateAdmissionTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCreateAdmissionTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
