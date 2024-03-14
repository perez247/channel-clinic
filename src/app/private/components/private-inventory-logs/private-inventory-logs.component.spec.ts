import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateInventoryLogsComponent } from './private-inventory-logs.component';

describe('PrivateInventoryLogsComponent', () => {
  let component: PrivateInventoryLogsComponent;
  let fixture: ComponentFixture<PrivateInventoryLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateInventoryLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateInventoryLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
