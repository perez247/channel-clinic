import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUpdateQuantityComponent } from './private-update-quantity.component';

describe('PrivateUpdateQuantityComponent', () => {
  let component: PrivateUpdateQuantityComponent;
  let fixture: ComponentFixture<PrivateUpdateQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUpdateQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUpdateQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
