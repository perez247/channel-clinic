import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppTicket, AppTicketTypes, TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-save-lab-rad-note',
  templateUrl: './private-save-lab-rad-note.component.html',
  styleUrls: ['./private-save-lab-rad-note.component.scss']
})
export class PrivateSaveLabRadNoteComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  type = AppTicketTypes;

  constructor() { }

  editorConfig: AngularEditorConfig = {};

  ngOnInit(): void {
    this.editorConfig = {
      editable: this.ticketInventory.concludedDate ? false : true,
      spellcheck: true,
      height: '25rem',
      minHeight: '5rem',
    };
  }

}
