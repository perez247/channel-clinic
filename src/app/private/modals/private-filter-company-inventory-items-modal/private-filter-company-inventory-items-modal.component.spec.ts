import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterCompanyInventoryItemsModalComponent } from './private-filter-company-inventory-items-modal.component';

describe('PrivateFilterCompanyInventoryItemsModalComponent', () => {
  let component: PrivateFilterCompanyInventoryItemsModalComponent;
  let fixture: ComponentFixture<PrivateFilterCompanyInventoryItemsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterCompanyInventoryItemsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterCompanyInventoryItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
