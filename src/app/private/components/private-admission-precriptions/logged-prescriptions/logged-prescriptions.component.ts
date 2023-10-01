import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';

@Component({
  selector: 'app-logged-prescriptions',
  templateUrl: './logged-prescriptions.component.html',
  styleUrls: ['./logged-prescriptions.component.scss']
})
export class LoggedPrescriptionsComponent extends SharedUtilityComponent implements OnChanges {

  @Input() prescription?: AdmissionPrescription;
  @Input() update: string = '1';

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
