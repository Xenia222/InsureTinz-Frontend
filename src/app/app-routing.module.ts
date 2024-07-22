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
import { ErrorComponent } from './_utils/error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { CreditPurchaseHistoryComponent } from './credit-purchase-history/credit-purchase-history.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordOtpComponent } from './reset-password-otp/reset-password-otp.component';


const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'login-otp', component: LoginOtpComponent , canActivate: [authGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'signup-otp', component: SignupOtpComponent },
  { path: 'signup-sucess', component: SignupSuccessComponent },
  { path: 'dashboard-locked', component: DashboardLockedComponent , canActivate: [authGuard]},
  { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard]},
  { path: 'credits', component: CreditsComponent , canActivate: [authGuard]},
  { path: 'purchase-credits', component: PurchaseCreditsComponent , canActivate: [authGuard]},
  { path: 'payment-methods', component: PaymentMethodsComponent , canActivate: [authGuard]},
  { path: 'payment-credits-success', component: PaymentCreditsSuccessComponent , canActivate: [authGuard]},
  { path: 'payment-completion', component: PaymentCompletionComponent , canActivate: [authGuard]},
  { path: 'quick-check', component: QuickCheckComponent , canActivate: [authGuard]},
  { path: 'verification-history', component: VerificationHistoryComponent , canActivate: [authGuard]},
  { path: 'create-user-accounts', component: CreateUserAccountsComponent , canActivate: [authGuard]},
  { path: 'profile', component: ProfileComponent , canActivate: [authGuard]},
  { path: 'test', component: TestComponent , canActivate: [authGuard]},
  { path: 'list-users', component: ListUsersComponent , canActivate: [authGuard]},
  { path: 'structures-informations', component: StructuresInformationsComponent },
  { path: 'credit-purchase-history', component: CreditPurchaseHistoryComponent },
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
