import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { UtilityHelpers } from "src/app/shared/core/functions/utility-helpers";
import { ImageService } from "src/app/shared/services/common/image/image.service";

@Component({
  selector: 'app-private-upload-profile-picture-modal',
  templateUrl: './private-upload-profile-picture-modal.component.html',
  styleUrls: ['./private-upload-profile-picture-modal.component.scss'],
  providers: [
    ImageService
  ]
})
export class PrivateUploadProfilePictureModalComponent extends SharedUtilityComponent implements OnInit {

  @Output() newImage = new EventEmitter<string>();

  imageChangedEvent: any = '';
  croppedImage: any;

  constructor(
    public activeModal: NgbActiveModal,
    private imageService: ImageService
  ) {
    super()
   }

  override ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    const base64 = event.base64 ?? '';
    if (base64.length <= 0) { return }

    const sub = this.imageService.compressBase64(base64).subscribe({
      next: (compressed) => {
        this.croppedImage = compressed;
      }
    });
    this.subscriptions.push(sub);
  }

  saveChanges() {
    this.newImage.emit(this.croppedImage);
    this.activeModal.close();
  }
}
