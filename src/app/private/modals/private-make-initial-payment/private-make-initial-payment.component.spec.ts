import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMakeInitialPaymentComponent } from './private-make-initial-payment.component';

describe('PrivateMakeInitialPaymentComponent', () => {
  let component: PrivateMakeInitialPaymentComponent;
  let fixture: ComponentFixture<PrivateMakeInitialPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateMakeInitialPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMakeInitialPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
