import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLayoutContentComponent } from './public-layout-content.component';

describe('PublicLayoutContentComponent', () => {
  let component: PublicLayoutContentComponent;
  let fixture: ComponentFixture<PublicLayoutContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLayoutContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLayoutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
