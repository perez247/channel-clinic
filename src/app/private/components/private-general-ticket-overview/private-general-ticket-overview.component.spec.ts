import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateGeneralTicketOverviewComponent } from './private-general-ticket-overview.component';

describe('PrivateGeneralTicketOverviewComponent', () => {
  let component: PrivateGeneralTicketOverviewComponent;
  let fixture: ComponentFixture<PrivateGeneralTicketOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateGeneralTicketOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateGeneralTicketOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
