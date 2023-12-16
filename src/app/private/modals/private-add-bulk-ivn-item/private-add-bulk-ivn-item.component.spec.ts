import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddBulkIvnItemComponent } from './private-add-bulk-ivn-item.component';

describe('PrivateAddBulkIvnItemComponent', () => {
  let component: PrivateAddBulkIvnItemComponent;
  let fixture: ComponentFixture<PrivateAddBulkIvnItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddBulkIvnItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddBulkIvnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
