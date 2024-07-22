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
import { QuickCheckComponent } from './quick-check/quick-check.component';
import { VerificationHistoryComponent } from './verification-history/verification-history.component';
import { CreateUserAccountsComponent } from './create-user-accounts/create-user-accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreditPurchaseHistoryComponent } from './credit-purchase-history/credit-purchase-history.component';
import { CreateUserSucessComponent } from './create-user-sucess/create-user-sucess.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { DetailsUserComponent } from './details-user/details-user.component';




const routes: Routes = [

  { path: '', redirectTo: '/create-user-accounts', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-otp', component: LoginOtpComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-otp', component: SignupOtpComponent },
  { path: 'signup-sucess', component: SignupSuccessComponent },
  { path: 'dashboard-locked', component: DashboardLockedComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'purchase-credits', component: PurchaseCreditsComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'payment-credits-success', component: PaymentCreditsSuccessComponent },
  { path: 'quick-check', component: QuickCheckComponent },
  { path: 'verification-history', component: VerificationHistoryComponent },
  { path: 'create-user-accounts', component: CreateUserAccountsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'test', component: TestComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'structures-informations', component: StructuresInformationsComponent },
  { path: 'credit-purchase-history', component: CreditPurchaseHistoryComponent },
  { path: 'create-user-sucess', component: CreateUserSucessComponent },
  { path: 'who-we-are', component: WhoWeAreComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'details-user', component: DetailsUserComponent },
  







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
