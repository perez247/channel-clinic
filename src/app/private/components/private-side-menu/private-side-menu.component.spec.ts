import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSideMenuComponent } from './private-side-menu.component';

describe('PrivateSideMenuComponent', () => {
  let component: PrivateSideMenuComponent;
  let fixture: ComponentFixture<PrivateSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
