import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterInventoryItemModalComponent } from './private-filter-inventory-item-modal.component';

describe('PrivateFilterInventoryItemModalComponent', () => {
  let component: PrivateFilterInventoryItemModalComponent;
  let fixture: ComponentFixture<PrivateFilterInventoryItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterInventoryItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterInventoryItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
