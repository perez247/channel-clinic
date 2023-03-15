import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterInventoryModalComponent } from './private-filter-inventory-modal.component';

describe('PrivateFilterInventoryModalComponent', () => {
  let component: PrivateFilterInventoryModalComponent;
  let fixture: ComponentFixture<PrivateFilterInventoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterInventoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterInventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
