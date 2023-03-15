import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateInventoryItemsComponent } from './private-inventory-items.component';

describe('PrivateInventoryItemsComponent', () => {
  let component: PrivateInventoryItemsComponent;
  let fixture: ComponentFixture<PrivateInventoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateInventoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
