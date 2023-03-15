import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCreateLabTicketModalComponent } from './private-create-lab-ticket-modal.component';

describe('PrivateCreateLabTicketModalComponent', () => {
  let component: PrivateCreateLabTicketModalComponent;
  let fixture: ComponentFixture<PrivateCreateLabTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCreateLabTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCreateLabTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
