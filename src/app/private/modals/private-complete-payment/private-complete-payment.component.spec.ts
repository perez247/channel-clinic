import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCompletePaymentComponent } from './private-complete-payment.component';

describe('PrivateCompletePaymentComponent', () => {
  let component: PrivateCompletePaymentComponent;
  let fixture: ComponentFixture<PrivateCompletePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCompletePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCompletePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
