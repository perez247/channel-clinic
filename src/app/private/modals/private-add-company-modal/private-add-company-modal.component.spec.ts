import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddCompanyModalComponent } from './private-add-company-modal.component';

describe('PrivateAddCompanyModalComponent', () => {
  let component: PrivateAddCompanyModalComponent;
  let fixture: ComponentFixture<PrivateAddCompanyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddCompanyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
