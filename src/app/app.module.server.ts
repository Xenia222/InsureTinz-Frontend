import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    HttpClientModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
