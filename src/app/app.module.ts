import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaymentCompletionComponent } from './payment-completion/payment-completion.component';
import { CreditPurchaseHistoryComponent } from './credit-purchase-history/credit-purchase-history.component';
import { tokenInterceptor } from './_helper/token.interceptor';
import { MtnMomoModalComponent } from './mtn-momo-modal/mtn-momo-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { CreateUserSucessComponent } from './create-user-sucess/create-user-sucess.component';
import { DetailsUserComponent } from './details-user/details-user.component';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    LoginOtpComponent,
    SignupComponent,
    SignupOtpComponent,
    StructuresInformationsComponent,
    SignupSuccessComponent,
    DashboardLockedComponent,
    DashboardComponent,
    CreditsComponent,
    PurchaseCreditsComponent,
    PaymentMethodsComponent,
    PaymentCreditsSuccessComponent,
    QuickCheckComponent,
    VerificationHistoryComponent,
    CreateUserAccountsComponent,
    ProfileComponent,
    TestComponent,
    ListUsersComponent,
    SidebarComponent,
    NavbarComponent,
    PaymentCompletionComponent,
    CreditPurchaseHistoryComponent,
    MtnMomoModalComponent,
    ResetPasswordComponent,
    LogoutModalComponent,
    CreateUserSucessComponent,
    DetailsUserComponent,
    WhoWeAreComponent,
    HowItWorksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
    CarouselModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
