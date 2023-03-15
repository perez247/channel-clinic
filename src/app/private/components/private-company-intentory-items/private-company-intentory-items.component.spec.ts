import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCompanyIntentoryItemsComponent } from './private-company-intentory-items.component';

describe('PrivateCompanyIntentoryItemsComponent', () => {
  let component: PrivateCompanyIntentoryItemsComponent;
  let fixture: ComponentFixture<PrivateCompanyIntentoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCompanyIntentoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCompanyIntentoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
