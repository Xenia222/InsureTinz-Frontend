import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.css'
})
export class LogoutModalComponent {
  momoForm: FormGroup;

  constructor(private router: Router,
    public dialogRef: MatDialogRef<LogoutModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.momoForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  onSubmit(): void {
    this.onClose()
    this.router.navigate(['/logout']);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
