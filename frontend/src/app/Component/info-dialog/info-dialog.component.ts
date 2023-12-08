import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogAlert } from '../display-workout/display-workout.component';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']

})
export class InfoDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogAlert>) { }
  public stringa_info: string
}
