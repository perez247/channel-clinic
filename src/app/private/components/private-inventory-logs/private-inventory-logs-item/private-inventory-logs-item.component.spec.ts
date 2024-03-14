import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateInventoryLogsItemComponent } from './private-inventory-logs-item.component';

describe('PrivateInventoryLogsItemComponent', () => {
  let component: PrivateInventoryLogsItemComponent;
  let fixture: ComponentFixture<PrivateInventoryLogsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateInventoryLogsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateInventoryLogsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
