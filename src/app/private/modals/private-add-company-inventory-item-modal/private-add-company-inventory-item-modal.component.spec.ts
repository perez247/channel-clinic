import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddCompanyInventoryItemModalComponent } from './private-add-company-inventory-item-modal.component';

describe('PrivateAddCompanyInventoryItemModalComponent', () => {
  let component: PrivateAddCompanyInventoryItemModalComponent;
  let fixture: ComponentFixture<PrivateAddCompanyInventoryItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddCompanyInventoryItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddCompanyInventoryItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
