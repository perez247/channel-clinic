import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-error-message',
  templateUrl: './custom-error-message.component.html',
  styleUrls: ['./custom-error-message.component.scss']
})
export class CustomErrorMessageComponent implements OnInit {

  // The form to manipulate
  // @Input() form: FormGroup;

  // // The form field to manipulate
  // @Input() field: string;;

  @Input() errorMessage: string = '';

  // Get the div element
  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  // ngDoCheck(): void {
  //   this.getError();
  // }

  // getError(): void {
  //   if (!this.form) { return; }

  //   if (!this.form.get(this.field)) { return; }

  //   if (
  //     (this.form.get(this.field)?.touched && this.form.get(this.field)?.invalid) ||
  //     (this.form.get(this.field)?.hasError('serverError'))
  //     ) {
  //       this.errorMessage = this.form.get(this.field)?.errors?.message;
  //       // console.log(this.errorMessage);
  //     } else {
  //       this.errorMessage = '';
  //     }
  // }

}
