import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCreateTicketModalComponent } from './private-create-ticket-modal.component';

describe('PrivateCreateTicketModalComponent', () => {
  let component: PrivateCreateTicketModalComponent;
  let fixture: ComponentFixture<PrivateCreateTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCreateTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCreateTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
