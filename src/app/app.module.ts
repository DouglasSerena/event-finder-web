import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthJwtInterceptor,
  ConfigUtils,
  GuardModule,
  HttpModule,
  NgTranslateModule,
} from '@douglas-serena/ng-utils';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSpinner } from '@angular/material/progress-spinner';
import { NgInputMaterialConfig } from '@douglas-serena/ng-inputs-material';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './stores/user/user.module';
import { ContainerModule } from './container/container.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryModule } from './stores/category/category.module';

ConfigUtils.set({
  directives: { buttonLoading: { componentLoading: MatSpinner as any } },
  services: {
    auth: { redirectLogout: ['/'] },
    http: { apiUrl: environment.URL_API },
    translate: { language: { default: 'pt-BR' } },
  },
});
NgInputMaterialConfig.set({
  fields: {
    maps: { keyMapBox: environment.TOKEN_MAPBOX },
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
    CategoryModule,
    MatDialogModule,
    ContainerModule,
    HttpClientModule,
    NgTranslateModule,
    MatNativeDateModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: false,
          strictActionSerializability: false,
          strictStateImmutability: false,
          strictStateSerializability: false,
        },
      }
    ),
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
