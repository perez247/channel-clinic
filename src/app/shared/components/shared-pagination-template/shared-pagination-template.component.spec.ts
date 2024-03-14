import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPaginationTemplateComponent } from './shared-pagination-template.component';

describe('SharedPaginationTemplateComponent', () => {
  let component: SharedPaginationTemplateComponent;
  let fixture: ComponentFixture<SharedPaginationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedPaginationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPaginationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
