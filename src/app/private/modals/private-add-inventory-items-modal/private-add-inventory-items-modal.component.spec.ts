import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddInventoryItemsModalComponent } from './private-add-inventory-items-modal.component';

describe('PrivateAddInventoryItemsModalComponent', () => {
  let component: PrivateAddInventoryItemsModalComponent;
  let fixture: ComponentFixture<PrivateAddInventoryItemsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddInventoryItemsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddInventoryItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
