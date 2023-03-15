import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinanceInventoryComponent } from './private-finance-inventory.component';

describe('PrivateFinanceInventoryComponent', () => {
  let component: PrivateFinanceInventoryComponent;
  let fixture: ComponentFixture<PrivateFinanceInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinanceInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinanceInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
