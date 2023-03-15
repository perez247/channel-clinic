import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedConfirmActionModalComponent } from './shared-confirm-action-modal.component';

describe('SharedConfirmActionModalComponent', () => {
  let component: SharedConfirmActionModalComponent;
  let fixture: ComponentFixture<SharedConfirmActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedConfirmActionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedConfirmActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
