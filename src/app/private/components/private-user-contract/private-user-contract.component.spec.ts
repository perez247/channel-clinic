import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserContractComponent } from './private-user-contract.component';

describe('PrivateUserContractComponent', () => {
  let component: PrivateUserContractComponent;
  let fixture: ComponentFixture<PrivateUserContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUserContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
