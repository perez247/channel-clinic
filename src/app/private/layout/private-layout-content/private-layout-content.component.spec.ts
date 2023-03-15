import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLayoutContentComponent } from './private-layout-content.component';

describe('PrivateLayoutContentComponent', () => {
  let component: PrivateLayoutContentComponent;
  let fixture: ComponentFixture<PrivateLayoutContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateLayoutContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLayoutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
