import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketsComponent } from './private-tickets.component';

describe('PrivateTicketsComponent', () => {
  let component: PrivateTicketsComponent;
  let fixture: ComponentFixture<PrivateTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
