import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCreateRadiologyTicketModalComponent } from './private-create-radiology-ticket-modal.component';

describe('PrivateCreateRadiologyTicketModalComponent', () => {
  let component: PrivateCreateRadiologyTicketModalComponent;
  let fixture: ComponentFixture<PrivateCreateRadiologyTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCreateRadiologyTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCreateRadiologyTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
