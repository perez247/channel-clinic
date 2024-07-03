import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faFileAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IFileStatus, UtilityHelpers } from "src/app/shared/core/functions/utility-helpers";

export class FileUpload {
  name?: string;
  base64String?: string;
}

@Component({
  selector: 'app-private-upload-files-modal',
  templateUrl: './private-upload-files-modal.component.html',
  styleUrls: ['./private-upload-files-modal.component.scss']
})
export class PrivateUploadFilesModalComponent implements OnInit {

  @Input() total = 1;
  @Output() newImages = new EventEmitter<FileUpload[]>();

  imageChangedEvent?: any = null;
  rawFile: any;

  fileOnDisplay?: string;

  files: FileUpload[] = [];

  fonts = { faFileAlt, faTrashAlt }

  fileStatus?: IFileStatus;

  constructor(
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];

    // validate file
    this.fileStatus = UtilityHelpers.validateFile(file);
    console.log(this.fileStatus, file);

    if (!this.fileStatus.isSuccess) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.imageChangedEvent = reader.result;
        this.fileOnDisplay = file.name;
    };

    reader.onerror = (error) => {
      console.log(error);
    }
  }

  addToList(): void {

    this.fileStatus = UtilityHelpers.validateFileName(this.fileOnDisplay);

    if (!this.fileStatus.isSuccess) { return; }

    this.files.push({
      name: this.fileOnDisplay,
      base64String: this.imageChangedEvent,
    });

    this.fileOnDisplay = '';
    this.imageChangedEvent = '';
  }

  resetError() {
    this.fileStatus = { isSuccess: true, errorMessage: undefined }
  }

  removeFromList(index: any): void {
    this.files.splice(index, 1);
  }

  addFiles(): void {
    this.newImages.emit(this.files);
    this.activeModal.close();
  }

}
