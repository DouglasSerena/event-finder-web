import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogResolverComponent } from 'src/app/components/dialog/dialog-resolver/dialog-resolver.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventComponent } from './event.component';

const routes: Routes = [
  {
    path: '',
    component: DialogResolverComponent,
    data: {
      dialog: EventComponent,
      mobile: true,
      config: {
        maxWidth: '600px',
        width: '100%',
      },
    },
  },
  {
    path: ':eventId',
    component: DialogResolverComponent,
    data: {
      dialog: EventDetailsComponent,
      param: 'eventId',
      mobile: true,
      config: {
        maxWidth: '600px',
        panelClass: ['dialog-event', 'dialog-mobile'],
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRouting {}
