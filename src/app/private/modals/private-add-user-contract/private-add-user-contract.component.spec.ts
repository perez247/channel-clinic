import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddUserContractComponent } from './private-add-user-contract.component';

describe('PrivateAddUserContractComponent', () => {
  let component: PrivateAddUserContractComponent;
  let fixture: ComponentFixture<PrivateAddUserContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddUserContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddUserContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
