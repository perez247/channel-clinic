import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterTicketsComponent } from './private-filter-tickets.component';

describe('PrivateFilterTicketsComponent', () => {
  let component: PrivateFilterTicketsComponent;
  let fixture: ComponentFixture<PrivateFilterTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
