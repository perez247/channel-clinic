import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLayoutFullComponent } from './private-layout-full.component';

describe('PrivateLayoutFullComponent', () => {
  let component: PrivateLayoutFullComponent;
  let fixture: ComponentFixture<PrivateLayoutFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateLayoutFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLayoutFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
