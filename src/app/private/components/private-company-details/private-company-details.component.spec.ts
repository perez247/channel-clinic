import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCompanyDetailsComponent } from './private-company-details.component';

describe('PrivateCompanyDetailsComponent', () => {
  let component: PrivateCompanyDetailsComponent;
  let fixture: ComponentFixture<PrivateCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
