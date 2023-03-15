import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInventoryAutocompleteComponent } from './shared-inventory-autocomplete.component';

describe('SharedInventoryAutocompleteComponent', () => {
  let component: SharedInventoryAutocompleteComponent;
  let fixture: ComponentFixture<SharedInventoryAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedInventoryAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedInventoryAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
