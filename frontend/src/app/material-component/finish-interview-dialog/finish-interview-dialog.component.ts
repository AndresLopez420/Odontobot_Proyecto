import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-finish-interview-dialog',
  templateUrl: './finish-interview-dialog.component.html',
  styleUrls: ['./finish-interview-dialog.component.css']
})
export class FinishInterviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FinishInterviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { score: number; requestedFields: string[] }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
