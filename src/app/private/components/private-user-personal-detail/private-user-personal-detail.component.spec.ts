import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserPersonalDetailComponent } from './private-user-personal-detail.component';

describe('PrivateUserPersonalDetailComponent', () => {
  let component: PrivateUserPersonalDetailComponent;
  let fixture: ComponentFixture<PrivateUserPersonalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUserPersonalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserPersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
