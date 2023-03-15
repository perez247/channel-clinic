import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateInventoryDetailsComponent } from './private-inventory-details.component';

describe('PrivateInventoryDetailsComponent', () => {
  let component: PrivateInventoryDetailsComponent;
  let fixture: ComponentFixture<PrivateInventoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateInventoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateInventoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
