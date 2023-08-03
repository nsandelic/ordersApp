import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "./local-storage/local-storage.service";

@NgModule({
  declarations: [],
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    LocalStorageService,
    // ApiService,
    // JwtService,
    // AuthGuard,
    // AuthRoleGuard,
    // httpInterceptorProviders,
    // NotificationService,
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
