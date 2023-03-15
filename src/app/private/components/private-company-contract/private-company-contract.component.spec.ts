import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCompanyContractComponent } from './private-company-contract.component';

describe('PrivateCompanyContractComponent', () => {
  let component: PrivateCompanyContractComponent;
  let fixture: ComponentFixture<PrivateCompanyContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCompanyContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCompanyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
