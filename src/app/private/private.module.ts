import { NgModule, OnInit } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrivateWelcomeUserComponent } from './pages/private-welcome-user/private-welcome-user.component';
import { PrivateLayoutContentComponent } from './layout/private-layout-content/private-layout-content.component';
import { PrivateLayoutFullComponent } from './layout/private-layout-full/private-layout-full.component';
import { PrivateDashboardComponent } from './pages/private-dashboard/private-dashboard.component';
import { PrivateNavbarComponent } from './components/private-navbar/private-navbar.component';
import { PrivateSideMenuComponent } from './components/private-side-menu/private-side-menu.component';
import { PrivatePatientsComponent } from './pages/private-patients/private-patients.component';
import { PrivateStaffComponent } from './pages/private-staff/private-staff.component';
import { PrivateCompanyComponent } from './pages/private-company/private-company.component';
import { PrivateInventoryComponent } from './pages/private-inventory/private-inventory.component';
import { PrivateAppointmentsComponent } from './pages/private-appointments/private-appointments.component';
import { PrivateTicketsComponent } from './pages/private-tickets/private-tickets.component';
import { PrivateSinglePatientComponent } from './pages/private-single-patient/private-single-patient.component';
import { PrivateUserPersonalDetailComponent } from './components/private-user-personal-detail/private-user-personal-detail.component';
import { PrivateNotfoundComponent } from './pages/private-notfound/private-notfound.component';
import { PrivateUserNextOfKinComponent } from './components/private-user-next-of-kin/private-user-next-of-kin.component';
import { PrivatePatientAllergiesComponent } from './components/private-patient-allergies/private-patient-allergies.component';
import { PrivatePatientVitalsComponent } from './components/private-patient-vitals/private-patient-vitals.component';
import { PrivateUserContractComponent } from './components/private-user-contract/private-user-contract.component';
import { PrivateSingleStaffComponent } from './pages/private-single-staff/private-single-staff.component';
import { PrivateStaffDetailsComponent } from './components/private-staff-details/private-staff-details.component';
import { PrivateSingleCompanyComponent } from './pages/private-single-company/private-single-company.component';
import { PrivateCompanyDetailsComponent } from './components/private-company-details/private-company-details.component';
import { PrivateUserFilesComponent } from './components/private-user-files/private-user-files.component';
import { PrivateSingleInventoryComponent } from './pages/private-single-inventory/private-single-inventory.component';
import { PrivateInventoryDetailsComponent } from './components/private-inventory-details/private-inventory-details.component';
import { PrivateInventoryItemsComponent } from './components/private-inventory-items/private-inventory-items.component';
import { PrivateCompanyIntentoryItemsComponent } from './components/private-company-intentory-items/private-company-intentory-items.component';
import { PrivateSingleAppointmentComponent } from './pages/private-single-appointment/private-single-appointment.component';
import { PrivateAppointmentTicketsComponent } from './components/private-appointment-tickets/private-appointment-tickets.component';
import { PrivateTicketInventoryTemplateComponent } from './components/private-ticket-inventory-template/private-ticket-inventory-template.component';
import { PrivateAppointmentsByCalendarComponent } from './components/private-appointments-by-calendar/private-appointments-by-calendar.component';
import { PrivateAppointmentsByListComponent } from './components/private-appointments-by-list/private-appointments-by-list.component';
import { PrivateAddAPatientModalComponent } from './modals/private-add-a-patient-modal/private-add-a-patient-modal.component';
import { PrivateAddAStaffModalComponent } from './modals/private-add-a-staff-modal/private-add-a-staff-modal.component';
import { PrivateAddCompanyInventoryItemModalComponent } from './modals/private-add-company-inventory-item-modal/private-add-company-inventory-item-modal.component';
import { PrivateAddCompanyModalComponent } from './modals/private-add-company-modal/private-add-company-modal.component';
import { PrivateAddInventoryItemsModalComponent } from './modals/private-add-inventory-items-modal/private-add-inventory-items-modal.component';
import { PrivateAddInventoryModalComponent } from './modals/private-add-inventory-modal/private-add-inventory-modal.component';
import { PrivateFilterCompaniesModalComponent } from './modals/private-filter-companies-modal/private-filter-companies-modal.component';
import { PrivateFilterInventoryItemModalComponent } from './modals/private-filter-inventory-item-modal/private-filter-inventory-item-modal.component';
import { PrivateFilterInventoryModalComponent } from './modals/private-filter-inventory-modal/private-filter-inventory-modal.component';
import { PrivateFilterPatientsModalComponent } from './modals/private-filter-patients-modal/private-filter-patients-modal.component';
import { PrivateFilterStaffModalComponent } from './modals/private-filter-staff-modal/private-filter-staff-modal.component';
import { PrivateAddViewPatientVitalModalComponent } from './modals/private-add-view-patient-vital-modal/private-add-view-patient-vital-modal.component';
import { PrivateCreateTicketModalComponent } from './modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { PrivateFilterAppointmentsModalComponent } from './modals/private-filter-appointments-modal/private-filter-appointments-modal.component';
import { PrivateUploadFilesModalComponent } from './modals/private-upload-files-modal/private-upload-files-modal.component';
import { PrivateUploadProfilePictureModalComponent } from './modals/private-upload-profile-picture-modal/private-upload-profile-picture-modal.component';
import { PrivateViewAppointmentsByDateModalComponent } from './modals/private-view-appointments-by-date-modal/private-view-appointments-by-date-modal.component';
import { PrivateViewTicketModalComponent } from './modals/private-view-ticket-modal/private-view-ticket-modal.component';
import { PrivateCreatePatientAppointmentModalComponent } from './modals/private-create-patient-appointment-modal/private-create-patient-appointment-modal.component';
import { PrivateFilterCompanyInventoryItemsModalComponent } from './modals/private-filter-company-inventory-items-modal/private-filter-company-inventory-items-modal.component';
import { PrivateUpdateAppointmentModalComponent } from './modals/private-update-appointment-modal/private-update-appointment-modal.component';
import { PrivateSingleTicketComponent } from './pages/private-single-ticket/private-single-ticket.component';
import { PrivateAppointmentOverallDescriptionComponent } from './components/private-appointment-overall-description/private-appointment-overall-description.component';
import { PrivateFilterTicketsComponent } from './modals/private-filter-tickets/private-filter-tickets.component';
import { PrivateFinanceTicketsComponent } from './pages/private-finance-tickets/private-finance-tickets.component';
import { PrivateFinanceContractsComponent } from './pages/private-finance-contracts/private-finance-contracts.component';
import { PrivateGeneralTicketOverviewComponent } from './components/private-general-ticket-overview/private-general-ticket-overview.component';
import { PrivateMakeInitialPaymentComponent } from './modals/private-make-initial-payment/private-make-initial-payment.component';
import { PrivateCompletePaymentComponent } from './modals/private-complete-payment/private-complete-payment.component';
import { PrivateAddPaymentModalComponent } from './modals/private-add-payment-modal/private-add-payment-modal.component';
import { PrivateFinanceInventoryComponent } from './components/private-finance-inventory/private-finance-inventory.component';
import { PrivatePatientContractComponent } from './components/private-patient-contract/private-patient-contract.component';
import { PrivateCompanyContractComponent } from './components/private-company-contract/private-company-contract.component';
import { PrivateFilterFinanceContractModalComponent } from './modals/private-filter-finance-contract-modal/private-filter-finance-contract-modal.component';
import { PrivateStaffRolesComponent } from './components/private-staff-roles/private-staff-roles.component';
import { PrivatePatientChangeCompanyComponent } from './modals/private-patient-change-company/private-patient-change-company.component';
import { PrivateFinanceDebtsComponent } from './pages/private-finance-debts/private-finance-debts.component';
import { PrivateSingleFinanceDebtComponent } from './pages/private-single-finance-debt/private-single-finance-debt.component';
import { PrivateFinancePaidComponent } from './pages/private-finance-paid/private-finance-paid.component';
import { PrivateSingleFinancePaidComponent } from './pages/private-single-finance-paid/private-single-finance-paid.component';
import { PrivateFinancePaidItemComponent } from './components/private-finance-paid-item/private-finance-paid-item.component';
import { PrivateFinancePaidItemChildComponent } from './components/private-finance-paid-item-child/private-finance-paid-item-child.component';
import { PrivateEditTicketInventoryModalComponent } from './modals/private-edit-ticket-inventory-modal/private-edit-ticket-inventory-modal.component';
import { PrivateFinanceComponent } from './pages/private-finance/private-finance.component';
import { PrivateFilterFinanceDebtsModalComponent } from './modals/private-filter-finance-debts-modal/private-filter-finance-debts-modal.component';
import { PrivateDebtPaymentModalsComponent } from './modals/private-debt-payment-modals/private-debt-payment-modals.component';
import { PrivateSettingsComponent } from './pages/private-settings/private-settings.component';
import { PrivateBillingSettingComponent } from './components/private-billing-setting/private-billing-setting.component';
import { PrivateGetInventoryModalComponent } from './modals/private-get-inventory-modal/private-get-inventory-modal.component';
import { PrivatePreviousTicketsComponent } from './components/private-previous-tickets/private-previous-tickets.component';
import { PrivateTicketInventoriesComponent } from './components/private-ticket-inventories/private-ticket-inventories.component';
import { PrivatePharmacyInventoryItemComponent } from './components/private-ticket-inventories/private-pharmacy-inventory-item/private-pharmacy-inventory-item.component';
import { PrivateLabInventoryItemComponent } from './components/private-ticket-inventories/private-lab-inventory-item/private-lab-inventory-item.component';
import { PrivateInventoryDependenciesComponent } from './components/private-inventory-dependencies/private-inventory-dependencies.component';
import { AddInventoryDependenciesModalComponent } from './modals/add-inventory-dependencies-modal/add-inventory-dependencies-modal.component';
import { PrivateSaveLabRadiologyResultModalComponent } from './modals/private-save-lab-radiology-result-modal/private-save-lab-radiology-result-modal.component';
import { PrivateSaveLabRadNoteComponent } from './modals/private-save-lab-radiology-result-modal/private-save-lab-rad-note/private-save-lab-rad-note.component';
import { PrivateSaveLabRadProofComponent } from './modals/private-save-lab-radiology-result-modal/private-save-lab-rad-proof/private-save-lab-rad-proof.component';
import { PrivateInventoryItemComponent } from './components/private-ticket-inventories/private-inventory-item.component';
import { PrivateAddItemUsedModalComponent } from './modals/private-add-item-used-modal/private-add-item-used-modal.component';
import { PrivateSurgeryInventoryItemComponent } from './components/private-ticket-inventories/private-surgery-inventory-item/private-surgery-inventory-item.component';
import { PrivateSaveSurgeryStaffDateModalComponent } from './modals/private-save-surgery-staff-date-modal/private-save-surgery-staff-date-modal.component';
import { PrivateAdmissionInventoryItemComponent } from './components/private-ticket-inventories/private-admission-inventory-item/private-admission-inventory-item.component';
import { PrivateTicketInventoryItemStatusComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-status/private-ticket-inventory-item-status.component';
import { PrivateTicketInventoryItemDoctorPrescriptionComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-doctor-prescription/private-ticket-inventory-item-doctor-prescription.component';
import { PrivateTicketInventoryItemDepartmentNoteComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-department-note/private-ticket-inventory-item-department-note.component';
import { PrivateTicketInventoryItemAvailableQuantityComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-available-quantity/private-ticket-inventory-item-available-quantity.component';
import { PrivateTicketInventoryItemQuantityToGiveComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-quantity-to-give/private-ticket-inventory-item-quantity-to-give.component';
import { PrivateTicketInventoryItemPriceComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-price/private-ticket-inventory-item-price.component';
import { PrivateTicketInventoryItemStaffDateComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-staff-date/private-ticket-inventory-item-staff-date.component';
import { PrivateTicketInventoryItemResultsComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-results/private-ticket-inventory-item-results.component';
import { PrivateTicketInventoryItemAdmissionDatesComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-admission-dates/private-ticket-inventory-item-admission-dates.component';
import { PrivateAddEmergencyTicketsComponent } from './modals/private-add-emergency-tickets/private-add-emergency-tickets.component';
import { PrivateEmergencyTicketComponent } from './components/private-emergency-ticket/private-emergency-ticket.component';
import { PrivateAdmissionsComponent } from './pages/private-admissions/private-admissions.component';
import { PrivateSingleAdmissionComponent } from './pages/private-single-admission/private-single-admission.component';
import { PrivateGeneralAdmissionTicketOverviewComponent } from './components/private-general-admission-ticket-overview/private-general-admission-ticket-overview.component';
import { PrivatePatientInfoComponent } from './components/private-patient-info/private-patient-info.component';
import { PrivateAdmissionSectionComponent } from './pages/private-admission-section/private-admission-section.component';
import { PrivateAdmissionPrecriptionsComponent } from './components/private-admission-precriptions/private-admission-precriptions.component';
import { PrescriptionItemComponent } from './components/private-admission-precriptions/prescription-item/prescription-item.component';
import { PrivateStaffInfoComponent } from './components/private-staff-info/private-staff-info.component';
import { PrivateExecutePrescriptionModalComponent } from './modals/private-execute-prescription-modal/private-execute-prescription-modal.component';
import { LoggedPrescriptionsComponent } from './components/private-admission-precriptions/logged-prescriptions/logged-prescriptions.component';
import { PrivateUpdateTicketInventoryComponent } from './components/private-ticket-inventories/private-update-ticket-inventory/private-update-ticket-inventory.component';
import { PrivateTicketInventoryItemBasicInfoComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-basic-info/private-ticket-inventory-item-basic-info.component';
import { PrivateTicketInventoryItemAdditionalNoteComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-additional-note/private-ticket-inventory-item-additional-note.component';
import { PrivateBulkUploadInventoryComponent } from './modals/private-bulk-upload-inventory/private-bulk-upload-inventory.component';
import { PrivateAddBulkIvnItemComponent } from './modals/private-add-bulk-ivn-item/private-add-bulk-ivn-item.component';
import { PrivateUpdateQuantityComponent } from './modals/private-update-quantity/private-update-quantity.component';
import { PrivateInventoryLogsComponent } from './components/private-inventory-logs/private-inventory-logs.component';
import { PrivateInventoryLogsItemComponent } from './components/private-inventory-logs/private-inventory-logs-item/private-inventory-logs-item.component';
import { PrivateSaveFinanceRecordComponent } from './modals/private-save-finance-record/private-save-finance-record.component';
import { PrivateUserPasswordComponent } from './components/private-user-password/private-user-password.component';
import { PrivateAddUserContractComponent } from './modals/private-add-user-contract/private-add-user-contract.component';
import { AddTicketInventoryDebtorComponent } from './modals/add-ticket-inventory-debtor/add-ticket-inventory-debtor.component';
import { PrivateNursingInventoryItemComponent } from './components/private-ticket-inventories/private-nursing-inventory-item/private-nursing-inventory-item.component';
import { PrivateTicketInventoryItemStaffObservationComponent } from './components/private-ticket-inventory-item-components/private-ticket-inventory-item-staff-observation/private-ticket-inventory-item-staff-observation.component';
import { UserService } from '../shared/services/api/user/user.service';
import { EventBusService } from '../shared/services/common/event-bus/event-bus.service';
import { AppUser } from '../shared/core/models/app-user';
import { EventBusActions, EventBusData } from '../shared/services/common/event-bus/event-bus-action';

@NgModule({
  declarations: [
    // Modals---------------------------------------------
    PrivateAddAPatientModalComponent,
    PrivateAddAStaffModalComponent,
    PrivateAddCompanyInventoryItemModalComponent,
    PrivateAddCompanyModalComponent,
    PrivateAddInventoryItemsModalComponent,
    PrivateAddInventoryModalComponent,
    PrivateFilterCompaniesModalComponent,
    PrivateFilterInventoryItemModalComponent,
    PrivateFilterInventoryModalComponent,
    PrivateFilterPatientsModalComponent,
    PrivateFilterStaffModalComponent,
    PrivateAddViewPatientVitalModalComponent,
    PrivateCreateTicketModalComponent,
    PrivateFilterAppointmentsModalComponent,
    PrivateUploadFilesModalComponent,
    PrivateUploadProfilePictureModalComponent,
    PrivateViewAppointmentsByDateModalComponent,
    PrivateViewTicketModalComponent,
    PrivateCreatePatientAppointmentModalComponent,
    PrivateFilterCompanyInventoryItemsModalComponent,
    PrivateUpdateAppointmentModalComponent,
    PrivateSaveLabRadiologyResultModalComponent,
    PrivateSaveLabRadNoteComponent,
    PrivateSaveLabRadProofComponent,

    // Components-----------------------------------------
    PrivateLayoutContentComponent,
    PrivateLayoutFullComponent,
    PrivateWelcomeUserComponent,
    PrivateDashboardComponent,
    PrivateNavbarComponent,
    PrivateSideMenuComponent,
    PrivatePatientsComponent,
    PrivateStaffComponent,
    PrivateCompanyComponent,
    PrivateInventoryComponent,
    PrivateAppointmentsComponent,
    PrivateTicketsComponent,
    PrivateSinglePatientComponent,
    PrivateUserPersonalDetailComponent,
    PrivateNotfoundComponent,
    PrivateUserNextOfKinComponent,
    PrivatePatientAllergiesComponent,
    PrivatePatientVitalsComponent,
    PrivateUserContractComponent,
    PrivateSingleStaffComponent,
    PrivateStaffDetailsComponent,
    PrivateSingleCompanyComponent,
    PrivateCompanyDetailsComponent,
    PrivateUserFilesComponent,
    PrivateSingleInventoryComponent,
    PrivateInventoryDetailsComponent,
    PrivateInventoryItemsComponent,
    PrivateCompanyIntentoryItemsComponent,
    PrivateSingleAppointmentComponent,
    PrivateAppointmentTicketsComponent,
    PrivateTicketInventoryTemplateComponent,
    PrivateAppointmentsByCalendarComponent,
    PrivateAppointmentsByListComponent,
    PrivateSingleTicketComponent,
    PrivateAppointmentOverallDescriptionComponent,
    PrivateFilterTicketsComponent,
    PrivateFinanceTicketsComponent,
    PrivateFinanceContractsComponent,
    PrivateGeneralTicketOverviewComponent,
    PrivateMakeInitialPaymentComponent,
    PrivateCompletePaymentComponent,
    PrivateAddPaymentModalComponent,
    PrivateFinanceInventoryComponent,
    PrivatePatientContractComponent,
    PrivateCompanyContractComponent,
    PrivateFilterFinanceContractModalComponent,
    PrivateStaffRolesComponent,
    PrivatePatientChangeCompanyComponent,
    PrivateFinanceDebtsComponent,
    PrivateSingleFinanceDebtComponent,
    PrivateFinancePaidComponent,
    PrivateSingleFinancePaidComponent,
    PrivateFinancePaidItemComponent,
    PrivateFinancePaidItemChildComponent,
    PrivateEditTicketInventoryModalComponent,
    PrivateFinanceComponent,
    PrivateFilterFinanceDebtsModalComponent,
    PrivateDebtPaymentModalsComponent,
    PrivateSettingsComponent,
    PrivateBillingSettingComponent,
    PrivateGetInventoryModalComponent,
    PrivatePreviousTicketsComponent,
    PrivateTicketInventoriesComponent,
    PrivatePharmacyInventoryItemComponent,
    PrivateLabInventoryItemComponent,
    PrivateInventoryDependenciesComponent,
    AddInventoryDependenciesModalComponent,
    PrivateInventoryItemComponent,
    PrivateAddItemUsedModalComponent,
    PrivateSurgeryInventoryItemComponent,
    PrivateSaveSurgeryStaffDateModalComponent,
    PrivateAdmissionInventoryItemComponent,
    PrivateTicketInventoryItemStatusComponent,
    PrivateTicketInventoryItemDoctorPrescriptionComponent,
    PrivateTicketInventoryItemDepartmentNoteComponent,
    PrivateTicketInventoryItemAvailableQuantityComponent,
    PrivateTicketInventoryItemQuantityToGiveComponent,
    PrivateTicketInventoryItemPriceComponent,
    PrivateTicketInventoryItemStaffDateComponent,
    PrivateTicketInventoryItemResultsComponent,
    PrivateTicketInventoryItemAdmissionDatesComponent,
    PrivateAddEmergencyTicketsComponent,
    PrivateEmergencyTicketComponent,
    PrivateAdmissionsComponent,
    PrivateSingleAdmissionComponent,
    PrivateGeneralAdmissionTicketOverviewComponent,
    PrivatePatientInfoComponent,
    PrivateAdmissionSectionComponent,
    PrivateAdmissionPrecriptionsComponent,
    PrescriptionItemComponent,
    PrivateStaffInfoComponent,
    PrivateExecutePrescriptionModalComponent,
    LoggedPrescriptionsComponent,
    PrivateUpdateTicketInventoryComponent,
    PrivateTicketInventoryItemBasicInfoComponent,
    PrivateTicketInventoryItemAdditionalNoteComponent,
    PrivateBulkUploadInventoryComponent,
    PrivateAddBulkIvnItemComponent,
    PrivateUpdateQuantityComponent,
    PrivateInventoryLogsComponent,
    PrivateInventoryLogsItemComponent,
    PrivateSaveFinanceRecordComponent,
    PrivateUserPasswordComponent,
    PrivateAddUserContractComponent,
    AddTicketInventoryDebtorComponent,
    PrivateNursingInventoryItemComponent,
    PrivateTicketInventoryItemStaffObservationComponent,
  ],
  imports: [
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule {

  constructor(
    userService: UserService,
    eventBus: EventBusService
  ) {
    userService.getInternalStaff().then(x => {
      eventBus.emit({ key: EventBusActions.staff, value: x } as EventBusData<AppUser[]>);
    })
   }
}
