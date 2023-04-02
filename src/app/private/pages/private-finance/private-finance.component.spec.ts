import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinanceComponent } from './private-finance.component';

describe('PrivateFinanceComponent', () => {
  let component: PrivateFinanceComponent;
  let fixture: ComponentFixture<PrivateFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
