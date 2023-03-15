import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleInventoryComponent } from './private-single-inventory.component';

describe('PrivateSingleInventoryComponent', () => {
  let component: PrivateSingleInventoryComponent;
  let fixture: ComponentFixture<PrivateSingleInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
