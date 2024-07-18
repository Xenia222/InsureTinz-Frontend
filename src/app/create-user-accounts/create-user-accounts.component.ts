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
  departments = ['HR', 'Engineering', 'Marketing', 'Sales'];
  roles : any;
  permissions : any;
  filteredPermissions: any;
  rolesPermissionsSectionVisible = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getRoleAndPermission().subscribe(
      data => {
        console.log(data.roles)
        console.log(data.permissions)
        this.roles = data.roles
        this.permissions = data.permissions
      },
      error => {
        console.log(error);
      }
      
    )
    this.userForm = this.formBuilder.group({
      // photo: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      // loginID: [{value: '', disabled: true}],
      // role: ['', Validators.required],
      // permissions: ['', Validators.required]
    });

    // this.userForm.valueChanges.subscribe(values => {
    //   this.generateLoginID(values);
    // });
  }

  get f() {
    return this.userForm.controls;
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.userForm.patchValue({
        photo: file
      });
    }
  }

  // generateLoginID(values: { firstName: any; lastName: any; email: any; phone: any; }) {
  //   const { firstName, lastName, email, phone } = values;
  //   if (firstName && lastName && email && phone) {
  //     const loginID = `${firstName.charAt(0)}${lastName.charAt(0)}${email.split('@')[0]}${phone.slice(-4)}`.slice(0, 8);
  //     this.userForm.patchValue({ loginID }, { emitEvent: false });
  //   }
  // }

  onRolesChange(event: Event) {
    const selectedRoles = Array.from((event.target as HTMLSelectElement).selectedOptions).map(
      (option: any) => option.value
    );
    this.filteredPermissions = [];
    this.roles
      .forEach((role: { permissions: any[]; }) => {
        role.permissions.forEach((permission: { id: any; }) => {
          if (!this.filteredPermissions.some((p: { id: any; }) => p.id === permission.id)) {
            this.filteredPermissions.push(permission);
          }
        });
      });
  }

  onSubmit() {

    this.userService.addClientUser({
      'email': this.userForm.value.email,
      'primary_contact_name': this.userForm.value.firstName,
      'secondary_contact_name': this.userForm.value.lastName,
      'primary_business_phone_number': this.userForm.value.phone,
      'primary_contact_title' :this.userForm.value.position,
      "country": this.userForm.value.department,
      "roles": this.roles,
      "permissions": this.permissions,
      'password': this.userForm.value.password,
    }).subscribe(
      data => {
        console.log(data)
        this.ngOnInit()
      },
      error => {
        console.log(error)
      }
    )
    this.submitted = true;
    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }
    this.errorMessage = null;
    // Handle form submission
    console.log(this.userForm.value);
  }
}
