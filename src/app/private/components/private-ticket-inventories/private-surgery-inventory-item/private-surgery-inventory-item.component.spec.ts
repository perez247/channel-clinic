import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSurgeryInventoryItemComponent } from './private-surgery-inventory-item.component';

describe('PrivateSurgeryInventoryItemComponent', () => {
  let component: PrivateSurgeryInventoryItemComponent;
  let fixture: ComponentFixture<PrivateSurgeryInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSurgeryInventoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSurgeryInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
