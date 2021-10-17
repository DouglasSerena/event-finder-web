import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/stores/user/user.service';

@Component({
  selector: 'ef-auth-confirm',
  template: '',
})
export class AuthConfirmComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const { token } = this.activatedRoute.snapshot.queryParams;
    this.userService.signIn(token);
    this.router.navigate(['/'], {
      queryParams: {
        authentication: true,
      },
    });
  }
}
