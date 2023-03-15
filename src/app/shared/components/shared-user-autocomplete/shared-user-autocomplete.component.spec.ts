import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUserAutocompleteComponent } from './shared-user-autocomplete.component';

describe('SharedUserAutocompleteComponent', () => {
  let component: SharedUserAutocompleteComponent;
  let fixture: ComponentFixture<SharedUserAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedUserAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedUserAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
