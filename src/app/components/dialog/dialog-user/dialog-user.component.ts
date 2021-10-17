import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { fullscreenDialog } from '@douglas-serena/ng-utils';
import { Global } from '@douglas-serena/utils';
import { Subscription } from 'rxjs';
import { EventFormComponent } from 'src/app/pages/event/event-form/event-form.component';
import { IUser } from 'src/app/stores/user/interfaces/user.interface';
import { UserService } from 'src/app/stores/user/user.service';

@Component({
  selector: 'ef-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
})
export class DialogUserComponent implements OnInit {
  user!: IUser;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private dialogService: MatDialog,
    private dialogRef: MatDialogRef<DialogUserComponent>
  ) {
    this.userSubscription = userService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnInit() {}

  public openEventForm() {
    const config: MatDialogConfig<any> = {
      maxWidth: '600px',
      width: '100%',
    };
    if (Global.isMobile) {
      Object.assign(config, {
        ...fullscreenDialog,
        panelClass: 'dialog-mobile',
      });
    }
    this.dialogService.open(EventFormComponent, config);
  }

  logout() {
    this.dialogRef.close();
    this.userService.logout();
  }
}
