import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  GuardModule,
  NgTranslateModule,
  NgUtilsConfig,
} from '@douglas-serena/ng-utils';
import { HttpClientModule } from '@angular/common/http';
import ptBr from 'dayjs/locale/pt-BR';
import dayjs from 'dayjs';
import { NgInputMaterialConfig } from '@douglas-serena/ng-inputs-material';
import { environment } from 'src/environments/environment';
dayjs.locale(ptBr);

NgUtilsConfig.set({
  services: {
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
    GuardModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgTranslateModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
