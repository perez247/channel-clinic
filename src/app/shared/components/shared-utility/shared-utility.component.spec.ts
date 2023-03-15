import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUtilityComponent } from './shared-utility.component';

describe('SharedUtilityComponent', () => {
  let component: SharedUtilityComponent;
  let fixture: ComponentFixture<SharedUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedUtilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
