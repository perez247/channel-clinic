import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { PatientVital } from "src/app/shared/core/models/patient";
import { PatientService } from "src/app/shared/services/api/patient/patient.service";


@Component({
  selector: 'app-private-add-view-patient-vital-modal',
  templateUrl: './private-add-view-patient-vital-modal.component.html',
  styleUrls: ['./private-add-view-patient-vital-modal.component.scss']
})
export class PrivateAddViewPatientVitalModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() patientId?: string;
  @Input() patientVital?: PatientVital;

  @Output() vitalAdded = new EventEmitter<any>();

  vital = '';

  constructor(
    public activeModal: NgbActiveModal,
    private patientService: PatientService
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
  }

  addVital(): void
  {
    this.isLoading = true;
    const data = { patientId : this.patientId, data: this.vital };
    console.log(data);
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
}
