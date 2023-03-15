import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleCompanyComponent } from './private-single-company.component';

describe('PrivateSingleCompanyComponent', () => {
  let component: PrivateSingleCompanyComponent;
  let fixture: ComponentFixture<PrivateSingleCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
