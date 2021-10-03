import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
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
    private dialogRef: MatDialogRef<DialogUserComponent>
  ) {
    this.userSubscription = userService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnInit() {}

  logout() {
    this.dialogRef.close();
    this.userService.logout();
  }
}
