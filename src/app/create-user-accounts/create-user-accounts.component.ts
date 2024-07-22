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
  roles: any[] = [];
  availablePermissions: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
      this.userForm = this.fb.group({
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
        roles: [[]],
        permissions: [[]]
    });
  }

  ngOnInit() {
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


  onSubmit() {

    this.userService.addClientUser({
      'email': this.userForm.value.email,
      'primary_contact_name': this.userForm.value.firstName,
      'secondary_contact_name': this.userForm.value.lastName,
      'primary_business_phone_number': this.userForm.value.phone,
      'primary_contact_title' :this.userForm.value.position,
      "country": this.userForm.value.department,
      "roles": this.roles,
      "permissions": this.userForm.get('permissions')?.value,
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
