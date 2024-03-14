import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAdmissionInventoryItemComponent } from './private-admission-inventory-item.component';

describe('PrivateAdmissionInventoryItemComponent', () => {
  let component: PrivateAdmissionInventoryItemComponent;
  let fixture: ComponentFixture<PrivateAdmissionInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAdmissionInventoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAdmissionInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
