import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCreateSurgeryTicketModalComponent } from './private-create-surgery-ticket-modal.component';

describe('PrivateCreateSurgeryTicketModalComponent', () => {
  let component: PrivateCreateSurgeryTicketModalComponent;
  let fixture: ComponentFixture<PrivateCreateSurgeryTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCreateSurgeryTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCreateSurgeryTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
