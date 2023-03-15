import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNotfoundComponent } from './private-notfound.component';

describe('PrivateNotfoundComponent', () => {
  let component: PrivateNotfoundComponent;
  let fixture: ComponentFixture<PrivateNotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateNotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
