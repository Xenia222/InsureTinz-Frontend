import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { saveAs } from 'file-saver';
import { FlagService } from '../_services/flag.service';

@Component({
  selector: 'app-structures-informations',
  templateUrl: './structures-informations.component.html',
  styleUrl: './structures-informations.component.css'
})
export class StructuresInformationsComponent implements OnInit{

  ngOnInit(): void {
    this.flagService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  getFlagUrl(code: string): string {
    return `https://flagcdn.com/w20/${code}.png`;
  }
  countries: any[] = [];

  SignupForm: FormGroup;
  errorMessage: string = ''; // Initialisation de errorMessage à une chaîne vide
  activeSection: number = 1;
  fileName: string = 'No file(s) selected';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,private flagService: FlagService,
     private storageService: StorageService, private authService: AuthService, private tokenService: TokenService) {
    this.SignupForm = this.fb.group({
      structureInfo: this.fb.group({
        agencyName: ['', Validators.required],
        agencyType: ['', Validators.required],
        country: ['Country 1', Validators.required],
        state: ['State 1', Validators.required],
        city: ['City 1', Validators.required],
        locgov: ['Local governement 1', Validators.required],
      }),
      contactInfo: this.fb.group({
        primaryContactName: ['', Validators.required],
        secondaryContactName: [''],
        primaryContactTitle: ['', Validators.required],
        primaryContactEmail: ['', [Validators.required, Validators.email]],
        secondaryContactEmail: ['', [Validators.email]],
        primaryPhoneNumber: ['', Validators.pattern(/^\d{8}$/)],
        secondaryPhoneNumber: ['', Validators.pattern(/^\d{8}$/)],
      }),
      terms: this.fb.array([
        this.fb.control(false, Validators.requiredTrue),
        this.fb.control(false, Validators.requiredTrue),
        this.fb.control(false, Validators.requiredTrue),
      ]),
      document: ['', Validators.required]

    });
  }

  get termsArray() {
    return this.SignupForm.get('terms') as FormArray;
  }

  get structureInfo() {
    return this.SignupForm.get('structureInfo') as FormGroup;
  }

  get contactInfo() {
    return this.SignupForm.get('contactInfo') as FormGroup;
  }

  get document() {
    return this.SignupForm.get('document');
  }

  // Helper method to check if a control is invalid and touched
  isInvalidAndTouched(controlName: string, formGroupName?: string): boolean {
    const control = formGroupName
      ? this.SignupForm.get(`${formGroupName}.${controlName}`)
      : this.SignupForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit() {
    if (this.SignupForm.invalid) {
      this.errorMessage = 'Please enter valid informations.';

    } else {
      this.errorMessage = ''; // Réinitialisation de errorMessage à une chaîne vide
      console.log(this.SignupForm.value);
      this.userService.putUser(
         {
          "email": this.storageService.getEmail(),
          "password":this.storageService.getPassword(),
          "agency_name": this.SignupForm.get('structureInfo.agencyName')?.value,
          "agency_type": this.SignupForm.get('structureInfo.agencyType')?.value,
          "country": this.SignupForm.get('structureInfo.country')?.value,
          "state": this.SignupForm.get('structureInfo.state')?.value,
          "city": this.SignupForm.get('structureInfo.city')?.value,
          'local_government' : this.SignupForm.get('structureInfo.locgov')?.value,
          'primary_contact_name' :this.SignupForm.get('contactInfo.primaryContactName')?.value,
          'secondary_contact_name' :this.SignupForm.get('contactInfo.secondaryContactName')?.value,
          'primary_contact_title' :this.SignupForm.get('contactInfo.primaryContactTitle')?.value,
          'primary_contact_business_email' :this.SignupForm.get('contactInfo.primaryContactEmail')?.value,
          'primary_business_phone_number' :this.SignupForm.get('contactInfo.primaryPhoneNumber')?.value,
          'secondary_business_phone_number' :this.SignupForm.get('contactInfo.secondaryPhoneNumber')?.value,
          'document' :this.fileName,
        }).subscribe(
          data => {
            console.log(data.detail);
            if (data.user){
              this.storageService.clearCredentials()
              this.router.navigate(['/signup-sucess']);
            }else{
              this.errorMessage = data.errorsList
            }
          }
        );
      // Redirection après une soumission réussie
    }
  }

  nextSection() {
    if (this.activeSection < 3) {
      this.activeSection++;
    }
  }

  previousSection() {
    if (this.activeSection > 1) {
      this.activeSection--;
    }
  }

  onDropZoneClick(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const dropZone = document.getElementById('drop-zone');
    dropZone?.classList.add('dragover');
  }

  onDragLeave(): void {
    const dropZone = document.getElementById('drop-zone');
    dropZone?.classList.remove('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const dropZone = document.getElementById('drop-zone');
    dropZone?.classList.remove('dragover');
    const files = event.dataTransfer?.files;
    if (files?.length) {
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      fileInput.files = files;
      this.handleFiles(files);
    }
  }

  onFileChange(event: Event): void {
    const file = this.SignupForm.get('document')?.value;
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (file) {
      saveAs(file, this.fileName);
    }
    if (files?.length) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList): void {
    if (files.length > 0) {
      this.fileName = files[0].name;
    } else {
      this.fileName = 'No file(s) selected';
    }
  }
}
