import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNursingInventoryItemComponent } from './private-nursing-inventory-item.component';

describe('PrivateNursingInventoryItemComponent', () => {
  let component: PrivateNursingInventoryItemComponent;
  let fixture: ComponentFixture<PrivateNursingInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateNursingInventoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateNursingInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
