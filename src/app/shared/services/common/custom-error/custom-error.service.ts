import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppServerError } from 'src/app/shared/core/models/jwtToken';
import { CustomToastService } from '../custom-toast/custom-toast.service';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorService {

  constructor(private notify: CustomToastService) { }


  /**
   * @description get the errors sent from the server and place them in the right control of the form
   * @param error Error from the server
   * @param reactiveForm Form to place error message
   */
   setFormErrors(error: any, reactiveForm?: FormGroup): void {

    // Get the error part
    const appError = error.error as AppServerError;

    // console.log(appError);

    // if (appError.error) {
    //   if (appError.error.trim().length > 0) { this.notify.error(appError.error); }
    //   else { this.notify.error('An unknown error occurred, please try again later'); }
    //  }

    // Check if there are actually errors
    if (!appError?.errors || Object.entries(appError?.errors).length === 0) { return; }

    // Return the updated form
    this.populateForm(appError, reactiveForm);
  }

  private populateForm(appError: AppServerError, reactiveForm?: FormGroup): FormGroup {
    // For developers only to see error that dont follow the normal convention
    const developerError: string[] = [];

    // Get the first onces and place in the form control
    // Object.keys(appError.errors).forEach((props: string) => {
      appError.errors.forEach((props: {fieldName: string, fieldErrors: string[]}) => {

      // Check if props actually exists in form all neccessaries should be include
      if (reactiveForm && props.fieldName in reactiveForm.controls) {
        reactiveForm.controls[props.fieldName].setErrors( { message: props.fieldErrors[0], serverError: true  } );
      } else {
        // Store the last one in the variable only for developers to see
        developerError.push(props.fieldErrors[0]);
      }

    });

    if (developerError.length > 0) {
      // console.log(developerError[0][0]);
      this.notify.error(developerError[0]);
    }

    // Make a notification if in development stage
    this.notifyDevelopersOnly(appError, developerError);

    return reactiveForm ?? {} as FormGroup;
  }

  private notifyDevelopersOnly(appError: AppServerError, developerError: any[]): void {
    if (appError.environment !== AppConstants.EnvironmentFromServer.production) {
      // this.notify.error('Please check more errors in console: for developers only');
      console.log(developerError);
      // console.log(appError);
    }
  }

  /**
   * @description validates all the form fields manually
   */
   validateAllFields(formGroup: FormGroup): void {

    Object.keys(formGroup.controls).forEach(field => {

        const control = formGroup.get(field);

        if (control instanceof FormControl) {

            control.markAsTouched({ onlySelf: true });

        } else if (control instanceof FormGroup) {

            this.validateAllFields(control);
        }
    });
  }

  getError(form: FormGroup, field: string): string {
    if (!form) { return ''; }

    if (!form.get(field)) { return ''; }

    if (
      (form.get(field)?.touched && form.get(field)?.invalid) ||
      (form.get(field)?.hasError('serverError'))
      ) {
        return form.get(field)?.errors?.['message'];
        // console.log(errorMessage);
      } else {
        return '';
      }
  }
}
