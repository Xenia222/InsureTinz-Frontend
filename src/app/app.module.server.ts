import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    AppModule,
    HttpClientModule,
    ServerModule,
    NgbPaginationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
