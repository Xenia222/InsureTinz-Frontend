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
  selectedRoleIds: number[] = [];
  selectedRoles: any[] = []; // Déclaration de selectedRoles
  rolePermissions: any[] = [];
  selectedPermissions: number[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getRoleAndPermission().subscribe(
      data => {
        console.log(data.roles)
        console.log(data.permissions)
        this.roles = data.roles
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

  onRolesChange() {
    console.log('Selected Role IDs:', this.selectedRoleIds);
    this.selectedRoles = this.roles.filter(role => 
      { 
        this.selectedRoleIds.includes(role.id)

      });
    this.updateRolePermissions();
  }

  updateRolePermissions(): void {
    this.rolePermissions = [];
    this.selectedPermissions = [];

    this.selectedRoles.forEach(role => {
      if (role.permissions) { 
        this.rolePermissions = [
          ...this.rolePermissions,
          ...role.permissions
        ];
      }
    });

    // Éliminer les doublons
    this.rolePermissions = Array.from(new Set(this.rolePermissions.map(permission => permission.id)))
      .map(id => this.rolePermissions.find(permission => permission.id === id));

    // Mettez à jour les permissions sélectionnées
    this.selectedPermissions = this.rolePermissions.map(permission => permission.id);

    // Pour débogage
    console.log('Selected Roles:', this.selectedRoles);
    console.log('Role Permissions:', this.rolePermissions);
    console.log('Selected Permissions:', this.selectedPermissions);
  }

  onPermissionToggle(permissionId: number): void {
    const index = this.selectedPermissions.indexOf(permissionId);
    if (index > -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(permissionId);
    }
  }

  // generateLoginID(values: { firstName: any; lastName: any; email: any; phone: any; }) {
  //   const { firstName, lastName, email, phone } = values;
  //   if (firstName && lastName && email && phone) {
  //     const loginID = `${firstName.charAt(0)}${lastName.charAt(0)}${email.split('@')[0]}${phone.slice(-4)}`.slice(0, 8);
  //     this.userForm.patchValue({ loginID }, { emitEvent: false });
  //   }
  // }

  onPermissionChange(options: HTMLOptionsCollection): void {
    this.selectedPermissions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        this.selectedPermissions.push(Number(options[i].value));
      }
    }
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
      "permissions": this.selectedPermissions,
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
