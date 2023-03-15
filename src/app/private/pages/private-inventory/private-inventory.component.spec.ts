import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateInventoryComponent } from './private-inventory.component';

describe('PrivateInventoryComponent', () => {
  let component: PrivateInventoryComponent;
  let fixture: ComponentFixture<PrivateInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
