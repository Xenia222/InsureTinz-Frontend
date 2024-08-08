import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { PermissionService } from '../_services/permission.service';
import { ContentService } from '../_services/content.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string | null = null;
  roles: any;
  contents: any 
  
  
  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService,
    private tokenService: TokenService,private storageService: StorageService, 
    private permissionService: PermissionService,private userService:UserService,
    private contentService:ContentService,
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  
  ngOnInit(): void { 
    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
        // this.url = data.contents.header_img
        // this.setCSSVariable('--url', this.url);
        console.log(this.contents);
        
      }
    )
  }

  onSubmit(){
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
    } else {
      this.errorMessage = null;
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        data => {
          console.log(data)
          if (data.token){
            this.storageService.saveCredentials(data.user.id,this.loginForm.value.email,this.loginForm.value.password)
            this.tokenService.saveToken(data.token)
            this.userService.getCurrentUserRole().subscribe(
              data => {
                this.roles = data.roles
                this.roles.push(...data.permissions)
                console.log("role and right",data.roles)
                this.permissionService.setPermissions(this.roles);
              },
              err => {
                console.log(err)
              }
            )
            this.router.navigate(['login-otp'])
          }else{
            this.errorMessage = data.message
          }
        })
    }
    
  }

}

