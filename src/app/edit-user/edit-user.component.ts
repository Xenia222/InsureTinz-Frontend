import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{

  userForm!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  positions = ['Police manager', 'Officier', 'Commandant'];
  type = '';
  departments = ["Alibori","Atakora", "Atlantique", "Borgou", "Collines", "Donga", "Kouffo", "Littoral", "Mono", "Ouémé", "Plateau","Zou"];
  roles: any[] = [];
  availablePermissions: any[] = [];
  clientMasterStatus: number = 1;
  pwdStatus: boolean = true
  id: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {
      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        phone: ['',Validators.pattern(/^\d{8}$/)],
        position: ['', Validators.required],
        type: [''],
        policyId: ['', Validators.required],
        department: ['', Validators.required]
    });
  }

  isInvalidAndTouched(controlName: string): boolean {
    const control =this.userForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    });
    this.onChanges()
    this.userService.getClientUser(this.id).subscribe(
      data =>{
        this.userForm.patchValue({
          firstName: data.client_details.primary_contact_name,
          lastName: data.client_details.secondary_contact_name,
          email: data.client_details.email,
          password: data.client_details.password,
          phone: data.client_details.primary_business_phone_number,
          position: data.client_details.primary_contact_title,
          type: data.client_details.user_type,
          policyId: data.client_details.police_id,
          department: data.client_details.country,
        })
      }
    )
    this.userService.getUser().subscribe(
      data =>{
        if (data.user.user_type == "client master"){
          this.type = "client user"
        } else if(data.user.user_type == "client user"){
          this.type = "police user"
        }
      }
    )
  }

  toggleOPasswordVisibility() {
    const passwordField: any = document.getElementById('password');
    const toggleIcon: any = document.getElementById('toggleIcon');

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  }

  get f() {
    return this.userForm.controls;
  }
  
  onChanges(): void {
    this.userForm.get('type')?.valueChanges.subscribe(selectedValue => {
      if (selectedValue === 'client master') {
        this.clientMasterStatus = 0;
      } else {
        this.clientMasterStatus = 1;
      }
    });
  }

  onSubmit() {
    console.log("Current user type:", this.type);
    
    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
    }else{
    this.userService.putClientUser({
      'email': this.userForm.value.email,
      'police_id': this.userForm.value.policyId,
      'primary_contact_name': this.userForm.value.firstName,
      'secondary_contact_name': this.userForm.value.lastName,
      'primary_business_phone_number': this.userForm.value.phone,
      'primary_contact_title' :this.userForm.get('position')?.value,
      "country": this.userForm.get('department')?.value,
      "user_type":this.type,
      'password': this.userForm.value.password,
    }, this.id).subscribe(
      data => {
        console.log("Data receives",this.userForm.value.department)
        this.ngOnInit()
        this.router.navigate(['/details-user/'+this.id])
      },
      error => {
        this.errorMessage = error.error.message
        console.log(error)
      }
    )
    this.errorMessage = null;
    console.log(this.userForm.value);
  }
    
  }
}
