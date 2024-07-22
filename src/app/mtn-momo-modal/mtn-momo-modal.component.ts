import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mtn-momo-modal',
  templateUrl: './mtn-momo-modal.component.html',
  styleUrls: ['./mtn-momo-modal.component.css']
})
export class MtnMomoModalComponent {
  momoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MtnMomoModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.momoForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  onSubmit(): void {
    if (this.momoForm.valid) {
      const phoneNumber = this.momoForm.value.phoneNumber;
      console.log('Phone Number submitted:', phoneNumber);
      // Handle the phone number submission logic here
      this.dialogRef.close(phoneNumber);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
