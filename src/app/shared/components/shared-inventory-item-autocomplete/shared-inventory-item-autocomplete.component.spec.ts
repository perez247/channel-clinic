import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInventoryItemAutocompleteComponent } from './shared-inventory-item-autocomplete.component';

describe('SharedInventoryItemAutocompleteComponent', () => {
  let component: SharedInventoryItemAutocompleteComponent;
  let fixture: ComponentFixture<SharedInventoryItemAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedInventoryItemAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedInventoryItemAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
