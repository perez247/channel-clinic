import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUploadFilesModalComponent } from './private-upload-files-modal.component';

describe('PrivateUploadFilesModalComponent', () => {
  let component: PrivateUploadFilesModalComponent;
  let fixture: ComponentFixture<PrivateUploadFilesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUploadFilesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUploadFilesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
