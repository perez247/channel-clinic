import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddPaymentModalComponent } from './private-add-payment-modal.component';

describe('PrivateAddPaymentModalComponent', () => {
  let component: PrivateAddPaymentModalComponent;
  let fixture: ComponentFixture<PrivateAddPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddPaymentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
