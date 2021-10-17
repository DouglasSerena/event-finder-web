import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fullscreenDialog } from '@douglas-serena/ng-utils';
import { Global, handleTry } from '@douglas-serena/utils';
import { DialogConfirmComponent } from 'src/app/components/dialog/dialog-confirm/dialog-confirm.component';
import { IEvent } from 'src/app/interfaces/event.interface';
import { EventService } from 'src/app/services/event.service';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
  selector: 'ef-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
  public myEvents: IEvent[] = [];
  public loading = true;

  public get isMobile() {
    return Global.isMobile;
  }

  constructor(
    private router: Router,
    private dialogService: MatDialog,
    private eventService: EventService,
    private snackbarService: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.getMyEvent();
  }

  public async getMyEvent() {
    this.loading = true;
    const [data] = await handleTry(this.eventService.getMy());
    if (data) {
      this.myEvents = data.data;
    } else {
    }
    this.loading = false;
  }

  public async openEventDelete(eventId: string) {
    const dialogRef = this.dialogService.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(async (confirm) => {
      if (confirm) {
        const [_, error] = await handleTry(this.eventService.delete(eventId));
        if (error) {
          this.snackbarService.open('Não foi possivel deletar o evento', '', {
            panelClass: 'mat-danger',
          });
        } else {
          await this.getMyEvent();
        }
      }
    });
  }

  public openEventForm(eventId?: string) {
    const config: MatDialogConfig<any> = {
      maxWidth: '600px',
      width: '100%',
      data: eventId,
    };
    if (Global.isMobile) {
      Object.assign(config, fullscreenDialog);
    }
    const dialogRef = this.dialogService.open(EventFormComponent, config);
    dialogRef.afterClosed().subscribe(async () => {
      await this.getMyEvent();
    });
  }

  ngOnDestroy() {
    this.router.navigate(['/']);
  }
}
