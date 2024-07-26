import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { SignupComponent } from './signup/signup.component';
import { SignupOtpComponent } from './signup-otp/signup-otp.component';
import { StructuresInformationsComponent } from './structures-informations/structures-informations.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { DashboardLockedComponent } from './dashboard-locked/dashboard-locked.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreditsComponent } from './credits/credits.component';
import { PurchaseCreditsComponent } from './purchase-credits/purchase-credits.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentCreditsSuccessComponent } from './payment-credits-success/payment-credits-success.component';
import { PaymentCompletionComponent } from './payment-completion/payment-completion.component';
import { QuickCheckComponent } from './quick-check/quick-check.component';
import { VerificationHistoryComponent } from './verification-history/verification-history.component';
import { CreateUserAccountsComponent } from './create-user-accounts/create-user-accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { authGuard } from './_helper/auth.guard';
import { permissionGuard } from './_helper/permission.guard';
import { ErrorComponent } from './_utils/error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { CreditPurchaseHistoryComponent } from './credit-purchase-history/credit-purchase-history.component';
import { CreateUserSucessComponent } from './create-user-sucess/create-user-sucess.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { WhoCanUseComponent } from './who-can-use/who-can-use.component';


import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordOtpComponent } from './reset-password-otp/reset-password-otp.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { NoaccessComponent } from './noaccess/noaccess.component';
import { routeGuard } from './_helper/route.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetForgotPasswordComponent } from './reset-forgot-password/reset-forgot-password.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { statusGuard } from './_helper/status.guard';
import { LockedPageComponent } from './locked-page/locked-page.component';


const routes: Routes = [

  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'login-otp', component: LoginOtpComponent 
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-otp', component: SignupOtpComponent },
  { path: 'signup-sucess', component: SignupSuccessComponent },
  { path: 'dashboard-locked', component: LockedPageComponent , 
    canActivate: [authGuard]
  },
  { path: 'dashboard', component: DashboardComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_dashboard'] }
  },
  { path: 'credits', component: CreditsComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_credit_management'] }

  },
  { path: 'purchase-credits', component: PurchaseCreditsComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_credit_management'] }
  },
  { path: 'payment-methods', component: PaymentMethodsComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_credit_management'] }

  },
  { path: 'payment-credits-success', component: PaymentCreditsSuccessComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_credit_management'] }
  },
  { path: 'payment-completion', component: PaymentCompletionComponent , canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_credit_management'] }

  },
  { path: 'quick-check', component: QuickCheckComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_check_management'] }
  },
  { path: 'verification-history', component: VerificationHistoryComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_check_history_management'] }
  },
  { path: 'create-user-accounts', component: CreateUserAccountsComponent , 
    canActivate: [authGuard,permissionGuard,statusGuard],
    data: { requiredPermission: ['client_master', 'client_users'] }
  },
  { path: 'profile', component: ProfileComponent , 
    canActivate: [authGuard,permissionGuard],
    data: { requiredPermission: ['client_master', 'client_profile'] }
  },
  { path: 'test', component: TestComponent , 
    canActivate: [authGuard,permissionGuard],
    data: { requiredPermission: ['client_master', 'client_dashboard'] }
  },
  { path: 'list-users', component: ListUsersComponent , 
    canActivate: [authGuard,permissionGuard],
    data: { requiredPermission: ['client_master', 'client_dashboard'] }
  },
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'reset-forgot-password', component: ResetForgotPasswordComponent},
  { path: 'no-access', component: NoaccessComponent },
  { path: 'structures-informations', component: StructuresInformationsComponent },
  { path: 'credit-purchase-history', component: CreditPurchaseHistoryComponent },
  { path: 'create-user-sucess', component: CreateUserSucessComponent },
  { path: 'who-we-are', component: WhoWeAreComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'who-can-use', component: WhoCanUseComponent },
  { path: 'details-user/:id', component: DetailsUserComponent },
  { path: 'access-denied', component: AccessDeniedComponent },

  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-otp', component: ResetPasswordOtpComponent },
  { path: 'logout', component: LogoutComponent , canActivate: [authGuard]},
  { path:'**', component: ErrorComponent  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
