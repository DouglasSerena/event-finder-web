import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ef-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.scss'],
})
export class DialogAuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onAuthGoogle() {
    location.href = `${environment.URL_API}/auth/google`;
  }
  onAuthFacebook() {
    location.href = `${environment.URL_API}/auth/facebook`;
  }
}
