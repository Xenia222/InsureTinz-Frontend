import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';
import { error } from 'console';
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
  id:any

  positions = ['Police manager', 'Officier', 'Commandant'];
  type = '';
  departments = ["Alibori","Atakora", "Atlantique", "Borgou", "Collines", "Donga", "Kouffo", "Littoral", "Mono", "Ouémé", "Plateau","Zou"];
  roles: any[] = [];
  availablePermissions: any[] = [];
  clientMasterStatus: number = 1;
  pwdStatus: boolean = true
  user_type: any;
  user: any;

  form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    position: '',
    department: ''
  }

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  isInvalidAndTouched(controlName: string): boolean {
    const control =this.userForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  ngOnInit() {
    this.onChanges()
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    });

    this.userService.getUser().subscribe(
      data => {
        this.user_type = data.user.user_type
      }
    )

    this.userService.getClientUser(this.id).subscribe(
      data =>{
        this.form.firstName = data.client_details.primary_contact_name
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

    const currentPermissions = this.userForm.get('permissions')?.value || [];
    const updatedPermissions = currentPermissions.filter((id: number) => 
      this.availablePermissions.some(p => p.id === id)
    );
    this.userForm.patchValue({ permissions: updatedPermissions }, { emitEvent: false });
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
        console.log("Data receives",this.userForm.value.department)
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
    console.log(this.userForm.value);
  }
    
  }
}
