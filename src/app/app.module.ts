import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  GuardModule,
  NgTranslateModule,
  NgUtilsModule,
} from '@douglas-serena/ng-utils';
import { HttpClientModule } from '@angular/common/http';
import ptBr from 'dayjs/locale/pt-BR';
import dayjs from 'dayjs';
import { NgInputsMaterial } from '@douglas-serena/ng-inputs-material';
import { environment } from 'src/environments/environment';
dayjs.locale(ptBr);

NgUtilsModule.forRoot({
  services: {
    translate: { language: { default: 'pt-BR' } },
  },
});
NgInputsMaterial.forRoot({
  fields: {
    map: { keyMapBox: environment.TOKEN_MAPBOX },
  },
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    GuardModule,
    RouterModule,
    NgUtilsModule,
    AppRoutingModule,
    HttpClientModule,
    NgInputsMaterial,
    NgTranslateModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
