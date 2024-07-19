import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';
import { error } from 'console';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

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
  form: FormGroup;
  roles: any[] = [];
  permissions: any[] = [];
  filteredPermissions: any;
  rolesPermissionsSectionVisible = false;
  selectedRolePermissions: { [key: number]: any[] } = {};

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.formBuilder.group({
      roles: [[], []], 
      permissions: [[], []]
    });
  }

  ngOnInit() {
    this.userService.getRoleAndPermission().subscribe(
      data => {
        console.log("Roles permissions",data.roles)
        this.roles = data.roles
        this.permissions = data.roles.permissions
      },
      error => {
        console.log(error);
      }
      
    )
    // this.userForm = this.formBuilder.group({
    //   // photo: [''],
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required]],
    //   phone: ['', Validators.required],
    //   position: ['', Validators.required],
    //   department: ['', Validators.required],
    //   // loginID: [{value: '', disabled: true}],
    //   // role: ['', Validators.required],
    //   // permissions: ['', Validators.required]
    // });

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

  onRolesChange() {
    const selectedRoleIds = this.form.get('roles')?.value;
    if (selectedRoleIds.length === 0) return;

    // Fetch permissions based on selected roles
    const permissionsByRole = selectedRoleIds.reduce((acc: { [x: string]: any[];[x: number]: any[]; }, roleId: number) => {
      this.getPermissionsByRole(roleId).subscribe(permissions => {
        acc[roleId] = permissions;
        this.selectedRolePermissions = acc;
        this.updatePermissionsFormArray();
      });
      return acc;
    }, {} as { [key: number]: any[] });
  }

  private updatePermissionsFormArray() {
    const control = this.form.get('permissions') as FormArray;
    control.clear();
    this.permissions.forEach(() => control.push(this.formBuilder.control(false)));
  }

  getPermissionsByRole(roleId: number): Observable<any[]> {
    const permissionIds = this.permissions[roleId] || [];
    const rolePermissions = this.permissions.filter(p => permissionIds.includes(p.id));
    return of(rolePermissions);
  }

  onSubmit() {

    const selectedRoleIds = this.form.get('roles')?.value;
    const selectedPermissionIds = this.form.get('permissions')?.value
      .map((checked: boolean, i: number) => checked ? this.permissions[i].id : null)
      .filter((id: number | null) => id !== null) as number[];


    this.userService.addClientUser({
      'email': this.userForm.value.email,
      'user_type': "client user",
      'primary_contact_name': this.userForm.value.firstName,
      'secondary_contact_name': this.userForm.value.lastName,
      'primary_business_phone_number': this.userForm.value.phone,
      'primary_contact_title' :this.userForm.value.position,
      "country": this.userForm.value.department,
      "roles": selectedRoleIds,
      "permissions":  selectedPermissionIds,
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
