import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleTicketComponent } from './private-single-ticket.component';

describe('PrivateSingleTicketComponent', () => {
  let component: PrivateSingleTicketComponent;
  let fixture: ComponentFixture<PrivateSingleTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
