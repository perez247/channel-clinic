import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: 'app-private-upload-profile-picture-modal',
  templateUrl: './private-upload-profile-picture-modal.component.html',
  styleUrls: ['./private-upload-profile-picture-modal.component.scss']
})
export class PrivateUploadProfilePictureModalComponent implements OnInit {

  @Output() newImage = new EventEmitter<string>();

  imageChangedEvent: any = '';
  croppedImage: any;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    const base64 = event.base64 ?? '';
    // this.croppedImage = UtilityHelpers.dataURLtoFile(base64, 'image.jpeg');
    this.croppedImage = base64;
  }

  saveChanges() {
    this.newImage.emit(this.croppedImage);
    this.activeModal.close();
  }
}
