import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUploadProfilePictureModalComponent } from './private-upload-profile-picture-modal.component';

describe('PrivateUploadProfilePictureModalComponent', () => {
  let component: PrivateUploadProfilePictureModalComponent;
  let fixture: ComponentFixture<PrivateUploadProfilePictureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUploadProfilePictureModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUploadProfilePictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
