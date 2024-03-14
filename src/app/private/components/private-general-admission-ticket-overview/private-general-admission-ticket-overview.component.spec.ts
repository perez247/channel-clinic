import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateGeneralAdmissionTicketOverviewComponent } from './private-general-admission-ticket-overview.component';

describe('PrivateGeneralAdmissionTicketOverviewComponent', () => {
  let component: PrivateGeneralAdmissionTicketOverviewComponent;
  let fixture: ComponentFixture<PrivateGeneralAdmissionTicketOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateGeneralAdmissionTicketOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateGeneralAdmissionTicketOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
