import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddInventoryModalComponent } from './private-add-inventory-modal.component';

describe('PrivateAddInventoryModalComponent', () => {
  let component: PrivateAddInventoryModalComponent;
  let fixture: ComponentFixture<PrivateAddInventoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddInventoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddInventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
