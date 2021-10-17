import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '@douglas-serena/utils';
import { IEvent } from '../interfaces/event.interface';

@Component({
  selector: 'ef-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  get isMobile() {
    return Global.isMobile;
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  openEvent(event: IEvent) {
    this.router.navigate(['/event', event._id]);
  }
}
