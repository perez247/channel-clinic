import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateBulkUploadInventoryComponent } from './private-bulk-upload-inventory.component';

describe('PrivateBulkUploadInventoryComponent', () => {
  let component: PrivateBulkUploadInventoryComponent;
  let fixture: ComponentFixture<PrivateBulkUploadInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateBulkUploadInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateBulkUploadInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
