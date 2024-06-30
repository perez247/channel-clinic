import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppUser } from "src/app/shared/core/models/app-user";
import { DefaultVitals, PatientVital } from "src/app/shared/core/models/patient";
import { Confirmable } from "src/app/shared/decorators/confirm-action-method-decorator";
import { PatientService } from "src/app/shared/services/api/patient/patient.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { EventBusService } from "src/app/shared/services/common/event-bus/event-bus.service";


@Component({
  selector: 'app-private-add-view-patient-vital-modal',
  templateUrl: './private-add-view-patient-vital-modal.component.html',
  styleUrls: ['./private-add-view-patient-vital-modal.component.scss']
})
export class PrivateAddViewPatientVitalModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() patientId?: string;
  @Input() patientVital?: PatientVital;

  @Output() vitalAdded = new EventEmitter<any>();

  fonts = { faTrash }

  vitalStructure = DefaultVitals;

  staffResponsible?: AppUser;

  constructor(
    public activeModal: NgbActiveModal,
    private patientService: PatientService,
    private toast: CustomToastService
    ) {
    super();
  }

  editorConfig: AngularEditorConfig = {
    editable: this.patientVital ? false : true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
  };

  override ngOnInit(): void {
    if (this.patientVital) {
      this.vitalStructure = JSON.parse(this.patientVital.data || '');
    }
  }

  addVital(): void
  {

    const newData = this.vitalStructure.filter(x => x.value && x.value.trim().length > 0);

    if (newData.length == 0) {
      this.toast.error('At least one vital is required');
      return;
    }
    this.beginAdding(newData);
  }

  @Confirmable({
    title: 'Upload Vitals',
    html: 'Are you sure you want to upload these vitals. you won\'t be able to change this anymore',
    confirmButtonText: 'Yes, upload vitals',
    denyButtonText: 'No I changed my mind',
  })
  private beginAdding(newData: any): void {
    this.isLoading = true;
    const data = { patientId : this.patientId, data: JSON.stringify(newData), staffResponsible: this.staffResponsible?.base?.id };
    const sub = this.patientService.addVital(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.vitalAdded.emit();
          this.activeModal.close();
        },
        error: (error) => {

        }
      });

      this.subscriptions.push(sub);
  }

  prepareData(): void {
    const newData = this.vitalStructure.filter(x => x.value && x.value.trim().length > 0);
  }

  removeItemInData(i: number): void {
    this.vitalStructure.splice(i, 1);
  }

  addNewVitalData(): void {
    this.vitalStructure.push({ name: 'Vital_' + this.vitalStructure.length, value: '' });
  }
}
