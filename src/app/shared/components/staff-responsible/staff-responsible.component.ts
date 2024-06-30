import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppUser } from '../../core/models/app-user';
import { EventBusService } from '../../services/common/event-bus/event-bus.service';
import { ApplicationRoutes } from '../../core/routes/app-routes';

@Component({
  selector: 'app-staff-responsible',
  templateUrl: './staff-responsible.component.html',
  styleUrls: ['./staff-responsible.component.scss']
})
export class StaffResponsibleComponent implements OnInit {

  @Input() staffUserId?: string;
  @Input() title: string = 'Staff';
  @Output() staffSelected = new EventEmitter<AppUser>();

  form: FormGroup = {} as any;

  staff?: AppUser;

  routes = ApplicationRoutes.generateRoutes();
  
  constructor(
    private fb: FormBuilder,
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    this.staff = this.eventBus.stateInMemory.staff.value?.find(x => x.base?.id == this.staffUserId) || undefined;

    const name = this.staff ? `${this.staff.lastName} ${this.staff.firstName} ${this.staff.otherName}` : null;

    this.form = this.fb.group({
      name: [{ value: name, disabled: this.staff ? true : false  }]
    });
  }

  staffResponsible(staff: AppUser): void {
    this.form.patchValue({
      name: `${staff.lastName} ${staff.firstName} ${staff.otherName}`
    });
    this.staffSelected.emit(staff);
  }
}
