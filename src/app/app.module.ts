import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgInputsMaterial } from '@douglas-serena/ng-inputs-material';
import {
  GuardModule,
  NgTranslateModule,
  NgUtilsModule,
} from '@douglas-serena/ng-utils';
import { environment } from 'src/environments/environment';
import { IConfig as IConfigUtils } from '@douglas-serena/ng-utils/lib/config/interfaces/config.interface';
import { IConfig as IConfigInputMaterial } from '@douglas-serena/ng-inputs-material/lib/types/interfaces/confing.interface';
import { HttpClientModule } from '@angular/common/http';

const configUtils: Partial<IConfigUtils> = {
  services: {
    translate: { language: { default: 'pt-BR' } },
  },
};

const configInputMaterial: Partial<IConfigInputMaterial> = {
  fields: {
    map: { keyMapBox: environment.TOKEN_MAPBOX },
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    GuardModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgTranslateModule,
    BrowserAnimationsModule,
    NgUtilsModule.forRoot(configUtils),
    NgInputsMaterial.forRoot(configInputMaterial),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
