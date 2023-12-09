import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent {
  constructor(public dialogRef: MatDialogRef<DialogAlertComponent>) { }
  public stringa_alert: string
}
