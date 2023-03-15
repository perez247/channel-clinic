import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserFilesComponent } from './private-user-files.component';

describe('PrivateUserFilesComponent', () => {
  let component: PrivateUserFilesComponent;
  let fixture: ComponentFixture<PrivateUserFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUserFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
