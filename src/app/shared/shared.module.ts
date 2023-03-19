import { FinancialService } from './services/api/financial/financial.service';
import { StaffService } from './services/api/staff/staff.service';
import { CustomErrorMessageComponent } from './components/custom-error-message/custom-error-message.component';
import { VendorsModule } from './modules/VendorsModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientService } from './services/api/patient/patient.service';
import { JwtInterceptorProvider } from './interceptors/jwt.interceptor';
import { CustomErrorService } from './services/common/custom-error/custom-error.service';
import { CustomToastService } from './services/common/custom-toast/custom-toast.service';
import { SharedUtilityComponent } from './components/shared-utility/shared-utility.component';
import { SharedLoadingComponent } from './components/shared-loading/shared-loading.component';
import { UserService } from './services/api/user/user.service';
import { DisplayProfileImageDirective } from './directives/display-profile-image.directive';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedConfirmActionModalComponent } from './modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { SharedUserAutocompleteComponent } from './components/shared-user-autocomplete/shared-user-autocomplete.component';
import { CompanyService } from './services/api/company/company.service';
import { InventoryService } from './services/api/inventory/inventory.service';
import { AuthService } from './services/api/auth/auth.service';
import { SharedInventoryAutocompleteComponent } from './components/shared-inventory-autocomplete/shared-inventory-autocomplete.component';
import { AppointmentService } from './services/api/appointment/appointment.service';
import { CalendarModule } from 'angular-calendar';
import { TicketService } from './services/api/ticket/ticket.service';
import { TrimSentencePipe } from './pipes/trim-sentence.pipe';
import { HoverClassDirective } from './directives/hover-class.directive';
import { AppErrorInterceptorProvider } from './interceptors/app-error.handler';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { HasRoleDirective } from './directives/has-role.directive';
import { ContractDetailPipe } from './pipes/contract-detail.pipe';
import { SharedToastComponent } from './components/shared-toast/shared-toast.component';
import { PaidDebtPipe } from './pipes/paid-debt.pipe';

@NgModule({
  declarations: [
    // Directive
    DisplayProfileImageDirective,
    HoverClassDirective,
    HasRoleDirective,

    // Pipes
    TrimSentencePipe,
    ShortNumberPipe,
    ContractDetailPipe,
    PaidDebtPipe,

    SharedUtilityComponent,
    CustomErrorMessageComponent,
    SharedLoadingComponent,
    SharedConfirmActionModalComponent,
    SharedUserAutocompleteComponent,
    SharedInventoryAutocompleteComponent,
    ShortNumberPipe,
    HasRoleDirective,
    ContractDetailPipe,
    SharedToastComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CalendarModule,

    // Vendors
    VendorsModule,
    AngularEditorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CalendarModule,

    // Vendors
    VendorsModule,
    AngularEditorModule,

    // Components
    SharedUtilityComponent,
    CustomErrorMessageComponent,
    SharedLoadingComponent,
    SharedConfirmActionModalComponent,
    SharedUserAutocompleteComponent,
    SharedInventoryAutocompleteComponent,
    SharedToastComponent,

    // Directives
    DisplayProfileImageDirective,
    HoverClassDirective,
    HasRoleDirective,

    // Pipes
    TrimSentencePipe,
    ShortNumberPipe,
    ContractDetailPipe,
    PaidDebtPipe,
  ],
  providers: [
    // apis
    PatientService,
    StaffService,
    UserService,
    CompanyService,
    InventoryService,
    AuthService,
    InventoryService,
    AppointmentService,
    TicketService,
    FinancialService,

    // common
    CustomErrorService,
    CustomToastService,

    // Before a call is made to the backend add the authToken to it
    JwtInterceptorProvider,
    ErrorInterceptorProvider,
    AppErrorInterceptorProvider,
  ]
})
export class SharedModule { }
