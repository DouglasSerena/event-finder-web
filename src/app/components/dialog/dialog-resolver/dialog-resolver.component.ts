import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { dialogConfig } from '@douglas-serena/ng-utils';
import { Global } from '@douglas-serena/utils';

@Component({
  selector: 'ef-dialog-resolver',
  template: '',
})
export class DialogResolverComponent implements OnInit {
  constructor(
    private dialogService: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const data = this.activatedRoute.snapshot.data;
    const config = Object.assign({}, data.config);

    if (data.mobile) {
      Object.assign(
        config,
        dialogConfig(Global.isMobile ? 'mobile' : 'desktop')
      );
    }
    if (data.param) {
      config.data = this.activatedRoute.snapshot.paramMap.get(data.param);
    }

    this.dialogService.open(data.dialog, config);
  }
}
