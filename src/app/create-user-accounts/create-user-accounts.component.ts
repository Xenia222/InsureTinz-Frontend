import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-accounts',
  templateUrl: './create-user-accounts.component.html',
  styleUrl: './create-user-accounts.component.css'
})
export class CreateUserAccountsComponent implements OnInit{

  userForm!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  positions = ['Manager', 'Developer', 'Designer', 'Analyst'];
  type = '';
  departments = ['HR', 'Engineering', 'Marketing', 'Sales'];
  roles: any[] = [];
  availablePermissions: any[] = [];
  clientMasterStatus: number = 1;
  pwdStatus: boolean = true

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
      this.userForm = this.fb.group({
        // photo: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        phone: ['',Validators.pattern(/^\d{8}$/)],
        position: ['', Validators.required],
        type: [''],
        policyId: ['', Validators.required],
        department: ['', Validators.required],
        // loginID: [{value: '', disabled: true}],
        // role: ['', Validators.required],
        // permissions: ['', Validators.required]
        roles: [[]],
        permissions: [[]]
    });
  }

  isInvalidAndTouched(controlName: string): boolean {
    const control =this.userForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  ngOnInit() {
    this.onChanges()
    this.userService.getUser().subscribe(
      data =>{
        if (data.user.user_type == "client master"){
          this.type = "client user"
        } else if(data.user.user_type == "client user"){
          this.type = "police user"
        }
      }
    )
    this.userService.getRoleAndPermission().subscribe(
      data => {
        console.log(data.roles)
        console.log(data.permissions)
        this.roles = data.roles
        this.userForm.get('roles')?.valueChanges.subscribe((selectedRoleIds: number[]) => {
          this.updateAvailablePermissions(selectedRoleIds);
        });

      },
      error => {
        console.log(error);
      }
      
    )
    
    // this.userForm.valueChanges.subscribe(values => {
    //   this.generateLoginID(values);
    // });
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

  updateAvailablePermissions(selectedRoleIds: number[]) {
    this.availablePermissions = this.roles
      .filter(role => selectedRoleIds.includes(role.id))
      .flatMap(role => role.permissions.map((permission: any) => ({
        ...permission,
        roleName: role.name
      })));

    // Mettre à jour les permissions sélectionnées
    const currentPermissions = this.userForm.get('permissions')?.value || [];
    const updatedPermissions = currentPermissions.filter((id: number) => 
      this.availablePermissions.some(p => p.id === id)
    );
    this.userForm.patchValue({ permissions: updatedPermissions }, { emitEvent: false });
  }
  // generateLoginID(values: { firstName: any; lastName: any; email: any; phone: any; }) {
  //   const { firstName, lastName, email, phone } = values;
  //   if (firstName && lastName && email && phone) {
  //     const loginID = `${firstName.charAt(0)}${lastName.charAt(0)}${email.split('@')[0]}${phone.slice(-4)}`.slice(0, 8);
  //     this.userForm.patchValue({ loginID }, { emitEvent: false });
  //   }
  // }

  
  onChanges(): void {
    this.userForm.get('type')?.valueChanges.subscribe(selectedValue => {
      if (selectedValue === 'client master') {
        this.clientMasterStatus = 0;
      } else {
        this.clientMasterStatus = 1;
      }
    });
  }

  generatePassword(): string {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  }

  onSubmit() {
    console.log("Current user type:", this.type);
    
    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
    }else{
    this.userService.addClientUser({
      'email': this.userForm.value.email,
      'police_id': this.userForm.value.policyId,
      'primary_contact_name': this.userForm.value.firstName,
      'secondary_contact_name': this.userForm.value.lastName,
      'primary_business_phone_number': this.userForm.value.phone,
      'primary_contact_title' :this.userForm.get('position')?.value,
      "country": this.userForm.get('department')?.value,
      "user_type":this.type,
      "roles": this.userForm.get('roles')?.value,
      "permissions": this.userForm.get('permissions')?.value,
      'password': this.userForm.value.password,
    }).subscribe(
      data => {
        console.log("Data receives",this.userForm.value.type)
        if (data.user){
        this.ngOnInit()
        this.router.navigate(['/list-users'])
        }else{
          for (const key in data.errorsList) {
              this.errorMessage = data.errorsList[key]
          }
          this.ngOnInit()
        }
      },
      error => {
        console.log(error)
      }
    )
    this.errorMessage = null;
    // Handle form submission
    console.log(this.userForm.value);
  }
    
  }
}
