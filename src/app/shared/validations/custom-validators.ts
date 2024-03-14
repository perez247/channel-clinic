import { AbstractControl, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';


/**
 * @description The purpose of custom validator is mainly to add custom message here rather than in the html
 * Along the line I found out more interesting things I could do with this
 * Simply visit the file to find out more
 */
export class CustomValidator {

  /**
   * @description — Validator that requires the control have a non-empty value.
   * @param visibleFieldName The field name to attached the error message to
   */
  static CustomRequired(visibleFieldName: string): ValidatorFn {
    return (c: AbstractControl) => {
      const result  = Validators.required(c);

      if (!result) {
          return null;
      }

      return {...result, message: `${visibleFieldName} is required`};
    };
  }

  /**
   * @description Validator that requires the control's value be true. This validator is commonly used for required checkboxes.
   * @param visibleFieldName The field name to attached the error message to
   */
  static CustomRequiredTrue(visibleFieldName: string): ValidatorFn {
    return (c: AbstractControl) => {
      const result  = Validators.requiredTrue(c);

      if (!result) {
          return null;
      }

      return {...result, message: `${visibleFieldName} must be selected`};
    };
  }

  /**
   * @description Validator that requires the control's value pass an email validation test.
   */
  static CustomEmail(): ValidatorFn {
    return (c: AbstractControl) => {
      const result  = Validators.email(c);

      if (!result) {
          return null;
      }

      return {...result, message: `Email is invalid`};
    };
  }

  /**
   * @description — Validator that requires the length of the control's value to be less than or equal to the provided maximum length.
   * This validator is also provided by default if you use the the HTML5 maxlength attribute.
   * @param maxLength The maximum length of the string
   */
  static MaxLength(maxLength: number): ValidatorFn {
    return (c: AbstractControl) => {
      const result  = Validators.maxLength(maxLength)(c);

      if (!result) {
          return null;
      }

      return {...result, message: `Not more than ${maxLength} characters`};
    };
  }

  /**
   * @description — Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.
   * This validator is also provided by default if you use the the HTML5 minlength attribute.
   * @param minLength The minimum length of the string
   */
  static MinLength(minLength: number): ValidatorFn {
    return (c: AbstractControl) => {
      const result  = Validators.minLength(minLength)(c);

      if (!result) {
          return null;
      }

      return {...result, message: `Not less than ${minLength} characters`};
    };
  }

  static CustomValidContactype(): ValidatorFn {
      return (c: AbstractControl) => {

        if (!c.parent) { return null; }

        const type = c?.parent?.get('contactType')?.value;

        if (type === 'emailAddress') {
          const result  = Validators.email(c);

          if (!result) {
              return null;
          }

          return {...result, message: `Email is invalid`};
        }

        return null;

      };
  }

  static CustomValidUsername(): ValidatorFn {
    return (c: AbstractControl) => {

      const userName = c.value;

      if (!userName) { return null; }

      const isValidUserName = /^[a-zA-Z0-9._]*$/.test(userName);

      if (isValidUserName) { return null; }

        return {message: `Only letters, numbers, periods and underscore`};

    };
}

  /**
   * @description Valids a string if it is a type of gender
   * @param fieldName The field name to attached the error message to
   */
  static CustomValidGender(fieldName: string): ValidatorFn {
    return (c: AbstractControl) => {

      if (!c.parent) { return null; }

      const gender = c?.parent?.get(fieldName)?.value;
      // console.log(gender);

      if (!gender) { return null; }

      if (gender === 'm' || gender === 'f' || gender === 'o')
        { return null; }

      return { message: `Gender is invalid`};
    };
  }

  /**
   * @description Checks if year is less than or equals current year
   * @param c abstract control
   */
  static ValidYearFounded(c: AbstractControl): ValidationErrors | null {
    const year: number = c.value;

    if (!year) { return null; }

    const currentYear = new Date().getFullYear();

    if (year <= currentYear) { return null; }

    return { InvalidYearFounded: true, message: `Must be less than ${currentYear}` };
  }

  /**
   * @description Checks if year is less than or equals current year
   * @param c abstract control
   */
  static isNumber(c: AbstractControl): ValidationErrors | null {
    const value: string = c.value;

    if (!value) { return null; }

    const isnum = /^\d+(\.\d+)?$/.test(value);

    if (isnum) { return null; }

    return { InvalidNumber: true, message: `${value} is not a number` };
  }

  /**
   * @description Valids a string if it is a type of gender
   * @param fieldName The field name to attached the error message to
   */
  static FileType(fileTypes: string[], errorMessage: string): ValidatorFn {
    return (c: AbstractControl) => {

      const value: any = c.value;
      // let objectURL = new File(value);
      console.log(c);
      if (!value) { return null; }

      // if (fileTypes.indexOf(value.type.toLowerCase()) > -1) { return null; }

      return { invalidFileType: true, message: errorMessage};
    };
  }

  static ValidaTime(c: AbstractControl): ValidationErrors | null {
    const time: string = c.value;

    if (!time) { return null; }

    const timeSplit = time.split(':');

    const hour = +timeSplit[0];

    if (hour < 0 || hour > 23) {
      return { invalidTime: true, message: 'Invalid Time' };
    }

    const mins = +timeSplit[1];

    if (mins < 0 || mins > 60) {
      return { invalidTime: true, message: 'Invalid Time' };
    }

    return null;
  }

  /**
   * @description Makes sure that date is greater than now
   */
  static DateGreaterThanNow(): ValidatorFn {
    return (c: AbstractControl) => {
      const time: string = c.value;

      if (!time) { return null; }

      let dateAsMoment = moment(new Date(time));

      if (!dateAsMoment.isValid()) {
        return { invalidTime: true, message: 'Invalid Time' };
      }

      if (dateAsMoment.isBefore(moment().add(-1, 'days'))) {
        return { invalidTime: true, message: `${dateAsMoment.format('Do/MMM/YYYY')} must be greater than now` };
      }

      return null;
    };
  }

    /**
   * @description — Validator that requires the control have a non-empty value.
   * @param pattern The field name to attached the error message to
   */
    static CustomPattern(pattern: string, error: string): ValidatorFn {
      return (c: AbstractControl) => {
        const result  = new FormControl(c.value, Validators.pattern(pattern));

        if (!result.errors) {
          return null;
        }

        return {message: `${error}`};
      };
    }

    static MustEqual(controlName: string, displayName: string): ValidatorFn {
      return (c: AbstractControl) => {
  
        if (!c.parent) { return null; }
  
        const valueToMatch: string = c?.parent?.get(controlName)?.value;
  
        if (!valueToMatch || valueToMatch.length == 0) {
          return null;
        }
  
        const value: string = c.value;
  
        if (!value || value.length == 0) {
          return null;
        }
  
        if (valueToMatch == value) {
          return null;
        }
        return { message: `Must equal ${displayName}` }
      };
    }

}
