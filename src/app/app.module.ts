import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthJwtInterceptor,
  GuardModule,
  HttpModule,
  NgTranslateModule,
  NgUtilsConfig,
} from '@douglas-serena/ng-utils';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgInputMaterialConfig } from '@douglas-serena/ng-inputs-material';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './stores/user/user.module';

NgUtilsConfig.set({
  services: {
    auth: { redirectLogout: ['/landing'] },
    http: { apiUrl: environment.URL_API },
    translate: { language: { default: 'pt-BR' } },
  },
});
NgInputMaterialConfig.set({
  fields: {
    map: { keyMapBox: environment.TOKEN_MAPBOX },
  },
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRouting,
    UserModule,
    HttpModule,
    GuardModule,
    RouterModule,
    HttpClientModule,
    NgTranslateModule,
    StoreModule.forRoot({}),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthJwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
