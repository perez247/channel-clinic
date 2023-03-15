import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface IConfirmAction
{
  title: string;
  body: string;
  positiveBtn: string;
  positiveBtnCss: string;
  nagativeBtn: string;
  negativeBtnCss: string;
}

@Component({
  selector: 'app-shared-confirm-action-modal',
  templateUrl: './shared-confirm-action-modal.component.html',
  styleUrls: ['./shared-confirm-action-modal.component.scss']
})
export class SharedConfirmActionModalComponent implements OnInit {

  @Input() confirmData?: IConfirmAction;
  @Output() actionTaken = new EventEmitter<boolean>();

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  makeDecision(decision: boolean): void {
    this.actionTaken.emit(decision);
    this.activeModal.close();
  }

}
