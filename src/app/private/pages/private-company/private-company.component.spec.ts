import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCompanyComponent } from './private-company.component';

describe('PrivateCompanyComponent', () => {
  let component: PrivateCompanyComponent;
  let fixture: ComponentFixture<PrivateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
