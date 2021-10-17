import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventRouting } from './event.routing';
import {
  ButtonLoadingDirectiveModule,
  PipesModule,
} from '@douglas-serena/ng-utils';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { SwiperModule } from 'swiper/angular';
import { EventDetailsComponent } from './event-details/event-details.component';
import {
  ChipsModule,
  DateModule,
  InputModule,
  MapsModule,
  SelectModule,
  SwitchModule,
  TextAreaModule,
  TimeModule,
} from '@douglas-serena/ng-inputs-material';
import { EventFormImagesComponent } from './event-form/event-form-images/event-form-images.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogConfirmModule } from 'src/app/components/dialog/dialog-confirm/dialog-confirm.module';

@NgModule({
  imports: [
    PipesModule,
    DateModule,
    TimeModule,
    MapsModule,
    ChipsModule,
    InputModule,
    SwitchModule,
    SelectModule,
    CommonModule,
    EventRouting,
    SwiperModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    DragDropModule,
    TextAreaModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    DialogConfirmModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ButtonLoadingDirectiveModule,
  ],
  declarations: [
    EventComponent,
    EventFormComponent,
    EventDetailsComponent,
    EventFormImagesComponent,
  ],
})
export class EventModule {}
