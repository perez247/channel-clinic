import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddEmergencyTicketsComponent } from './private-add-emergency-tickets.component';

describe('PrivateAddEmergencyTicketsComponent', () => {
  let component: PrivateAddEmergencyTicketsComponent;
  let fixture: ComponentFixture<PrivateAddEmergencyTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddEmergencyTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddEmergencyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
