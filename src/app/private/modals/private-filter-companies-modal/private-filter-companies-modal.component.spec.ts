import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterCompaniesModalComponent } from './private-filter-companies-modal.component';

describe('PrivateFilterCompaniesModalComponent', () => {
  let component: PrivateFilterCompaniesModalComponent;
  let fixture: ComponentFixture<PrivateFilterCompaniesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterCompaniesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterCompaniesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
