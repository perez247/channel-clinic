import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateViewTicketModalComponent } from './private-view-ticket-modal.component';

describe('PrivateViewTicketModalComponent', () => {
  let component: PrivateViewTicketModalComponent;
  let fixture: ComponentFixture<PrivateViewTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateViewTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateViewTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
