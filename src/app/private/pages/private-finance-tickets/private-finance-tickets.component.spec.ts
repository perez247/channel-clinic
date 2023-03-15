import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinanceTicketsComponent } from './private-finance-tickets.component';

describe('PrivateFinanceTicketsComponent', () => {
  let component: PrivateFinanceTicketsComponent;
  let fixture: ComponentFixture<PrivateFinanceTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinanceTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinanceTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
