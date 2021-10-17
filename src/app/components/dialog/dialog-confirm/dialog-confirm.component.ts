import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDialogConfirm {
  title: string;
  description: string;
  btnConfirm: { icon?: string; color?: string; text: string };
}

@Component({
  selector: 'con-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent implements OnInit {
  config!: IDialogConfirm;
  configDefault: IDialogConfirm = {
    title: 'Confirmar operação.',
    description:
      'Você realmente quer fazer isso? esta operação não poderá ser desfeita.',
    btnConfirm: { text: 'Confirmar', color: 'danger' },
  };

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public info: IDialogConfirm
  ) {
    if (info) {
      this.config = Object.assign({}, this.configDefault, info);
    } else {
      this.config = this.configDefault;
    }
  }

  ngOnInit() {}
}
