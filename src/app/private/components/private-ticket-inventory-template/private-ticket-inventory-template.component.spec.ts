import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryTemplateComponent } from './private-ticket-inventory-template.component';

describe('PrivateTicketInventoryTemplateComponent', () => {
  let component: PrivateTicketInventoryTemplateComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
